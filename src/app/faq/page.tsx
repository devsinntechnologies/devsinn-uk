import type { Metadata } from "next";
import Script from "next/script";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { SITE_URL, faqSchema } from "@/lib/seo";
import { homeFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about cost, timeline, MVP development, post-launch support, and how Devsinn Technologies delivers AI automation, SaaS, and custom software.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ | Devsinn Technologies",
    description:
      "Answers about cost, timeline, MVP development, post-launch support, and how Devsinn Technologies works.",
    url: `${SITE_URL}/faq`,
  },
};

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(homeFaqs)),
        }}
      />
      <FAQSection />
      <Footer />
    </>
  );
}
