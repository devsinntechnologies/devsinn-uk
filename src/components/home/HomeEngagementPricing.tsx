"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";

const models = [
  {
    badge: "Best for growing teams",
    title: "Dedicated Development Team",
    pricing: "Monthly flat rate",
    description: "Embedded engineers focused on your roadmap with PM oversight and flexible scale.",
    features: [
      "Dedicated developers & tech lead",
      "Direct communication with engineers",
      "Scale with 30-day notice",
      "NDAs and full IP ownership",
      "Agile delivery included",
    ],
    cta: "Hire Dedicated Team",
    href: "/contact?model=monthly-dedicated-team",
    highlighted: false,
  },
  {
    badge: "Recommended · SaaS & AI",
    title: "Product Development",
    pricing: "Fixed price or T&M",
    description: "End-to-end product engineering — strategy, design, build, deploy, and handover.",
    features: [
      "Product strategy & architecture",
      "UI/UX design & prototypes",
      "Production deployment & DevOps",
      "QA and automated testing",
      "Post-launch support options",
    ],
    cta: "Build a Product",
    href: "/contact?model=fixed-mvp",
    highlighted: true,
  },
  {
    badge: "Best for AI programmes",
    title: "AI Specialist Embed",
    pricing: "Monthly · fractional or full-time",
    description: "Vetted AI specialist inside your team — agents, automation, and integrations shipped continuously.",
    features: [
      "Fractional or full-time capacity",
      "AI agents & workflow builds",
      "Pathway-driven backlog",
      "PM oversight included",
      "3-month minimum term",
    ],
    cta: "Embed AI Specialist",
    href: "/ai-specialist",
    highlighted: false,
  },
];

export default function HomeEngagementPricing() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#deeaf2] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-10">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto mb-12 max-w-[720px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/90 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Engagement Models
            </span>
          </div>
          <h2 className="h2-section font-bold leading-tight">
            How we partner with{" "}
            <span className="text-teal">your business</span>
          </h2>
          <p className="body-text mx-auto mt-4 max-w-[620px] text-gray">
            Choose the alignment that fits your scope, budget, and timeline — structured for performance, not rigid contracts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {models.map((model, index) => (
            <motion.article
              key={model.title}
              className={`flex flex-col rounded-[1.75rem] border bg-white p-7 sm:p-8 ${
                model.highlighted
                  ? "border-teal shadow-[0_22px_55px_rgba(0,92,255,0.12)] ring-1 ring-teal/15 lg:-translate-y-1"
                  : "border-stone"
              }`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <span className="mb-4 inline-flex w-fit rounded-full border border-teal/25 bg-teal/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal">
                {model.badge}
              </span>
              <h3 className="font-display text-xl font-bold text-nearblack sm:text-2xl">{model.title}</h3>
              <p className="mt-2 text-sm font-semibold text-teal">{model.pricing}</p>
              <p className="body-text mt-4 flex-1 text-sm leading-relaxed text-gray sm:text-[15px]">
                {model.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {model.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-gray">
                    <CheckCircle2 className="shrink-0 text-teal" size={16} strokeWidth={2} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href={model.href}
                  variant={model.highlighted ? "primary" : "secondary"}
                  fullWidth
                >
                  {model.cta}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="body-text mt-8 text-center text-sm text-gray">
          Also exploring AI advisory?{" "}
          <Link href="/ai-consultant" className="font-semibold text-teal hover:underline">
            Start with the AI Adoption Pathway →
          </Link>
        </p>
      </div>
    </section>
  );
}
