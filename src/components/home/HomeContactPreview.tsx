"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";

const steps = [
  {
    title: "Fill the form",
    description: "Share your project, timeline, and goals — takes under two minutes on our contact page.",
  },
  {
    title: "We review & respond",
    description: "Our team reviews your brief and responds within one business day with initial direction.",
  },
  {
    title: "Free discovery call",
    description: "We schedule a 30-minute call to deep dive requirements and recommend the right engagement.",
  },
];

const partnerLogos = ["openai.svg", "anthropic.svg", "microsoftazure.svg", "meta.svg"];

export default function HomeContactPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact-preview" className="relative border-y border-stone bg-offwhite px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-10">
      <SectionDivider />
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Let&apos;s Connect
            </span>
          </div>
          <h2 className="h2-section font-bold leading-tight text-nearblack">
            Tell us about your{" "}
            <span className="text-teal">project</span>
          </h2>
          <p className="body-text mt-4 max-w-[520px] text-base text-gray">
            Ready to build something great? Share your requirements and we&apos;ll get back to you within one business day.
          </p>

          <div className="mt-10 space-y-6">
            <p className="text-sm font-bold uppercase tracking-wider text-nearblack">How it works</p>
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex gap-4"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-nearblack">{step.title}</h3>
                  <p className="body-text mt-1 text-sm text-gray">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-4 text-sm font-medium text-gray">
              The world&apos;s leading platforms trust our engineers. So can you.
            </p>
            <div className="flex flex-wrap items-center gap-6 opacity-80">
              {partnerLogos.map((file) => (
                <Image
                  key={file}
                  src={`/images/tech/${file}`}
                  alt=""
                  width={100}
                  height={32}
                  className="h-7 w-auto object-contain grayscale"
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="rounded-[2rem] border border-stone bg-white p-8 shadow-[0_20px_50px_rgba(26,26,24,0.08)] sm:p-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-display text-2xl font-bold text-nearblack">Start a conversation</h3>
          <p className="body-text mt-3 text-sm text-gray sm:text-base">
            Head to our contact page to share project details, budget range, and timeline. Prefer talking first? Book a discovery call — no prep required.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray">
            <li>
              <span className="font-semibold text-nearblack">Email:</span> hello@devsinn.co.uk
            </li>
            <li>
              <span className="font-semibold text-nearblack">WhatsApp:</span> +92 336 5918295
            </li>
            <li>
              <span className="font-semibold text-nearblack">Response:</span> Within 1 business day
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary" fullWidth className="sm:flex-1">
              Go to Contact Form
            </Button>
            <Button href="/offers/fit-call" variant="secondary" fullWidth className="sm:flex-1">
              Book Discovery Call
            </Button>
          </div>
          <p className="caption-text mt-5 text-center text-xs text-gray">
            No spam. Confidential. NDA available on request.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
