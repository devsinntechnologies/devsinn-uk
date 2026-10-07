import type { Metadata } from "next";
import Script from "next/script";
import PathwayPage from "@/components/ai-pathways/PathwayPage";
import { getPathwayBySlug } from "@/data/ai-pathways";
import { getServiceTiers } from "@/lib/pricing";
import { SITE_URL, breadcrumbSchema, serviceSchema } from "@/lib/seo";

const pathway = getPathwayBySlug("ai-specialist")!;

// ISR: re-render at most every 60s so Team Portal pricing changes show up (matches PRICING_REVALIDATE_SECONDS).
export const revalidate = 60;

export const metadata: Metadata = {
  title: pathway.metaTitle,
  description: pathway.metaDescription,
  alternates: { canonical: `${SITE_URL}/ai-specialist` },
  openGraph: {
    title: pathway.metaTitle,
    description: pathway.metaDescription,
    url: `${SITE_URL}/ai-specialist`,
    type: "website",
  },
};

export default async function AiSpecialistPage() {
  const pageUrl = `${SITE_URL}/ai-specialist`;
  const tiers = await getServiceTiers("ai-specialist");

  return (
    <>
      <Script
        id="ai-specialist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "AI Specialist", url: pageUrl },
            ]),
            serviceSchema({
              name: "AI Specialist — Fractional & Full-Time",
              description: pathway.metaDescription,
              url: pageUrl,
            }),
          ]),
        }}
      />
      <PathwayPage pathway={pathway} tiers={tiers} />
    </>
  );
}
