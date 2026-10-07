"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CalendlyModal from "@/components/ui/CalendlyModal";
import Button from "@/components/ui/button";
import RippleButton from "@/components/ui/RippleButton";
import { staggerContainer, wordStagger } from "@/lib/motion";

type TitleLine = {
  words: string[];
  accent: Set<string>;
};

type HeroSlide = {
  id: string;
  video: string;
  titleLines: TitleLine[];
  subheadline: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "ai-automation",
    video: "/5289120-hd_1280_720_30fps.mp4",
    titleLines: [
      { words: ["AI", "&", "SaaS", "Development"], accent: new Set(["AI", "&", "SaaS"]) },
      { words: ["for", "Growing", "Businesses"], accent: new Set() },
    ],
    subheadline: "AI automation, SaaS platforms, and custom apps — planned, built, and supported by one team.",
  },
  {
    id: "saas-products",
    video: "/12487100_1280_720_25fps.mp4",
    titleLines: [
      { words: ["Launch", "and", "Scale"], accent: new Set() },
      { words: ["Production-Ready", "SaaS"], accent: new Set(["Production-Ready", "SaaS"]) },
    ],
    subheadline: "From MVP to enterprise scale, with clear scope and visible milestones at every step.",
  },
  {
    id: "custom-engineering",
    video: "/4584697-hd_1280_720_25fps.mp4",
    titleLines: [
      { words: ["Custom", "Software", "&"], accent: new Set() },
      { words: ["AI", "Workflow", "Systems"], accent: new Set(["AI", "Workflow"]) },
    ],
    subheadline: "Web apps, mobile apps, and AI agents built around how your team already works.",
  },
];

/** Lighter brand blue — the base #005CFF is too dark to read on the video overlay. */
const HERO_ACCENT = "#7AA8FF";

const SLIDE_COUNT = HERO_SLIDES.length;
const CROSSFADE_MS = 900;

export default function Hero() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const advanceLock = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const activeSlide = HERO_SLIDES[activeIndex];

  const goToSlide = useCallback(
    (nextIndex: number) => {
      setActiveIndex((nextIndex + SLIDE_COUNT) % SLIDE_COUNT);
    },
    []
  );

  const advanceSlide = useCallback(() => {
    if (advanceLock.current) return;
    advanceLock.current = true;
    setActiveIndex((current) => (current + 1) % SLIDE_COUNT);
    window.setTimeout(() => {
      advanceLock.current = false;
    }, CROSSFADE_MS);
  }, []);

  useEffect(() => {
    const videos = videoRefs.current;

    videos.forEach((video, index) => {
      if (!video) return;
      if (shouldReduceMotion) {
        video.pause();
        if (index !== 0) video.currentTime = 0;
        return;
      }

      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const first = videoRefs.current[0];
    if (!first) return;
    first.play().catch(() => {});
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      advanceSlide();
    }, 12000);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, advanceSlide]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-nearblack pb-12 pt-[72px] sm:pt-[80px]"
    >
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/devsinntechnologies/30min?hide_gdpr_banner=1"
      />

      {/* Rotating video backgrounds */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => (
          <video
            key={slide.id}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={slide.video}
            muted
            playsInline
            loop={shouldReduceMotion ? index === 0 : false}
            preload={index <= 1 ? "auto" : "metadata"}
            onEnded={() => {
              if (shouldReduceMotion || index !== activeIndex) return;
              advanceSlide();
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* <div className="absolute inset-0 bg-white/55" /> */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),transparent_70%)]" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-offwhite/85" /> */}
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex w-full max-w-[900px] flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-center"
            >
              <motion.h1
                className="h1-hero w-full normal-case !text-center text-[40px]! leading-[48px]! sm:text-[54px]! sm:leading-[62px]! lg:text-[64px]! lg:leading-[72px]!"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {activeSlide.titleLines.map((line, lineIndex) => (
                  <span key={lineIndex} className="block text-center">
                    {line.words.map((word, i) => {
                      const isAccent = line.accent.has(word);
                      return (
                        <span
                          key={`${lineIndex}-${i}`}
                          className="reveal-wrapper font-medium mr-[0.25em]"
                        >
                          <motion.span
                            className="inline"
                            style={{ color: isAccent ? HERO_ACCENT : "#ffffff" }}
                            variants={wordStagger}
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                className="body-text mx-auto mt-6 sm:mt-8 max-w-[560px] text-center text-base sm:text-lg"
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeSlide.subheadline}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-8 sm:mt-10 flex w-full max-w-[720px] flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <RippleButton className="w-full sm:w-auto rounded-lg">
              <Button
                id="hero-cta-consultation"
                variant="primary"
                onClick={() => setIsCalendlyOpen(true)}
                className="w-full sm:w-auto text-sm sm:text-base px-8 py-4 sm:py-3.5"
              >
                Book a Free Strategy Call
              </Button>
            </RippleButton>

            <RippleButton className="w-full sm:w-auto rounded-lg">
              <Button
                id="hero-cta-audit"
                href="/case-studies"
                variant="secondary"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                See Real Projects
              </Button>
            </RippleButton>
          </motion.div>

          <div
            className="mt-10 flex justify-center gap-2 sm:mt-12"
            role="tablist"
            aria-label="Hero highlights"
          >
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show slide ${index + 1}: ${slide.titleLines[0]?.words.join(" ") ?? slide.id}`}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-[#7AA8FF]"
                    : "w-2 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
