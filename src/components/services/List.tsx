import Link from "next/link";
import { ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import PageSection, { cardClass, cardHoverClass, iconChipClass } from "./PageSection";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";

type Service = (typeof servicesData)[number];

function excerpt(text: string, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex h-full flex-col p-6 sm:p-7 ${cardClass} ${cardHoverClass}`}
    >
      <div className="flex items-center gap-4">
        <span className={iconChipClass}>
          <ServiceIcon slug={service.slug} />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
          {service.heroEyebrow}
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold! leading-snug text-nearblack sm:text-[22px]">
        {service.label}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-gray sm:text-[15px]">{excerpt(service.mainDescription)}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {service.highlights.slice(0, 3).map((item) => (
          <li
            key={item.title}
            className="rounded-full border border-stone bg-offwhite px-3 py-1 text-xs font-medium text-nearblack"
          >
            {item.title}
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-teal">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

/** Services grid for /services (the four core services from services.json). */
export default function List() {
  return (
    <PageSection tone="white" id="services">
      <HomeSectionHeader
        badge="What We Do"
        title="Four focused services"
        description="Scoped deliverables and clear timelines — pick the engagement that matches where your product is today."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {servicesData.slice(0, 4).map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.05} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </PageSection>
  );
}
