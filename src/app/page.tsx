import Hero from "@/components/Hero";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import HomeFounder from "@/components/home/HomeFounder";
import HomeHowWeWork from "@/components/home/HomeHowWeWork";
import HomeProductShowcase from "@/components/home/HomeProductShowcase";
import ClientReviews from "@/components/ClientReviews";
import ProblemStatement from "@/components/ProblemStatement";
import OurServices from "@/components/OurServices";
import HomeIndustries from "@/components/home/HomeIndustries";
import ProductizedOffers from "@/components/ProductizedOffers";
import CaseStudies from "@/components/CaseStudies";
import PortfolioList from "@/components/portfolio/PortfolioList";
import OurProcess from "@/components/OurProcess";
import TechStack from "@/components/TechStack";
import WhyDevsinn from "@/components/WhyDevsinn";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_URL, defaultDescription, defaultTitle } from "@/lib/seo";

export const metadata: Metadata = {

  title: {
    absolute: defaultTitle,
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: "Devsinn Technologies",
    type: "website",
    images: [
      {
        url: "/favicon-512x512.png",
        width: 512,
        height: 512,
        alt: "Devsinn Technologies AI Automation Company Logo",
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* About */}
      <HomeAboutSection />

      {/* How we work */}
      <HomeHowWeWork />

      {/* Platform capabilities — replaces careers banner */}
      <HomeProductShowcase />

      {/* Services */}
      {/* <OurServices /> */}

      {/* Industries */}
      {/* <HomeIndustries /> */}

      {/* Why businesses choose us */}
      {/* <ProblemStatement /> */}

      {/* Selected case studies */}
      {/* <CaseStudies /> */}

      {/* Client feedback */}
      <ClientReviews />

      {/* 4. Productized Offers */}
      {/* <section id="packages" className="relative">
        <ProductizedOffers />
      </section> */}

      {/* Full Project Portfolio Grid */}
      {/* <PortfolioList /> */}

      {/* 6. Process */}
      {/* <OurProcess /> */}

      {/* 7. Engagement Models */}
      {/* <EngagementModels /> */}

      {/* 8. Tech Stack */}
      {/* <TechStack /> */}

      {/* 9. Why Devsinn */}
      {/* <WhyDevsinn /> */}

      {/* Founder */}
      <HomeFounder />

      {/* 11. Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
