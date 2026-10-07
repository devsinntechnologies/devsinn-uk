"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RippleButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function RippleButton({ children, className = "" }: RippleButtonProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      {children}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/25"
        variants={{
          rest: { scale: 0, opacity: 0 },
          hover: {
            scale: [0, 2.5],
            opacity: [0.45, 0],
            transition: { duration: 0.55, ease: "easeOut" },
          },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </motion.div>
  );
}
