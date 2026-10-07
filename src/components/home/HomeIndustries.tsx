"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeTheme as h } from "@/components/home/homeTheme";

type Industry = {
  id: string;
  label: string;
  title: string;
  summary: string;
  focus: string;
  image: string;
  imageAlt: string;
  points: string[];
};

const industries: Industry[] = [
  {
    id: "health",
    label: "HealthTech",
    title: "HealthTech & fitness products",
    summary:
      "Patient-facing apps, clinical workflows, and operational tools built with security, accessibility, and auditability in mind from the first sprint.",
    focus: "HIPAA-aware architecture, role-based access, and integrations with EHR, scheduling, and billing systems.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&auto=format&fit=crop",
    imageAlt: "Clinician reviewing patient information on a tablet in a modern care setting",
    points: [
      "Patient portals & mobile health apps",
      "Telehealth & appointment scheduling",
      "Care-team dashboards & CRM",
      "Records, forms & consent workflows",
    ],
  },
  {
    id: "fintech",
    label: "FinTech",
    title: "Financial platforms & payment experiences",
    summary:
      "From onboarding to reporting, we ship fintech products that handle real transaction volume, compliance checkpoints, and day-two operations.",
    focus: "Payment rails, KYC flows, ledger-style reporting, and admin tooling your finance team can rely on.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
    imageAlt: "Financial analytics dashboard on a monitor in an office environment",
    points: [
      "Payment gateway & wallet integration",
      "Onboarding, KYC & account management",
      "Finance dashboards & exports",
      "Lending, billing & subscription modules",
    ],
  },
  {
    id: "edtech",
    label: "EdTech",
    title: "Learning platforms & education software",
    summary:
      "LMS builds, cohort programs, and assessment tools designed for instructors who need clear progress data—not another generic course plugin.",
    focus: "Content delivery at scale, progress tracking, and admin workflows for schools, bootcamps, and training teams.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=85&auto=format&fit=crop",
    imageAlt: "Students collaborating with laptops in a classroom workshop",
    points: [
      "Learning management systems",
      "Live classes & cohort tooling",
      "Assessments, quizzes & certificates",
      "Instructor & student analytics",
    ],
  },
  {
    id: "commerce",
    label: "E-Commerce",
    title: "Commerce & marketplace platforms",
    summary:
      "Custom storefronts and marketplaces where catalog logic, checkout, fulfillment, and integrations are tuned to how you actually sell.",
    focus: "Checkout performance, inventory accuracy, and third-party payment, tax, and shipping connections.",
    image: "https://images.unsplash.com/photo-1556745750-682583364d98?w=1400&q=85&auto=format&fit=crop",
    imageAlt: "Retail professional assisting a customer at a point of sale",
    points: [
      "Custom storefronts & headless commerce",
      "Multi-vendor marketplaces",
      "Cart, checkout & promotions",
      "Inventory, OMS & partner integrations",
    ],
  },
  {
    id: "saas",
    label: "SaaS & B2B",
    title: "SaaS & B2B software",
    summary:
      "Multi-tenant products with billing, admin consoles, and API surfaces—plus room to add AI features without rebuilding your core.",
    focus: "Tenant isolation, subscription billing, client portals, and observability for production SaaS.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85&auto=format&fit=crop",
    imageAlt: "Product and engineering team planning software on laptops around a table",
    points: [
      "SaaS MVP & v1 platform builds",
      "Stripe billing & plan management",
      "Admin, client & role-based portals",
      "APIs, webhooks & usage analytics",
    ],
  },
];

export default function HomeIndustries() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const industry = industries[active];

  return (
    <section id="industries" className={`${h.section} ${h.pad} bg-white`}>
      <SectionDivider />
      <div className={`${h.topLine} opacity-50`} aria-hidden />

      <div className={h.container}>
        <HomeSectionHeader
          badge="Industries We Serve"
          title={
            <>
              Software for <span className="text-teal">high-growth industries</span>
            </>
          }
          description="We adapt delivery to your domain—regulatory context, user expectations, and the integrations your operations already depend on."
        />

        <div
          className="flex gap-1 overflow-x-auto border-b border-stone pb-px scrollbar-hide sm:gap-0"
          role="tablist"
          aria-label="Industries"
        >
          {industries.map((item, index) => {
            const isActive = active === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                id={`industry-tab-${item.id}`}
                aria-controls={`industry-panel-${item.id}`}
                onClick={() => setActive(index)}
                className={`relative shrink-0 px-4 py-3.5 text-left transition-colors duration-200 sm:px-5 sm:py-4 ${
                  isActive ? "text-nearblack" : "text-gray hover:text-nearblack"
                }`}
              >
                <span className="font-[family-name:var(--font-poppins)] text-sm font-semibold sm:text-[15px]">
                  {item.label}
                </span>
                <span
                  className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-teal transition-opacity duration-200 sm:inset-x-4 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={industry.id}
            role="tabpanel"
            id={`industry-panel-${industry.id}`}
            aria-labelledby={`industry-tab-${industry.id}`}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="grid items-start gap-10 pt-10 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-14 lg:pt-12 xl:gap-16"
          >
            <div className="max-w-[640px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                {industry.label}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-nearblack sm:text-[32px]">
                {industry.title}
              </h3>
              <p className={`${h.body} mt-5 leading-relaxed`}>{industry.summary}</p>

              <blockquote className="mt-6 border-l-[3px] border-teal/80 pl-5">
                <p className="font-[family-name:var(--font-poppins)] text-[15px] leading-relaxed text-nearblack/90 sm:text-base">
                  {industry.focus}
                </p>
              </blockquote>

              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">
                  Typical deliverables
                </p>
                <ul className="mt-4 divide-y divide-stone border-y border-stone">
                  {industry.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 py-3.5 font-[family-name:var(--font-poppins)] text-[15px] text-nearblack sm:text-base"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-stone bg-offwhite shadow-[0_24px_60px_-28px_rgba(16,24,40,0.18)]">
                <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority={active === 0}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nearblack/25 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-5 left-5 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                      {industry.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
