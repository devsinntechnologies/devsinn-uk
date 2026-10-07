"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Layers, MessageCircle, TrendingUp } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import SectionDivider from "@/components/ui/SectionDivider";

const proofItems = [
  {
    icon: Layers,
    label: "Projects Delivered",
    value: 100,
    suffix: "+",
    detail: "SaaS, mobile, and AI automation",
    accent: "from-teal/20 to-blue-500/10",
  },
  {
    icon: Clock,
    label: "Response Time",
    prefix: "<",
    value: 24,
    suffix: "h",
    detail: "On qualified inquiries",
    accent: "from-blue-500/15 to-teal/10",
  },
  {
    icon: MessageCircle,
    label: "Support Response",
    prefix: "~",
    value: 60,
    suffix: "%",
    detail: "Faster on ChatSupplies AI ops",
    accent: "from-teal/15 to-indigo-500/10",
  },
  {
    icon: TrendingUp,
    label: "Tax Compliance",
    value: 4,
    suffix: "+",
    detail: "Authorities integrated with DigiNizam",
    accent: "from-amber-400/15 to-teal/10",
  },
];

const pillars = [
  "Clear scope",
  "Visible delivery",
  "Support after launch",
];

export default function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Client proof and delivery outcomes"
      className="relative overflow-hidden border-y border-stone bg-[#deeaf2] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-16"
    >
      <SectionDivider />

      <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(var(--color-stone)_1px,transparent_1px),linear-gradient(90deg,var(--color-stone)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-teal/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[90px]" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-14">
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-5 py-2.5 shadow-sm"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-teal animate-pulse" />
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-nearblack">
              Proof You Can Verify
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl font-bold leading-tight tracking-tight text-nearblack sm:text-4xl lg:text-[2.75rem]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Trusted Delivery.{" "}
            <span className="text-teal">Measurable Results.</span>
          </motion.h2>

          <motion.p
            className="body-text mx-auto mt-4 max-w-[640px] text-base text-gray sm:text-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real outcomes from shipped products — not vanity metrics. Every engagement is scoped,
            tracked, and supported after launch.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {pillars.map((pillar) => (
              <span
                key={pillar}
                className="rounded-full border border-stone/80 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-nearblack backdrop-blur-sm"
              >
                {pillar}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                className="group relative overflow-hidden rounded-[1.75rem] border border-stone bg-offwhite p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-xl hover:shadow-teal/10 sm:p-7 lg:p-8"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal/20 bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full bg-stone px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray">
                      Verified
                    </span>
                  </div>

                  <div className="font-display text-[2.75rem] font-bold leading-none tracking-tight text-teal sm:text-5xl lg:text-[3.25rem]">
                    {item.prefix && <span>{item.prefix}</span>}
                    <CountUp end={item.value} suffix={item.suffix ?? ""} duration={1.8} />
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-nearblack sm:text-xl">{item.label}</h3>
                  <p className="body-text mt-2 text-sm leading-relaxed text-gray">{item.detail}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
