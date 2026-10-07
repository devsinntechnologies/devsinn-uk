import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Laptop,
  Mail,
  Rocket,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";
import Button from "@/components/ui/button";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import SectionDivider from "@/components/ui/SectionDivider";
import JobCard from "@/components/careers/JobCard";
import Reveal from "@/components/careers/Reveal";
import { homeTheme as h } from "@/components/home/homeTheme";
import { SITE_URL } from "@/lib/seo";
import { getActiveJobs } from "@/lib/tmApi";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Devsinn Technologies — join our team building AI automation, SaaS, and custom software.",
  alternates: { canonical: `${SITE_URL}/careers` },
  openGraph: {
    title: "Careers at Devsinn Technologies",
    description: "Explore open roles and apply.",
    url: `${SITE_URL}/careers`,
  },
};

export const dynamic = "force-dynamic";

const CV_MAILTO = "mailto:info@devsinntechnologies.com?subject=Career%20enquiry%20%E2%80%94%20CV";

const perks = [
  {
    icon: Rocket,
    title: "Real products, real users",
    text: "Work on AI automation, SaaS platforms, and custom software that clients actually ship and rely on.",
  },
  {
    icon: Users,
    title: "Learn from senior engineers",
    text: "Pair with experienced engineers and consultants, with code reviews that make you better.",
  },
  {
    icon: Laptop,
    title: "Flexible, remote-friendly",
    text: "We care about outcomes and clear communication more than where you open your laptop.",
  },
  {
    icon: GraduationCap,
    title: "Room to grow",
    text: "Pick up new stacks, own features end to end, and take on more responsibility as you're ready.",
  },
];

const steps = [
  { icon: Search, title: "Find your role", text: "Browse open positions and read what each role involves." },
  { icon: UserRound, title: "Create an account", text: "A quick candidate sign-up so you can track your application." },
  { icon: FileText, title: "Share your details", text: "Answer a few questions and upload your CV — we review every one." },
];

