"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { homeTheme as h } from "@/components/home/homeTheme";

type HomeSectionHeaderProps = {
  badge: string;
  title: ReactNode;
  description: string;
  className?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

/** Section titles & copy aligned with hero typography (Poppins, medium weight, lg body). */
export default function HomeSectionHeader({
  badge,
  title,
  description,
  className = "",
  align = "left",
  theme = "light",
}: HomeSectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCenter = align === "center";
  const isDark = theme === "dark";

  const badgeClass = isDark
    ? "inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
    : h.badge;
  const badgeLabelClass = isDark
    ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90"
    : h.badgeLabel;
  const titleClass = isDark
    ? "font-[family-name:var(--font-poppins)] text-[32px] font-medium leading-[1.15] tracking-[-0.02em] !text-white sm:text-[40px] sm:leading-[48px] lg:text-[44px] lg:leading-[52px]"
    : h.sectionTitle;
  const descClass = isDark
    ? "mt-4 max-w-[580px] font-[family-name:var(--font-poppins)] text-base font-normal leading-relaxed !text-white/75 sm:mt-6 sm:text-lg"
    : `${h.sectionDesc} mt-4 sm:mt-6`;

  return (
    <div
      className={`mb-10 sm:mb-12 ${isCenter ? "mx-auto max-w-[720px] text-center" : "max-w-[720px] text-left"} ${className}`}
    >
      <motion.div
        className={badgeClass}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className={h.badgeDot} />
        <span className={badgeLabelClass}>{badge}</span>
      </motion.div>

      <motion.h2
        className={`${titleClass} mt-5 ${isCenter ? "mx-auto" : ""}`}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      <motion.p
        className={`${descClass} ${isCenter ? "mx-auto" : ""}`}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.06 }}
      >
        {description}
      </motion.p>
    </div>
  );
}
