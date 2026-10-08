"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Calendar,
  CalendarClock,
  Check,
  ClipboardCheck,
  Lightbulb,
  List,
  Monitor,
  Settings2,
  Users,
} from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { homeTheme as h } from "@/components/home/homeTheme";

const BLUE = "#015CFF";

const STEPS = [
  { id: "performance", index: "01", label: "Performance" },
  { id: "forecasts", index: "02", label: "Forecasts" },
  { id: "actions", index: "03", label: "Actions" },
  { id: "fulfilment", index: "04", label: "Fulfilment" },
] as const;

function FeatureRow({
  icon: Icon,
  children,
}: {
  icon: typeof Calendar;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-stone bg-white px-3 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <p className="text-sm font-medium leading-snug text-nearblack sm:text-[15px]">
        {children}
      </p>
    </li>
  );
}

function VisualCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D7E4F7] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(1,92,255,0.28)] sm:p-6">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-teal/[0.06]"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function PerformanceVisual() {
  const days = [
    { d: "Mon", h: 28 },
    { d: "Tue", h: 40 },
    { d: "Wed", h: 48 },
    { d: "Thu", h: 66 },
    { d: "Fri", h: 92 },
  ];
  const rows = [
    { Icon: Calendar, label: "Bookings", value: "128", chip: "#C8F3E6", status: "On track" },
    { Icon: Users, label: "Staff load", value: "74%", chip: "#FFE6C4", status: "Busy" },
    { Icon: List, label: "Services", value: "9 open", chip: "#FFD4D6", status: "Pending" },
  ];

  return (
    <VisualCard>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex gap-1">
            <i className="h-2 w-2 rounded-full bg-[#FFB4B4]" />
            <i className="h-2 w-2 rounded-full bg-[#FFE6A3]" />
            <i className="h-2 w-2 rounded-full bg-[#B8E6C8]" />
          </span>
          <span className="text-[12px] font-semibold text-nearblack">Operations dashboard</span>
        </div>
        <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-medium text-teal">
          Live
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-xl bg-[#F4F8FF] px-3 pb-2 pt-3">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray">
            Weekly volume
          </p>
          <div className="flex h-36 items-end gap-2">
            {days.map((day, i) => (
              <div key={day.d} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-28 w-full items-end">
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${day.h}%`,
                      backgroundColor: i === days.length - 1 ? BLUE : "#8BB4FF",
                    }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray">{day.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl bg-[#F4F8FF] px-3 py-4">
          <div className="relative h-[120px] w-[120px]">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="34" fill="none" stroke="#E1EAF8" strokeWidth="12" />
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke={BLUE}
                strokeWidth="12"
                strokeDasharray="160 214"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <Check className="h-5 w-5 text-teal" strokeWidth={2.5} />
              <span className="mt-0.5 text-lg font-semibold text-nearblack">72%</span>
            </span>
          </div>
          <p className="mt-2 text-center text-[12px] font-medium text-gray">Services completed</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {rows.map(({ Icon, label, value, chip, status }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl bg-[#F7FAFF] px-3 py-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-teal shadow-sm">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-gray">{label}</p>
              <p className="text-sm font-semibold text-nearblack">{value}</p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium text-nearblack"
              style={{ backgroundColor: chip }}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

function ForecastVisual() {
  return (
    <VisualCard>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-nearblack">Appointment demand</p>
        <div className="flex items-center gap-3 text-[11px] font-medium">
          <span className="flex items-center gap-1.5 text-gray">
            <i className="h-0.5 w-4 bg-teal" /> Historical
          </span>
          <span className="flex items-center gap-1.5 text-gray">
            <i className="h-0.5 w-4 border-t border-dashed border-teal" /> Forecast
          </span>
        </div>
      </div>
      <svg viewBox="0 0 560 260" className="h-auto w-full">
        <defs>
          <linearGradient id="forecastFillA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.18" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[48, 88, 128, 168].map((y) => (
          <line key={y} x1="56" y1={y} x2="536" y2={y} stroke="#EEF2F8" />
        ))}
        <line x1="56" y1="20" x2="56" y2="200" stroke="#D9E2EF" />
        <line x1="56" y1="200" x2="536" y2="200" stroke="#D9E2EF" />
        <path
          d="M56 150 C100 122, 130 168, 175 118 S240 142, 278 124"
          fill="none"
          stroke={BLUE}
          strokeWidth="3"
        />
        <path
          d="M56 150 C100 122, 130 168, 175 118 S240 142, 278 124 L278 200 L56 200 Z"
          fill="url(#forecastFillA)"
        />
        <line x1="278" y1="28" x2="278" y2="200" stroke="#A9C0DE" strokeDasharray="5 6" />
        <path
          d="M278 124 C328 96, 358 158, 404 122 S478 160, 528 108"
          fill="none"
          stroke={BLUE}
          strokeWidth="3"
          strokeDasharray="7 8"
        />
        <path
          d="M278 124 C328 96, 358 158, 404 122 S478 160, 528 108 L528 200 L278 200 Z"
          fill="url(#forecastFillA)"
        />
        <circle cx="278" cy="124" r="7" fill={BLUE} />
        <rect x="214" y="86" width="128" height="26" rx="8" fill="white" stroke="#D7E4F7" />
        <text x="278" y="104" textAnchor="middle" fill="#12203A" fontSize="11" fontWeight="600">
          Today · 42 bookings
        </text>
        <text x="150" y="18" fill="#6B6B66" fontSize="11">
          Historical data
        </text>
        <text x="400" y="18" fill="#6B6B66" fontSize="11">
          Forecast
        </text>
        <text x="268" y="226" fill="#6B6B66" fontSize="12">
          Time
        </text>
        <text x="12" y="120" fill="#6B6B66" fontSize="10" transform="rotate(-90 12 120)">
          Demand
        </text>
      </svg>
      <div className="mt-1 grid grid-cols-3 gap-2">
        {[
          { k: "Next week", v: "+18%" },
          { k: "Peak day", v: "Saturday" },
          { k: "Staff needed", v: "6 extra" },
        ].map((item) => (
          <div key={item.k} className="rounded-lg bg-[#F4F8FF] px-3 py-2">
            <p className="text-[11px] text-gray">{item.k}</p>
            <p className="text-sm font-semibold text-nearblack">{item.v}</p>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

function ActionsVisual() {
  const outputs = [
    { Icon: Calendar, label: "Scheduling", detail: "Shift coverage" },
    { Icon: Users, label: "Task allocation", detail: "Assign owners" },
    { Icon: Bell, label: "Alerts & follow-ups", detail: "Client reminders" },
  ];

  return (
    <VisualCard>
      <p className="mb-4 text-sm font-semibold text-nearblack">How the workflow runs</p>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <div className="rounded-xl border border-[#D7E4F7] bg-[#F4F8FF] px-4 py-4 text-center sm:w-[132px] sm:text-left">
          <BarChart3 className="mx-auto mb-2 h-6 w-6 text-teal sm:mx-0" />
          <p className="text-[12px] font-semibold leading-snug text-nearblack">
            Forecasts + live data
          </p>
        </div>

        <div className="hidden h-px flex-1 bg-[#C5D6EE] sm:block" />

        <div className="mx-auto flex h-[108px] w-[108px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-teal/30 bg-white text-center shadow-sm">
          <Settings2 className="mb-1 h-6 w-6 text-teal" />
          <span className="text-[11px] font-semibold leading-tight text-nearblack">
            Business
            <br />
            rules
          </span>
        </div>

        <div className="hidden flex-col justify-center gap-[22px] sm:flex">
          <span className="text-[#A8BDD8]">→</span>
          <span className="text-[#A8BDD8]">→</span>
          <span className="text-[#A8BDD8]">→</span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {outputs.map(({ Icon, label, detail }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-[#D7E4F7] bg-[#FAFCFF] px-3 py-2.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-nearblack">{label}</p>
                <p className="text-[11px] text-gray">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[12px] text-gray">Staff can review and override any automated step.</p>
    </VisualCard>
  );
}

function FulfilmentVisual() {
  return (
    <VisualCard>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-nearblack">Completion rate</p>
        <p className="text-[11px] text-gray">Illustrative target</p>
      </div>
      <div className="flex h-52 items-end sm:h-56">
        <div className="flex h-full flex-col justify-between pb-10 pr-3 text-[11px] text-gray">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        <div className="relative flex h-full flex-1 items-end justify-around border-l border-stone pl-6">
          <div className="pointer-events-none absolute inset-x-6 top-0 flex h-[calc(100%-2.5rem)] flex-col justify-between">
            {[0, 1, 2, 3].map((line) => (
              <span key={line} className="block h-px bg-[#EEF2F8]" />
            ))}
          </div>
          <div className="relative z-10 flex w-[88px] flex-col items-center sm:w-[108px]">
            <span className="mb-2 text-base font-semibold text-nearblack">25%</span>
            <div className="w-full rounded-t-md bg-[#9EC0FF]" style={{ height: 52 }} />
            <p className="mt-2 text-center text-[12px] font-medium text-gray">Example baseline</p>
          </div>
          <div className="relative z-10 flex w-[88px] flex-col items-center sm:w-[108px]">
            <span className="mb-2 text-base font-semibold text-nearblack">75%</span>
            <div className="w-full rounded-t-md bg-teal" style={{ height: 156 }} />
            <p className="mt-2 text-center text-[12px] font-medium text-gray">Target 70–80%</p>
          </div>
        </div>
      </div>
    </VisualCard>
  );
}

const SLIDES = [
  {
    id: "performance",
    title: "Performance stats",
    accent: "stats",
    subtitle: "Bring bookings, staff load, and service status into one dashboard.",
    visual: PerformanceVisual,
    points: [
      { Icon: Calendar, text: "Bookings and attendance" },
      { Icon: Users, text: "Staff workload" },
      { Icon: ClipboardCheck, text: "Completed and pending services" },
    ],
  },
  {
    id: "forecasts",
    title: "Demand forecasts",
    accent: "forecasts",
    subtitle: "Use historical trends so planning is based on demand, not guesswork.",
    visual: ForecastVisual,
    points: [
      { Icon: CalendarClock, text: "Anticipate appointment demand" },
      { Icon: Users, text: "Plan staffing and capacity" },
      { Icon: BarChart3, text: "Prepare for busy periods" },
    ],
  },
  {
    id: "actions",
    title: "Automated actions",
    accent: "actions",
    subtitle: "Run agreed rules with staff oversight where it is still needed.",
    visual: ActionsVisual,
    points: [
      { Icon: Calendar, text: "Adjust scheduling" },
      { Icon: Users, text: "Assign tasks automatically" },
      { Icon: Bell, text: "Trigger reminders and alerts" },
    ],
  },
  {
    id: "fulfilment",
    title: "Service fulfilment",
    accent: "fulfilment",
    subtitle: "Track completed work against a clear target, and flag delays early.",
    visual: FulfilmentVisual,
    points: [
      { Icon: ClipboardCheck, text: "Track completed and pending services" },
      { Icon: Users, text: "Assign owners and flag delays" },
      { Icon: Monitor, text: "Monitor progress in one place" },
    ],
    extra: true,
  },
] as const;

const SLIDE_COUNT = SLIDES.length;

function SlideBody({ index }: { index: number }) {
  const slide = SLIDES[index];
  const Visual = slide.visual;
  const [before, after] = (() => {
    const lower = slide.title.toLowerCase();
    const i = lower.lastIndexOf(slide.accent);
    if (i < 0) return [slide.title, ""] as const;
    return [slide.title.slice(0, i), slide.title.slice(i)] as const;
  })();

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
      <Visual />
      <div>
        <h2 className="h2-section max-w-[400px] text-[28px]! leading-tight! sm:text-[32px]! lg:text-[34px]!">
          {before}
          <span className="text-teal">{after}</span>
        </h2>
        <p className="mt-2 max-w-[400px] text-sm leading-relaxed text-gray sm:text-[15px]">
          {slide.subtitle}
        </p>
        <ul className="mt-4 space-y-2">
          {slide.points.map(({ Icon, text }) => (
            <FeatureRow key={text} icon={Icon}>
              {text}
            </FeatureRow>
          ))}
        </ul>
        {"extra" in slide && slide.extra ? (
          <div className="mt-2 flex items-start gap-3 rounded-lg border border-teal/20 bg-teal/5 px-3 py-2.5">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            <div>
              <p className="text-sm font-semibold text-nearblack">How we help</p>
              <p className="mt-0.5 text-sm leading-relaxed text-gray">
                Connect workflows and improve how services are tracked.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function HomeProductShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return undefined;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDE_COUNT),
      5000
    );
    return () => window.clearInterval(id);
  }, [autoPlay, shouldReduceMotion]);

  const goTo = (index: number) => {
    setAutoPlay(false);
    setActive(index);
  };

  return (
    <section
      id="product-platform"
      className={`${h.section} ${h.bgSoft} px-5 py-8 sm:px-8 sm:py-10 lg:px-10`}
      aria-label="Platform capabilities"
      onMouseEnter={() => setAutoPlay(false)}
    >
      <SectionDivider />
      <div className={h.glow} aria-hidden />

      <div className={`${h.container} max-w-[1120px]`}>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className={h.badge}>
              <span className={h.badgeDot} />
              <span className={h.badgeLabel}>Capabilities</span>
            </div>
            <p className="mt-2 max-w-[420px] text-sm leading-relaxed text-gray sm:text-[15px]">
              Dashboards, forecasts, and automation for UK operations teams.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2" aria-label="Capability steps">
            {STEPS.map((step, index) => {
              const isActive = active === index;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                    isActive
                      ? "border-teal bg-white text-nearblack shadow-sm"
                      : "border-stone bg-white text-gray hover:border-teal/40 hover:text-nearblack"
                  }`}
                >
                  <span className="block text-[10px] font-semibold tracking-[0.14em] text-teal">
                    {step.index}
                  </span>
                  <span className="text-[13px] font-medium">{step.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <SlideBody index={active} />
        </div>
      </div>
    </section>
  );
}
