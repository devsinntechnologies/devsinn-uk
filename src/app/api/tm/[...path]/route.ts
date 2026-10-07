import { NextRequest, NextResponse } from "next/server";
import { getTmApiBaseUrl } from "@/lib/tmApi";

/**
 * Proxies browser requests to the Team Portal backend server-side. The backend is only
 * reachable over plain HTTP (http://158.220.116.136:3001), so calling it directly from
 * the browser on this HTTPS site gets blocked as mixed content — routing through this
 * same-origin Route Handler keeps the browser on HTTPS while the server-to-server hop
 * to the backend (not subject to mixed-content rules) stays as-is.
 */

const REQUEST_TIMEOUT_MS = 8_000;

/** Headers that break undici/Node fetch when forwarded from the browser. */
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  "accept-encoding",
]);

function buildUpstreamHeaders(req: NextRequest) {
  const headers = new Headers();
  for (const [key, value] of req.headers.entries()) {
    if (HOP_BY_HOP.has(key.toLowerCase())) continue;
    headers.set(key, value);
  }
  return headers;
}

async function proxy(req: NextRequest, path: string[]) {
  const base = getTmApiBaseUrl();
  if (!base) {
    return NextResponse.json({ message: "The careers API is not configured." }, { status: 503 });
  }

  const target = `${base}/${path.join("/")}${req.nextUrl.search}`;
  const headers = buildUpstreamHeaders(req);
  const body = req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined;

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upstream API request failed";
    return NextResponse.json({ message: `Careers API proxy failed: ${message}` }, { status: 502 });
  }

  const responseBody = await upstream.text();
  const response = new NextResponse(responseBody, { status: upstream.status });
  const contentType = upstream.headers.get("content-type");
  if (contentType) response.headers.set("content-type", contentType);
  response.headers.set("cache-control", "no-store");
  return response;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path || []);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path || []);
}
