import type { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — AI Automation, SaaS MVP, and App Rescue Guides",
  description:
    "Practical guides on AI automation sprints, SaaS MVP budgeting, app rescue, and product engineering decisions from Devsinn Technologies.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <BlogList />
      <FinalCTA />
      <Footer />
    </>
  );
}
