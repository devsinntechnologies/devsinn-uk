"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";

const steps = [
  {
    number: "01",
    title: "Initial Call",
    summary: "Discovery call to understand goals, constraints, and fit.",
    details: [
      "Clarify product vision and business outcomes",
      "Discuss requirements, timeline, and priorities",
      "Identify skills, stack, and team structure",
      "NDA available before technical deep dives",
      "Agree on next steps for planning",
    ],
    outcome: "A shared understanding of scope and the best path forward.",
  },
  {
    number: "02",
    title: "Scope & Planning",
    summary: "We translate ideas into an executable delivery plan.",
    details: [
      "Workflow and technical discovery",
      "Architecture and milestone mapping",
      "Risk and dependency identification",
      "Success metrics defined upfront",
      "Delivery cadence aligned to your team",
    ],
    outcome: "A practical plan your stakeholders can approve with confidence.",
  },
  {
    number: "03",
    title: "Detailed Proposal",
    summary: "Fixed scope, timeline, and commercial terms — documented.",
    details: [
      "Written scope with deliverables",
      "Fixed price or engagement model terms",
      "ROI or value framing where relevant",
      "Roles, communication, and reporting",
      "No build until you approve",
    ],
    outcome: "Decision-grade clarity before engineering begins.",
  },
  {
    number: "04",
    title: "Project Kickoff",
    summary: "Onboarding, access, and sprint zero — fast and structured.",
    details: [
      "Tooling and repository setup",
      "Kickoff with your product owners",
      "Backlog prioritisation for sprint one",
      "Environment and deployment planning",
      "Shared channel for daily visibility",
    ],
    outcome: "Your team and ours aligned on week-one execution.",
  },
  {
    number: "05",
    title: "Agile Development",
    summary: "Iterative builds with demos, QA, and transparent progress.",
    details: [
      "Sprint-based delivery with demos",
      "Code review and quality gates",
      "Scope changes handled explicitly",
      "Performance and security checks",
      "Documentation as we ship",
    ],
    outcome: "Visible progress every cycle — no black-box development.",
  },
  {
    number: "06",
    title: "Launch & Support",
    summary: "Production release, handover, and optional ongoing care.",
    details: [
      "Production deployment support",
      "Handover docs and team walkthrough",
      "Post-launch stabilisation window",
      "Maintenance and iteration options",
      "Long-term partnership if needed",
    ],
    outcome: "A live product your team can operate and evolve.",
  },
];

export default function HomeProcessSteps() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const step = steps[active];

  return (
    <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-10">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-offwhite px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              How We Work
            </span>
          </div>
          <h2 className="h2-section font-bold leading-tight">
            Transparent process from{" "}
            <span className="text-teal">first call to launch</span>
          </h2>
          <p className="body-text mx-auto mt-4 max-w-[640px] text-gray">
            Structured delivery designed for startups and product teams — low friction, clear milestones, predictable outcomes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-10">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {steps.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                className={`shrink-0 rounded-2xl border px-4 py-4 text-left transition-all duration-200 lg:w-full ${
                  active === index
                    ? "border-teal bg-teal/5 shadow-sm"
                    : "border-stone bg-offwhite hover:border-teal/30"
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal">
                  {item.number}
                </span>
                <p className="mt-1 font-display text-base font-bold text-nearblack">{item.title}</p>
                <p className="mt-1 hidden text-xs text-gray lg:block">{item.summary}</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] border border-stone bg-[#deeaf2] p-7 sm:p-10"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-gray">
                  {String(active + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")} steps
                </p>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
                  {step.title}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-nearblack sm:text-3xl">{step.title}</h3>
              <p className="body-text mt-3 text-base text-gray">{step.summary}</p>

              <ul className="mt-6 space-y-3">
                {step.details.map((detail) => (
                  <li key={detail} className="flex gap-2.5 text-sm text-gray sm:text-[15px]">
                    <CheckCircle2 className="shrink-0 text-teal" size={18} strokeWidth={2} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-stone bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-teal">Outcome</p>
                <p className="mt-2 text-sm font-medium text-nearblack sm:text-base">{step.outcome}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
