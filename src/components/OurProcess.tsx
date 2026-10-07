"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Activity, Code2, DraftingCompass, Rocket, Search, ShieldCheck } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";

const steps = [
  {
    label: "Phase 01",
    number: "01",
    heading: "Discovery & Scope Mapping",
    description:
      "We map workflows, constraints, and outcomes into a practical project spec with a clear delivery timeline.",
    tags: ["Scope", "Timeline", "Plan"],
    icon: Search,
  },
  {
    label: "Phase 02",
    number: "02",
    heading: "POC & Wireframes",
    description:
      "We validate UX and architecture with clickable flows and technical proof-of-concept work before full-scale coding.",
    tags: ["Prototype", "POC", "UX"],
    icon: DraftingCompass,
  },
  {
    label: "Phase 03",
    number: "03",
    heading: "Core Software Build",
    description:
      "Our engineers build backend logic, frontend interfaces, and database architecture through focused sprint cycles.",
    tags: ["Frontend", "Backend", "Database"],
    icon: Code2,
  },
  {
    label: "Phase 04",
    number: "04",
    heading: "QA & Bug Sprints",
    description:
      "We test edge cases, performance bottlenecks, and security risks, then fix issues before user release.",
    tags: ["QA", "Performance", "Security"],
    icon: ShieldCheck,
  },
  {
    label: "Phase 05",
    number: "05",
    heading: "Deployment & Launch",
    description:
      "Code is shipped through production-ready deployment flows with a smooth handoff for live users.",
    tags: ["Deploy", "Launch", "Handoff"],
    icon: Rocket,
  },
  {
    label: "Phase 06",
    number: "06",
    heading: "Ongoing Maintenance",
    description:
      "We monitor uptime, handle scaling, update dependencies, and build improvements as your product grows.",
    tags: ["Monitor", "Scale", "Support"],
    icon: Activity,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 42, scale: 0.96, filter: "blur(10px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: (index % 3) * 0.09,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function OurProcess() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-offwhite px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-16">
      <SectionDivider />

      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.16] [background-image:linear-gradient(var(--color-stone)_1px,transparent_1px),linear-gradient(90deg,var(--color-stone)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]" /> */}

      <div className="relative mx-auto w-full max-w-[1180px]">
        <div className="mx-auto mb-10 max-w-[760px] text-center lg:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
                How We Build
              </span>
            </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-nearblack sm:text-4xl lg:text-5xl">
              Our Process
            </h2>
          <p className="body-text mx-auto mt-4 max-w-[620px] text-base text-gray">
            A clear delivery path from scope to launch, designed to keep decisions visible and execution moving.
          </p>
        </div>

        <motion.div
          className="relative mx-auto max-w-[1050px]"
        >
          <svg
            className="pointer-events-none absolute left-1/2 top-2 hidden h-[calc(100%-1rem)] w-[300px] -translate-x-1/2 lg:block"
            viewBox="0 0 300 1280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M150 0 C40 120 40 230 150 330 C260 430 260 540 150 640 C40 740 40 850 150 950 C260 1050 260 1160 150 1280"
              fill="none"
              stroke="#10161f"
              strokeWidth="120"
              strokeLinecap="round"
            />
            <path
              d="M150 0 C40 120 40 230 150 330 C260 430 260 540 150 640 C40 740 40 850 150 950 C260 1050 260 1160 150 1280"
              fill="none"
              stroke="rgba(0,92,255,0.34)"
              strokeWidth="2"
              strokeDasharray="8 16"
              strokeLinecap="round"
            />
          </svg>

          {/* <div className="absolute bottom-0 left-[31px] top-0 w-px bg-gradient-to-b from-transparent via-teal/35 to-transparent lg:hidden" /> */}

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                custom={index}
                variants={cardVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35, margin: "-8% 0px -8% 0px" }}
                className="relative grid gap-4 pb-8 pl-16 last:pb-0 lg:min-h-[220px] lg:grid-cols-[minmax(0,1fr)_170px_minmax(0,1fr)] lg:items-center lg:gap-8 lg:pb-12 lg:pl-0"
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-stone bg-white/90 p-5 shadow-[0_18px_45px_rgba(16,24,40,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:shadow-[0_24px_60px_rgba(0,92,255,0.14)] sm:p-6 ${
                    isEven ? "lg:col-start-3" : "lg:col-start-1"
                  }`}
                >
                  {/* <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" /> */}
                  <div className="pointer-events-none absolute right-5 top-4 font-display text-[4rem] font-bold leading-none text-stone/35 transition-colors duration-300 group-hover:text-teal/10">
                    {step.number}
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-teal/20 bg-teal/10 text-teal shadow-inner">
                        <Icon size={21} strokeWidth={1.8} />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal">
                          {step.label}
                        </span>
                        <div className="mt-1 h-1 w-10 rounded-full bg-teal/25">
                          <motion.div
                            className="h-full rounded-full bg-teal"
                            initial={shouldReduceMotion ? false : { width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: index * 0.08 }}
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-3 font-display text-xl font-bold leading-tight text-nearblack">
                      {step.heading}
                    </h3>
                    <p className="body-text text-sm leading-relaxed text-gray">
                      {step.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-stone bg-offwhite px-2.5 py-1 text-[11px] font-semibold text-gray transition-colors duration-300 group-hover:border-teal/20 group-hover:bg-teal/10 group-hover:text-teal"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-1 flex h-16 w-16 items-center justify-center lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:h-28 lg:w-28">
                  {/* <div className="absolute h-full w-full rounded-full bg-teal/20 blur-xl" /> */}
                  <span
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-xl lg:h-24 lg:w-24 lg:text-4xl ${
                      isEven ? "bg-teal" : "bg-[#6d28d9]"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
