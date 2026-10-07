"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useCases } from "@/data/use-cases";
import SectionDivider from "@/components/ui/SectionDivider";

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--surface-0)] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 xl:px-16">
      <SectionDivider />

      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-4 py-2">
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>Use Cases by Industry</span>
          </div>
          <h2 className="mt-2 text-[1.8rem] font-black leading-[1.1] tracking-[-0.03em] sm:text-[2.4rem] lg:text-[3rem]">
            We&apos;ve Built Products Across{" "}
            <span className="text-teal">
              7 Industries
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-[580px] text-[1rem] leading-[1.7] text-white/55">
            From real estate portals and clinic apps to travel platforms and ecommerce tools — we understand the operational problems businesses face in each vertical.
          </p>
        </motion.div>

        {/* Use case grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setActiveId(useCase.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group relative overflow-hidden rounded-[20px] border border-white/8 bg-[var(--surface-1)] p-5 transition-all duration-300"
              style={{
                borderColor: activeId === useCase.id ? `${useCase.color}40` : "rgba(255,255,255,0.08)",
                boxShadow: activeId === useCase.id ? `0 16px 40px ${useCase.color}15` : "none",
                transform: activeId === useCase.id ? "translateY(-5px)" : "translateY(0)",
              }}
            >
              {/* BG glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 30% 30%, ${useCase.color}0a, transparent 60%)` }}
              />

              {/* Icon + industry */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-[1.4rem]"
                  style={{ background: `${useCase.color}15` }}
                >
                  {useCase.icon}
                </div>
                <div>
                  <p className="text-[0.8rem] font-black uppercase tracking-wider" style={{ color: useCase.color }}>
                    {useCase.industry}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h3 className="mb-3 text-[0.9rem] font-bold leading-[1.4] text-white">
                {useCase.headline}
              </h3>

              {/* Description */}
              <p className="mb-4 text-[0.82rem] leading-[1.65] text-white/50">
                {useCase.description}
              </p>

              {/* Examples */}
              <ul className="flex flex-col gap-1.5">
                {useCase.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-[12px] text-white/40">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: useCase.color }} />
                    {ex}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <Link
                  href={`/services/${useCase.relatedService}`}
                  className="text-[12px] font-semibold transition-colors duration-200 hover:opacity-100"
                  style={{ color: `${useCase.color}80` }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = useCase.color)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = `${useCase.color}80`)}
                >
                  See related service →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-[1rem] text-white/50">
            Don&apos;t see your industry? We&apos;ve likely built something similar.
          </p>
          <Link
            href="/contact"
            id="use-cases-cta"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-7 py-3 text-[14px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            Tell us about your project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
