import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  /** Compact cards drop the tech pills (used in "More case studies"). */
  compact?: boolean;
};

/** Light case-study card shared by /case-studies and the detail page "More case studies" row. */
export default function CaseStudyCard({ study, compact = false }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-stone bg-[#f4f7f9]">
        <Image
          src={study.heroImage}
          alt={`${study.title} case study preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-6" : "p-7"}`}>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
            {study.industry}
          </span>
          {!compact ? (
            <span className="rounded-full border border-stone bg-white px-3 py-1 text-xs text-gray">
              {study.category}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 flex items-start justify-between gap-3 font-display text-xl font-semibold! leading-snug tracking-[-0.01em] text-nearblack">
          <span>{study.title}</span>
          <ArrowUpRight
            aria-hidden
            className="mt-1 h-5 w-5 shrink-0 text-gray transition-colors duration-300 group-hover:text-teal"
          />
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray">{study.tagline}</p>

        <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-nearblack">
          <TrendingUp aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
          <span className="line-clamp-1">{study.businessImpact[0]}</span>
        </p>

        {!compact ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {study.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-stone bg-white px-3 py-1 text-xs text-gray"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
