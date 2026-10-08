"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const founder = {
  name: "Waqar",
  role: "Founder & CEO, Devsinn Technologies",
  linkedin: "https://www.linkedin.com/company/devsinn-technologies/",
  photo: "/waqar-founder.jpg",
  bio: [
    "I help founders and growing businesses turn ideas into working software — AI automation, SaaS products, and custom platforms that cut manual work and create real leverage.",
    "For 8+ years I have led Devsinn in planning, building, and supporting products for clients worldwide. Outcomes first, technology second — practical systems that ship and stay running.",
  ],
  highlights: [
    "8+ years leading Devsinn",
    "100+ projects delivered",
    "15+ engineers & consultants",
    "4.9/5 average client rating",
  ],
};

export default function HomeFounder() {
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
      id="founder"
      className="relative overflow-hidden bg-[#08090b] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 xl:px-16"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr] lg:grid-cols-[minmax(0,385px)_1fr] lg:gap-16">
        <motion.div className="relative mx-auto w-full max-w-[385px]" {...reveal()}>
          <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-teal/40" />
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#11141a]">
            <Image
              src={founder.photo}
              alt={`${founder.name}, ${founder.role}`}
              fill
              sizes="(min-width: 1024px) 385px, (min-width: 768px) 340px, 90vw"
              className="object-cover object-[center_20%] grayscale contrast-110 transition-[filter] duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-focus-within:grayscale-0 motion-reduce:transition-none"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 transition-opacity duration-700 group-hover:opacity-0"
              aria-hidden
            />
          </div>
        </motion.div>

        <motion.div {...reveal(0.1)}>
          <p className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-[#4d8dff]">
            About {founder.name}
          </p>
          <h2 className="mt-4 font-display text-[1.75rem] font-semibold! leading-tight tracking-[-0.01em] text-white! sm:text-[2.25rem]">
            {founder.name}
          </h2>
          <p className="mt-2 font-display text-base text-white/70 sm:text-lg">{founder.role}</p>

          <div className="mt-6 space-y-5">
            {founder.bio.map((paragraph) => (
              <p key={paragraph} className="font-display text-[15px] font-light leading-[1.85] text-white/75 sm:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {founder.highlights.map((item) => (
              <li
                key={item}
                className="rounded-md border border-teal/30 bg-teal/10 px-3.5 py-1.5 font-display text-[13px] font-medium text-white/90"
              >
                {item}
              </li>
            ))}
          </ul>

          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 font-display text-base font-medium text-white/85 transition-colors hover:text-[#4d8dff]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
