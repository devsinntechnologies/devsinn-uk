import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/ui/button";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { homeTheme as h } from "@/components/home/homeTheme";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Case Studies — Measurable Outcomes from Real Projects",
  description:
    "Outcome-led case studies: ChatSupplies, Drafidox, Smart Logo Maker, and DigiNizam. Problem, solution, stack, metrics, and business impact.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <div className="bg-white text-nearblack">
        <PageHero
          badge="Case Studies"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
          title={
            <>
              Real projects. <PageHeroAccent>Practical impact.</PageHeroAccent>
            </>
          }
          description="Honest write-ups of the systems we built, the engineering choices we made, and the results delivered."
          actions={
            <>
              <Button id="case-studies-hero-cta" variant="primary" href="/contact">
                Book a Free Consultation
              </Button>
              <Button id="case-studies-hero-portfolio" variant="secondary" href="/portfolio">
                View Portfolio
              </Button>
            </>
          }
          compact
        />

        <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
          <div className={h.container}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <FinalCTA />
      <Footer />
    </>
  );
}
