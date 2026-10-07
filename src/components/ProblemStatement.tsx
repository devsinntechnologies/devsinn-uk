"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileCode2, LifeBuoy, ShieldCheck, Target, type LucideIcon } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeTheme as h } from "@/components/home/homeTheme";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    icon: Target,
    title: "Scoped sprints",
    description: "Clear scope and visible milestones every sprint — no black-box delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Senior engineers",
    description: "Experienced engineers own architecture, build, and launch end to end.",
  },
  {
    icon: FileCode2,
    title: "Full IP ownership",
    description: "You own the code, the designs, and the documentation from day one.",
  },
  {
    icon: LifeBuoy,
    title: "Post-launch support",
    description: "We stay on after release to monitor, fix, and keep improving the product.",
  },
];

export default function ProblemStatement() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-choose-us" className={`${h.section} ${h.pad} ${h.bgBand}`}>
      <SectionDivider />
      <div className={h.glow} aria-hidden />

      <div className={`${h.container} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16`}>
        <div>
          <HomeSectionHeader
            className="!mb-8"
            badge="Why Businesses Choose Us"
            title={
              <>
                Clear scope. Visible delivery.{" "}
                <span className="text-teal">Support after launch.</span>
              </>
            }
            description="We align technical work with business outcomes from day one — so you get measurable progress, not endless rework."
          />

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Button
              id="why-choose-cta-strategy"
              href="/offers/fit-call"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 text-sm sm:text-base"
            >
              Book a Free Strategy Call
            </Button>
            <Button
              id="why-choose-cta-audit"
              href="/offers/product-audit"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Paid Technical & UX Audit
            </Button>
          </motion.div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <motion.li
              key={title}
              className={`${h.card} ${h.cardHover} group flex flex-col p-6 sm:p-7`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.45, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-nearblack">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray">{description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
