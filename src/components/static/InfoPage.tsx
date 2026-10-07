"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Handshake,
  Layers,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import SectionDivider from "@/components/ui/SectionDivider";
import { homeTheme as h } from "@/components/home/homeTheme";
import { type ContentSection } from "@/data/company-pages";

type BasePageProps = {
  title: string;
  eyebrow: string;
  introTitle: string;
  introParagraphs?: string[];
};

type StandardInfoPageProps = BasePageProps & {
  sections?: ContentSection[];
  cards?: { title: string; description: string }[];
  closing?: string;
  items?: { title: string; body: string }[];
};

const cardShadow = "shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";
const sectionBands = [h.bgSoft, h.bgBase];

/** Wrap the last `count` words of a heading in the gradient accent. */
function accentTail(text: string, count: number): ReactNode {
  const words = text.trim().split(/\s+/);
  if (words.length <= count) return <PageHeroAccent>{text}</PageHeroAccent>;
  return (
    <>
      {words.slice(0, -count).join(" ")} <PageHeroAccent>{words.slice(-count).join(" ")}</PageHeroAccent>
    </>
  );
}

/** Decorative icon for a "why choose us" card, picked from its title. */
function cardIcon(title: string): LucideIcon {
  const key = title.toLowerCase();
  if (key.includes("expertise") || key.includes("experience")) return Award;
  if (key.includes("client")) return Handshake;
  if (key.includes("technolog")) return Cpu;
  if (key.includes("agile") || key.includes("process")) return RefreshCw;
  if (key.includes("security") || key.includes("quality")) return ShieldCheck;
  if (key.includes("end-to-end") || key.includes("services")) return Layers;
  return CheckCircle2;
}

