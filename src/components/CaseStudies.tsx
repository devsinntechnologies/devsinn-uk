"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";

const projects = [
  {
    name: "ChatSupplies",
    category: "AI / SaaS / Customer Support",
    image: "/images/thumbnails/chatsupplies_case.png",
    impact: "AI-driven customer operations that reduced response time by 60%.",
    link: "/case-studies/chatsupplies",
    noScroll: true,
    bgColor: "#0156B4",
  },
  {
    name: "Drafidox",
    category: "Web + Mobile / Document Tools Platform",
    image: "/images/thumbnails/drafidox_case.png",
    impact: "Consolidated multiple image and document workflows into a single workspace.",
    link: "/case-studies/drafidox",
    noScroll: true,
    bgColor: "#f3f6f8",
  },
  {
    name: "Smart Logo Maker",
    category: "AI Design Tool",
    image: "/images/thumbnails/smart_logo_case.png",
    impact: "Custom brand design generated instantly with advanced LLM vector editing.",
    link: "/case-studies/smart-logo-maker",
    noScroll: true,
    bgColor: "#f8f7fc",
  },
  {
    name: "DigiNizam",
    category: "SaaS / POS / Retail Operations",
    image: "/case-studies/diginizam-preview.png",
    impact: "AI-powered retail OS unifying POS, inventory, and tax compliance for growing businesses.",
    link: "/case-studies/diginizam",
    noScroll: true,
    bgColor: "#f4f7f6",
  },
  // {
  //   name: "ABC Kids",
  //   category: "Flutter / Education Mobile App",
  //   image: "/images/thumbnails/abckids.jpg",
  //   impact: "Highly interactive Flutter app helping over 50,000 active kids learn.",
  //   link: "/case-studies/abckids",
  // },
  // {
  //   name: "Meri Ride",
  //   category: "Mobile App / Service App",
  //   image: "/images/thumbnails/meriride.png",
  //   impact: "Inclusive mobility platform for individuals with different abilities.",
  //   link: "/case-studies/meri-ride",
  // },
];

const headingVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerCards: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

function ProjectCardItem({
  project,
  shouldReduceMotion,
}: {
  project: (typeof projects)[0];
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="project-card group flex h-full w-[calc(100vw-48px)] sm:w-[45%] lg:w-[31%] shrink-0 snap-start flex-col rounded-2xl border border-stone bg-offwhite p-5 transition-colors duration-300 hover:border-teal sm:p-6 md:p-7"
    >
      <div className="mb-4">
        <span className="caption-text rounded-full bg-stone px-3 py-1 font-semibold text-teal">
          {project.category}
        </span>
      </div>

      <motion.div
        className="project-image-container relative mb-5 w-full overflow-hidden rounded-xl"
        style={{
          ...(project.bgColor ? { backgroundColor: project.bgColor } : {}),
          aspectRatio: "16 / 10",
          minHeight: "clamp(160px, 28vw, 260px)",
        }}
        initial="rest"
        whileHover={shouldReduceMotion ? undefined : "hover"}
      >
        <motion.img
          src={project.image}
          alt={`${project.name} case study — custom SaaS and AI automation project by Devsinn`}
          className={`absolute inset-0 h-full w-full object-contain object-center p-2 sm:p-3 ${project.noScroll ? "" : "project-image-scroll"}`}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="absolute inset-0 bg-nearblack/40"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={{
              rest: { opacity: 0, y: 8 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Button
              href={project.link}
              variant="secondary"
              size="md"
              className="min-h-[40px] bg-offwhite/95 px-5 text-sm shadow-md"
            >
              View
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <h3 className="mb-6 mt-2 flex-1 text-xl font-bold tracking-tight text-nearblack sm:text-2xl">{project.name}</h3>

      <Link
        href={project.link}
        className="mt-auto inline-flex items-center gap-1 font-bold text-teal group/link hover:underline underline-offset-4"
      >
        View Case Study
        <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
          →
        </span>
      </Link>
    </motion.article>
  );
}

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CaseStudies() {
  const shouldReduceMotion = useReducedMotion();
  const headingText = "Selected Case Studies. Proven Through Results.";
  const headingWords = headingText.split(" ");

  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 280;
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 280;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="projects-section relative w-full bg-offwhite py-10 sm:py-14 md:py-16">
      <SectionDivider />

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 xl:px-16">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-14">
          <div className="max-w-[620px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-teal" />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
                Our Works
              </span>
            </div>

            <motion.h2
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="projects-heading h2-section leading-tight tracking-tight text-nearblack"
            >
              {headingWords.map((word, i) => (
                <span key={i} className="reveal-wrapper mr-[0.25em]">
                  <motion.span variants={wordVariants} className="reveal-word inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <p className="body-text mt-4 text-base text-gray">
              Explore real projects covering business challenges, technical solutions, and measurable outcomes across SaaS, mobile, and AI products.
            </p>
          </div>

          {/* Scroll Buttons */}
          <div className="flex items-center gap-3 md:pb-4">
            <button
              onClick={scrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-stone bg-offwhite text-nearblack transition-all duration-200 hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="btn-sweep sweep-secondary flex h-12 w-12 items-center justify-center rounded-full border border-teal bg-teal text-offwhite transition-all duration-200 hover:border-nearblack focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95"
              aria-label="Scroll right"
            >
              <ArrowRight className="relative z-10" size={20} />
            </button>
          </div>
        </div>

        {/* Responsive horizontal scroll track */}
        <motion.div
          ref={trackRef}
          variants={staggerCards}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="projects-track flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .projects-track::-webkit-scrollbar { display: none; }
          `}</style>
          {projects.map((project) => (
            <ProjectCardItem
              key={project.name}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
