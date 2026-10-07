"use client";

import { Download } from "lucide-react";
import Button from "@/components/ui/button";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";

/** Portfolio page header — uses the shared light PageHero. */
export default function Hero() {
  return (
    <PageHero
      badge="Our Selected Work"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      title={
        <>
          Showcasing excellence through <PageHeroAccent>our work.</PageHeroAccent>
        </>
      }
      description="Web and mobile products we have designed and engineered — from marketing sites and SaaS platforms to native apps."
      actions={
        <>
          <a
            href="/pdf/Devsinn-Technologies-Portfolio.pdf"
            download="Devsinn-Technologies-Portfolio.pdf"
            className="btn-sweep sweep-secondary inline-flex min-h-[56px] w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-teal bg-teal px-8 text-[16px] font-medium text-offwhite shadow-sm transition-all duration-200 hover:border-nearblack focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/35 focus-visible:ring-offset-2 sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
              <Download aria-hidden className="h-4 w-4" />
              Download Portfolio
            </span>
          </a>
          <Button href="/contact" variant="secondary" size="lg">
            Get in Touch
          </Button>
        </>
      }
      compact
    />
  );
}
