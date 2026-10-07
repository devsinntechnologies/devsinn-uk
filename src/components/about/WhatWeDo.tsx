"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionDivider from "@/components/ui/SectionDivider";

const items = [
  {
    eyebrow: "LEARN",
    title: "We Ask Questions About Your Business",
    description:
      "Before we start any project, we take the time to get to know your business. We ask the right questions.",
    color: "var(--primary)",
  },
  {
    eyebrow: "PLAN",
    title: "Developing Customized Solutions",
    description:
      "Work alongside you to develop customized solutions that meet specific needs, delivering beyond expectations.",
    color: "var(--accent)",
  },
  {
    eyebrow: "EXECUTE",
    title: "Launching Your Amazing Solutions",
    description:
      "We launch your solutions and provide continuous maintenance to ensure they always perform perfectly.",
    color: "var(--accent)",
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative bg-[var(--surface-0)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-16 overflow-hidden">
      <SectionDivider />
      {/* Decorative Orbs & Soft Glow globally */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.12)_0%,transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute left-[40%] top-[60%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.08)_0%,transparent_70%)] blur-[100px]" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center"
      >
        <div className="max-w-[800px] text-center">
          <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-2">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">Our Process</span>
          </motion.div>

          <motion.h2 
            variants={fadeInUp}
            className="text-[2.5rem] font-black leading-[1.05] tracking-[-0.04em] sm:text-[3.5rem] lg:text-[4.5rem]"
          >
            How We <span className="text-teal">Do It</span>
          </motion.h2>

          <motion.p 
            variants={fadeInUp}
            className="mx-auto mt-6 text-[1.15rem] leading-[1.8] text-white/60 lg:text-[1.25rem]"
          >
            Securing your digital world: your trusted partner in data
            protection with cutting-edge solutions for comprehensive data
            security.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="mt-16 grid w-full max-w-[1280px] gap-8 md:grid-cols-2 xl:mt-24 xl:grid-cols-3 xl:gap-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.eyebrow}
              variants={fadeInUp}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="relative group h-full"
            >
              {/* Card Outer Glow Glow */}
              <div 
                className="absolute -inset-1 rounded-[2rem] opacity-20 blur-xl transition duration-500 group-hover:opacity-50" 
                style={{ background: item.color }}
              />

              <div className="relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface-1)] p-5 shadow-2xl transition-all duration-500 hover:border-white/20 sm:p-6">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[1.1rem] font-bold tracking-widest uppercase" style={{ color: item.color }}>
                      {item.eyebrow}
                    </p>
                    <span className="text-[3rem] font-black leading-none opacity-10 transition-opacity duration-500 group-hover:opacity-30" style={{ color: item.color }}>
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-2 text-[1.4rem] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[1.5rem]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
