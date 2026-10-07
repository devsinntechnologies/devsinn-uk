"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  item: Project;
  index: number;
  /** Kept for backwards compatibility; cards always use the light home theme. */
  variant?: "light" | "dark";
}

function PhoneFrame({
  src,
  className,
  sizes,
}: {
  src: string;
  className: string;
  sizes: string;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[1.25rem] border border-stone bg-white p-1 shadow-[0_18px_40px_-18px_rgba(16,24,40,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1rem] bg-offwhite">
        <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}

/** Light project card: fixed-ratio preview, pills, title, one-line summary, hover lift. */
export default function ProjectCard({ item, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isApp = item.categoryKey === "appDev";
  const sidePhoneLeft = item.sneakPeekImages[0] || item.mainImage;
  const sidePhoneRight = item.sneakPeekImages[1] || sidePhoneLeft;

  return (
    <motion.div
      className="h-full"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects/${item.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {/* Preview */}
        <div className="relative aspect-[4/3] overflow-hidden border-b border-stone bg-[#f4f7f9]">
          {isApp ? (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-3xl"
              />
              <PhoneFrame
                src={sidePhoneLeft}
                sizes="120px"
                className="left-[16%] top-[22%] h-[68%] w-[24%] -rotate-6 group-hover:-translate-x-2"
              />
              <PhoneFrame
                src={sidePhoneRight}
                sizes="120px"
                className="right-[16%] top-[22%] h-[68%] w-[24%] rotate-6 group-hover:translate-x-2"
              />
              <PhoneFrame
                src={item.mainImage}
                sizes="150px"
                className="left-1/2 top-[10%] z-10 h-[84%] w-[30%] -translate-x-1/2 group-hover:-translate-y-1.5"
              />
            </>
          ) : (
            <div className="absolute inset-x-4 top-4 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-stone bg-white shadow-sm">
              <div aria-hidden className="flex h-6 items-center gap-1 border-b border-stone bg-offwhite px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-stone" />
                <span className="h-1.5 w-1.5 rounded-full bg-stone" />
                <span className="h-1.5 w-1.5 rounded-full bg-stone" />
              </div>
              <div className="relative h-[calc(100%-1.5rem)] w-full overflow-hidden bg-offwhite">
                <Image
                  src={item.mainImage}
                  alt={`${item.title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover object-top transition-[object-position] duration-[5000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none motion-reduce:group-hover:object-top"
                />
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
              {item.categoryLabel}
            </span>
            {item.technologies.slice(0, 2).map((tech) => (
              <span
                key={tech.name}
                className="rounded-full border border-stone bg-white px-3 py-1 text-xs text-gray"
              >
                {tech.name}
              </span>
            ))}
          </div>

          <h3 className="mt-4 flex items-start justify-between gap-3 font-display text-xl font-semibold! leading-snug tracking-[-0.01em] text-nearblack">
            <span>{item.title}</span>
            <ArrowUpRight
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 text-gray transition-colors duration-300 group-hover:text-teal"
            />
          </h3>

          {item.about ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray">{item.about}</p>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
