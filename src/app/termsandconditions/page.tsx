import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { InfoPage } from "@/components/static/InfoPage";
import { termsContent } from "@/data/company-pages";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for devsinntechnologies.com covering services information, intellectual property, liability, and governing law.",
  alternates: { canonical: "https://www.devsinntechnologies.com/termsandconditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <InfoPage {...termsContent} />
      <Footer />
    </>
  );
}
