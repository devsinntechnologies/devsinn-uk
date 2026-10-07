import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import OurServices from "@/components/OurServices";
import Hero from "@/components/about/Hero";
import VisionMission from "@/components/about/VisionMission";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import HomeFounder from "@/components/home/HomeFounder";
import HomeIndustries from "@/components/home/HomeIndustries";
import HomeProcessSteps from "@/components/home/HomeProcessSteps";
import { SITE_URL, defaultDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Devsinn Technologies — a product engineering team focused on AI automation, SaaS MVPs, custom software, and app rescue with accountable delivery and support after launch.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Devsinn Technologies",
    description: defaultDescription,
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Hero />

      {/* Who we are */}
      <HomeAboutSection showCta={false} />

      {/* Services */}
      <OurServices />

      {/* Industries */}
      <HomeIndustries />

      {/* Vision, mission & values */}
      <VisionMission />

      {/* How we work */}
      <HomeProcessSteps />

      {/* Founder */}
      <HomeFounder />

      {/* Book a call */}
      <FinalCTA />

      <Footer />
    </>
  );
}
