"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, UserRound, X } from "lucide-react";
import Button from "@/components/ui/button";
import {
  candidateLogin,
  candidateLogout,
  candidateSignup,
  getCurrentCandidate,
} from "@/lib/tmApi";

type ModalMode = "login" | "signup" | null;

/**
 * Just the "Apply" entry point: checks whether the visitor is already logged in, and either
 * sends them straight to the full application page or opens a quick login/signup modal first.
 * The actual "required questions" form lives on its own page (/careers/[jobId]/apply), not a
 * dialog, so it has room to breathe and gets its own URL/back button.
 */
export default function ApplySection({ jobId }: { jobId: string; jobTitle: string }) {
  const router = useRouter();
  const [candidate, setCandidate] = useState<{ id: string; email: string; name: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authForm, setAuthForm] = useState({ fullName: "", phone: "", email: "", password: "" });
  const [authErrors, setAuthErrors] = useState<Partial<Record<"fullName" | "phone" | "email" | "password", string>>>(
    {},
  );

  useEffect(() => {
    (async () => {
      const current = await getCurrentCandidate();
      setCandidate(current);
      setCheckingAuth(false);
    })();
  }, []);

  const handleApplyClick = () => {
    if (candidate) {
      router.push(`/careers/${jobId}/apply`);
    } else {
      setModalMode("login");
    }
  };

  const validateAuthForm = () => {
    const nextErrors: Partial<Record<"fullName" | "phone" | "email" | "password", string>> = {};

    if (modalMode === "signup" && !authForm.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (modalMode === "signup") {
      if (!authForm.phone.trim()) {
        nextErrors.phone = "Phone number is required.";
      } else if (!/^[0-9+\-\s()]{7,20}$/.test(authForm.phone.trim())) {
        nextErrors.phone = "Enter a valid phone number.";
      }
    }

    if (!authForm.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authForm.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!authForm.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (authForm.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    return nextErrors;
  };

  const handleAuthSubmit = async () => {
    const nextErrors = validateAuthForm();
    setAuthErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setError("Please fix the highlighted fields before continuing.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const result =
        modalMode === "signup"
          ? await candidateSignup(authForm)
          : await candidateLogin({ email: authForm.email, password: authForm.password });
      setCandidate(result.candidate);
      setModalMode(null);
      router.push(`/careers/${jobId}/apply`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-lg border bg-white px-4 py-2.5 text-[15px] text-nearblack outline-none transition-colors placeholder:text-gray/70 focus:border-teal focus:ring-4 focus:ring-teal/10 ${
      hasError ? "border-red-500" : "border-stone"
    }`;

  const switchMode = (mode: Exclude<ModalMode, null>) => {
    setModalMode(mode);
    setAuthErrors({});
    setError("");
  };

  return (
    <div>
      <Button fullWidth onClick={handleApplyClick} loading={checkingAuth} loadingLabel="Checking...">
        Apply for this role
        <ArrowRight size={16} strokeWidth={2} aria-hidden />
      </Button>

      {candidate ? (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray">
          <span className="inline-flex items-center gap-1.5">
            <UserRound size={13} strokeWidth={2} className="text-teal" aria-hidden />
            Signed in as <span className="font-medium text-nearblack">{candidate.email}</span>
          </span>
          <button
            type="button"
            className="font-medium text-teal underline-offset-4 hover:underline"
            onClick={() => {
              candidateLogout();
              setCandidate(null);
            }}
          >
            Log out
          </button>
        </div>
      ) : !checkingAuth ? (
        <p className="mt-3 text-center text-xs text-gray">You&apos;ll log in or create a quick account first.</p>
      ) : null}

      {modalMode ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-nearblack/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-dialog-title"
        >
          <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-stone bg-white p-6 shadow-[0_24px_64px_-20px_rgba(16,24,40,0.35)] sm:p-8">
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray transition-colors hover:bg-offwhite hover:text-nearblack"
              onClick={() => setModalMode(null)}
            >
              <X size={18} strokeWidth={2} aria-hidden />
            </button>

            <h2 id="auth-dialog-title" className="pr-10 font-display text-xl font-semibold! text-nearblack">
              {modalMode === "signup" ? "Create your candidate account" : "Welcome back"}
            </h2>
            <p className="mt-1 text-sm text-gray">
              {modalMode === "signup"
                ? "Sign up to apply and keep track of your application."
                : "Log in to continue with your application."}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl border border-stone bg-offwhite p-1" role="tablist">
              {(["login", "signup"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  role="tab"
                  aria-selected={modalMode === mode}
                  className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                    modalMode === mode ? "bg-white text-teal shadow-sm" : "text-gray hover:text-nearblack"
                  }`}
                  onClick={() => switchMode(mode)}
                >
                  {mode === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              {modalMode === "signup" ? (
                <div>
                  <label htmlFor="auth-full-name" className="mb-1.5 block text-sm font-medium text-nearblack">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="auth-full-name"
                    className={inputClass(authErrors.fullName)}
                    placeholder="Full name"
                    autoComplete="name"
                    value={authForm.fullName}
                    onChange={(e) => setAuthForm((p) => ({ ...p, fullName: e.target.value }))}
                    aria-invalid={Boolean(authErrors.fullName)}
                  />
                  {authErrors.fullName ? <p className="mt-1 text-xs text-red-600">{authErrors.fullName}</p> : null}
                </div>
              ) : null}
              {modalMode === "signup" ? (
                <div>
                  <label htmlFor="auth-phone" className="mb-1.5 block text-sm font-medium text-nearblack">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="auth-phone"
                    className={inputClass(authErrors.phone)}
                    placeholder="Phone number"
                    autoComplete="tel"
                    value={authForm.phone}
                    onChange={(e) => setAuthForm((p) => ({ ...p, phone: e.target.value }))}
                    aria-invalid={Boolean(authErrors.phone)}
                  />
                  {authErrors.phone ? <p className="mt-1 text-xs text-red-600">{authErrors.phone}</p> : null}
                </div>
              ) : null}
              <div>
                <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-nearblack">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="auth-email"
                  className={inputClass(authErrors.email)}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm((p) => ({ ...p, email: e.target.value }))}
                  aria-invalid={Boolean(authErrors.email)}
                />
                {authErrors.email ? <p className="mt-1 text-xs text-red-600">{authErrors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-nearblack">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="auth-password"
                  className={inputClass(authErrors.password)}
                  type="password"
                  placeholder="Password (min 8 characters)"
                  autoComplete={modalMode === "signup" ? "new-password" : "current-password"}
                  value={authForm.password}
                  onChange={(e) => setAuthForm((p) => ({ ...p, password: e.target.value }))}
                  aria-invalid={Boolean(authErrors.password)}
                />
                {authErrors.password ? <p className="mt-1 text-xs text-red-600">{authErrors.password}</p> : null}
              </div>
              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              ) : null}
              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray transition-colors hover:text-nearblack"
                  onClick={() => setModalMode(null)}
                >
                  Cancel
                </button>
                <Button size="md" onClick={handleAuthSubmit} loading={loading}>
                  {modalMode === "signup" ? "Sign up & continue" : "Log in & continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
