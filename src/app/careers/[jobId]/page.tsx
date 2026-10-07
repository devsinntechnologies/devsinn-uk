import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionDivider from "@/components/ui/SectionDivider";
import ApplySection from "@/components/careers/ApplySection";
import Reveal from "@/components/careers/Reveal";
import { JobMetaChip, getJobMeta, splitList } from "@/components/careers/jobMeta";
import { homeTheme as h } from "@/components/home/homeTheme";
import { SITE_URL } from "@/lib/seo";
import { getJobById } from "@/lib/tmApi";

interface Props {
  params: Promise<{ jobId: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getJobById(jobId);
  if (!job) return {};
  return {
    title: job.title,
    description: job.description?.slice(0, 160) || `Apply for ${job.title} at Devsinn Technologies.`,
    alternates: { canonical: `${SITE_URL}/careers/${jobId}` },
  };
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-teal/20 bg-teal/[0.06] px-3 py-1.5 text-[13px] font-medium text-nearblack"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function JobDetailPage({ params }: Props) {
  const { jobId } = await params;
  const job = await getJobById(jobId);
  if (!job) notFound();

  const headerMeta = getJobMeta(job);
  const summaryMeta = getJobMeta(job, { includeExtras: true });
  const skills = splitList(job.skills);
  const stack = splitList(job.technology_stack);

  return (
    <>
      {/* ── Job header ── */}
      <PageHero
        align="left"
        compact
        badge={job.department || "Open Role"}
        title={job.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title },
        ]}
      >
        {headerMeta.length > 0 ? (
          <div className="-mt-4 flex flex-wrap gap-2">
            {headerMeta.map((item) => (
              <JobMetaChip key={item.key} item={item} />
            ))}
          </div>
        ) : null}
      </PageHero>

      {/* ── Body ── */}
      <section className={`${h.section} bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-16`}>
        <SectionDivider />
        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <div className="space-y-6">
            {job.description ? (
              <Reveal onView>
                <article className="rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-8">
                  <h2 className="font-display text-xl font-semibold! text-nearblack">About the role</h2>
                  <p className="mt-4 whitespace-pre-line text-base leading-[1.75] text-gray">{job.description}</p>
                </article>
              </Reveal>
            ) : null}

            {skills.length > 0 ? (
              <Reveal onView delay={0.05}>
                <div className="rounded-2xl border border-stone bg-white p-6 sm:p-8">
                  <h2 className="font-display text-lg font-semibold! text-nearblack">Skills we&apos;re looking for</h2>
                  <ChipList items={skills} />
                </div>
              </Reveal>
            ) : null}

            {stack.length > 0 ? (
              <Reveal onView delay={0.1}>
                <div className="rounded-2xl border border-stone bg-white p-6 sm:p-8">
                  <h2 className="font-display text-lg font-semibold! text-nearblack">Technology stack</h2>
                  <ChipList items={stack} />
                </div>
              </Reveal>
            ) : null}

            {!job.description && skills.length === 0 && stack.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone bg-offwhite p-6 text-base text-gray sm:p-8">
                Full details for this role will be shared during the first conversation. Apply and we&apos;ll be in
                touch.
              </div>
            ) : null}
          </div>

          {/* ── Sticky apply card ── */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">Role summary</p>
                {summaryMeta.length > 0 ? (
                  <dl className="mt-4 divide-y divide-stone">
                    {summaryMeta.map((item) => (
                      <div key={item.key} className="flex items-start gap-3 py-3 first:pt-0">
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                          <item.icon size={16} strokeWidth={2} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-xs text-gray">{item.label}</dt>
                          <dd className="text-sm font-medium text-nearblack">{item.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-3 text-sm text-gray">Interested? We&apos;d love to hear from you.</p>
                )}

                <div className="mt-6 border-t border-stone pt-6">
                  <ApplySection jobId={job.id} jobTitle={job.title} />
                </div>
              </div>

              <p className="mt-4 flex items-start gap-2 px-1 text-xs leading-relaxed text-gray">
                <Mail size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-teal" aria-hidden />
                <span>
                  Questions about this role? Email{" "}
                  <a href="mailto:info@devsinntechnologies.com" className="font-medium text-teal hover:underline">
                    info@devsinntechnologies.com
                  </a>
                </span>
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}
