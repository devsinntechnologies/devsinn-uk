"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, KeyRound, ShieldCheck, Star, Users } from "lucide-react";
import Link from "next/link";
import SectionDivider from "@/components/ui/SectionDivider";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/button";
import { homeTheme as h } from "@/components/home/homeTheme";

const pillars = [
  {
    icon: Users,
    title: "Senior engineers",
    text: "Experienced people from planning to launch.",
  },
  {
    icon: ShieldCheck,
    title: "Fixed-scope delivery",
    text: "Clear milestones and regular demos.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    text: "Code, docs, and credentials are 100% yours.",
  },
];

const services = [
  "AI Automation & Agents",
  "SaaS MVPs",
  "Custom Software",
  "App Rescue",
];

export default function HomeAboutSection({
  showCta = true,
}: {
  showCta?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-8%" },
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section id="about" className={`${h.section} ${h.pad} bg-white`}>
      <SectionDivider />
      <div className={`${h.topLine} opacity-50`} aria-hidden />
      <div className={h.glow} aria-hidden />

      <div className={h.container}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-20">
          {/* Copy */}
          <div>
            <motion.div className={h.badge} {...reveal()}>
              <span className={h.badgeDot} />
              <span className={h.badgeLabel}>About Us</span>
            </motion.div>

            <motion.h2
              className={`${h.sectionTitle} mt-5 max-w-[560px]`}
              {...reveal(0.05)}
            >
              Your{" "}
              <span className="text-teal">
                software partner
              </span>{" "}
              for scalable product growth
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[560px] text-base leading-[1.7] text-gray sm:text-[17px]"
              {...reveal(0.1)}
            >
              We help startups and growing businesses ship production-grade
              software — from idea to launch and beyond.
            </motion.p>

            <motion.ul className="mt-5 flex flex-wrap gap-2" {...reveal(0.12)}>
              {services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-teal/20 bg-teal/5 px-3 py-1 text-[13px] font-medium text-teal"
                >
                  {service}
                </li>
              ))}
            </motion.ul>

            <ul className="mt-8 space-y-5">
              {pillars.map((pillar, i) => (
                <motion.li
                  key={pillar.title}
                  className="flex gap-4"
                  {...reveal(0.15 + i * 0.06)}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <pillar.icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold! text-nearblack sm:text-[17px]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray sm:text-[15px]">
                      {pillar.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {showCta ? (
              <motion.div
                className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
                {...reveal(0.3)}
              >
                <Button id="home-about-more" variant="primary" href="/about">
                  More About Us
                </Button>
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-nearblack transition-colors hover:text-teal"
                >
                  See our work
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            ) : null}
          </div>

          {/* Stats bento */}
          <motion.div className="relative" {...reveal(0.1)}>
            <div
              className={`${h.gridOverlay} -inset-6 h-auto rounded-[2rem] opacity-40 [background-size:48px_48px]`}
              aria-hidden
            />

            <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
              {/* Feature card */}
              <div className="relative col-span-2 overflow-hidden rounded-2xl bg-gradient-to-br from-teal to-[#3d7bff] p-7 text-white shadow-[0_20px_50px_-20px_rgba(0,92,255,0.6)] sm:p-8">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl"
                  aria-hidden
                />
                <p className="font-display text-[3rem] font-semibold leading-none sm:text-[3.5rem]">
                  <CountUp end={100} duration={1.4} />+
                </p>
                <p className="mt-3 text-base font-medium text-white/90 sm:text-lg">
                  Projects successfully delivered
                </p>
              </div>

              <div className="rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-7">
                <p className="font-display text-[2.5rem] font-semibold leading-none text-nearblack">
                  <CountUp end={8} duration={1.4} />
                  <span className="text-teal">+</span>
                </p>
                <p className="mt-3 text-sm leading-snug text-gray sm:text-[15px]">
                  Years of experience
                </p>
              </div>

              <div className="rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-7">
                <p className="font-display text-[2.5rem] font-semibold leading-none text-nearblack">
                  <CountUp end={15} duration={1.4} />
                  <span className="text-teal">+</span>
                </p>
                <p className="mt-3 text-sm leading-snug text-gray sm:text-[15px]">
                  Engineers & consultants
                </p>
              </div>

              <div className="col-span-2 flex items-center justify-between gap-4 rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-7">
                <div>
                  <p className="font-display text-[2.25rem] font-semibold leading-none text-nearblack">
                    4.9<span className="text-teal">/5</span>
                  </p>
                  <p className="mt-2 text-sm text-gray sm:text-[15px]">
                    Average client rating
                  </p>
                </div>
                <div
                  className="flex gap-0.5 text-[#f5b301]"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
