/**
 * Client for the Team Portal (team-devsinn-backend) recruitment API. Only the `/public/*`
 * routes are called from here — no employee auth ever touches this site.
 */

/**
 * The Nest backend mounts every route under a global `/api` prefix (see `main.ts`,
 * `app.setGlobalPrefix('api')`). NEXT_PUBLIC_TM_API_URL is just the bare host
 * (e.g. http://localhost:3010) — this appends `/api` once, however it's configured, so
 * setting it with or without a trailing `/api` both work.
 */
export function getTmApiBaseUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_TM_API_URL || "").trim().replace(/\/$/, "");
  if (!raw) return raw;
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}

const CANDIDATE_TOKEN_KEY = "tm_candidate_token";

/** A hung backend must not hang the calling Vercel serverless function until its own execution limit kills it. */
const REQUEST_TIMEOUT_MS = 8_000;
/**
 * Browser calls go through the same-origin `/api/tm/*` proxy (see src/app/api/tm/[...path]/route.ts)
 * instead of hitting the backend directly, because the backend is only reachable over plain HTTP —
 * calling it straight from an HTTPS page gets blocked as mixed content. Longer than REQUEST_TIMEOUT_MS
 * so the proxy's own timeout fires first and this layer gets its specific error message.
 */
const PROXY_TIMEOUT_MS = 12_000;

export function getCandidateToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CANDIDATE_TOKEN_KEY);
}

export function setCandidateToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (!token) {
    localStorage.removeItem(CANDIDATE_TOKEN_KEY);
    return;
  }
  localStorage.setItem(CANDIDATE_TOKEN_KEY, token);
}

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
}

/** Turns a raw fetch()/undici network failure into a message that actually says what broke. */
function describeNetworkError(error: unknown, target: string, timeoutMs: number): string {
  const cause =
    error && typeof error === "object" && "cause" in error
      ? (error as { cause?: { code?: string; message?: string } }).cause
      : undefined;
  const code = cause?.code || "";
  const detail = cause?.message || (error instanceof Error ? error.message : String(error));

  if (code === "ECONNREFUSED" || detail.includes("ECONNREFUSED")) {
    return `Cannot reach ${target} — connection refused. The backend isn't listening there (check it's running and the port/firewall is open to the public internet, not just your own machine).`;
  }
  if (code === "ENOTFOUND" || detail.includes("ENOTFOUND")) {
    return `Cannot resolve the host in ${target}. Check NEXT_PUBLIC_TM_API_URL for a typo, or that the domain's DNS is set up.`;
  }
  if (code === "ETIMEDOUT" || code === "UND_ERR_CONNECT_TIMEOUT" || detail.includes("timeout")) {
    return `Timed out reaching ${target}. The host may be unreachable from Vercel's network (firewall/security group blocking it), or just slow to respond.`;
  }
  if (error instanceof DOMException && error.name === "AbortError") {
    return `Timed out reaching ${target} after ${timeoutMs / 1000}s. The host is likely unreachable from Vercel's network (e.g. it's only listening on localhost) or is overloaded.`;
  }
  if (detail.toLowerCase().includes("certificate") || detail.toLowerCase().includes("ssl") || detail.toLowerCase().includes("tls")) {
    return `TLS/certificate error reaching ${target}: ${detail}`;
  }
  return `Network request to ${target} failed: ${detail}`;
}

async function request<T>(path: string, options: RequestInit = {}, authed = false): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const isBrowser = typeof window !== "undefined";

  let url: string;
  let timeoutMs: number;
  if (isBrowser) {
    // Same-origin proxy — see PROXY_TIMEOUT_MS comment for why this can't call the backend directly.
    url = `/api/tm${normalizedPath}`;
    timeoutMs = PROXY_TIMEOUT_MS;
  } else {
    const base = getTmApiBaseUrl();
    if (!base) {
      throw new Error(
        "The API is not configured yet (set NEXT_PUBLIC_TM_API_URL to the Team Portal backend URL).",
      );
    }
    url = `${base}${normalizedPath}`;
    timeoutMs = REQUEST_TIMEOUT_MS;
  }

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (authed) {
    const token = getCandidateToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    throw new Error(describeNetworkError(error, url, timeoutMs));
  }
  const payload = (await res.json().catch(() => null)) as ApiErrorBody | T | null;

  if (!res.ok) {
    const body = (payload || {}) as ApiErrorBody;
    const message = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message || body.error || `Request failed (${res.status})`;
    throw new Error(String(message));
  }

  return payload as T;
}

// ── Jobs (public) ──

export interface PublicJob {
  id: string;
  title: string;
  department?: string;
  description?: string;
  skills?: string;
  technology_stack?: string;
  experience?: string;
  salary_range?: string;
  employment_type?: string;
  vacancy_count?: number;
  deadline?: string;
  status: string;
}

