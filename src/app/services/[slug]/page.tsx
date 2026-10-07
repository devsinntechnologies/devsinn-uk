import type { Metadata } from "next";
import { notFound } from "next/navigation";
import servicesData from "@/data/services.json";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import ServiceDetail from "@/components/services/ServiceDetail";
import { getOfferCards, getServiceTiers } from "@/lib/pricing";

// ISR: pick up Team Portal pricing changes within ~60s (matches PRICING_REVALIDATE_SECONDS).
export const revalidate = 60;

const SLUGS = [
  "ai-automation",
  "saas-mvp",
  "software-development",
  "app-rescue-maintenance",
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = (servicesData as typeof servicesData).find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: {
      absolute: `${service.label} | Devsinn Technologies`,
    },
    description: service.heroDescription,
    alternates: {
      canonical: `https://www.devsinntechnologies.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.label} | Devsinn Technologies`,
      description: service.heroDescription,
      url: `https://www.devsinntechnologies.com/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = (servicesData as typeof servicesData).find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = (servicesData as typeof servicesData).filter((s) => s.slug !== slug).slice(0, 3);
  const [tiers, relatedOffers] = await Promise.all([getServiceTiers(slug), getOfferCards(slug)]);

  return (
    <>
      <PageHero
        badge={service.heroEyebrow}
        title={service.heroTitle}
        description={service.heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.label },
        ]}
        actions={
          <>
            <Button
              id="service-cta-consultation"
              variant="primary"
              href={`/contact?type=${encodeURIComponent(service.label)}`}
            >
              Book a Free Consultation
            </Button>
            <Button id="service-cta-audit" variant="secondary" href="/contact?type=product-audit">
              Request Product Audit
            </Button>
          </>
        }
        compact
      />
      <ServiceDetail service={service} tiers={tiers} relatedOffers={relatedOffers} otherServices={otherServices} />
      <FinalCTA />
      <Footer />
    </>
  );
}
