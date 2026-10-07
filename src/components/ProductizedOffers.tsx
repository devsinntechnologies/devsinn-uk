"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { packages, type Package } from "@/data/packages";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";
import { checkBounce, flipUp, letterSpacingExpand, staggerFast } from "@/lib/motion";

const featuredIds = new Set(["ai-automation-sprint", "mvp-sprint"]);

function OfferCTA({ id, variant, href, className, children }: {
  id: string;
  variant: "primary" | "secondary";
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div whileHover="hover" initial="rest" className="group/cta">
      <Button
        id={id}
        variant={variant}
        href={href}
        fullWidth
        className={className}
      >
        <span className="flex items-center justify-center gap-2">
          {children}
          <motion.span
            className="inline-block"
            variants={{
              rest: { opacity: 0, x: -8 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            →
          </motion.span>
        </span>
      </Button>
    </motion.div>
  );
}

export default function ProductizedOffers() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    if (!selectedPackage) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPackage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPackage]);

  return (
    <section className="relative overflow-hidden bg-[#deeaf2] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-16">
      <SectionDivider />

      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <div className="mb-9 max-w-[680px] sm:mb-10">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Productized Offers
            </span>
          </motion.div>

          <motion.h2
            className="offers-heading h2-section leading-tight tracking-tight text-nearblack"
            variants={letterSpacingExpand}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            Transparent Starting Prices. Clean Scope Deliverables.
          </motion.h2>
          <motion.p
            className="body-text mt-4 text-gray text-base"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Fixed-scope engagements for common business engineering challenges. Final pricing scales with your exact requirements.
          </motion.p>
        </div>

        <motion.div
          className="offers-track flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          style={{ perspective: 1200 }}
        >
          {packages.map((pkg) => {
            const isFeatured = featuredIds.has(pkg.id);
            const hoverLift = isFeatured ? -20 : -15;

            return (
              <motion.article
                key={pkg.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPackage(pkg)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedPackage(pkg);
                  }
                }}
                variants={flipUp}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: hoverLift / 2,
                        boxShadow: "0 18px 36px rgba(1,86,180,0.14)",
                        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                className="offer-card group/card relative flex min-h-[185px] w-[calc(100vw-48px)] max-w-[320px] shrink-0 cursor-pointer snap-start flex-col justify-between overflow-hidden rounded-2xl border border-stone bg-offwhite p-5 text-left transition-colors duration-300 hover:border-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#deeaf2] sm:w-full sm:max-w-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Gradient border glow on hover */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${pkg.color}44, transparent 50%, ${pkg.glow})`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {pkg.isFeatured && (
                    <motion.div
                      className="mb-3 inline-flex rounded-full border border-teal bg-offwhite px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal"
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Popular
                    </motion.div>
                  )}

                  <h3 className="h3-card mb-2 text-nearblack font-semibold leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="body-text mb-4 line-clamp-2 text-sm leading-relaxed text-gray">
                    {pkg.tagline}
                  </p>

                  <div>
                    <div className="caption-text mb-1 text-[10px] uppercase tracking-widest text-gray">
                      Starting From
                    </div>
                    <div className="offer-price flex items-baseline gap-1">
                      <span className="text-[1.9rem] font-bold leading-none text-nearblack">
                        {pkg.startingFrom}
                      </span>
                      {pkg.unit && (
                        <span className="text-sm font-semibold text-gray">
                          {pkg.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-5" onClick={(event) => event.stopPropagation()}>
                  <Button
                    id={`pkg-cta-${pkg.id}`}
                    href={`/contact?package=${pkg.id}`}
                    variant={pkg.isFeatured ? "primary" : "secondary"}
                    size="md"
                    fullWidth
                    className="text-sm"
                  >
                    {pkg.cta}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <p className="caption-text mt-6 text-center text-gray">
          * Prices are starting estimates. Final scope, integrations, and deliverables determine the exact cost.{" "}
          <Link
            href="/contact"
            className="text-teal hover:underline font-semibold"
          >
            Request custom proposal
          </Link>
        </p>
      </div>

      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-nearblack/55 p-4 backdrop-blur-sm sm:p-6"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            onMouseDown={() => setSelectedPackage(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`package-dialog-title-${selectedPackage.id}`}
              className="relative max-h-[88vh] w-full max-w-[760px] overflow-y-auto rounded-2xl border border-stone bg-offwhite p-5 text-left shadow-2xl sm:p-7 md:p-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                aria-label="Close package details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-stone bg-white text-nearblack transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30"
              >
                x
              </button>

              <div className="pr-12">
                {selectedPackage.isFeatured && (
                  <span className="mb-4 inline-flex rounded-full border border-teal bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal">
                    Popular
                  </span>
                )}
                <h3
                  id={`package-dialog-title-${selectedPackage.id}`}
                  className="font-display text-3xl font-semibold leading-tight text-nearblack sm:text-4xl"
                >
                  {selectedPackage.name}
                </h3>
                <p className="body-text mt-3 max-w-[620px] text-sm text-gray sm:text-base">
                  {selectedPackage.description}
                </p>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-stone bg-white p-5">
                  <div className="caption-text mb-1 text-[10px] uppercase tracking-widest text-gray">
                    Starting From
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[2.5rem] font-bold leading-none text-nearblack">
                      {selectedPackage.startingFrom}
                    </span>
                    {selectedPackage.unit && (
                      <span className="text-base font-semibold text-gray">
                        {selectedPackage.unit}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 border-t border-stone pt-5">
                    <div className="caption-text mb-2 text-[10px] uppercase tracking-widest text-gray">
                      Typical Timeline
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-nearblack">
                      {selectedPackage.timeline}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-stone pt-5">
                    <div className="caption-text mb-2 text-[10px] uppercase tracking-widest text-gray">
                      Best For
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-nearblack">
                      {selectedPackage.idealFor}
                    </p>
                  </div>

                  <div className="mt-6">
                    <OfferCTA
                      id={`pkg-dialog-cta-${selectedPackage.id}`}
                      variant={selectedPackage.isFeatured ? "primary" : "secondary"}
                      href={`/contact?package=${selectedPackage.id}`}
                    >
                      {selectedPackage.cta}
                    </OfferCTA>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone bg-white p-5">
                  <div className="caption-text mb-4 text-[10px] uppercase tracking-widest text-gray">
                    What is included
                  </div>
                  <motion.ul
                    className="space-y-3"
                    variants={staggerFast}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedPackage.includes.map((item) => (
                      <motion.li
                        key={item}
                        variants={checkBounce}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-gray"
                      >
                        <svg
                          className="mt-1 shrink-0 text-teal"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="caption-text mb-3 mt-6 text-[10px] uppercase tracking-widest text-gray">
                    Not included
                  </div>
                  <ul className="space-y-2">
                    {selectedPackage.notIncluded.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-gray">
                        — {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
