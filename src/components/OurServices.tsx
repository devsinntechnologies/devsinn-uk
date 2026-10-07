"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Bot, Code2, MonitorCog, Wrench } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "ai-automation",
    label: "AI Automation & Agents",
    icon: Bot,
    problem: "Manual lead follow-up or support eating your week?",
    deliverable: "Automate qualification, CRM handoff, and AI workflows",
    timeframe: "2–4 weeks",
    description:
      "Chatbots, lead qualification, CRM/WhatsApp automation, n8n/Make workflows, and knowledge assistants.",
  },
  {
    id: "saas-mvp",
    label: "SaaS MVP Development",
    icon: MonitorCog,
    problem: "Validated idea but no dependable product team?",
    deliverable: "Scoped MVP with UX, build, admin, and launch plan",
    timeframe: "4–8 weeks",
    description:
      "Multi-tenant platforms with billing, client portals, and AI features built to convert users.",
  },
  {
    id: "software-development",
    label: "Custom Software",
    icon: Code2,
    problem: "Outgrown spreadsheets and generic tools?",
    deliverable: "Dashboards, CRMs, portals, and internal ops software",
    timeframe: "3–10 weeks",
    description:
      "Dashboards, CRM tools, internal apps, scheduling software, and role-based client portals.",
  },
  {
    id: "app-rescue-maintenance",
    label: "App Rescue & Maintenance",
    icon: Wrench,
    problem: "Broken releases, slow app, or no technical support?",
    deliverable: "Audit, stabilization, fixes, and maintenance path",
    timeframe: "1 week sprint + retainer",
    description:
      "Technical debt reviews, performance fixes, bug sprints, and reliable maintenance retainers.",
  },
];

const CARD_WAVE = { a: "#7B9CFF", b: "#015CFF", c: "#B8CCFF" };

function ServiceCardWave({ className = "" }: { className?: string }) {
  const colors = CARD_WAVE;
  const id = "svc-wave";

  return (
    <div
      className={`pointer-events-none h-full w-full overflow-hidden transition-opacity duration-500 group-hover:opacity-25 [.service-card-active_&]:opacity-25 ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-g1`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.b} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors.a} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`${id}-g2`} x1="100%" y1="100%" x2="0%" y2="20%">
            <stop offset="0%" stopColor={colors.c} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.a} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 260 C80 180 120 200 200 150 C280 100 320 120 400 80 L400 260 Z"
          fill={`url(#${id}-g1)`}
        />
        <path
          d="M0 260 C60 210 140 230 220 190 C300 150 340 170 400 130 L400 260 Z"
          fill={`url(#${id}-g2)`}
          opacity="0.85"
        />
        <path
          d="M0 260 Q120 200 240 220 T400 190 L400 260 Z"
          fill={colors.c}
          opacity="0.55"
        />
      </svg>
    </div>
  );
}

function PremiumServiceCard({
  service,
  href,
  className = "",
  highlighted = false,
}: {
  service: (typeof services)[number];
  href: string;
  className?: string;
  highlighted?: boolean;
}) {
  const active = highlighted;

  return (
    <Link
      href={href}
      className={`service-card group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-16px_rgba(1,92,255,0.45)] xl:rounded-[1.35rem] ${
        active ? "service-card-active -translate-y-1 shadow-[0_28px_56px_-16px_rgba(1,92,255,0.45)]" : ""
      } ${className}`}
    >
      {/* Bottom → top brand fill on hover */}
      <span
        className={`pointer-events-none absolute inset-0 z-[2] origin-bottom bg-[#015CFF] transition-transform duration-[580ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
        }`}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/15 via-transparent to-white/10 transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col px-5 pb-3 pt-5">
        <h3
          className={`line-clamp-2 font-[family-name:var(--font-poppins)] text-lg font-semibold leading-snug transition-colors duration-300 xl:text-[1.15rem] ${
            active ? "text-white" : "text-nearblack group-hover:text-white"
          }`}
        >
          {service.label}
        </h3>

        <p
          className={`mt-2 line-clamp-3 font-[family-name:var(--font-poppins)] text-sm leading-[1.55] transition-colors duration-300 xl:text-[15px] ${
            active ? "text-white/95" : "text-gray group-hover:text-white/95"
          }`}
        >
          {service.description}
        </p>

        <span
          className={`mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
            active ? "text-white" : "text-nearblack group-hover:text-white"
          }`}
        >
          Learn more
          <ArrowRight size={14} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="relative z-[1] h-[5.25rem] shrink-0 sm:h-[5.5rem]">
        <ServiceCardWave />
      </div>
    </Link>
  );
}

export default function OurServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(".service-card", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-row",
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReduced || isDesktop) return;

    const interval = window.setInterval(() => {
      setActiveMobileIndex((current) => {
        const next = (current + 1) % services.length;
        const track = mobileTrackRef.current;
        const card = track?.children[next] as HTMLElement | undefined;
        if (track && card) {
          track.scrollTo({
            left: card.offsetLeft - track.offsetLeft,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative overflow-hidden bg-nearblack px-5 pt-16 pb-14 text-white sm:px-8 sm:pt-20 sm:pb-16 lg:px-10 lg:pt-24 lg:pb-20 xl:px-16"
    >
      <SectionDivider variant="dark" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <HomeSectionHeader
            theme="dark"
            className="mb-0 sm:mb-0"
            badge="Our Services"
            title={
              <>
                Our <span className="text-[#015CFF]">Services</span>
              </>
            }
            description="Software engineering with clear roadmaps, clean execution, and outcomes you can measure."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white lg:pb-1"
          >
            View all services
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
        </div>

        {/* Mobile: horizontal snap */}
        <div
          ref={mobileTrackRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide lg:hidden"
          onScroll={() => {
            const track = mobileTrackRef.current;
            if (!track) return;

            const cards = Array.from(track.children) as HTMLElement[];
            const nearestIndex = cards.reduce((closest, card, index) => {
              const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft - track.offsetLeft);
              const closestCard = cards[closest];
              const closestDistance = Math.abs(closestCard.offsetLeft - track.scrollLeft - track.offsetLeft);
              return currentDistance < closestDistance ? index : closest;
            }, 0);

            setActiveMobileIndex(nearestIndex);
          }}
        >
          {services.map((service, index) => (
            <PremiumServiceCard
              key={service.id}
              service={service}
              href={`/services/${service.id}`}
              highlighted={activeMobileIndex === index}
              className="w-[272px] shrink-0 snap-center sm:w-[288px]"
            />
          ))}
        </div>

        {/* Desktop: tall vertical cards in one row (reference layout) */}
        <div className="services-row hidden lg:grid lg:grid-cols-4 lg:items-stretch lg:gap-4 xl:gap-5">
          {services.map((service, index) => (
            <PremiumServiceCard
              key={service.id}
              service={service}
              href={`/services/${service.id}`}
              className="h-full min-w-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