export default async function CareersPage() {
  const jobs = await getActiveJobs().catch((error: unknown) => {
    console.error("[careers] Failed to load active jobs:", error instanceof Error ? error.message : error);
    return [];
  });

  const facts = [
    { value: "15+", label: "Engineers & consultants" },
    { value: "100+", label: "Projects delivered" },
    { value: "8+", label: "Years building software" },
    { value: String(jobs.length), label: jobs.length === 1 ? "Open role" : "Open roles" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        badge="Careers"
        title={
          <>
            Build software that ships, <PageHeroAccent>with people who care</PageHeroAccent>
          </>
        }
        description={
          <>
            We&apos;re a team of engineers and consultants building AI automation, SaaS products, and custom
            software for growing companies. If you like solving real problems and shipping work you&apos;re proud
            of, we&apos;d love to hear from you.
          </>
        }
        actions={
          <>
            <Button id="careers-hero-roles" variant="primary" href="#open-roles" className="w-full sm:w-auto">
              View open roles
            </Button>
            <Button
              id="careers-hero-cv"
              variant="secondary"
              href={CV_MAILTO}
              className="w-full border-teal/40! bg-white! text-teal! shadow-sm hover:border-teal! hover:bg-teal! hover:text-white! sm:w-auto"
            >
              <Mail size={18} strokeWidth={2} aria-hidden />
              Send us your CV
            </Button>
          </>
        }
      >
        <dl className="mx-auto grid w-full max-w-[1000px] grid-cols-2 overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col-reverse px-5 py-6 text-center sm:py-7 ${i % 2 === 1 ? "border-l border-stone" : ""} ${
                i >= 2 ? "border-t border-stone lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="mt-1.5 text-sm text-gray">{fact.label}</dt>
              <dd className="font-display text-2xl font-semibold text-nearblack sm:text-3xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* ── Open roles ── */}
      <section id="open-roles" className={`${h.section} ${h.pad} bg-white scroll-mt-20`}>
        <SectionDivider />
        <div className={`${h.container} max-w-[1080px]`}>
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <Reveal onView>
              <div className={h.badge}>
                <span className={h.badgeDot} />
                <span className={h.badgeLabel}>Open Positions</span>
              </div>
              <h2 className={`${h.sectionTitle} mt-5`}>
                Current <span className="text-teal">openings</span>
              </h2>
            </Reveal>
            {jobs.length > 0 ? (
              <Reveal onView delay={0.05}>
                <p className="text-sm text-gray sm:text-right">
                  {jobs.length} {jobs.length === 1 ? "role" : "roles"} open right now
                </p>
              </Reveal>
            ) : null}
          </div>

          {jobs.length > 0 ? (
            <ul className="space-y-4">
              {jobs.map((job, i) => (
                <li key={job.id}>
                  <Reveal onView delay={Math.min(i * 0.05, 0.3)}>
                    <JobCard job={job} />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal onView>
              <div className="relative overflow-hidden rounded-2xl border border-dashed border-stone bg-offwhite px-6 py-14 text-center sm:px-10">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                  <BriefcaseBusiness size={26} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold! text-nearblack sm:text-2xl">
                  No open positions right now
                </h3>
                <p className="mx-auto mt-3 max-w-[520px] text-base leading-relaxed text-gray">
                  We&apos;re not actively hiring for a specific role at the moment, but we&apos;re always happy to
                  meet great people. Send us your CV and we&apos;ll reach out when something fits.
                </p>
                <div className="mt-7 flex justify-center">
                  <Button id="careers-empty-cv" variant="primary" size="md" href={CV_MAILTO}>
                    <Mail size={16} strokeWidth={2} aria-hidden />
                    Send us your CV
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Why work with us ── */}
      <section className={`${h.section} ${h.pad} ${h.bgSoft}`}>
        <SectionDivider />
        <div className={h.container}>
          <Reveal onView className="mx-auto mb-12 max-w-[720px] text-center">
            <div className={h.badge}>
              <span className={h.badgeDot} />
              <span className={h.badgeLabel}>Life at Devsinn</span>
            </div>
            <h2 className={`${h.sectionTitle} mt-5`}>
              Why work <span className="text-teal">with us</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[580px] text-base leading-relaxed text-gray sm:text-lg">
              A small, senior-led team where your work is visible, your ideas are heard, and you keep learning.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} onView delay={0.05 + i * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <perk.icon size={22} strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold! text-nearblack">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{perk.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to apply + CTA ── */}
      <section className={`${h.section} ${h.pad} bg-white`}>
        <SectionDivider />
        <div className={`${h.container} max-w-[1080px]`}>
          <Reveal onView className="mx-auto mb-10 max-w-[720px] text-center">
            <div className={h.badge}>
              <span className={h.badgeDot} />
              <span className={h.badgeLabel}>How to Apply</span>
            </div>
            <h2 className={`${h.sectionTitle} mt-5`}>
              Three simple <span className="text-teal">steps</span>
            </h2>
          </Reveal>

          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal onView delay={0.05 + i * 0.06} className="h-full">
                  <div className="relative h-full rounded-2xl border border-stone bg-offwhite p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal shadow-sm">
                        <step.icon size={20} strokeWidth={2} aria-hidden />
                      </span>
                      <span className="font-display text-3xl font-semibold text-stone">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold! text-nearblack">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal onView delay={0.1}>
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-stone bg-[#f4f7f9] px-6 py-10 sm:px-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-teal/10 blur-[80px]" aria-hidden />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-[560px]">
                  <h3 className="font-display text-xl font-semibold! text-nearblack sm:text-2xl">
                    Don&apos;t see the right role?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-gray">
                    Tell us what you&apos;re great at. Email your CV to{" "}
                    <a href={CV_MAILTO} className="font-medium text-teal underline-offset-4 hover:underline">
                      info@devsinntechnologies.com
                    </a>{" "}
                    and we&apos;ll keep you in mind for future openings.
                  </p>
                </div>
                <Button id="careers-cta-cv" variant="primary" size="md" href={CV_MAILTO} className="shrink-0">
                  Send us your CV
                  <ArrowRight size={16} strokeWidth={2} aria-hidden />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
