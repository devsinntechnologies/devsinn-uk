"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/button";
import type { PathwayPricingTier } from "@/data/ai-pathways";

const cardShadow = "shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";

/** One pricing tier card (pathway pages + service detail pages). */
export default function PricingTierCard({
  tier,
  index,
  single,
  idPrefix,
}: {
  tier: PathwayPricingTier;
  index: number;
  /** True when this is the only tier — renders the wide two-column layout. */
  single: boolean;
  idPrefix: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-8%" },
        transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 sm:p-7 ${cardShadow} ${
        tier.highlighted && !single ? "border-teal ring-1 ring-teal/20" : "border-stone"
      } ${single ? "border-t-[3px] border-t-teal md:grid md:grid-cols-2 md:gap-8" : ""}`}
      {...reveal}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-semibold! text-nearblack">{tier.name}</h3>
          {tier.badge && (
            <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal">
              {tier.badge}
            </span>
          )}
        </div>
        <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-nearblack sm:text-4xl">
          {tier.price}
        </p>
        {tier.period && <p className="mt-1 text-sm text-gray">{tier.period}</p>}
        {tier.description && <p className="mt-4 text-[15px] leading-relaxed text-gray">{tier.description}</p>}
      </div>
      <div className={`mt-6 flex flex-1 flex-col ${single ? "md:mt-0" : ""}`}>
        <ul className={`flex-1 space-y-3 ${single ? "" : "border-t border-stone pt-5"}`}>
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm text-nearblack">
              <Check className="mt-0.5 shrink-0 text-teal" size={16} strokeWidth={2.5} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button
            id={`${idPrefix}-tier-${index}`}
            variant={tier.highlighted ? "primary" : "secondary"}
            href={tier.ctaHref}
            fullWidth
            size="md"
          >
            {tier.ctaLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
