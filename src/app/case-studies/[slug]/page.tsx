import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Button from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeTheme as h } from "@/components/home/homeTheme";
import ScreenshotGallery from "@/components/case-studies/ScreenshotGallery";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  return {
    title: `${study.title} — Case Study`,
    description: `${study.tagline}. See how we solved ${study.industry} challenges with ${study.techStack.slice(0, 3).join(", ")}.`,
    alternates: {
      canonical: `https://www.devsinntechnologies.com/case-studies/${slug}`,
    },
    openGraph: {
      title: `${study.title} — Case Study | Devsinn Technologies`,
      description: study.tagline,
      url: `https://www.devsinntechnologies.com/case-studies/${slug}`,
    },
  };
}


const cardClass =
  "rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";
const accentPillClass =
  "rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-medium text-teal";
const iconBoxClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal/20 bg-teal/10 text-teal";

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const otherStudies = caseStudies.filter((s) => s.slug !== slug).slice(0, 3);

  const facts = [
    { icon: Building2, label: "Industry", value: study.industry },
    { icon: Layers, label: "Project type", value: study.category },
    { icon: Users, label: "Client context", value: study.clientContext },
  ];

  return (
    <>
      <div className="bg-white text-nearblack">
        {/* 1. Hero */}
        <PageHero
          align="left"
          badge={study.industry}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies" },
            { label: study.title },
          ]}
          title={study.title}
          description={study.tagline}
          actions={
            <>
              <Button id="case-study-hero-cta" variant="primary" href="/contact">
                Build Something Similar
              </Button>
              <Button
                id="case-study-hero-service"
                variant="secondary"
                href={`/services/${study.relatedService}`}
              >
                Explore Service
              </Button>
            </>
          }
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch">
            <div className={`${cardClass} overflow-hidden p-2 sm:p-3`}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-stone bg-[#f4f7f9]">
                <Image
                  src={study.heroImage}
                  alt={`${study.title} case study preview`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className={`${cardClass} flex items-start gap-4 p-5`}>
                  <span className={iconBoxClass}>
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-nearblack">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageHero>

        {/* 2. Overview: challenge + solution */}
        <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
          <div className={h.container}>
            <HomeSectionHeader
              badge="Overview"
              title="The problem and how we approached it."
              description={`What ${study.title} needed, and the system we designed and shipped to solve it.`}
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <article className={`${cardClass} p-7`}>
                <span className={iconBoxClass}>
                  <Target aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold! text-nearblack">
                  The Challenge
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray">{study.challenge}</p>
              </article>
              <article className={`${cardClass} p-7`}>
                <span className={iconBoxClass}>
                  <Lightbulb aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold! text-nearblack">
                  The Solution
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray">{study.solution}</p>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Results */}
        <section className={`${h.section} ${h.bgBand} ${h.pad}`}>
          <div className={h.container}>
            <HomeSectionHeader
              badge="Results"
              title="Measurable outcomes."
              description="The practical difference the build made for the team and the business."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {study.metrics.map((metric) => (
                <div key={metric.label} className={`${cardClass} relative overflow-hidden p-7`}>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal to-[#7B9CFF]"
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">
                    {metric.label}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-nearblack sm:text-2xl">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className={`${cardClass} mt-6 p-7`}>
              <div className="flex items-center gap-3">
                <span className={iconBoxClass}>
                  <TrendingUp aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold! text-nearblack">
                  Business impact
                </h3>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {study.businessImpact.map((impact) => (
                  <li key={impact} className="flex items-start gap-3 text-base leading-relaxed text-gray">
                    <CheckCircle2 aria-hidden className="mt-1 h-4 w-4 shrink-0 text-teal" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Features + tech stack */}
        <section className={`${h.section} ${h.bgSoft} ${h.pad}`}>
          <div className={h.container}>
            <HomeSectionHeader
              badge="What we built"
              title="Core features and stack."
              description="The capabilities we engineered and the technologies behind them."
            />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
              <ul className="grid gap-4 sm:grid-cols-2">
                {study.features.map((feature) => (
                  <li key={feature} className={`${cardClass} flex items-start gap-3 p-5`}>
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <span className="text-sm leading-relaxed text-nearblack">{feature}</span>
                  </li>
                ))}
              </ul>

              <aside className="flex flex-col gap-6">
                <div className={`${cardClass} p-7`}>
                  <h3 className="font-display text-lg font-semibold! text-nearblack">Tech stack</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.techStack.map((tech) => (
                      <span key={tech} className={accentPillClass}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${cardClass} p-7`}>
                  <h3 className="font-display text-lg font-semibold! text-nearblack">
                    Related service
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">
                    See how we deliver this kind of project end to end.
                  </p>
                  <Link
                    href={`/services/${study.relatedService}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal underline-offset-4 hover:underline"
                  >
                    Explore related service
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. Screenshots */}
        {study.screenshots.length > 0 && (
          <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
            <div className={h.container}>
              <HomeSectionHeader
                badge="Screenshots"
                title="A closer look at the product."
                description="Select any screen to view it full size."
              />
              <ScreenshotGallery screenshots={study.screenshots} title={study.title} />
            </div>
          </section>
        )}

        {/* 6. More case studies */}
        {otherStudies.length > 0 && (
          <section className={`${h.section} ${h.bgBand} ${h.pad}`}>
            <div className={h.container}>
              <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                <HomeSectionHeader
                  className="mb-0! sm:mb-0!"
                  badge="Keep exploring"
                  title="More case studies."
                  description="Other products we have designed, built and shipped."
                />
                <Button id="case-study-all" variant="secondary" size="md" href="/case-studies">
                  All case studies
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherStudies.map((other) => (
                  <CaseStudyCard key={other.slug} study={other} compact />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <FinalCTA />
      <Footer />
    </>
  );
}
