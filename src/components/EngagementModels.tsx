"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";
import { fadeInUp, staggerContainer, wordStagger } from "@/lib/motion";

const models = [
  {
    id: "fixed-mvp",
    title: "Fixed Price MVP",
    tagline: "Define the core requirements. We price it, build it, and launch it.",
    idealFor: "Startups ready to translate a validated idea into user-ready software",
    howItWorks: [
      "Discovery consultation to detail scope requirements",
      "Fixed price proposal based on defined mockups",
      "4–8 week development sprint to launch MVP",
      "Milestone check-ins with client feedback sessions",
      "Production cloud deployment & handover",
    ],
  },
  {
    id: "ai-automation-sprint",
    title: "AI Automation Sprint",
    tagline: "A rapid, focused sprint to automate manual tasks and sync CRM data.",
    idealFor: "SMEs losing hours to repetitive WhatsApp, email, or data follow-ups",
    howItWorks: [
      "Workflow audit mapping bottlenecks and tooling hooks",
      "1–2 week active sprint to build the AI agent / pipelines",
      "API integrations using n8n, Make, or custom Node script",
      "Handover training walkthrough and workflow diagrams",
      "Post-launch support window to adjust prompt accuracy",
    ],
  },
  {
    id: "monthly-dedicated-team",
    title: "Monthly Dedicated Team",
    tagline: "Dedicated software engineering resources to support your ongoing roadmap.",
    idealFor: "Scaling tech products and agencies requiring monthly engineering output",
    howItWorks: [
      "Deploy 1–4 dedicated developers to your backlog",
      "Flexible allocation with active PM reporting",
      "Weekly demos and integrated Git workflow reviews",
      "Direct Slack access with dev resources daily",
      "Scale up or adjust team composition monthly",
    ],
  },
  {
    id: "product-strategy",
    title: "Product Strategy & Dev",
    tagline: "We manage architectural decisions while you focus on business growth.",
    idealFor: "Non-technical founders looking for a full-stack engineering advisor",
    howItWorks: [
      "Continuous technical oversight & software blueprinting",
      "UI/UX Figma wireframes before writing frontend code",
      "Asynchronous tasks processing database scaling support",
      "Full DevOps support, VPS, server migrations",
      "Ongoing product iteration retainers post-launch",
    ],
  },
];

const bulletVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const panelVariants: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

function ModelCardContent({
  model,
  animateBullets,
}: {
  model: (typeof models)[0];
  animateBullets: "scroll" | "mount";
}) {
  return (
    <>
      <h3 className="h3-card mb-2 text-nearblack font-semibold">{model.title}</h3>
      <p className="body-text text-gray text-sm mb-6 leading-relaxed">{model.tagline}</p>

      <div className="mb-6 rounded-xl border border-stone bg-offwhite p-3">
        <div className="caption-text text-nearblack font-semibold text-[10px] uppercase tracking-wider mb-1">
          Ideal For
        </div>
        <p className="body-text text-gray text-xs leading-relaxed">{model.idealFor}</p>
      </div>

      <div className="mb-8">
        <div className="caption-text text-nearblack font-semibold text-[10px] uppercase tracking-wider mb-3">
          Execution Steps
        </div>
        {animateBullets === "mount" ? (
          <motion.ul
            key={`steps-mount-${model.id}`}
            className="space-y-3"
            initial="hidden"
            animate="visible"
          >
            {model.howItWorks.map((step, idx) => (
              <motion.li
                key={step}
                custom={idx}
                variants={bulletVariants}
                className="flex items-start gap-3 text-sm text-gray"
              >
                <span className="flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-lg bg-stone text-[10px] font-bold text-teal">
                  {idx + 1}
                </span>
                <span className="leading-tight">{step}</span>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.ul
            key={`steps-${model.id}`}
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
          >
            {model.howItWorks.map((step, idx) => (
              <motion.li
                key={step}
                custom={idx}
                variants={bulletVariants}
                className="flex items-start gap-3 text-sm text-gray"
              >
                <span className="flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-lg bg-stone text-[10px] font-bold text-teal">
                  {idx + 1}
                </span>
                <span className="leading-tight">{step}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      <Button
        id={`model-cta-${model.id}`}
        variant="primary"
        href={`/contact?model=${model.id}`}
        fullWidth
      >
        Get Started
      </Button>
    </>
  );
}

export default function EngagementModels() {
  const [activeTab, setActiveTab] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeModel = models[activeTab];
  const headingText = "Engagement Models. Built Around Your Roadmap.";
  const headingWords = headingText.split(" ");

  return (
    <section className="relative overflow-hidden bg-[#deeaf2] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-16">
      <SectionDivider />

      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-16 text-center">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Collaboration
            </span>
          </motion.div>

          <motion.h2
            className="models-heading h2-section max-w-[800px] mx-auto leading-tight tracking-tight text-nearblack"
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
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Whether you need a quick automation sprint or a dedicated team for full product delivery, we have a model for you.
          </motion.p>
        </div>

        {/* Tab selectors — cross-fade content on switch, hidden on desktop */}
        <motion.div
          className="model-tabs-track -mx-5 sm:-mx-8 mb-8 flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 lg:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <style>{`
            .model-tabs-track::-webkit-scrollbar { display: none; }
          `}</style>
          
          {/* Explicit left spacer to fix iOS/Safari scroll padding bug */}
          <div className="w-2 sm:w-5 shrink-0" aria-hidden="true" />

          {models.map((model, index) => (
            <motion.button
              key={model.id}
              type="button"
              variants={fadeInUp}
              onClick={() => setActiveTab(index)}
              className={`relative shrink-0 snap-start rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === index
                  ? "border-teal text-offwhite"
                  : "border-stone bg-offwhite text-nearblack hover:border-teal"
                }`}
            >
              {activeTab === index && (
                <motion.span
                  layoutId="engagementActiveTab"
                  className="absolute inset-0 rounded-lg bg-teal"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{model.title}</span>
            </motion.button>
          ))}
          
          {/* Explicit right spacer */}
          <div className="w-2 sm:w-5 shrink-0" aria-hidden="true" />
        </motion.div>

        {/* Cross-fade tab panel (tablet/mobile) */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModel.id}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={shouldReduceMotion ? undefined : { y: -10, boxShadow: "0 16px 32px rgba(1,86,180,0.1)" }}
              className="model-card rounded-2xl border border-stone bg-offwhite p-6 sm:p-8 transition-colors duration-300 hover:border-teal"
            >
              <ModelCardContent model={activeModel} animateBullets="mount" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Original 2×2 grid — all models visible on desktop */}
        <motion.div
          className="hidden lg:grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
        >
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              variants={fadeInUp}
              onClick={() => setActiveTab(index)}
              whileHover={shouldReduceMotion ? undefined : { y: -10, boxShadow: "0 16px 32px rgba(1,86,180,0.1)" }}
              className={`model-card cursor-pointer rounded-2xl border bg-offwhite p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-teal ${activeTab === index ? "border-teal shadow-md shadow-teal/10" : "border-stone"
                }`}
            >
              <ModelCardContent model={model} animateBullets="scroll" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
