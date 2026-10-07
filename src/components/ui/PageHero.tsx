"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { homeTheme as h } from "@/components/home/homeTheme";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  /** Small pill label above the title, e.g. "About Devsinn Technologies". */
  badge: string;
  /** Page h1. Wrap the accent words in <PageHeroAccent>. */
  title: ReactNode;
  description?: ReactNode;
  /** Buttons row under the description. */
  actions?: ReactNode;
  /** Optional breadcrumb trail shown above the badge. */
  breadcrumbs?: Crumb[];
  /** Extra content under the header block (stats strip, search, filters…). */
  children?: ReactNode;
  align?: "center" | "left";
  /** Less bottom padding when the next section starts right away. */
  compact?: boolean;
};

/** Solid accent used inside page titles — matches the home/about hero. */
export function PageHeroAccent({ children }: { children: ReactNode }) {
  return (
    <span className="text-teal">
      {children}
    </span>
  );
}

/**
 * Shared light page header used by every inner page so they all match the
 * home page: off-white band, faint grid, soft blue glow, pill badge, Poppins h1.
 */
export default function PageHero({
  badge,
  title,
  description,
  actions,
  breadcrumbs,
  children,
  align = "center",
  compact = false,
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCenter = align === "center";
  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className={`relative overflow-hidden bg-offwhite px-5 pt-[110px] sm:px-8 sm:pt-[130px] lg:px-10 xl:px-16 ${
        compact ? "pb-10 sm:pb-12" : "pb-14 sm:pb-16 lg:pb-20"
      }`}
    >
      <div className={h.gridOverlay} aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-offwhite" aria-hidden />
      <div className={h.glow} aria-hidden />

      <div
        className={`relative z-10 mx-auto flex w-full flex-col ${
          isCenter ? "max-w-[900px] items-center text-center" : "max-w-[1280px] items-start text-left"
        }`}
      >
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <motion.nav aria-label="Breadcrumb" className="mb-5" {...reveal()}>
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray sm:text-sm">
              {breadcrumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 ? <span aria-hidden className="text-stone">/</span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-teal">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-nearblack" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        ) : null}

        <motion.div className={h.badge} {...reveal()}>
          <span className={h.badgeDot} />
          <span className={h.badgeLabel}>{badge}</span>
        </motion.div>

        <motion.h1
          className={`mt-6 max-w-[900px] font-display text-[2.25rem] font-medium! leading-[1.1] tracking-[-0.02em] text-nearblack sm:text-[3rem] lg:text-[3.5rem]`}
          {...reveal(0.05)}
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            className={`mt-6 max-w-[640px] text-base leading-[1.7] text-gray sm:text-lg`}
            {...reveal(0.1)}
          >
            {description}
          </motion.p>
        ) : null}

        {actions ? (
          <motion.div
            className={`mt-8 flex flex-col gap-3 sm:flex-row ${isCenter ? "items-center" : "items-start"}`}
            {...reveal(0.15)}
          >
            {actions}
          </motion.div>
        ) : null}
      </div>

      {children ? (
        <motion.div className="relative z-10 mx-auto mt-12 w-full max-w-[1280px]" {...reveal(0.2)}>
          {children}
        </motion.div>
      ) : null}
    </section>
  );
}
