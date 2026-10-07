import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import Button from "@/components/ui/button";

/** /services page header — shared PageHero so it matches the home theme. */
export default function Hero() {
  return (
    <PageHero
      badge="Our Services"
      title={
        <>
          Our Core Services. One Focused <PageHeroAccent>Engineering Partner.</PageHeroAccent>
        </>
      }
      description="We focus on building, automating, scaling, and maintaining products with production-grade engineering blueprints."
      actions={
        <>
          <Button id="services-hero-consultation" variant="primary" href="/contact">
            Book a Free Consultation
          </Button>
          <Button id="services-hero-offers" variant="secondary" href="#ways-to-start">
            See Ways to Start
          </Button>
        </>
      }
      compact
    />
  );
}
