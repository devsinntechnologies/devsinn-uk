import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { InfoPage } from "@/components/static/InfoPage";
import { supportContent } from "@/data/company-pages";

export const metadata: Metadata = {
  title: "Support",
  description: "Get support information and assistance details from Devsinn Technologies.",
};

export default function SupportPage() {
  return (
    <>
      <InfoPage {...supportContent} />
      <FinalCTA />
      <Footer />
    </>
  );
}
