import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import Hero from "@/components/services/Hero";
import List from "@/components/services/List";
import OfferCard from "@/components/services/OfferCard";
import PageSection from "@/components/services/PageSection";
import Reveal from "@/components/services/Reveal";
import type { OfferCardData } from "@/lib/pricing";

/** /services page body: hero → services grid → ways to start (offers) → final CTA. */
export default function ServicesPageClient({ offers }: { offers: OfferCardData[] }) {
  return (
    <>
      <Hero />
      <List />
      {offers.length > 0 && (
        <PageSection tone="offwhite" id="ways-to-start">
          <HomeSectionHeader
            badge="Ways to Start"
            title="Not sure where to begin?"
            description="Start small with a free call or a fixed-scope audit or sprint, then scale into a longer engagement when it makes sense."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, i) => (
              <Reveal key={offer.slug} delay={i * 0.04} className="h-full">
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        </PageSection>
      )}
      <FinalCTA />
      <Footer />
    </>
  );
}
