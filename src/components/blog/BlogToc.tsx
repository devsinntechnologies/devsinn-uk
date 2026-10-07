"use client";

import { ChevronDown, ListTree } from "lucide-react";
import { useEffect, useState } from "react";
import type { MarkdownHeading } from "./BlogMarkdown";

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0 || typeof IntersectionObserver === "undefined") return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function TocLinks({ headings, active }: { headings: MarkdownHeading[]; active: string | null }) {
  return (
    <ol className="space-y-1 border-l border-stone">
      {headings.map((heading) => {
        const isActive = heading.id === active;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13.5px] leading-snug transition-colors ${
                heading.level === 3 ? "pl-7" : ""
              } ${
                isActive
                  ? "border-teal font-medium text-teal"
                  : "border-transparent text-gray hover:border-stone hover:text-nearblack"
              }`}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Sticky outline for desktop. */
export function BlogTocDesktop({ headings }: { headings: MarkdownHeading[] }) {
  const [ids] = useState(() => headings.map((heading) => heading.id));
  const active = useActiveHeading(ids);
  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-nearblack">
        <ListTree size={14} className="text-teal" aria-hidden />
        On this page
      </p>
      <TocLinks headings={headings} active={active} />
    </nav>
  );
}

/** Collapsible outline for small screens. */
export function BlogTocMobile({ headings }: { headings: MarkdownHeading[] }) {
  if (headings.length < 2) return null;

  return (
    <details className="group mb-10 rounded-2xl border border-stone bg-offwhite lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-nearblack [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <ListTree size={16} className="text-teal" aria-hidden />
          On this page
        </span>
        <ChevronDown
          size={18}
          aria-hidden
          className="text-gray transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-5">
        <TocLinks headings={headings} active={null} />
      </div>
    </details>
  );
}
