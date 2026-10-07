import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Offer } from "@/data/offers";
import { cardClass, cardHoverClass } from "./PageSection";

/**
 * Clickable offer card linking to /offers/[slug] — or to `offer.href` for portal-only offers that have no
 * detail page. Prices/timelines come from the Team Portal when configured, else static data (see lib/pricing).
 */
export default function OfferCard({ offer }: { offer: Offer & { href?: string } }) {
  const isFree = offer.startingFrom === "Free";
  return (
    <Link
      href={offer.href || `/offers/${offer.slug}`}
      className={`group flex h-full flex-col p-6 sm:p-7 ${cardClass} ${cardHoverClass}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal">
          {isFree ? "Free" : `From ${offer.startingFrom}`}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {offer.timeline}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold! leading-snug text-nearblack">
        {offer.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">{offer.tagline}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
        {offer.href ? offer.ctaLabel : "View offer"}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
