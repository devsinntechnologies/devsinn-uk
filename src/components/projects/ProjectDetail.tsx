import Image from "next/image";
import { Code2, Layers, LayoutTemplate, MonitorSmartphone, Workflow } from "lucide-react";
import { allProjects, type Project } from "@/lib/projects";
import PageHero from "@/components/ui/PageHero";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeTheme as h } from "@/components/home/homeTheme";
import Button from "@/components/ui/button";
import ScreenshotGallery from "@/components/case-studies/ScreenshotGallery";
import ProjectCard from "@/components/projects/ProjectCard";

type ProjectDetailProps = {
  project: Project;
};

const cardClass =
  "rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]";
const iconBoxClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal/20 bg-teal/10 text-teal";

const focusAreas = [
  {
    icon: LayoutTemplate,
    title: "Strategic UX architecture",
    body: "Clear navigation paths and layouts that build trust quickly and guide first-time users towards the key actions.",
  },
  {
    icon: Workflow,
    title: "Performance-minded engineering",
    body: "Modular, maintainable code built to load fast and scale alongside the product's audience.",
  },
];

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const isApp = project.categoryKey === "appDev";

  const moreProjects = allProjects
    .filter((p) => p.categoryKey === project.categoryKey && p.slug !== project.slug)
    .slice(0, 3);

  const facts = [
    { icon: Layers, label: "Category", value: project.categoryLabel },
    { icon: MonitorSmartphone, label: "Platform", value: isApp ? "Mobile app" : "Web" },
    {
      icon: Code2,
      label: "Key technologies",
      value: project.technologies.slice(0, 3).map((t) => t.name).join(", ") || "—",
    },
  ];

  return (
    <div className="bg-white text-nearblack">
      {/* 1. Hero */}
      <PageHero
        align="left"
        badge={project.categoryLabel}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
        title={project.title}
        description={project.about}
        actions={
          <>
            <Button href="/contact" variant="primary" size="lg">
              Start a Similar Project
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg">
              Back to Portfolio
            </Button>
          </>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch">
          {/* Showcase in a light frame */}
          <div className={`${cardClass} overflow-hidden p-2 sm:p-3`}>
            {isApp ? (
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-stone bg-[#f4f7f9]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute h-64 w-64 rounded-full bg-teal/10 blur-3xl"
                />
                <div className="relative h-[86%] aspect-[9/19] overflow-hidden rounded-[1.75rem] border border-stone bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(16,24,40,0.35)]">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-offwhite">
                    <Image
                      src={project.mainImage}
                      alt={`${project.title} app screen`}
                      fill
                      priority
                      sizes="260px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="group overflow-hidden rounded-xl border border-stone bg-white">
                <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-stone bg-offwhite px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-stone" />
                  <span className="h-2.5 w-2.5 rounded-full bg-stone" />
                  <span className="h-2.5 w-2.5 rounded-full bg-stone" />
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-offwhite">
                  <Image
                    src={project.mainImage}
                    alt={`${project.title} screenshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover object-top transition-[object-position] duration-[6000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none motion-reduce:group-hover:object-top"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick facts */}
          <div className="grid gap-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className={`${cardClass} flex items-start gap-4 p-5`}>
                <span className={iconBoxClass}>
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-nearblack">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* 2. Overview */}
      <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
        <div className={h.container}>
          <HomeSectionHeader
            badge="Overview"
            title="Crafted for clarity, speed and scale."
            description="Every detail is designed with the product's users and business goals in mind."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {focusAreas.map(({ icon: Icon, title, body }) => (
              <article key={title} className={`${cardClass} p-7`}>
                <span className={iconBoxClass}>
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold! text-nearblack">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Key screens */}
      {project.sneakPeekImages.length > 0 && (
        <section className={`${h.section} ${h.bgBand} ${h.pad}`}>
          <div className={h.container}>
            <HomeSectionHeader
              badge="Interface walkthrough"
              title="A closer look at the key screens."
              description="Select any screen to view it full size."
            />
            <ScreenshotGallery
              screenshots={project.sneakPeekImages}
              title={project.title}
              variant={isApp ? "app" : "web"}
            />
          </div>
        </section>
      )}

      {/* 4. Technologies */}
      {project.technologies.length > 0 && (
        <section className={`${h.section} ${h.bgSoft} ${h.pad}`}>
          <div className={h.container}>
            <HomeSectionHeader
              badge="Technologies"
              title="Tools behind the build."
              description="The core stack used to design, build and ship this project."
            />
            <div className={`${cardClass} p-7`}>
              <ul className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <li
                    key={`${project.slug}-tech-${tech.name}`}
                    className="inline-flex items-center gap-2.5 rounded-full border border-stone bg-white py-1.5 pl-1.5 pr-4 text-sm text-nearblack"
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f7f9]">
                      <Image src={tech.logo} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                    </span>
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 5. More projects */}
      {moreProjects.length > 0 && (
        <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
          <div className={h.container}>
            <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <HomeSectionHeader
                className="mb-0! sm:mb-0!"
                badge="Keep exploring"
                title={`More ${project.categoryLabel.toLowerCase()} projects.`}
                description="Other products from the same part of our portfolio."
              />
              <Button href="/portfolio" variant="secondary" size="md">
                Full portfolio
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreProjects.map((item, index) => (
                <ProjectCard key={`${item.categoryKey}-${item.slug}`} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
