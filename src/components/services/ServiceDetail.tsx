import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import servicesData from "@/data/services.json";
import type { PathwayPricingTier } from "@/data/ai-pathways";
import type { Offer } from "@/data/offers";
import PricingTierCard from "@/components/pricing/PricingTierCard";
import { pricingTierGridClass } from "@/components/pricing/pricingTierGridClass";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import OfferCard from "./OfferCard";
import PageSection, { cardClass, cardHoverClass, iconChipClass } from "./PageSection";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";

type Service = (typeof servicesData)[number];

/** Body sections for /services/[slug] (rendered below the PageHero). */
export default function ServiceDetail({
  service,
  tiers,
  relatedOffers,
  otherServices,
}: {
  service: Service;
  /** Pricing tiers from the Team Portal (empty → no pricing section). */
  tiers: PathwayPricingTier[];
  /** "Ways to Start" cards; `href` is set for portal-only offers without a detail page. */
  relatedOffers: (Offer & { href?: string })[];
  otherServices: Service[];
}) {
  return (
    <>
      {/* Overview + highlights */}
      <PageSection tone="white" id="overview">
        <HomeSectionHeader badge={service.highlightTitle} title={service.mainTitle} description={service.mainDescription} />
        <div className="grid gap-6 sm:grid-cols-2">
          {service.highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="h-full">
              <div className={`flex h-full flex-col p-6 sm:p-7 ${cardClass}`}>
                <span className={iconChipClass}>
                  <CircleCheck className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold! leading-snug text-nearblack">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray sm:text-[15px]">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      {/* Technologies */}
      <PageSection tone="offwhite" id="technologies">
        <HomeSectionHeader
          badge="Stack"
          title="Technologies we use"
          description={`The tools and platforms we typically reach for on ${service.label} projects.`}
        />
        <Reveal>
          <ul className="flex flex-wrap gap-2.5">
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-stone bg-white px-4 py-2 text-sm font-medium text-nearblack"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </PageSection>

      {/* Pricing */}
      {tiers.length > 0 ? (
        <PageSection tone="white" id="pricing">
          <HomeSectionHeader
            badge="Pricing"
            title="Clear pricing. No surprises."
            description={`Transparent starting points for ${service.label} engagements.`}
          />
          <div className={pricingTierGridClass(tiers.length)}>
            {tiers.map((tier, index) => (
              <PricingTierCard
                key={tier.name}
                tier={tier}
                index={index}
                single={tiers.length === 1}
                idPrefix={service.slug}
              />
            ))}
          </div>
        </PageSection>
      ) : null}

      {/* Ways to start */}
      {relatedOffers.length > 0 ? (
        <PageSection tone="soft" id="ways-to-start">
          <HomeSectionHeader
            badge="Ways to Start"
            title="Start with a focused engagement"
            description="Fixed-scope ways to begin, with timelines and starting prices up front."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedOffers.map((offer, i) => (
              <Reveal key={offer.slug} delay={i * 0.05} className="h-full">
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        </PageSection>
      ) : null}

      {/* Other services */}
      <PageSection tone={relatedOffers.length > 0 ? "white" : "soft"} id="other-services">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <HomeSectionHeader
            badge="Explore More"
            title="Other services"
            description="Most products need more than one kind of help over time."
          />
          <Link
            href="/services"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline sm:mb-12"
          >
            View all services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {otherServices.map((other, i) => {
            return (
              <Reveal key={other.slug} delay={i * 0.05} className="h-full">
                <Link
                  href={`/services/${other.slug}`}
                  className={`group flex h-full flex-col p-6 ${cardClass} ${cardHoverClass}`}
                >
                  <span className={iconChipClass}>
                    <ServiceIcon slug={other.slug} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold! leading-snug text-nearblack">
                    {other.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">{other.heroDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </PageSection>
    </>
  );
}
