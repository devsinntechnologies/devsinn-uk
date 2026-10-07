import type { Metadata } from "next";
import ServicesPageClient from "./ServicesClient";
import { getOfferCards } from "@/lib/pricing";
import { SITE_URL, defaultDescription } from "@/lib/seo";

// ISR: pick up Team Portal offer-card changes within ~60s (matches PRICING_REVALIDATE_SECONDS).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services — AI Automation, SaaS MVP, Custom Software & App Rescue",
  description:
    "Four focused offers: AI Automation & Agents, SaaS MVP Development, Custom Software, and App Rescue & Maintenance — with scoped deliverables, timelines, and starting prices.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Devsinn Technologies Services",
    description: defaultDescription,
    url: `${SITE_URL}/services`,
  },
};

export default async function ServicesPage() {
  const offers = await getOfferCards();
  return <ServicesPageClient offers={offers} />;
}
