"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowLeft, CircleCheck, FileText, GraduationCap, Link2, Upload, UserRound, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/button";
import { applyToJob } from "@/lib/tmApi";

const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

type ApplyFormState = {
  cnic: string;
  contactNumber: string;
  location: string;
  education: string;
  experience: string;
  skills: string;
  technologyStack: string;
  linkedinUrl: string;
  portfolioUrl: string;
};

type FieldErrors = Partial<Record<keyof ApplyFormState | "cvFile", string>>;

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.readAsDataURL(file);
  });
}

export default function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [applyForm, setApplyForm] = useState<ApplyFormState>({
    cnic: "",
    contactNumber: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
    technologyStack: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const setField = (field: keyof ApplyFormState, value: string) => {
    setApplyForm((p) => ({ ...p, [field]: value }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    const cnicDigits = applyForm.cnic.replace(/\D/g, "");
    if (!applyForm.cnic.trim()) {
      next.cnic = "CNIC is required.";
    } else if (cnicDigits.length !== 13) {
      next.cnic = "CNIC must be exactly 13 digits.";
    }

    if (!applyForm.contactNumber.trim()) {
      next.contactNumber = "Contact number is required.";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(applyForm.contactNumber.trim())) {
      next.contactNumber = "Enter a valid contact number.";
    }

    if (!applyForm.location.trim()) {
      next.location = "Location is required.";
    }

    if (!applyForm.education.trim()) {
      next.education = "Education is required.";
    }

    if (!applyForm.experience.trim()) {
      next.experience = "Experience is required.";
    }

    if (!applyForm.skills.trim()) {
      next.skills = "Skills are required.";
    }

    if (!applyForm.technologyStack.trim()) {
      next.technologyStack = "Technology stack is required.";
    }

    if (applyForm.linkedinUrl.trim() && !isValidUrl(applyForm.linkedinUrl.trim())) {
      next.linkedinUrl = "Enter a valid URL (starting with http:// or https://).";
    }

    if (applyForm.portfolioUrl.trim() && !isValidUrl(applyForm.portfolioUrl.trim())) {
      next.portfolioUrl = "Enter a valid URL (starting with http:// or https://).";
    }

    if (cvFile) {
      const lowerName = cvFile.name.toLowerCase();
      const hasAllowedExtension = ALLOWED_CV_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      if (!hasAllowedExtension) {
        next.cvFile = "CV must be a PDF or DOC/DOCX file.";
      } else if (cvFile.size > MAX_CV_SIZE_BYTES) {
        next.cvFile = "CV must be 5MB or smaller.";
      }
    }

    return next;
  };

  const handleSubmit = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setError("Please fix the highlighted fields before submitting.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      let cvBase64: string | undefined;
      if (cvFile) {
        cvBase64 = await readFileAsBase64(cvFile);
      }
      await applyToJob({
        jobId,
        ...applyForm,
        cvBase64,
        cvFileName: cvFile?.name,
        cvMimeType: cvFile?.type,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-stone bg-white p-8 text-center shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CircleCheck size={28} strokeWidth={2} aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold! text-nearblack">Application submitted</h2>
        <p className="mx-auto mt-3 max-w-[460px] text-base leading-relaxed text-gray">
          Thanks for applying to <span className="font-medium text-nearblack">{jobTitle}</span>. Our team will review
          your application and get in touch.
        </p>
        <div className="mt-7 flex justify-center">
          <Button variant="secondary" size="md" href="/careers">
            <ArrowLeft size={16} strokeWidth={2} aria-hidden />
            Back to careers
          </Button>
        </div>
      </div>
    );
  }

  const fieldClass = (hasError?: string) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-nearblack outline-none transition-colors placeholder:text-gray/70 focus:border-teal focus:ring-4 focus:ring-teal/10 ${
      hasError ? "border-red-500" : "border-stone"
    }`;

  return (
    <div className="space-y-6">
      <FormSection icon={UserRound} title="Personal details" description="How we can identify and reach you.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="apply-cnic" label="CNIC" required error={errors.cnic}>
            <input
              id="apply-cnic"
              className={fieldClass(errors.cnic)}
              placeholder="e.g. 3520112345671"
              inputMode="numeric"
              value={applyForm.cnic}
              onChange={(e) => setField("cnic", e.target.value)}
              aria-invalid={Boolean(errors.cnic)}
              aria-describedby={errors.cnic ? "apply-cnic-error" : undefined}
            />
          </Field>

          <Field id="apply-contact" label="Contact Number" required error={errors.contactNumber}>
            <input
              id="apply-contact"
              className={fieldClass(errors.contactNumber)}
              placeholder="e.g. +92 300 1234567"
              type="tel"
              autoComplete="tel"
              value={applyForm.contactNumber}
              onChange={(e) => setField("contactNumber", e.target.value)}
              aria-invalid={Boolean(errors.contactNumber)}
              aria-describedby={errors.contactNumber ? "apply-contact-error" : undefined}
            />
          </Field>

          <Field id="apply-location" label="Location" required error={errors.location} className="sm:col-span-2">
            <input
              id="apply-location"
              className={fieldClass(errors.location)}
              placeholder="City, Country"
              value={applyForm.location}
              onChange={(e) => setField("location", e.target.value)}
              aria-invalid={Boolean(errors.location)}
              aria-describedby={errors.location ? "apply-location-error" : undefined}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection icon={GraduationCap} title="Background" description="Your education, experience, and strengths.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="apply-education" label="Education" required error={errors.education} className="sm:col-span-2">
            <textarea
              id="apply-education"
              rows={3}
              className={`${fieldClass(errors.education)} resize-y`}
              placeholder="Degree, institute, and graduation year"
              value={applyForm.education}
              onChange={(e) => setField("education", e.target.value)}
              aria-invalid={Boolean(errors.education)}
              aria-describedby={errors.education ? "apply-education-error" : undefined}
            />
          </Field>

          <Field id="apply-experience" label="Experience" required error={errors.experience} className="sm:col-span-2">
            <textarea
              id="apply-experience"
              rows={4}
              className={`${fieldClass(errors.experience)} resize-y`}
              placeholder="Relevant roles, years of experience, and key achievements"
              value={applyForm.experience}
              onChange={(e) => setField("experience", e.target.value)}
              aria-invalid={Boolean(errors.experience)}
              aria-describedby={errors.experience ? "apply-experience-error" : undefined}
            />
          </Field>

          <Field id="apply-skills" label="Skills" required error={errors.skills}>
            <input
              id="apply-skills"
              className={fieldClass(errors.skills)}
              placeholder="e.g. React, Node.js, API design"
              value={applyForm.skills}
              onChange={(e) => setField("skills", e.target.value)}
              aria-invalid={Boolean(errors.skills)}
              aria-describedby={errors.skills ? "apply-skills-error" : undefined}
            />
          </Field>

          <Field id="apply-tech-stack" label="Technology Stack" required error={errors.technologyStack}>
            <input
              id="apply-tech-stack"
              className={fieldClass(errors.technologyStack)}
              placeholder="e.g. Next.js, NestJS, PostgreSQL"
              value={applyForm.technologyStack}
              onChange={(e) => setField("technologyStack", e.target.value)}
              aria-invalid={Boolean(errors.technologyStack)}
              aria-describedby={errors.technologyStack ? "apply-tech-stack-error" : undefined}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection icon={Link2} title="Links & CV" description="Optional, but they help us get to know your work.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="apply-linkedin" label="LinkedIn URL" error={errors.linkedinUrl}>
            <input
              id="apply-linkedin"
              className={fieldClass(errors.linkedinUrl)}
              placeholder="https://linkedin.com/in/your-name"
              type="url"
              value={applyForm.linkedinUrl}
              onChange={(e) => setField("linkedinUrl", e.target.value)}
              aria-invalid={Boolean(errors.linkedinUrl)}
              aria-describedby={errors.linkedinUrl ? "apply-linkedin-error" : undefined}
            />
          </Field>

          <Field id="apply-portfolio" label="Portfolio / GitHub URL" error={errors.portfolioUrl}>
            <input
              id="apply-portfolio"
              className={fieldClass(errors.portfolioUrl)}
              placeholder="https://github.com/your-username"
              type="url"
              value={applyForm.portfolioUrl}
              onChange={(e) => setField("portfolioUrl", e.target.value)}
              aria-invalid={Boolean(errors.portfolioUrl)}
              aria-describedby={errors.portfolioUrl ? "apply-portfolio-error" : undefined}
            />
          </Field>

          <Field id="apply-cv" label="CV (PDF or DOC, max 5MB)" error={errors.cvFile} className="sm:col-span-2">
            <div
              className={`flex flex-col gap-3 rounded-xl border border-dashed p-4 transition-colors sm:flex-row sm:items-center ${
                errors.cvFile ? "border-red-500 bg-red-50/40" : "border-stone bg-offwhite hover:border-teal/60"
              }`}
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-teal shadow-sm">
                {cvFile ? <FileText size={20} strokeWidth={2} aria-hidden /> : <Upload size={20} strokeWidth={2} aria-hidden />}
              </span>
              <input
                id="apply-cv"
                className="w-full min-w-0 cursor-pointer text-sm text-gray file:mr-4 file:cursor-pointer file:rounded-lg file:border file:border-stone file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-nearblack hover:file:border-teal hover:file:text-teal"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                aria-invalid={Boolean(errors.cvFile)}
                aria-describedby={errors.cvFile ? "apply-cv-error" : undefined}
              />
            </div>
          </Field>
        </div>
      </FormSection>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 rounded-2xl border border-stone bg-offwhite p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <Link
          href={`/careers/${jobId}`}
          className="text-center text-sm font-medium text-gray transition-colors hover:text-nearblack sm:text-left"
        >
          Cancel
        </Link>
        <Button onClick={handleSubmit} loading={loading} size="md">
          Submit application
        </Button>
      </div>
    </div>
  );
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
          <Icon size={18} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold! text-nearblack">{title}</h2>
          <p className="text-sm text-gray">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  required = false,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-nearblack">
        {label} {required ? <span className="text-red-500">*</span> : <span className="font-normal text-gray">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
