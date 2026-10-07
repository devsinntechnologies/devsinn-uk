import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { InfoPage } from "@/components/static/InfoPage";
import { whyChooseUsContent } from "@/data/company-pages";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description: "See why teams choose Devsinn Technologies for reliable digital product delivery.",
};

export default function WhyChooseUsPage() {
  return (
    <>
      <InfoPage {...whyChooseUsContent} />
      <FinalCTA />
      <Footer />
    </>
  );
}
