import type { ReactNode } from "react";
import { homeTheme as h } from "@/components/home/homeTheme";

const tones = {
  white: h.bgBase,
  offwhite: h.bgBand,
  soft: h.bgSoft,
} as const;

/** Standard inner-page section: home padding, 1280px container, alternating light backgrounds. */
export default function PageSection({
  tone = "white",
  id,
  narrow = false,
  children,
}: {
  tone?: keyof typeof tones;
  id?: string;
  /** Narrow (900px) column, e.g. for FAQ blocks. */
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${h.section} ${tones[tone]} ${h.pad}`}>
      <div className={narrow ? "relative z-10 mx-auto w-full max-w-[900px]" : h.container}>{children}</div>
    </section>
  );
}

/** Shared card surface used across services / solutions / offers pages. */
export const cardClass =
  "rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";

/** Extra classes for clickable cards. */
export const cardHoverClass =
  "transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-teal/40";

/** Icon chip used inside cards. */
export const iconChipClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal";
