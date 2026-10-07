"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionDivider from "@/components/ui/SectionDivider";
import { staggerContainer, wordStagger } from "@/lib/motion";

const techItems = [
  { name: "React", filename: "react.svg" },
  { name: "Flutter", filename: "flutter.svg" },
  { name: "Node.js", filename: "nodedotjs.svg" },
  { name: "Docker", filename: "docker.svg" },
  { name: "OpenAI", filename: "openai.svg" },
  { name: "AWS", filename: "amazonwebservices.svg" },
  { name: "Claude AI", filename: "claude.svg" },
  { name: "DeepSeek", filename: "deepseek.svg" },
  { name: "Figma", filename: "figma.svg" },
  { name: "Firebase", filename: "firebase.svg" },
  { name: "Gemini", filename: "googlegemini.svg" },
  { name: "Cloudflare", filename: "cloudflare.svg" },
  { name: "Python", filename: "python.svg" },
  { name: "Django", filename: "django.svg" },
  { name: "Vercel", filename: "vercel.svg" },
  { name: "DigitalOcean", filename: "digitalocean.svg" },
];

export default function TechStack() {
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const headingText = "Battle-Tested Technology Stack. Zero Overhead.";
  const headingWords = headingText.split(" ");

  return (
    <section className="relative overflow-hidden bg-offwhite px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-16">
      <SectionDivider />

      <motion.div
        className="pointer-events-none absolute left-[50%] top-[50%] z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.25] sm:h-[800px] sm:w-[800px] lg:h-[1000px] lg:w-[1000px]"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <svg
          className="h-full w-full text-stone"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          xmlns="http://www.w3.org/2000/svg"
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="mb-16 text-center">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Production Stack
            </span>
          </motion.div>

          <motion.h2
            className="tech-heading h2-section max-w-[800px] mx-auto leading-tight tracking-tight text-nearblack"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {headingWords.map((word, i) => (
              <span key={i} className="reveal-wrapper mr-[0.25em]">
                <motion.span className="inline-block" variants={wordStagger}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.p
            className="body-text mt-4 mx-auto max-w-[540px] text-gray text-base"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            We build with standard, scalable technologies that guarantee long-term maintainability and high operations uptime.
          </motion.p>
        </div>

        <div 
          ref={gridRef} 
          className="relative flex w-full overflow-hidden py-10"
          style={{ 
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", 
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" 
          }}
        >
          <motion.div
            className="flex w-max flex-nowrap items-center gap-8 px-4"
            animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...techItems, ...techItems].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                aria-label={tech.name}
                className="tech-card group flex w-24 shrink-0 flex-col items-center gap-3"
              >
                <div className="relative flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="relative flex h-16 w-16 origin-center items-center justify-center">
                    <Image
                      src={`/images/tech/${tech.filename}`}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain transition-transform duration-300"
                    />
                  </div>
                </div>

                <span className="caption-text text-xs font-semibold tracking-tight text-nearblack opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
