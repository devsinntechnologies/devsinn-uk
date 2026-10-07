import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/portfolio/Hero";
import PortfolioList from "@/components/portfolio/PortfolioList";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore the portfolio and recent work by Devsinn Technologies.",
};

export default function PortfolioPage() {
  return (
    <>
      <div className="bg-white text-nearblack">
        <Hero />
        <PortfolioList />
      </div>
      <FinalCTA />
      <Footer />
    </>
  );
}
