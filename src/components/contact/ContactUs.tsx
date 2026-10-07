"use client";

import { ChangeEvent, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import type { EmailJSResponseStatus } from "@emailjs/browser";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Button from "@/components/ui/button";
import { homeTheme as h } from "@/components/home/homeTheme";
import {
  EMAILJS_CONFIG,
  EMAILJS_INVALID_ACCOUNT_MESSAGE,
} from "@/lib/emailjs";
import { submitContactForm } from "@/lib/tmApi";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=923365918295";

const contactDetails = [
  {
    title: "Email",
    value: "info@devsinntechnologies.com",
    href: "mailto:info@devsinntechnologies.com",
    external: false,
    icon: Mail,
  },
  {
    title: "Phone / WhatsApp",
    value: "+92 336 5918295",
    href: WHATSAPP_URL,
    external: true,
    icon: Phone,
  },
];

const nextSteps = [
  {
    title: "We read your brief",
    body: "A team member reviews your message and the context you shared.",
  },
  {
    title: "You hear back within 1 business day",
    body: "We reply with clarifying questions or a suggested next step.",
  },
  {
    title: "Optional free fit call",
    body: "If it helps, we book a free 20-minute call to talk it through.",
  },
];

const budgetRanges = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
];

const timelineOptions = [
  "ASAP / urgent",
  "1–4 weeks",
  "1–3 months",
  "3+ months",
  "Exploring options",
];

const projectTypes = [
  "AI Automation & Agents",
  "SaaS MVP Development",
  "Custom Software Development",
  "App Rescue, Bug Fixing & Maintenance",
  "Product Audit",
  "Free Fit Call",
  "Not sure yet",
];

const serviceTypePresets: Record<string, string> = {
  "ai-automation": "AI Automation & Agents",
  "ai-automation-agents": "AI Automation & Agents",
  "saas-mvp": "SaaS MVP Development",
  "saas-mvp-development": "SaaS MVP Development",
  "software-development": "Custom Software Development",
  "custom-software": "Custom Software Development",
  "custom-software-development": "Custom Software Development",
  "app-rescue": "App Rescue, Bug Fixing & Maintenance",
  "app-rescue-maintenance": "App Rescue, Bug Fixing & Maintenance",
  "app-rescue-bug-fixing-maintenance": "App Rescue, Bug Fixing & Maintenance",
};

const normalizePresetKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

type FieldName = "name" | "email" | "projectType" | "message";

const cardClass =
  "rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";
const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-sm text-nearblack outline-none transition-[border-color,box-shadow] placeholder:text-gray/70 focus:border-teal focus:ring-2 focus:ring-teal/15";