export async function getActiveJobs(): Promise<PublicJob[]> {
  return request<PublicJob[]>("/public/jobs");
}

export async function getJobById(id: string): Promise<PublicJob | null> {
  try {
    return await request<PublicJob>(`/public/jobs/${encodeURIComponent(id)}`);
  } catch (error) {
    console.error(`[tmApi] Failed to load job ${id}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

// ── Candidate auth (public) ──

export interface CandidateAuthResult {
  candidate: { id: string; email: string; name: string };
  accessToken: string;
}

export async function candidateSignup(input: {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}): Promise<CandidateAuthResult> {
  const result = await request<CandidateAuthResult>("/public/candidate-auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
  setCandidateToken(result.accessToken);
  return result;
}

export async function candidateLogin(input: {
  email: string;
  password: string;
}): Promise<CandidateAuthResult> {
  const result = await request<CandidateAuthResult>("/public/candidate-auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  setCandidateToken(result.accessToken);
  return result;
}

export async function getCurrentCandidate(): Promise<{ id: string; email: string; name: string } | null> {
  if (!getCandidateToken()) return null;
  try {
    return await request("/public/candidate-auth/me", {}, true);
  } catch {
    setCandidateToken(null);
    return null;
  }
}

export function candidateLogout(): void {
  setCandidateToken(null);
}

// ── Applications (public, requires candidate login) ──

export interface ApplyPayload {
  jobId: string;
  cnic: string;
  contactNumber?: string;
  location?: string;
  education?: string;
  experience?: string;
  skills?: string;
  technologyStack?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  cvBase64?: string;
  cvFileName?: string;
  cvMimeType?: string;
}

export async function applyToJob(input: ApplyPayload): Promise<{ id: string; status: string }> {
  return request("/public/applications/apply", { method: "POST", body: JSON.stringify(input) }, true);
}

export async function getMyApplications(): Promise<Array<{ id: string; job_id: string; job_title: string; status: string; applied_at: string }>> {
  return request("/public/applications/mine", {}, true);
}

// ── Contact form (public) ──

export async function submitContactForm(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  await request("/public/contact", { method: "POST", body: JSON.stringify(input) });
}

// ── Pricing cards (public, server-side) ──

/** Kept in sync with the Team Portal `pricing_cards` table (snake_case, as returned by the API). */
export interface PublicPricingCard {
  id: string;
  kind: "tier" | "offer";
  service_slug: string;
  offer_slug: string | null;
  name: string;
  badge: string | null;
  price: string;
  period: string | null;
  description: string | null;
  features: string[];
  cta_label: string | null;
  cta_href: string | null;
  highlighted: boolean;
  sort_order: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface PublicPricingCardsResult {
  /** True once the portal has at least one card (any status) — the portal is then the source of truth. */
  configured: boolean;
  /** Active cards only, ordered service_slug, kind, sort_order. */
  cards: PublicPricingCard[];
}

/** Revalidation window (seconds) for the cached pricing fetch. Pages that render pricing export the same value. */
export const PRICING_REVALIDATE_SECONDS = 60;
export const PRICING_CACHE_TAG = "pricing-cards";

/**
 * Server-side only. Fetches every active pricing card from the Team Portal, cached in the Next.js Data Cache
 * for PRICING_REVALIDATE_SECONDS (`next.revalidate` on fetch — see the Next 16 guide
 * "caching-without-cache-components", since this app doesn't enable `cacheComponents`).
 *
 * Never throws: returns null when the env var is missing, the backend is down/slow, or the payload is malformed —
 * callers then fall back to the static data in src/data. Failed fetches are not written to the cache.
 */
export async function getPublicPricingCards(): Promise<PublicPricingCardsResult | null> {
  if (typeof window !== "undefined" || !getTmApiBaseUrl()) return null;
  try {
    const payload = await request<unknown>("/public/pricing-cards", {
      next: { revalidate: PRICING_REVALIDATE_SECONDS, tags: [PRICING_CACHE_TAG] },
    });
    if (!payload || typeof payload !== "object") return null;
    const { configured, cards } = payload as { configured?: unknown; cards?: unknown };
    if (typeof configured !== "boolean" || !Array.isArray(cards)) return null;
    const valid = cards.filter(
      (c): c is PublicPricingCard =>
        !!c &&
        typeof c === "object" &&
        (c.kind === "tier" || c.kind === "offer") &&
        typeof c.service_slug === "string" &&
        typeof c.name === "string" &&
        typeof c.price === "string",
    );
    return {
      configured,
      cards: valid.map((c) => ({ ...c, features: Array.isArray(c.features) ? c.features.filter((f) => typeof f === "string") : [] })),
    };
  } catch (error) {
    console.warn("[tmApi] Pricing cards unavailable, using static fallback:", error instanceof Error ? error.message : error);
    return null;
  }
}
