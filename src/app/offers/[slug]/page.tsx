import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { offers, getOfferBySlug } from "@/data/offers";
import { ArrowRight, CircleCheck, CircleMinus, Clock, ShieldCheck, Tag, Target, Users } from "lucide-react";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import Accordion from "@/components/services/Accordion";
import { FactStrip, ListCard } from "@/components/services/InfoCards";
import PageSection, { cardClass, iconChipClass } from "@/components/services/PageSection";
import Reveal from "@/components/services/Reveal";
import { getOfferOverride } from "@/lib/pricing";
import { SITE_URL, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

// ISR: pick up Team Portal price/timeline changes within ~60s (matches PRICING_REVALIDATE_SECONDS).
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);
  if (!offer) return {};

  return {
    title: offer.metaTitle,
    description: offer.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/offers/${slug}`,
    },
    openGraph: {
      title: offer.metaTitle,
      description: offer.metaDescription,
      url: `${SITE_URL}/offers/${slug}`,
      type: "website",
    },
  };
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const staticOffer = getOfferBySlug(slug);
  if (!staticOffer) notFound();

  // Card-level fields (name, tagline, price, timeline, CTA label) come from the Team Portal when configured;
  // the long-form content (includes, FAQs, SEO metadata) stays in src/data/offers.ts.
  const override = await getOfferOverride(slug);
  const offer = override
    ? {
        ...staticOffer,
        name: override.name,
        tagline: override.tagline ?? staticOffer.tagline,
        startingFrom: override.price,
        timeline: override.timeline ?? staticOffer.timeline,
        ctaLabel: override.ctaLabel ?? staticOffer.ctaLabel,
      }
    : staticOffer;

  const pageUrl = `${SITE_URL}/offers/${slug}`;
  const contactHref =
    offer.slug === "fit-call"
      ? "/contact?type=fit-call"
      : `/contact?package=${offer.contactParam}`;

  return (
    <>
      <Script
        id={`offer-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Offers", url: `${SITE_URL}/offers/fit-call` },
              { name: offer.name, url: pageUrl },
            ]),
            serviceSchema({
              name: offer.name,
              description: offer.metaDescription,
              url: pageUrl,
            }),
            faqSchema(offer.faqs),
          ]),
        }}
      />

      <PageHero
        badge={offer.startingFrom === "Free" ? "Free Offer" : `From ${offer.startingFrom}`}
        title={offer.name}
        description={offer.tagline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Offers" }, { label: offer.name }]}
        actions={
          <>
            <Button id={`offer-cta-${slug}`} variant="primary" href={contactHref}>
              {offer.ctaLabel}
            </Button>
            <Button id={`offer-service-${slug}`} variant="secondary" href={`/services/${offer.relatedService}`}>
              Related Service
            </Button>
          </>
        }
      >
        <FactStrip
          facts={[
            { icon: Clock, label: "Timeline", value: offer.timeline, emphasis: true },
            { icon: Tag, label: "Starting From", value: offer.startingFrom, emphasis: true },
          ]}
        />
      </PageHero>

      <PageSection tone="white" id="fit">
        <HomeSectionHeader
          badge="Is It a Fit?"
          title="Who it's for and what you get"
          description="A quick read on whether this offer matches where you are right now."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="h-full">
            <div className={`h-full p-6 sm:p-7 ${cardClass}`}>
              <span className={iconChipClass}>
                <Users className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold! text-nearblack">Ideal Buyer</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray sm:text-[15px]">{offer.idealBuyer}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="h-full">
            <div className={`h-full p-6 sm:p-7 ${cardClass}`}>
              <span className={iconChipClass}>
                <Target className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold! text-nearblack">Outcome</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray sm:text-[15px]">{offer.outcome}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className={`flex h-full flex-col p-6 sm:p-7 ${cardClass}`}>
              <span className={iconChipClass}>
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold! text-nearblack">Proof</h3>
              <ul className="mt-2 flex-1 space-y-2">
                {offer.proofPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-gray sm:text-[15px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {offer.relatedCaseStudy ? (
                <Link
                  href={`/case-studies/${offer.relatedCaseStudy}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
                >
                  View related case study
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection tone="offwhite" id="scope">
        <HomeSectionHeader
          badge="Scope"
          title="What's included"
          description="Clear boundaries up front, so you know exactly what this engagement covers."
        />
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <Reveal className="h-full">
            <ListCard title="Included" items={offer.includes} icon={CircleCheck} />
          </Reveal>
          <Reveal delay={0.05} className="h-full">
            <ListCard title="Not Included" items={offer.notIncluded} variant="minus" icon={CircleMinus} />
          </Reveal>
        </div>
        <div className="mt-10 flex justify-center">
          <Button id={`offer-sidebar-cta-${slug}`} variant="primary" href={contactHref}>
            {offer.ctaLabel}
          </Button>
        </div>
      </PageSection>

      <PageSection tone="soft" id="faq" narrow>
        <HomeSectionHeader
          badge="FAQ"
          title="Common questions"
          description={`Answers about the ${offer.name}.`}
          align="center"
        />
        <Accordion items={offer.faqs} />
      </PageSection>

      <FinalCTA />
      <Footer />
    </>
  );
}
