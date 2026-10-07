"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import CalendlyModal from "@/components/ui/CalendlyModal";
import SectionDivider from "@/components/ui/SectionDivider";
import { homeTheme as h } from "@/components/home/homeTheme";
import { getPathwayBySlug } from "@/data/ai-pathways";

const steps = getPathwayBySlug("ai-consultant")!.nextSteps;
const AUTO_ADVANCE_MS = 3500;

export default function HomeHowWeWork() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const step = steps[active];

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [autoPlay, shouldReduceMotion]);

  const select = (index: number) => {
    setAutoPlay(false);
    setActive(index);
  };

  return (
    <section id="how-we-work" className={`${h.section} ${h.pad} ${h.bgSoft}`}>
      <SectionDivider />
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/devsinntechnologies/30min?hide_gdpr_banner=1"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1080px]">
        <div className="mx-auto max-w-[640px] text-center">
          <div className={h.badge}>
            <span className={h.badgeDot} />
            <span className={h.badgeLabel}>How We Work</span>
          </div>
          <h2 className={`${h.sectionTitle} mt-5`}>
            Three services. <span className="text-teal">One clear path.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-base leading-[1.7] text-gray sm:text-[17px]">
            Every engagement starts with a free strategy call. From there, we match the right
            service to where you are — and where you need to go.
          </p>
        </div>

        {/* Stepper */}
        <div className="relative mx-auto mt-12 max-w-[820px]" role="tablist" aria-label="How we work">
          <div className="absolute left-[16.66%] right-[16.66%] top-8 h-px bg-stone sm:top-10" aria-hidden />
          <motion.div
            className="absolute left-[16.66%] top-8 h-px bg-teal sm:top-10"
            animate={{ width: `${(active / (steps.length - 1)) * 66.68}%` }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
          <div className="relative grid grid-cols-3">
            {steps.map((item, index) => {
              const isActive = index === active;
              const isDone = index < active;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="how-we-work-panel"
                  onClick={() => select(index)}
                  className="group flex flex-col items-center gap-3 focus-visible:outline-none"
                >
                  <span
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full border font-display text-xl font-semibold transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-teal/40 sm:h-20 sm:w-20 sm:text-2xl ${
                      isActive
                        ? "border-teal bg-white text-teal shadow-[0_0_0_6px_rgba(0,92,255,0.08),0_12px_30px_-10px_rgba(0,92,255,0.45)]"
                        : isDone
                          ? "border-teal/40 bg-white text-teal/70"
                          : "border-stone bg-white text-gray group-hover:border-teal/40 group-hover:text-teal"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm font-semibold transition-colors sm:text-[15px] ${
                      isActive ? "text-nearblack" : "text-gray group-hover:text-nearblack"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <div id="how-we-work-panel" role="tabpanel" className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center gap-6 overflow-hidden rounded-2xl border border-stone border-l-[3px] border-l-teal bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:gap-10 sm:p-8"
            >
              <span className="hidden font-display text-[3.5rem] font-semibold leading-none text-teal/15 sm:block">
                {String(active + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                  {step.label === "Current" ? "Advise" : step.label}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-semibold! text-nearblack sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[720px] text-[15px] leading-[1.7] text-gray sm:text-base">
                  {step.description}
                </p>
                <Link
                  href={step.href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal"
                >
                  View service
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            id="how-we-work-cta"
            variant="primary"
            size="lg"
            onClick={() => setIsCalendlyOpen(true)}
          >
            Book a Free Strategy Call
          </Button>
        </div>
      </div>
    </section>
  );
}
