"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/careers/ApplicationForm";
import Reveal from "@/components/careers/Reveal";
import { JobMetaChip, getJobMeta } from "@/components/careers/jobMeta";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import { getCurrentCandidate, getJobById, type PublicJob } from "@/lib/tmApi";

/**
 * The application "required questions" get their own page (not a dialog) so there's room to
 * fill them in comfortably and a real back button / URL to return to. Requires the candidate
 * to already be logged in — if not, bounce back to the job page where the Apply button lives.
 */
export default function ApplyPage() {
  const params = useParams<{ jobId: string }>();
  const jobId = String(params?.jobId || "");
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [job, setJob] = useState<PublicJob | null>(null);

  useEffect(() => {
    if (!jobId) return;
    (async () => {
      const [candidate, jobData] = await Promise.all([getCurrentCandidate(), getJobById(jobId)]);
      setJob(jobData);
      if (!candidate) {
        router.replace(`/careers/${jobId}`);
        return;
      }
      setAuthorized(true);
      setChecking(false);
    })();
  }, [jobId, router]);

  if (checking) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-offwhite px-6 pt-32 pb-20">
        <div className="flex items-center gap-3 text-sm text-gray" role="status">
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border-2 border-teal border-t-transparent"
          />
          Loading your application…
        </div>
      </section>
    );
  }

  if (!authorized || !job) return null;

  const meta = getJobMeta(job);

  return (
    <>
      <PageHero
        align="left"
        compact
        badge="Application"
        title={
          <>
            Apply for <PageHeroAccent>{job.title}</PageHeroAccent>
          </>
        }
        description={
          <>
            Fill in the details below to submit your application. Fields marked{" "}
            <span className="text-red-500">*</span> are required.
          </>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${jobId}` },
          { label: "Apply" },
        ]}
      >
        {meta.length > 0 ? (
          <div className="-mt-4 flex flex-wrap gap-2">
            {meta.map((item) => (
              <JobMetaChip key={item.key} item={item} />
            ))}
          </div>
        ) : null}
      </PageHero>

      <section className="relative bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-16">
        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          <Reveal className="max-w-[860px]">
            <ApplicationForm jobId={jobId} jobTitle={job.title} />
          </Reveal>
        </div>
      </section>
      <Footer />
    </>
  );
}