function Field({
  id,
  label,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium text-nearblack">
        <span>
          {label}
          {required ? <span className="ml-0.5 text-teal" aria-hidden>*</span> : null}
        </span>
        {!required && !hint ? <span className="text-xs font-normal text-gray">Optional</span> : null}
        {hint ? <span className="text-xs font-normal text-gray">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" aria-hidden />
    </div>
  );
}

type ContactUsFormProps = {
  presetType: string;
  presetPackage: string;
  presetModel: string;
};

function ContactUsForm({ presetType, presetPackage, presetModel }: ContactUsFormProps) {
  const shouldReduceMotion = useReducedMotion();

  const getPresetSubject = () => {
    if (presetType === "fit-call") return "Free Fit Call";
    if (presetType && projectTypes.includes(presetType)) return presetType;
    if (presetType === "Product Audit" || presetType === "product-audit") return "Product Audit";
    if (presetType) {
      const normalizedType = normalizePresetKey(presetType);
      if (serviceTypePresets[normalizedType]) return serviceTypePresets[normalizedType];
    }

    if (presetPackage) {
      const pkg = presetPackage.toLowerCase();
      if (pkg === "product-audit") return "Product Audit";
      if (pkg === "app-rescue-sprint" || pkg === "monthly-maintenance") return "App Rescue, Bug Fixing & Maintenance";
      if (pkg === "ai-automation-sprint") return "AI Automation & Agents";
      if (pkg === "mvp-sprint") return "SaaS MVP Development";
      if (pkg === "dedicated-developer") return "Custom Software Development";
    }

    if (presetModel) {
      const model = presetModel.toLowerCase();
      if (model === "fixed-mvp") return "SaaS MVP Development";
      if (model === "ai-automation-sprint") return "AI Automation & Agents";
      if (model === "monthly-dedicated-team") return "Custom Software Development";
      if (model === "product-strategy") return "Custom Software Development";
    }

    return "";
  };

  const getInitialMessage = () => {
    if (presetPackage) {
      const pkgName = presetPackage.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      return `Hi, I am interested in your package: ${pkgName}. Here are my requirements: `;
    }
    if (presetModel) {
      const modelName = presetModel.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      return `Hi, I am interested in your engagement model: ${modelName}. Here are my requirements: `;
    }
    return "";
  };

  const presetSubject = getPresetSubject();
  const initialMessage = getInitialMessage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyUrl: "",
    phone: "",
    projectType: presetSubject,
    budget: "",
    timeline: "",
    message: initialMessage,
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<FieldName | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setError(null);
    setErrorField(null);
    setSuccessMessage(null);
    setFormData((current) => ({ ...current, [name]: value }));
  };

  /** Same rules and messages as before; also reports which field failed for inline display. */
  const validateForm = (): { field: FieldName; message: string } | null => {
    if (!formData.name.trim()) return { field: "name", message: "Name is required." };
    if (!formData.email.trim()) return { field: "email", message: "Email is required." };
    if (!/\S+@\S+\.\S+/.test(formData.email)) return { field: "email", message: "Enter a valid email address." };
    if (!formData.projectType || formData.projectType === "") return { field: "projectType", message: "Please select a project type." };
    if (!formData.message.trim()) return { field: "message", message: "Please describe your project or requirements." };
    return null;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError.message);
      setErrorField(validationError.field);
      setSuccessMessage(null);
      document.getElementById(`contact-${validationError.field}`)?.focus();
      return;
    }

    setErrorField(null);
    setIsSending(true);

    // Persist to the Team Portal so Admin can see it too — best-effort, never blocks the
    // EmailJS send or surfaces its own error to the visitor.
    void submitContactForm({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone || undefined,
      subject: formData.projectType || undefined,
      message: formData.message,
    }).catch(() => undefined);

    const templateParams = {
      from_name: formData.name.trim(),
      from_company: formData.companyUrl.trim() || "N/A",
      from_email: formData.email,
      from_number: formData.phone || "N/A",
      from_country: "N/A",
      from_subject: formData.projectType,
      from_budget: formData.budget || "N/A",
      from_timeline: formData.timeline || "N/A",
      message: formData.message,
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };

    emailjs
      .send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey,
      )
      .then(() => {
        setFormData({
          name: "",
          email: "",
          companyUrl: "",
          phone: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
        setError(null);
        setSuccessMessage("Message sent! We'll reply within 1 business day.");
        setIsSending(false);
      })
      .catch((reason: EmailJSResponseStatus | Error | string) => {
        let nextError = "Failed to send. Please try again or WhatsApp us directly.";
        if (typeof reason === "object" && reason !== null && "text" in reason && typeof reason.text === "string") {
          nextError = reason.text.includes("Account not found") ? EMAILJS_INVALID_ACCOUNT_MESSAGE : reason.text;
        } else if (reason instanceof Error && reason.message) {
          nextError = reason.message;
        } else if (typeof reason === "string" && reason) {
          nextError = reason;
        }
        setError(nextError);
        setSuccessMessage(null);
        setIsSending(false);
      });
  };

  const fieldError = (field: FieldName) => (errorField === field && error ? error : undefined);
  const inputClass = (field?: FieldName) =>
    `${inputBase} ${field && errorField === field ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : "border-stone"}`;
  const selectClass = (field?: FieldName) => `${inputClass(field)} appearance-none pr-10`;
  const describedBy = (field: FieldName) => (errorField === field ? `contact-${field}-error` : undefined);

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <>
      <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
        <div className={`${h.container} grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10`}>
          {/* FORM */}
          <motion.div className={`${cardClass} p-6 sm:p-8 lg:p-10`} {...reveal()}>
            {successMessage ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <CheckCircle2 className="h-8 w-8" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold! tracking-[-0.01em] text-nearblack sm:text-[28px]">
                  Thanks, your message is in.
                </h2>
                <p className="mt-3 max-w-[440px] text-base leading-relaxed text-gray">{successMessage}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button type="button" variant="secondary" size="md" onClick={() => setSuccessMessage(null)}>
                    Send another message
                  </Button>
                  <Button href="/offers/fit-call" variant="primary" size="md">
                    Book a free fit call
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 border-b border-stone pb-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">Inquiry form</span>
                  <h2 className="font-display text-2xl font-semibold! tracking-[-0.01em] text-nearblack sm:text-[28px]">
                    Tell us about your project
                  </h2>
                  <p className="text-sm leading-relaxed text-gray sm:text-base">
                    A few details help us reply with something useful, not a generic sales pitch.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
                  {error && !errorField ? (
                    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>
                        {error}{" "}
                        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                          Message us on WhatsApp
                        </a>
                      </span>
                    </div>
                  ) : null}

                  <fieldset>
                    <legend className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[10px] text-white">1</span>
                      About you
                    </legend>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field id="contact-name" label="Full name" required error={fieldError("name")}>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          aria-invalid={errorField === "name"}
                          aria-describedby={describedBy("name")}
                          className={inputClass("name")}
                        />
                      </Field>
                      <Field id="contact-email" label="Work email" required error={fieldError("email")}>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                          aria-invalid={errorField === "email"}
                          aria-describedby={describedBy("email")}
                          className={inputClass("email")}
                        />
                      </Field>
                      <Field id="contact-companyUrl" label="Company / product URL">
                        <input
                          id="contact-companyUrl"
                          type="url"
                          name="companyUrl"
                          autoComplete="url"
                          value={formData.companyUrl}
                          onChange={handleInputChange}
                          placeholder="https://yourcompany.com"
                          className={inputClass()}
                        />
                      </Field>
                      <Field id="contact-phone" label="Phone / WhatsApp">
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className={inputClass()}
                        />
                      </Field>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[10px] text-white">2</span>
                      Your project
                    </legend>
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field id="contact-projectType" label="Service needed" required error={fieldError("projectType")} className="md:col-span-2">
                        <SelectWrap>
                          <select
                            id="contact-projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            aria-invalid={errorField === "projectType"}
                            aria-describedby={describedBy("projectType")}
                            className={selectClass("projectType")}
                          >
                            <option value="">Select service...</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </SelectWrap>
                      </Field>
                      <Field id="contact-budget" label="Budget range">
                        <SelectWrap>
                          <select id="contact-budget" name="budget" value={formData.budget} onChange={handleInputChange} className={selectClass()}>
                            <option value="">Select budget...</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </SelectWrap>
                      </Field>
                      <Field id="contact-timeline" label="Timeline">
                        <SelectWrap>
                          <select id="contact-timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} className={selectClass()}>
                            <option value="">Select timeline...</option>
                            {timelineOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </SelectWrap>
                      </Field>
                      <Field id="contact-message" label="Project details" required error={fieldError("message")} className="md:col-span-2">
                        <textarea
                          id="contact-message"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="What do you want to build or fix? Mention key integrations, users and the outcome you are after."
                          required
                          aria-invalid={errorField === "message"}
                          aria-describedby={describedBy("message")}
                          className={`${inputClass("message")} resize-y leading-relaxed`}
                        />
                      </Field>
                    </div>
                  </fieldset>

                  <div className="flex flex-col-reverse gap-4 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-gray">
                      <span className="text-teal">*</span> Required. We only use your details to reply to this inquiry.
                    </p>
                    <Button type="submit" loading={isSending} loadingLabel="Sending..." variant="primary" size="md" className="w-full sm:w-auto">
                      <span className="inline-flex items-center gap-2">
                        Send inquiry
                        <Send className="h-4 w-4" aria-hidden />
                      </span>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* SIDEBAR */}
          <aside className="flex flex-col gap-5">
            <motion.div className={`${cardClass} p-6`} {...reveal(0.05)}>
              <h3 className="font-display text-lg font-semibold! text-nearblack">Reach us directly</h3>
              <ul className="mt-4 space-y-3">
                {contactDetails.map(({ title, value, href, external, icon: Icon }) => (
                  <li key={title}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-xl border border-stone bg-offwhite px-3.5 py-3 transition-colors hover:border-teal/40 hover:bg-white"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                        <Icon className="h-[18px] w-[18px]" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-gray">{title}</span>
                        <span className="block break-all text-sm font-semibold text-nearblack transition-colors group-hover:text-teal">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-teal bg-teal/5 py-3 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Chat on WhatsApp
              </a>
              <div className="mt-5 flex items-center gap-3 border-t border-stone pt-5">
                <Clock className="h-5 w-5 shrink-0 text-teal" aria-hidden />
                <p className="text-sm text-gray">
                  <span className="font-semibold text-nearblack">Response time:</span> within 1 business day
                </p>
              </div>
            </motion.div>

            <motion.div {...reveal(0.1)}>
              <Link
                href="/offers/fit-call"
                className={`${cardClass} group block p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal to-[#7B9CFF] text-white">
                  <CalendarClock className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold! text-nearblack">Prefer to talk? Book a call instead</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray">
                  A free 20-minute fit call to see whether we are the right team for your project.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                  Book a free fit call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </motion.div>

            <motion.div className={`${cardClass} p-6`} {...reveal(0.15)}>
              <h3 className="font-display text-lg font-semibold! text-nearblack">What happens next</h3>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-4">
                    {i < nextSteps.length - 1 ? (
                      <span className="absolute left-[13px] top-8 h-[calc(100%-4px)] w-px bg-stone" aria-hidden />
                    ) : null}
                    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-teal/10 text-xs font-semibold text-teal">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-nearblack">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-gray">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className={`${h.section} ${h.bgBand} ${h.pad}`}>
        <div className={h.container}>
          <motion.div
            className={`${cardClass} flex flex-col items-start gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between`}
            {...reveal()}
          >
            <div className="max-w-[640px]">
              <div className={h.badge}>
                <span className={h.badgeDot} />
                <span className={h.badgeLabel}>FAQ</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold! tracking-[-0.01em] text-nearblack sm:text-[28px]">
                Have a question before you reach out?
              </h2>
              <p className="mt-2 text-base leading-relaxed text-gray">
                Costs, timelines, post-launch support and how we work. The most common questions are answered in our FAQ.
              </p>
            </div>
            <Button href="/faq" variant="secondary" size="md" className="shrink-0">
              <span className="inline-flex items-center gap-2">
                Read the FAQ
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function ContactUsInner() {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const typeParam = searchParams.get("type");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [searchParamsKey]);

  return (
    <ContactUsForm
      key={searchParamsKey}
      presetType={typeParam ? decodeURIComponent(typeParam) : ""}
      presetPackage={searchParams.get("package") ?? ""}
      presetModel={searchParams.get("model") ?? ""}
    />
  );
}

export default function ContactUs() {
  return (
    <Suspense fallback={<div className="min-h-[400px] bg-white" />}>
      <ContactUsInner />
    </Suspense>
  );
}
