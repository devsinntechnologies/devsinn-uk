"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot, Layout, MonitorSmartphone, Palette, Rocket, ShieldCheck } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import type { LucideIcon } from "lucide-react";

const services: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "AI SaaS Development",
    description:
      "AI-powered SaaS products that automate workflows, improve decisions, and create smarter user experiences — from features to full platforms.",
    href: "/services/saas-mvp",
    icon: Bot,
  },
  {
    title: "Custom Software Development",
    description:
      "Scalable web applications, internal tools, CRMs, and portals engineered for performance, security, and long-term maintainability.",
    href: "/services/software-development",
    icon: MonitorSmartphone,
  },
  {
    title: "Mobile App Development",
    description:
      "Native-quality iOS and Android experiences with intuitive UX — MVPs and full-scale mobile products built for growth.",
    href: "/services/software-development",
    icon: Layout,
  },
  {
    title: "AI Automation & Agents",
    description:
      "Intelligent agents, CRM automation, and workflow orchestration that eliminate repetitive work across your operations.",
    href: "/services/ai-automation",
    icon: Rocket,
  },
  {
    title: "Product Design (UI/UX)",
    description:
      "Conversion-focused interfaces and product flows aligned with real user behaviour — before a single line of production code.",
    href: "/contact",
    icon: Palette,
  },
  {
    title: "QA & App Rescue",
    description:
      "Stabilisation sprints, performance fixes, and ongoing maintenance so your product stays reliable after launch.",
    href: "/services/app-rescue-maintenance",
    icon: ShieldCheck,
  },
];

export default function HomeServicesGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-offwhite px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-10">
      <SectionDivider />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.14] [background-image:linear-gradient(var(--color-stone)_1px,transparent_1px),linear-gradient(90deg,var(--color-stone)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Our Services
            </span>
          </div>
          <h2 className="h2-section font-bold leading-tight text-nearblack">
            Custom software development for{" "}
            <span className="text-teal">product teams</span>
          </h2>
          <p className="body-text mx-auto mt-4 max-w-[640px] text-base text-gray">
            End-to-end engineering services that help startups and growing businesses build, launch, scale, and improve digital products faster.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-stone bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_50px_rgba(0,92,255,0.1)] sm:p-8"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-teal/20 bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-nearblack">{service.title}</h3>
                  <p className="body-text mt-3 flex-1 text-sm leading-relaxed text-gray sm:text-[15px]">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal">
                    Explore service
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
