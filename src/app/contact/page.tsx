import type { Metadata } from "next";
import ContactUs from "@/components/contact/ContactUs";
import Hero from "@/components/contact/Hero";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Devsinn Technologies for AI automation, SaaS MVP, custom software, and app rescue. Reply within one business day. Free 20-minute fit call available.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Devsinn Technologies",
    description:
      "Book a fit call or send a qualified inquiry. We respond within one business day.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Hero />
      <ContactUs />
      <Footer />
    </>
  );
}
