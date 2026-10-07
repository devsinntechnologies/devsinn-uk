"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Small fade-up wrapper so server-rendered careers pages can opt into the same
 * entrance animation used across the home/about pages. Respects reduced motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  onView = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animate when scrolled into view instead of on mount. */
  onView?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      {...(onView ? { whileInView: target, viewport: { once: true, margin: "-8%" } } : { animate: target })}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
