/**
 * Server-only pricing helpers. Pricing cards are managed in the Team Portal (`GET /api/public/pricing-cards`);
 * when that's unavailable or not configured yet, everything falls back to the static data in src/data.
 * Import only from Server Components (pages) — never from "use client" files.
 */
import { cache } from "react";
import { aiPathways, type PathwayPricingTier } from "@/data/ai-pathways";
import { offers, type Offer } from "@/data/offers";
import { getPublicPricingCards, type PublicPricingCard } from "@/lib/tmApi";

/** An offer card for "Ways to Start". `href` is set for portal-only offers that have no /offers/[slug] page. */
export type OfferCardData = Offer & { href?: string };

export interface OfferOverride {
  name: string;
  tagline?: string;
  price: string;
  timeline?: string;
  ctaLabel?: string;
}

const FIT_CALL_SLUG = "fit-call";

/** One backend call per render (React request memoization); the fetch itself is cached ~60s in the Data Cache. */
const loadPortalCards = cache(async (): Promise<PublicPricingCard[] | null> => {
  const result = await getPublicPricingCards();
  if (!result || !result.configured) return null;
  return result.cards.filter((c) => c.status === undefined || c.status === "Active");
});

function toTier(card: PublicPricingCard): PathwayPricingTier {
  return {
    name: card.name,
    badge: card.badge || undefined,
    price: card.price,
    period: card.period ?? "",
    description: card.description ?? "",
    features: card.features ?? [],
    ctaLabel: card.cta_label || "Get started",
    ctaHref: card.cta_href || "/contact",
    highlighted: card.highlighted,
  };
}

function toOfferCard(card: PublicPricingCard): OfferCardData {
  const base = card.offer_slug ? offers.find((o) => o.slug === card.offer_slug) : undefined;
  if (base) {
    return {
      ...base,
      name: card.name,
      tagline: card.description ?? base.tagline,
      startingFrom: card.price,
      timeline: card.period ?? base.timeline,
      ctaLabel: card.cta_label || base.ctaLabel,
    };
  }
  // Portal-only offer: no detail page, so the card links straight to its CTA.
  return {
    slug: card.offer_slug || card.id,
    name: card.name,
    tagline: card.description ?? "",
    metaTitle: card.name,
    metaDescription: card.description ?? "",
    idealBuyer: "",
    outcome: "",
    timeline: card.period ?? "",
    startingFrom: card.price,
    includes: card.features ?? [],
    notIncluded: [],
    proofPoints: [],
    faqs: [],
    relatedService: card.service_slug,
    ctaLabel: card.cta_label || "Get in touch",
    contactParam: card.offer_slug || card.id,
    href: card.cta_href || "/contact",
  };
}

/** Pricing tiers for a service page. Configured portal → its tiers for the slug (may be empty). */
export async function getServiceTiers(serviceSlug: string): Promise<PathwayPricingTier[]> {
  const cards = await loadPortalCards();
  if (!cards) {
    return aiPathways.find((p) => p.slug === serviceSlug)?.pricingTiers ?? [];
  }
  return cards.filter((c) => c.kind === "tier" && c.service_slug === serviceSlug).map(toTier);
}

/**
 * "Ways to Start" offer cards. Without a slug: every offer (/services). With a slug: that service's offers
 * plus the free strategy call last — the same rule /services/[slug] has always used.
 */
export async function getOfferCards(serviceSlug?: string): Promise<OfferCardData[]> {
  const cards = await loadPortalCards();

  if (!cards) {
    if (!serviceSlug) return offers;
    const matching = offers.filter((o) => o.relatedService === serviceSlug && o.slug !== FIT_CALL_SLUG);
    const fitCall = offers.find((o) => o.slug === FIT_CALL_SLUG);
    return fitCall ? [...matching, fitCall] : matching;
  }

  const offerCards = cards.filter((c) => c.kind === "offer");
  if (!serviceSlug) return offerCards.map(toOfferCard);
  const matching = offerCards.filter((c) => c.service_slug === serviceSlug && c.offer_slug !== FIT_CALL_SLUG);
  const fitCall = offerCards.find((c) => c.offer_slug === FIT_CALL_SLUG);
  return (fitCall ? [...matching, fitCall] : matching).map(toOfferCard);
}

/** Portal card fields to overlay on /offers/[slug], or null (unconfigured, unavailable, or no active card). */
export async function getOfferOverride(offerSlug: string): Promise<OfferOverride | null> {
  const cards = await loadPortalCards();
  const card = cards?.find((c) => c.kind === "offer" && c.offer_slug === offerSlug);
  if (!card) return null;
  return {
    name: card.name,
    tagline: card.description ?? undefined,
    price: card.price,
    timeline: card.period ?? undefined,
    ctaLabel: card.cta_label ?? undefined,
  };
}
