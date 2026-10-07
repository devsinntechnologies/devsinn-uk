import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PublicJob } from "@/lib/tmApi";
import { JobMetaChip, formatDeadline, getJobMeta } from "@/components/careers/jobMeta";

export default function JobCard({ job }: { job: PublicJob }) {
  // Department is shown as the eyebrow, so keep it out of the chip row.
  const meta = getJobMeta(job).filter((item) => item.key !== "department");
  const excerpt = job.description?.replace(/\s+/g, " ").trim();

  return (
    <Link
      href={`/careers/${job.id}`}
      className="group relative flex flex-col gap-5 rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-[0_18px_48px_-18px_rgba(0,92,255,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30 sm:p-7 md:flex-row md:items-center md:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
            {job.department || "Open role"}
          </span>
          {job.deadline ? (
            <span className="text-xs text-gray">Apply before {formatDeadline(job.deadline)}</span>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold! leading-snug text-nearblack transition-colors group-hover:text-teal! sm:text-[22px]">
          {job.title}
        </h3>
        {excerpt ? <p className="mt-2 line-clamp-2 max-w-[720px] text-sm leading-relaxed text-gray">{excerpt}</p> : null}
        {meta.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.map((item) => (
              <JobMetaChip key={item.key} item={item} />
            ))}
          </div>
        ) : null}
      </div>

      <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-stone bg-offwhite px-4 py-2.5 text-sm font-semibold text-nearblack transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white md:self-center">
        View role
        <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
