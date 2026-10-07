"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/button";
import projectsData from "@/data/projects.json";

/* ── Pick featured projects from the data ── */
const allProjects = projectsData.webDesign;

const featured = [
  { slug: "drafidox", category: "AI SaaS Platform" },
  { slug: "smart-logo-maker_webDesign", category: "AI Design Tool" },
  { slug: "diginizam", category: "SaaS / POS Platform" },
  { slug: "certainli", category: "Compliance SaaS" },
  { slug: "weteachs", category: "EdTech Platform" },
  { slug: "jiffy_new", category: "Quick Commerce" },
  { slug: "chatsupplies", category: "AI Chat Platform" },
];

const cards = featured
  .map(({ slug, category }) => {
    const p = allProjects.find((x) => x.slug === slug);
    if (!p) return null;
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      about: p.about,
      image: p.mainImage || p.heroImage,
      category,
      techs: p.technologies.slice(0, 4),
    };
  })
  .filter(Boolean) as {
    id: number;
    slug: string;
    title: string;
    about: string;
    image: string;
    category: string;
    techs: { name: string; logo: string }[];
  }[];

/* ── helpers ── */
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function FeaturedSolutions() {
  const [active, setActive] = useState(0);
  const total = cards.length;

  /* swipe / drag */
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => setActive((a) => mod(a - 1, total)), [total]);
  const next = useCallback(() => setActive((a) => mod(a + 1, total)), [total]);

  /* keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  /* position mapping: -2 … +2 relative to active */
  function getOffset(idx: number) {
    let d = idx - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d; // -2, -1, 0, 1, 2
  }

  return (
    <section className="relative overflow-hidden bg-offwhite px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-10 lg:pt-24 lg:pb-28 xl:px-16">
      <SectionDivider />

      {/* grid dot texture */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.14] [background-image:linear-gradient(var(--color-stone)_1px,transparent_1px),linear-gradient(90deg,var(--color-stone)_1px,transparent_1px)] [background-size:88px_88px]" />

      <div className="relative mx-auto w-full max-w-[1400px]">

        {/* ── Header ── */}
        <div className="mb-12 text-center sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone bg-offwhite px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-[12px] font-semibold uppercase tracking-wider text-nearblack">
              Featured Solutions
            </span>
          </div>
          <h2 className="font-syne text-3xl font-bold leading-tight tracking-tight text-nearblack sm:text-4xl lg:text-5xl">
            Work That Speaks
          </h2>
          <p className="body-text mx-auto mt-3 max-w-[520px] text-base text-gray">
            A curated showcase of products we've shipped — from AI platforms to SaaS tools built to perform.
          </p>
        </div>

        {/* ── Carousel Stage ── */}
        <div
          className="relative mx-auto select-none"
          style={{ height: "clamp(420px, 52vw, 580px)" }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
            touchStartX.current = null;
          }}
        >
          {cards.map((card, idx) => {
            const offset = getOffset(idx);
            const abs = Math.abs(offset);

            /* only render -2 … +2 */
            if (abs > 2) return null;

            /* --- layout math --- */
            const isCenter = offset === 0;
            const xPct = offset * 38;           // horizontal shift %
            const scale = isCenter ? 1 : abs === 1 ? 0.78 : 0.60;
            const opacity = isCenter ? 1 : abs === 1 ? 0.55 : 0.22;
            const rotateY = offset * -12;        // 3-D tilt
            const zIndex = 10 - abs;
            const blur = isCenter ? 0 : abs === 1 ? 0 : 2;

            return (
              <motion.div
                key={card.slug}
                className="absolute left-1/2 top-0 w-[min(420px,85vw)] -translate-x-1/2 cursor-pointer"
                style={{ zIndex }}
                animate={{
                  x: `calc(${xPct}%)`,
                  scale,
                  opacity,
                  rotateY,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                onClick={() => {
                  if (!isCenter) setActive(idx);
                }}
              >
                <div
                  className={`overflow-hidden rounded-3xl border bg-white shadow-xl transition-shadow duration-500 ${isCenter
                    ? "border-teal/30 shadow-teal/10"
                    : "border-stone shadow-none"
                    }`}
                >
                  {/* Image */}
                  <div className="relative h-48 w-full sm:h-56">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 85vw, 420px"
                      priority={isCenter}
                    />
                    {/* category tag */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-teal/30 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal backdrop-blur-sm">
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="mb-2 font-syne text-xl font-bold leading-tight text-nearblack">
                      {card.title}
                    </h3>
                    <p className="body-text mb-4 line-clamp-2 text-sm leading-relaxed text-gray">
                      {card.about}
                    </p>

                    {/* Tech badges */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {card.techs.map((t) => (
                        <span
                          key={t.name}
                          className="flex items-center gap-1.5 rounded-full border border-stone bg-offwhite px-3 py-1 text-[11px] font-medium text-nearblack"
                        >
                          <Image
                            src={t.logo}
                            alt={t.name}
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 object-contain"
                          />
                          {t.name}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/projects/${card.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-teal transition-opacity hover:opacity-75"
                      tabIndex={isCenter ? 0 : -1}
                    >
                      View Details
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-white shadow-sm">
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Nav Arrows ── */}
        <div className="relative mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone bg-offwhite text-nearblack shadow-sm transition-all hover:border-teal hover:text-teal hover:shadow-md active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                className="transition-all duration-300"
              >
                <span
                  className={`block rounded-full bg-nearblack transition-all duration-300 ${i === active
                    ? "h-2.5 w-6 opacity-100"
                    : "h-2 w-2 opacity-25 hover:opacity-50"
                    }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone bg-offwhite text-nearblack shadow-sm transition-all hover:border-teal hover:text-teal hover:shadow-md active:scale-95"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* ── View All CTA ── */}
        <div className="mt-10 flex justify-center">
          <Button
            href="/portfolio"
            variant="secondary"
            size="lg"
            className="text-sm"
          >
            View All Projects
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Button>
        </div>

      </div>
    </section>
  );
}
