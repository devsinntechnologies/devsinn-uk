import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { solutions, getSolutionBySlug } from "@/data/solutions";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Rocket, Target, TriangleAlert, Users } from "lucide-react";
import { getOfferBySlug } from "@/data/offers";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import Accordion from "@/components/services/Accordion";
import { FactStrip, ListCard } from "@/components/services/InfoCards";
import PageSection, { cardClass, cardHoverClass, iconChipClass } from "@/components/services/PageSection";
import Reveal from "@/components/services/Reveal";
import { SITE_URL, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/solutions/${slug}`,
    },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url: `${SITE_URL}/solutions/${slug}`,
      type: "website",
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const pageUrl = `${SITE_URL}/solutions/${slug}`;
  const relatedOffer = getOfferBySlug(solution.relatedOffer);

  return (
    <>
      <Script
        id={`solution-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: solution.title, url: pageUrl },
            ]),
            serviceSchema({
              name: solution.title,
              description: solution.metaDescription,
              url: pageUrl,
            }),
            faqSchema(solution.faqs),
          ]),
        }}
      />

      <PageHero
        badge="Solution"
        title={solution.headline}
        description={solution.subheadline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions" },
          { label: solution.title },
        ]}
        actions={
          <>
            <Button id={`solution-cta-${slug}`} variant="primary" href={`/offers/${solution.relatedOffer}`}>
              See the Sprint Offer
            </Button>
            <Button id={`solution-contact-${slug}`} variant="secondary" href="/contact">
              Talk to Our Team
            </Button>
          </>
        }
      >
        <FactStrip
          facts={[
            { icon: Users, label: "Ideal Buyer", value: solution.idealBuyer },
            { icon: Clock, label: "Typical Timeline", value: solution.timeline },
          ]}
        />
      </PageHero>

      <PageSection tone="white" id="problems-outcomes">
        <HomeSectionHeader
          badge="Problem → Outcome"
          title="What changes when we work together"
          description="The day-to-day problems this solves, and what you have in place once it ships."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <ListCard title="Problems We Solve" items={solution.problems} variant="dot" icon={TriangleAlert} />
          </Reveal>
          <Reveal delay={0.05} className="h-full">
            <ListCard title="Outcomes You Get" items={solution.outcomes} icon={Target} />
          </Reveal>
        </div>
      </PageSection>

      <PageSection tone="offwhite" id="deliverables">
        <HomeSectionHeader
          badge="Deliverables"
          title="What you receive"
          description="Concrete outputs you keep at the end of the engagement."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {solution.deliverables.map((item, i) => (
            <Reveal key={item} delay={i * 0.04} className="h-full">
              <div className={`flex h-full items-start gap-4 p-5 sm:p-6 ${cardClass}`}>
                <span className={`${iconChipClass} font-display text-sm font-semibold`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-2.5 text-sm leading-relaxed text-nearblack sm:text-[15px]">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={`mt-10 grid gap-6 ${solution.relatedCaseStudy ? "md:grid-cols-2" : ""}`}>
          <Link
            href={`/offers/${solution.relatedOffer}`}
            className={`group flex items-center gap-4 p-6 ${cardClass} ${cardHoverClass}`}
          >
            <span className={iconChipClass}>
              <Rocket className="h-5 w-5" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">
                Recommended offer
              </span>
              <span className="mt-1 block font-display text-base font-semibold text-nearblack">
                {relatedOffer?.name ?? solution.relatedOffer.replace(/-/g, " ")}
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-teal transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
          {solution.relatedCaseStudy ? (
            <Link
              href={`/case-studies/${solution.relatedCaseStudy}`}
              className={`group flex items-center gap-4 p-6 ${cardClass} ${cardHoverClass}`}
            >
              <span className={iconChipClass}>
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">
                  Related case study
                </span>
                <span className="mt-1 block font-display text-base font-semibold text-nearblack">
                  Read the case study
                </span>
              </span>
              <ArrowRight className="h-5 w-5 text-teal transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          ) : null}
        </div>
      </PageSection>

      <PageSection tone="soft" id="faq" narrow>
        <HomeSectionHeader
          badge="FAQ"
          title="Common questions"
          description={`Answers about ${solution.title.toLowerCase()}.`}
          align="center"
        />
        <Accordion items={solution.faqs} />
      </PageSection>

      <FinalCTA />
      <Footer />
    </>
  );
}
