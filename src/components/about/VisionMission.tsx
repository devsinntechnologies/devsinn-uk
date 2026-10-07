"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Target, ShieldCheck, MessagesSquare, Rocket, KeyRound } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { homeTheme as h } from "@/components/home/homeTheme";

const pillars = [
  {
    icon: Eye,
    label: "Our Vision",
    text: "To be the engineering partner growing businesses trust to turn ideas into reliable, AI-enabled products — recognised for expertise, honesty, and outcomes that last.",
  },
  {
    icon: Target,
    label: "Our Mission",
    text: "To help businesses of every size remove manual work and launch software that earns its keep — delivered with clear scope, senior engineering, and support after go-live.",
  },
];

const values = [
  {
    icon: MessagesSquare,
    title: "Transparent by default",
    text: "Weekly demos, shared channels, and no black-box development.",
  },
  {
    icon: Rocket,
    title: "Outcomes over output",
    text: "We measure success by what your product does for the business.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    text: "Source code, documentation, and credentials are 100% yours.",
  },
  {
    icon: ShieldCheck,
    title: "In it for the long run",
    text: "Post-launch stabilisation, maintenance, and iteration when you need it.",
  },
];

export default function VisionMission() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-8%" },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="vision" className={`${h.section} ${h.pad} ${h.bgSoft}`}>
      <SectionDivider />
      <div className={h.container}>
        <div className="mx-auto mb-12 max-w-[720px] text-center">
          <motion.div className={h.badge} {...reveal()}>
            <span className={h.badgeDot} />
            <span className={h.badgeLabel}>What Drives Us</span>
          </motion.div>
          <motion.h2 className={`${h.sectionTitle} mt-5`} {...reveal(0.05)}>
            Vision, mission &amp; <span className="text-teal">values</span>
          </motion.h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              className="rounded-2xl border border-stone bg-white p-7 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-9"
              {...reveal(0.08 + i * 0.06)}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <pillar.icon size={22} strokeWidth={2} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold! text-nearblack sm:text-2xl">
                {pillar.label}
              </h3>
              <p className="mt-3 text-base leading-[1.7] text-gray sm:text-[17px]">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              className="rounded-2xl border border-stone bg-white p-6"
              {...reveal(0.12 + i * 0.05)}
            >
              <value.icon className="text-teal" size={22} strokeWidth={2} />
              <h3 className="mt-4 font-display text-base font-semibold! text-nearblack">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
