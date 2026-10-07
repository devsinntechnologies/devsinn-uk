export type PathwaySlug = "ai-consultant" | "ai-projects" | "ai-specialist";

export interface PathwayStat {
  value: string;
  label: string;
}

export interface PathwayStep {
  number: string;
  title: string;
  description: string;
}

export interface PathwayCard {
  title: string;
  description: string;
}

export interface PathwayPricingTier {
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

export interface PathwayNextStep {
  label: string;
  title: string;
  description: string;
  href: string;
  current?: boolean;
}

export interface PathwayPage {
  slug: PathwaySlug;
  navLabel: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: PathwayStat[];
  serviceTitle: string;
  serviceTitleAccent: string;
  serviceDescription: string;
  idealFor: string[];
  serviceIncludes: string[];
  stepsTitle: string;
  stepsTitleAccent: string;
  steps: PathwayStep[];
  capabilitiesTitle?: string;
  capabilitiesTitleAccent?: string;
  capabilities?: PathwayCard[];
  pricingNote?: string;
  pricingTiers?: PathwayPricingTier[];
  nextSteps: PathwayNextStep[];
}

/** The three AI services, in order: Advise → Build → Embed. Shared by every pathway page and the home page. */
const serviceStack: Omit<PathwayNextStep, "current">[] = [
  {
    label: "Advise",
    title: "AI Consultant",
    description:
      "Get a ranked, ROI-framed AI roadmap built from your real workflows — before you commit to a build.",
    href: "/ai-consultant",
  },
  {
    label: "Build",
    title: "AI Projects",
    description:
      "Turn a top priority into a fixed-scope build — agents, automations or integrations with clear acceptance criteria.",
    href: "/ai-projects",
  },
  {
    label: "Embed",
    title: "AI Specialist",
    description:
      "Add a vetted specialist to your team, fractional or full-time, working through your prioritised backlog.",
    href: "/ai-specialist",
  },
];

function stackFor(slug: PathwaySlug): PathwayNextStep[] {
  return serviceStack.map((step) => ({ ...step, current: step.href === `/${slug}` }));
}

export const aiPathways: PathwayPage[] = [
  {
    slug: "ai-consultant",
    navLabel: "AI Consultant",
    eyebrow: "AI Consultant",
    metaTitle: "AI Consultant & Adoption Pathway",
    metaDescription:
      "AI adoption planning: workflow diagnostics, ROI-ranked opportunities, and a six-month implementation roadmap from practitioners who ship production systems.",
    headline: "A clear AI plan,",
    headlineAccent: "built from how your business works.",
    subheadline:
      "We map your workflows, rank up to twelve AI opportunities by effort and return, and hand you a six-month roadmap your team can execute.",
    primaryCta: { label: "Book a Consultation", href: "#book-a-call" },
    secondaryCta: { label: "See Pricing", href: "#pricing" },
    stats: [
      { value: "100+", label: "Production deployments delivered" },
      { value: "8+ yrs", label: "Product & AI engineering" },
      { value: "1–2 wks", label: "Typical pathway turnaround" },
      { value: "Ranked", label: "Every initiative scored & sequenced" },
    ],
    serviceTitle: "An adoption plan,",
    serviceTitleAccent: "not a trend report.",
    serviceDescription:
      "We look at how work really flows through your teams, find where automation adds the most value, and turn it into a phased plan with effort bands and ROI framing.",
    idealFor: [
      "Teams stuck in scattered AI experiments",
      "Leaders who need a shared priority list before funding builds",
      "Businesses preparing to brief engineers, an AI Project or a Specialist",
    ],
    serviceIncludes: [
      "Workflow survey across your highest-friction teams",
      "60-minute leadership strategy workshop",
      "Up to 12 AI opportunities, ranked by effort and return",
      "ROI framing per initiative: build cost, time saved, expected value",
      "Six-month phased roadmap and handoff-ready action plan",
    ],
    stepsTitle: "From ambiguity to",
    stepsTitleAccent: "a plan you can fund.",
    steps: [
      {
        number: "01",
        title: "Discovery",
        description: "We map workflows, repeat tasks and bottlenecks across your teams.",
      },
      {
        number: "02",
        title: "Alignment",
        description: "A leadership session on goals, compliance limits and investment appetite.",
      },
      {
        number: "03",
        title: "Prioritise",
        description: "Up to twelve initiatives modelled for cost, impact and risk — then ranked.",
      },
      {
        number: "04",
        title: "Blueprint",
        description:
          "A phased six-month plan, ready to hand to engineering, a Specialist or an AI Project.",
      },
    ],
    pricingNote:
      "Engage an AI Specialist within 30 days and the pathway fee credits against month one (full credit for full-time, 50% for fractional).",
    pricingTiers: [
      {
        name: "AI Adoption Pathway",
        badge: "Fixed fee",
        price: "$2,500",
        period: "One-off · written programme",
        description:
          "Where AI helps your business, what to build first, and how the value compounds over time.",
        features: [
          "Strategy workshop included",
          "Full pathway document with ranked backlog",
          "Fixed fee — no open-ended consulting hours",
          "Remote, leadership-ready delivery",
        ],
        ctaLabel: "Request Adoption Pathway",
        ctaHref: "/contact?type=ai-consultant",
        highlighted: true,
      },
    ],
    nextSteps: stackFor("ai-consultant"),
  },
  {
    slug: "ai-projects",
    navLabel: "AI Projects",
    eyebrow: "AI Projects",
    metaTitle: "Custom AI Projects",
    metaDescription:
      "Fixed-price AI engineering: autonomous agents, workflow automation, enterprise integrations, and RAG systems — scoped, economically framed, and delivered with post-launch support.",
    headline: "Fixed-scope AI builds,",
    headlineAccent: "shipped to production.",
    subheadline:
      "Bring a defined problem. We scope it, fix the price, build to agreed acceptance criteria, and support it after launch.",
    primaryCta: { label: "Scope Your Project", href: "#book-a-call" },
    secondaryCta: { label: "Start with Advisory", href: "/ai-consultant" },
    stats: [
      { value: "100+", label: "AI & product systems shipped" },
      { value: "Fixed", label: "Price agreed before build" },
      { value: "1–2 wks", label: "Typical automation sprint" },
      { value: "Post-launch", label: "Monitoring & iteration options" },
    ],
    serviceTitle: "One initiative.",
    serviceTitleAccent: "End-to-end ownership.",
    serviceDescription:
      "For teams with a clear outcome in mind — automate a workflow, deploy an agent, connect systems or ship an AI feature. You inherit a maintainable system, not technical debt.",
    idealFor: [
      "A known problem with a clear outcome",
      "A single initiative rather than an ongoing roadmap",
      "Teams that want the price fixed before work starts",
    ],
    serviceIncludes: [
      "Discovery to define scope, integrations and success criteria",
      "Written SOW with milestones, acceptance tests and timeline",
      "ROI framing: build cost, efficiency gain, expected return",
      "Engineering, QA, documentation and handover",
      "Optional maintenance for model, API and requirement changes",
    ],
    stepsTitle: "From brief",
    stepsTitleAccent: "to production.",
    steps: [
      {
        number: "01",
        title: "Discover",
        description: "Define the outcome, tech environment, data limits and definition of done.",
      },
      {
        number: "02",
        title: "Scope & price",
        description:
          "A fixed-price SOW with milestones and ROI framing. Build starts only once you approve it.",
      },
      {
        number: "03",
        title: "Build & release",
        description:
          "We build to the agreed architecture with visible progress, then hand over runbooks and training.",
      },
      {
        number: "04",
        title: "Operate",
        description: "Optional support keeps it running as APIs, models and business rules change.",
      },
    ],
    capabilitiesTitle: "What we",
    capabilitiesTitleAccent: "build.",
    capabilities: [
      {
        title: "AI Agents",
        description: "Agents that monitor signals, use tools, make decisions and escalate exceptions.",
      },
      {
        title: "Workflow Automation",
        description: "Automation across sales, ops, finance and support, using the tools you already run.",
      },
      {
        title: "System Integration",
        description: "Connect CRM, ERP, comms and data platforms — no more manual reconciliation.",
      },
      {
        title: "RAG & Knowledge Systems",
        description: "Private AI search over your documents and databases, with governed access.",
      },
      {
        title: "Reporting & Intelligence",
        description: "Automated digests and dashboards aligned to your KPIs.",
      },
      {
        title: "Custom AI Tools",
        description: "Co-pilots and AI features built into your existing products and workflows.",
      },
    ],
    pricingNote:
      "Every project is scoped and priced before engineering begins. Cloud and third-party AI costs are itemised separately.",
    pricingTiers: [
      {
        name: "AI Project Delivery",
        badge: "Custom scope",
        price: "Custom quote",
        period: "Written SOW within ~5 business days of discovery",
        description:
          "A defined business problem turned into a production-grade solution with clear ownership.",
        features: [
          "Discovery & scoping included",
          "Fixed price agreed before build",
          "Milestones and acceptance criteria in writing",
          "Handover + optional managed support",
        ],
        ctaLabel: "Book a Scoping Session",
        ctaHref: "/contact?type=ai-projects",
        highlighted: true,
      },
    ],
    nextSteps: stackFor("ai-projects"),
  },
  {
    slug: "ai-specialist",
    navLabel: "AI Specialist",
    eyebrow: "AI Specialist",
    metaTitle: "Fractional & Full-Time AI Specialist",
    metaDescription:
      "Embed vetted AI specialists — fractional or full-time — with programme oversight, panel reachback, and pathway-driven delivery from Devsinn Technologies.",
    headline: "An embedded AI engineer,",
    headlineAccent: "without the hiring cycle.",
    subheadline:
      "A vetted specialist joins your team, works in your tools and ships every sprint — backed by Devsinn programme oversight and a prioritised backlog.",
    primaryCta: { label: "Book a Discovery Call", href: "#book-a-call" },
    secondaryCta: { label: "See Pricing", href: "#pricing" },
    stats: [
      { value: "Build-first", label: "Shipping, not slide decks" },
      { value: "3 mo", label: "Minimum engagement" },
      { value: "PM", label: "Programme oversight included" },
      { value: "Panel", label: "Expert reachback on demand" },
    ],
    serviceTitle: "Steady capacity on",
    serviceTitleAccent: "the right backlog.",
    serviceDescription:
      "Most teams don't need another platform — they need engineering time pointed at the right work. Your specialist executes a living adoption pathway, reviewed every quarter.",
    idealFor: [
      "Multi-initiative AI roadmaps",
      "Teams that need capacity without a full-time hire",
      "Organisations that want delivery, not strategy decks",
    ],
    serviceIncludes: [
      "Automations, agents and integrations shipped every sprint",
      "20 or 40 hours per week",
      "Programme management + reachback to the Devsinn panel",
      "Adoption Pathway set up in month one as your work queue",
      "Quarterly reviews to re-rank priorities",
    ],
    stepsTitle: "Onboard fast.",
    stepsTitleAccent: "Ship from week one.",
    steps: [
      {
        number: "01",
        title: "Discovery & fit",
        description: "A short call on priorities, team, security constraints and toolchain.",
      },
      {
        number: "02",
        title: "Matching",
        description: "We assign a standard or senior specialist suited to your industry and stack.",
      },
      {
        number: "03",
        title: "Kick-off sprint",
        description:
          "Onboarding, the Adoption Pathway becomes your backlog, first production increment in 1–2 weeks.",
      },
      {
        number: "04",
        title: "Continuous delivery",
        description: "Build, measure and iterate against the pathway, re-prioritised quarterly.",
      },
    ],
    capabilitiesTitle: "What your specialist",
    capabilitiesTitleAccent: "delivers.",
    capabilities: [
      {
        title: "Workflow Automation",
        description: "End-to-end process automation across ops, sales, finance and customer success.",
      },
      {
        title: "AI Agents",
        description: "Always-on agents for triage, response and escalation — reliable and observable.",
      },
      {
        title: "AI Strategy Delivery",
        description: "Your highest-leverage initiatives prioritised and shipped, not shelved.",
      },
      {
        title: "System Integration",
        description: "CRM, ERP, comms and data layers connected — no rip-and-replace.",
      },
      {
        title: "RAG & Knowledge Systems",
        description: "Accurate answers over policies, contracts and internal docs, with access control.",
      },
      {
        title: "Reporting & Intelligence",
        description: "Automated reporting pipelines for leadership and operations teams.",
      },
    ],
    pricingNote:
      "3-month minimum, billed monthly per specialist. Infrastructure and third-party AI services are quoted separately. Adoption Pathway clients who start within 30 days get a month-one credit.",
    pricingTiers: [
      {
        name: "Standard · Fractional",
        price: "$2,850",
        period: "per month · 20 hrs / week",
        description: "Part-time delivery alongside your existing priorities.",
        features: [
          "Specialist — 2+ years production delivery",
          "Agent & workflow implementation",
          "PM oversight included",
        ],
        ctaLabel: "Book Discovery Call",
        ctaHref: "/contact?type=ai-specialist-fractional",
      },
      {
        name: "Standard · Full-Time",
        badge: "Most requested",
        price: "$4,940",
        period: "per month · 40 hrs / week",
        description: "Full embedded capacity for faster roadmap execution.",
        features: [
          "Specialist — 2+ years production delivery",
          "PM oversight included",
          "Pathway + quarterly reviews",
        ],
        ctaLabel: "Book Discovery Call",
        ctaHref: "/contact?type=ai-specialist-fulltime",
        highlighted: true,
      },
      {
        name: "Senior · Fractional",
        price: "$3,400",
        period: "per month · 20 hrs / week",
        description: "Senior practitioner for complex agentic, RAG and multi-system work.",
        features: [
          "Senior specialist — 5+ years experience",
          "Complex agentic & RAG delivery",
          "Panel reachback included",
        ],
        ctaLabel: "Book Discovery Call",
        ctaHref: "/contact?type=ai-specialist-senior-fractional",
      },
      {
        name: "Senior · Full-Time",
        price: "$5,940",
        period: "per month · 40 hrs / week",
        description: "Senior architectural ownership and continuous shipping.",
        features: [
          "Senior specialist — 5+ years experience",
          "Complex agentic & RAG delivery",
          "Panel reachback included",
        ],
        ctaLabel: "Book Discovery Call",
        ctaHref: "/contact?type=ai-specialist-senior-fulltime",
      },
    ],
    nextSteps: stackFor("ai-specialist"),
  },
];

export function getPathwayBySlug(slug: string): PathwayPage | undefined {
  return aiPathways.find((p) => p.slug === slug);
}
