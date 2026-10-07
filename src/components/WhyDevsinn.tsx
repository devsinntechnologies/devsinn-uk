"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { staggerContainer, wordStagger } from "@/lib/motion";

const editorialText =
  "We believe custom software should solve operational bottlenecks, not generate technical debt. " +
  "That is why we detail technical architecture before we write code, execute with absolute timeline transparency, " +
  "and engineer MVPs built to scale, convert users, and deliver business outcomes from day one.";

function AnimatedWord({ word, index, total, scrollYProgress, shouldReduceMotion }: any) {
  const progressStart = (index / total) * 0.85;
  const progressEnd = progressStart + (1 / total) * 0.85;
  
  const opacity = useTransform(scrollYProgress, [progressStart, progressEnd], [0.05, 1]);
  const rotateX = useTransform(scrollYProgress, [progressStart, progressEnd], [75, 0]);
  const y = useTransform(scrollYProgress, [progressStart, progressEnd], [50, 0]);
  const filter = useTransform(scrollYProgress, [progressStart, progressEnd], ["blur(8px)", "blur(0px)"]);
  
  return (
    <motion.span
      style={shouldReduceMotion ? {} : { 
        opacity, 
        rotateX, 
        y, 
        filter,
        transformOrigin: "bottom center" 
      }}
      className="why-word inline-block mr-[0.25em] mb-[0.1em] text-nearblack select-none will-change-transform"
    >
      {word}
    </motion.span>
  );
}

export default function WhyDevsinn() {
  const shouldReduceMotion = useReducedMotion();
  const headingText = "Our Engineering Philosophy.";
  const headingWords = headingText.split(" ");
  const words = editorialText.split(" ");
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start 80%", "end 50%"]
  });

  return (
    <motion.section
      className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-16"
      animate={
        shouldReduceMotion
          ? undefined
          : {
              background: [
                "linear-gradient(135deg, #deeaf2 0%, #e8f0f6 50%, #deeaf2 100%)",
                "linear-gradient(135deg, #d6e6f2 0%, #deeaf2 50%, #dceaf4 100%)",
                "linear-gradient(135deg, #deeaf2 0%, #e8f0f6 50%, #deeaf2 100%)",
              ],
            }
      }
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <SectionDivider />

      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-12 text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Why Devsinn
            </span>
          </motion.div>

          <motion.h2
            className="why-heading h2-section mt-4 max-w-[800px] mx-auto leading-tight tracking-tight text-nearblack"
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
        </div>

        <div ref={textContainerRef} className="why-text-container max-w-[1050px] mx-auto text-center mt-12" style={{ perspective: 1200 }}>
          <p className="font-display font-semibold text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.25] tracking-tight flex flex-wrap justify-center">
            {words.map((word, i) => (
              <AnimatedWord 
                key={i} 
                word={word} 
                index={i} 
                total={words.length} 
                scrollYProgress={scrollYProgress} 
                shouldReduceMotion={shouldReduceMotion} 
              />
            ))}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
