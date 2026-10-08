"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";

const CALENDLY_URL =
  "https://calendly.com/devsinntechnologies/30min?hide_gdpr_banner=1&primary_color=005cff";
const CONTACT_EMAIL = "info@devsinntechnologies.com";

const points = [
  "30 minutes with Waqar Malik directly",
  "Weekdays, 9am–5pm UK time",
  "Remote · no commitment required",
  "You'll know the right next step before you leave the call",
  "Reply within one business day",
];

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10%" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="book-a-call"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#f8f9fa_0%,#eef4f8_55%,#e4edf4_100%)] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-16"
    >
      <SectionDivider />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-teal/[0.08] blur-[110px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1100px] items-start gap-10 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-14">
        <motion.div className="lg:pt-2" {...reveal()}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Available for New Projects
            </span>
          </div>

          <h2 className="h2-section font-medium! leading-[1.1]! tracking-[-0.02em]">
            Book a call.
            <br />
            <span className="text-teal">No prep required.</span>
          </h2>

          <p className="body-text mt-5 max-w-[480px] text-base! leading-relaxed sm:text-[17px]!">
            Tell us what your business does and what you&apos;re trying to solve. In 30 minutes,
            you&apos;ll know exactly which service fits — AI automation, SaaS, or custom software —
            and what the right next step looks like.
          </p>

          <ul className="mt-8 max-w-[480px] border-t border-stone">
            {points.map((point) => (
              <li
                key={point}
                className="body-text flex items-center gap-3 border-b border-stone py-3.5 text-sm! text-nearblack!"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {point}
              </li>
            ))}
          </ul>

          <p className="body-text mt-8 text-sm!">
            Prefer email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-nearblack underline underline-offset-4 transition-colors hover:text-teal"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </motion.div>

        <motion.div
          className="h-[700px] w-full overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_20px_60px_-20px_rgba(0,92,255,0.25)]"
          {...reveal(0.1)}
        >
          <iframe
            src={CALENDLY_URL}
            title="Book a free strategy call with Devsinn Technologies"
            loading="lazy"
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
