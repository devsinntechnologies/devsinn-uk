import { BriefcaseBusiness, Building2, CalendarClock, Clock, Users, Wallet, type LucideIcon } from "lucide-react";
import type { PublicJob } from "@/lib/tmApi";

export type JobMetaItem = { key: string; label: string; value: string; icon: LucideIcon };

/** Normalised, display-ready list of the optional job attributes (empty ones are skipped). */
export function getJobMeta(job: PublicJob, { includeExtras = false } = {}): JobMetaItem[] {
  const items: Array<JobMetaItem | null> = [
    job.department ? { key: "department", label: "Department", value: job.department, icon: Building2 } : null,
    job.employment_type
      ? { key: "employment", label: "Employment type", value: job.employment_type, icon: Clock }
      : null,
    job.experience ? { key: "experience", label: "Experience", value: job.experience, icon: BriefcaseBusiness } : null,
    job.salary_range ? { key: "salary", label: "Salary", value: job.salary_range, icon: Wallet } : null,
  ];

  if (includeExtras) {
    if (job.vacancy_count && job.vacancy_count > 0) {
      items.push({
        key: "vacancies",
        label: "Openings",
        value: `${job.vacancy_count} ${job.vacancy_count === 1 ? "position" : "positions"}`,
        icon: Users,
      });
    }
    if (job.deadline) {
      items.push({ key: "deadline", label: "Apply before", value: formatDeadline(job.deadline), icon: CalendarClock });
    }
  }

  return items.filter((item): item is JobMetaItem => item !== null);
}

/** Pretty-prints ISO-ish dates; falls back to the raw string for anything unparseable. */
export function formatDeadline(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** Splits a comma / newline / bullet separated list into tidy chips. */
export function splitList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[,\n;•|]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function JobMetaChip({ item }: { item: JobMetaItem }) {
  const Icon = item.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-stone bg-offwhite px-3 py-1.5 text-[13px] text-nearblack">
      <Icon size={14} strokeWidth={2} className="shrink-0 text-teal" aria-hidden />
      <span className="sr-only">{item.label}: </span>
      {item.value}
    </span>
  );
}
