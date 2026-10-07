"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/ui/button";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import SectionDivider from "@/components/ui/SectionDivider";
import { homeTheme as h } from "@/components/home/homeTheme";
import type { PathwayPage as PathwayPageData, PathwayPricingTier, PathwaySlug } from "@/data/ai-pathways";
import PricingTierCard from "@/components/pricing/PricingTierCard";
import { pricingTierGridClass } from "@/components/pricing/pricingTierGridClass";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  FileSearch,
  GitBranch,
  Layers,
  LineChart,
  Plug,
  Shield,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Props = {
  pathway: PathwayPageData;
  /** Pricing tiers resolved server-side (Team Portal, falling back to `pathway.pricingTiers`). */
  tiers: PathwayPricingTier[];
};

const cardShadow = "shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";

const stepIconsBySlug: Record<PathwaySlug, LucideIcon[]> = {
  "ai-consultant": [FileSearch, Users, LineChart, Target],
  "ai-projects": [FileSearch, Shield, Layers, Clock],
  "ai-specialist": [Users, Sparkles, GitBranch, Bot],
};

function capabilityIcon(title: string): LucideIcon {
  const key = title.toLowerCase();
  if (key.includes("agent")) return Bot;
  if (key.includes("workflow") || key.includes("automation")) return Workflow;
  if (key.includes("integration")) return Plug;
  if (key.includes("rag") || key.includes("knowledge")) return Brain;
  if (key.includes("report") || key.includes("intelligence")) return BarChart3;
  if (key.includes("strategy")) return Target;
  if (key.includes("custom")) return Sparkles;
  return CheckCircle2;
}

function useReveal() {
  const shouldReduceMotion = useReducedMotion();
  return (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-8%" },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <div className={h.badge}>
      <span className={h.badgeDot} />
      <span className={h.badgeLabel}>{children}</span>
    </div>
  );
}

