"use client";

import Button from "@/components/ui/button";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";

const facts = [
  { value: "8+", label: "Years building software" },
  { value: "100+", label: "Projects delivered" },
  { value: "US · UK", label: "Clients we serve" },
  { value: "100%", label: "Code & IP ownership" },
];

export default function Hero() {
  return (
    <PageHero
      badge="About Devsinn Technologies"
      title={
        <>
          The engineering team behind <PageHeroAccent>products that ship</PageHeroAccent>
        </>
      }
      description="We help startups and growing businesses build AI automation, SaaS products, and custom software — with senior engineers, transparent sprints, and support long after launch."
      actions={
        <>
          <Button id="about-hero-call" variant="primary" href="/offers/fit-call">
            Book a Free Strategy Call
          </Button>
          <Button id="about-hero-work" variant="secondary" href="/case-studies">
            See Our Work
          </Button>
        </>
      }
    >
      <dl className="mx-auto grid w-full max-w-[1000px] grid-cols-2 overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] lg:grid-cols-4">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`px-5 py-6 text-center sm:py-7 ${i % 2 === 1 ? "border-l border-stone" : ""} ${
              i >= 2 ? "border-t border-stone lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-display text-2xl font-semibold text-nearblack sm:text-3xl">{fact.value}</dd>
            <dd className="mt-1.5 text-sm text-gray">{fact.label}</dd>
          </div>
        ))}
      </dl>
    </PageHero>
  );
}
