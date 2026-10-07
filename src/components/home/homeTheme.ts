/** Shared visual tokens for the home page (white / off-white theme). */

export const homeTheme = {
  bgBase: "bg-white",
  bgBand: "bg-offwhite",
  bgSoft: "bg-[#f4f7f9]",
  bgAccent: "bg-[#deeaf2]",
  bgDeep: "bg-offwhite",
  section: "relative overflow-hidden text-nearblack",
  pad: "px-5 py-16 sm:px-8 sm:py-20 lg:px-10 xl:px-16",
  container: "relative z-10 mx-auto w-full max-w-[1280px]",
  gridOverlay:
    "pointer-events-none absolute inset-x-0 top-0 h-full opacity-[0.35] [background-image:linear-gradient(var(--color-stone)_1px,transparent_1px),linear-gradient(90deg,var(--color-stone)_1px,transparent_1px)] [background-size:72px_72px]",
  glow:
    "pointer-events-none absolute -right-32 top-1/4 h-[320px] w-[320px] rounded-full bg-teal/[0.07] blur-[100px]",
  topLine: "pointer-events-none absolute inset-x-0 top-0 h-px bg-stone",
  badge:
    "inline-flex items-center gap-2 rounded-lg border border-stone bg-white px-4 py-2 shadow-sm",
  badgeDot: "h-2 w-2 shrink-0 rounded-full bg-teal",
  badgeLabel: "text-[11px] font-semibold uppercase tracking-[0.14em] text-nearblack",
  /** Matches hero headline weight & scale (section level). */
  sectionTitle:
    "h2-section font-medium tracking-[-0.02em] text-nearblack sm:text-[40px] sm:leading-[48px] lg:text-[44px] lg:leading-[52px]",
  /** Matches hero subheadline size on light backgrounds. */
  sectionDesc: "body-text max-w-[580px] text-base leading-relaxed text-gray sm:text-lg",
  h2: "h2-section font-medium tracking-[-0.02em] text-nearblack sm:text-[40px] sm:leading-[48px] lg:text-[44px] lg:leading-[52px]",
  body: "body-text text-base text-gray sm:text-lg",
  /** Hero-aligned CTAs (use with Button or Link). */
  btnPrimary:
    "rounded-lg border border-teal bg-teal text-sm font-semibold text-white hover:border-nearblack sm:text-base",
  btnSecondary:
    "rounded-lg border border-stone bg-offwhite text-sm font-semibold text-nearblack hover:border-teal hover:text-teal sm:text-base",
  card: "rounded-2xl border border-stone bg-white shadow-sm",
  cardHover: "transition-colors duration-300 hover:border-teal/50 hover:shadow-md",
  mutedBtn:
    "rounded-lg border border-stone bg-offwhite text-nearblack hover:border-teal hover:text-teal",
};