function SectionHeader({
  badge,
  title,
  accent,
  description,
}: {
  badge: string;
  title: string;
  accent: string;
  description?: string;
}) {
  const reveal = useReveal();
  return (
    <motion.div className="mx-auto mb-10 max-w-[720px] text-center sm:mb-12" {...reveal()}>
      <Badge>{badge}</Badge>
      <h2 className={`${h.sectionTitle} mt-5`}>
        {title} <span className="text-teal">{accent}</span>
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-[580px] text-base leading-[1.7] text-gray sm:text-[17px]">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default function PathwayPage({ pathway, tiers }: Props) {
  const reveal = useReveal();
  const stepIcons = stepIconsBySlug[pathway.slug];
  // No tiers → no pricing section, so don't offer a hero button that jumps to it.
  const showSecondaryCta = tiers.length > 0 || pathway.secondaryCta.href !== "#pricing";
  const capabilities = pathway.capabilities ?? [];

  return (
    <>
      <main className="min-h-screen bg-offwhite text-nearblack">
        {/* Hero */}
        <PageHero
          badge={pathway.eyebrow}
          title={
            <>
              {pathway.headline} <PageHeroAccent>{pathway.headlineAccent}</PageHeroAccent>
            </>
          }
          description={pathway.subheadline}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: pathway.navLabel }]}
          actions={
            <>
              <Button id={`${pathway.slug}-hero-primary`} variant="primary" href={pathway.primaryCta.href}>
                {pathway.primaryCta.label}
              </Button>
              {showSecondaryCta && (
                <Button
                  id={`${pathway.slug}-hero-secondary`}
                  variant="secondary"
                  href={pathway.secondaryCta.href}
                >
                  {pathway.secondaryCta.label}
                </Button>
              )}
            </>
          }
        >
          <dl
            className={`mx-auto grid w-full max-w-[1000px] grid-cols-2 overflow-hidden rounded-2xl border border-stone bg-white lg:grid-cols-4 ${cardShadow}`}
          >
            {pathway.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-6 text-center sm:py-7 ${i % 2 === 1 ? "border-l border-stone" : ""} ${
                  i >= 2 ? "border-t border-stone lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l" : ""}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-nearblack sm:text-3xl">{stat.value}</dd>
                <dd className="mt-1.5 text-sm text-gray">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* What it is · who it's for · what you get */}
        <section className={`${h.section} ${h.pad} ${h.bgBase}`}>
          <SectionDivider />
          <div className={`${h.container} grid gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-start lg:gap-14`}>
            <motion.div {...reveal()}>
              <Badge>The service</Badge>
              <h2 className={`${h.sectionTitle} mt-5`}>
                {pathway.serviceTitle} <span className="text-teal">{pathway.serviceTitleAccent}</span>
              </h2>
              <p className="mt-4 max-w-[540px] text-base leading-[1.7] text-gray sm:text-[17px]">
                {pathway.serviceDescription}
              </p>

              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                Ideal for
              </p>
              <ul className="mt-3 max-w-[540px] border-t border-stone">
                {pathway.idealFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-stone py-3.5 text-[15px] text-nearblack"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={`rounded-2xl border border-stone border-t-[3px] border-t-teal bg-white p-6 sm:p-8 ${cardShadow}`}
              {...reveal(0.08)}
            >
              <h3 className="font-display text-xl font-semibold! text-nearblack sm:text-2xl">What you get</h3>
              <ul className="mt-6 space-y-4">
                {pathway.serviceIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Check size={13} strokeWidth={2.5} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className={`${h.section} ${h.pad} ${h.bgSoft}`}>
          <SectionDivider />
          <div className={h.container}>
            <SectionHeader badge="How it works" title={pathway.stepsTitle} accent={pathway.stepsTitleAccent} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pathway.steps.map((step, index) => {
                const Icon = stepIcons[index] ?? Target;
                return (
                  <motion.article
                    key={step.number}
                    className={`relative flex flex-col rounded-2xl border border-stone bg-white p-6 transition-colors duration-300 hover:border-teal/50 ${cardShadow}`}
                    {...reveal(index * 0.06)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                        <Icon size={20} strokeWidth={1.8} aria-hidden />
                      </span>
                      <span className="font-display text-[2rem] font-semibold leading-none text-teal/15">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold! text-nearblack">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-gray">{step.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        {capabilities.length > 0 && (
          <section className={`${h.section} ${h.pad} ${h.bgBase}`}>
            <SectionDivider />
            <div className={h.container}>
              <SectionHeader
                badge="Capabilities"
                title={pathway.capabilitiesTitle ?? "What we"}
                accent={pathway.capabilitiesTitleAccent ?? "build."}
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {capabilities.map((cap, index) => {
                  const Icon = capabilityIcon(cap.title);
                  return (
                    <motion.div
                      key={cap.title}
                      className="group flex gap-4 rounded-2xl border border-stone bg-offwhite p-5 transition-colors duration-300 hover:border-teal/50 hover:bg-white"
                      {...reveal(index * 0.04)}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                        <Icon size={18} strokeWidth={1.8} aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold! text-nearblack">{cap.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray">{cap.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Pricing */}
        {tiers.length > 0 && (
          <section id="pricing" className={`${h.section} ${h.pad} ${h.bgBand} scroll-mt-20`}>
            <SectionDivider />
            <div className={h.container}>
              <SectionHeader
                badge="Pricing"
                title="Clear pricing."
                accent="No surprises."
                description={pathway.pricingNote}
              />
              <div className={pricingTierGridClass(tiers.length)}>
                {tiers.map((tier, index) => (
                  <PricingTierCard
                    key={tier.name}
                    tier={tier}
                    index={index}
                    single={tiers.length === 1}
                    idPrefix={pathway.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Service stack cross-links */}
        <section className={`${h.section} ${h.pad} ${h.bgSoft}`}>
          <SectionDivider />
          <div className={h.container}>
            <SectionHeader badge="Our AI services" title="Advise. Build." accent="Embed." />
            <div className="grid gap-5 md:grid-cols-3">
              {pathway.nextSteps.map((step, index) => (
                <motion.div key={step.href} className="h-full" {...reveal(index * 0.06)}>
                  <Link
                    href={step.href}
                    aria-current={step.current ? "page" : undefined}
                    className={`group flex h-full flex-col rounded-2xl border bg-white p-6 transition-colors duration-300 sm:p-7 ${cardShadow} ${
                      step.current ? "border-teal border-l-[3px]" : "border-stone hover:border-teal/50"
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                      {String(index + 1).padStart(2, "0")} · {step.label}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold! text-nearblack transition-colors group-hover:text-teal!">
                      {step.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-[1.65] text-gray">{step.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                      {step.current ? (
                        "You're here"
                      ) : (
                        <>
                          View service
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