function useReveal() {
  const shouldReduceMotion = useReducedMotion();
  return (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-8%" },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
}

/* ───────────────────────── Legal layout (Terms / Privacy) ───────────────────────── */

function LegalBody({
  introParagraphs,
  items,
}: {
  introParagraphs: string[];
  items: { title: string; body: string }[];
}) {
  const toc = useMemo(() => items.map((item, idx) => ({ id: `clause-${idx + 1}`, label: item.title })), [items]);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  // Scroll spy: highlight the clause nearest the top of the viewport.
  useEffect(() => {
    const elements = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -60% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  const tocLinks = () => (
    <ol className="flex flex-col gap-0.5">
      {toc.map((entry, idx) => {
        const active = activeId === entry.id;
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={active ? "location" : undefined}
              className={`flex items-start gap-3 rounded-lg border-l-2 px-3 py-2 text-[13.5px] leading-snug transition-colors ${
                active
                  ? "border-teal bg-teal/[0.06] font-medium text-teal"
                  : "border-transparent text-gray hover:bg-offwhite hover:text-nearblack"
              }`}
            >
              <span className="w-5 shrink-0 font-display text-xs tabular-nums opacity-70">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{entry.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <section className={`${h.section} ${h.pad} ${h.bgBase}`}>
      <SectionDivider />
      <div className={`${h.container} grid gap-10 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16 xl:gap-24`}>
        {/* Desktop: sticky table of contents */}
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-nearblack">
              On this page
            </p>
            {tocLinks()}
          </nav>
        </aside>

        <div className="min-w-0">
          {/* Mobile: collapsible table of contents */}
          <details className="group mb-10 rounded-2xl border border-stone bg-offwhite lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-nearblack [&::-webkit-details-marker]:hidden">
              On this page
              <ChevronDown size={18} className="text-gray transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <nav aria-label="On this page" className="border-t border-stone px-2 py-3">
              {tocLinks()}
            </nav>
          </details>

          <article>
            {introParagraphs.length > 0 ? (
              <div className="space-y-4 border-b border-stone pb-10 text-[17px] leading-[1.8] text-gray">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {items.map((item, idx) => (
              <section
                key={item.title}
                id={toc[idx].id}
                className={`scroll-mt-28 ${idx === 0 && introParagraphs.length === 0 ? "" : "pt-10"} ${
                  idx < items.length - 1 ? "border-b border-stone pb-10" : ""
                }`}
              >
                <p className="font-display text-xs font-semibold tracking-[0.14em] text-teal">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-xl font-medium! leading-snug tracking-[-0.01em] sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-[1.8] text-gray sm:text-[17px]">{item.body}</p>
              </section>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Content layout (Company / Why / Support) ───────────────────────── */

function Checklist({ list, wide }: { list: string[]; wide: boolean }) {
  const reveal = useReveal();
  return (
    <ul className={`grid gap-3 ${wide ? "sm:grid-cols-2" : ""}`}>
      {list.map((entry, i) => (
        <motion.li
          key={entry}
          className={`flex items-start gap-3 rounded-2xl border border-stone bg-white px-5 py-4 ${cardShadow}`}
          {...reveal(0.04 * i)}
        >
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <CheckCircle2 size={16} strokeWidth={2} aria-hidden />
          </span>
          <span className="text-[15px] leading-relaxed text-nearblack">{entry}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function ContentBody({
  overview,
  sections,
  cards,
  closing,
}: {
  overview: string[];
  sections: ContentSection[];
  cards: { title: string; description: string }[];
  closing?: string;
}) {
  const reveal = useReveal();

  return (
    <>
      {overview.length > 0 ? (
        <section className={`${h.section} ${h.pad} ${h.bgBase}`}>
          <SectionDivider />
          <div className={`${h.container} grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16`}>
            <motion.div {...reveal()}>
              <div className={h.badge}>
                <span className={h.badgeDot} />
                <span className={h.badgeLabel}>Overview</span>
              </div>
            </motion.div>
            <motion.div className="max-w-[760px] space-y-5 text-base leading-[1.8] text-gray sm:text-lg" {...reveal(0.05)}>
              {overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </div>
        </section>
      ) : null}

      {cards.length > 0 ? (
        <section className={`${h.section} ${h.pad} ${h.bgBase}`}>
          <SectionDivider />
          <div className={`${h.container} grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
            {cards.map((card, i) => {
              const Icon = cardIcon(card.title);
              return (
                <motion.article
                  key={card.title}
                  className={`group h-full rounded-2xl border border-stone bg-white p-6 transition-colors duration-300 hover:border-teal/40 sm:p-7 ${cardShadow}`}
                  {...reveal(0.05 * (i % 3))}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                      <Icon size={22} strokeWidth={2} aria-hidden />
                    </span>
                    <span className="font-display text-3xl font-semibold text-stone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-lg font-semibold! leading-snug">{card.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray sm:text-[15px]">{card.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>
      ) : null}

      {sections.map((section, idx) => {
        const hasParagraphs = Boolean(section.paragraphs?.length);
        const hasList = Boolean(section.list?.length);
        const band = sectionBands[idx % sectionBands.length];
        return (
          <section key={section.title ?? idx} className={`${h.section} ${h.pad} ${band}`}>
            <SectionDivider />
            <div
              className={`${h.container} grid gap-8 ${
                hasList ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16" : ""
              }`}
            >
              <motion.div className="max-w-[760px]" {...reveal()}>
                {section.title ? (
                  <h2 className="font-display text-[28px] font-medium! leading-[1.2] tracking-[-0.02em] sm:text-[36px]">
                    {section.title}
                  </h2>
                ) : null}
                {hasParagraphs ? (
                  <div className="mt-5 space-y-4 text-base leading-[1.8] text-gray sm:text-lg">
                    {section.paragraphs!.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </motion.div>

              {hasList ? <Checklist list={section.list!} wide={!hasParagraphs} /> : null}
            </div>
          </section>
        );
      })}

      {closing ? (
        <section className={`${h.section} ${h.pad} ${sections.length % 2 === 0 && cards.length > 0 ? h.bgSoft : h.bgBase}`}>
          <SectionDivider />
          <motion.div className={`${h.container} max-w-[900px] text-center`} {...reveal()}>
            <p className="font-display text-xl font-medium leading-[1.5] tracking-[-0.01em] text-nearblack sm:text-2xl">
              {closing}
            </p>
          </motion.div>
        </section>
      ) : null}
    </>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export function InfoPage({
  title,
  eyebrow,
  introTitle,
  introParagraphs = [],
  sections = [],
  cards = [],
  closing,
  items = [],
}: StandardInfoPageProps) {
  const isLegal = items.length > 0;
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: title }];

  if (isLegal) {
    return (
      <>
        <PageHero
          align="left"
          compact
          badge={eyebrow}
          title={accentTail(title, 1)}
          description={introTitle}
          breadcrumbs={breadcrumbs}
        />
        <LegalBody introParagraphs={introParagraphs} items={items} />
      </>
    );
  }

  const [lead, ...overview] = introParagraphs;

  return (
    <>
      <PageHero
        align="left"
        compact
        badge={eyebrow}
        title={accentTail(introTitle, 2)}
        description={lead}
        breadcrumbs={breadcrumbs}
      />
      <ContentBody overview={overview} sections={sections} cards={cards} closing={closing} />
    </>
  );
}
