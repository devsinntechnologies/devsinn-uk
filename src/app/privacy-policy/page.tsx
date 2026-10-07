import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { InfoPage } from "@/components/static/InfoPage";
import { privacyContent } from "@/data/company-pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Devsinn Technologies collects, uses, stores, and protects personal information shared through devsinntechnologies.com and our business communications.",
  alternates: {
    canonical: "https://www.devsinntechnologies.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <InfoPage {...privacyContent} />
      <Footer />
    </>
  );
}
