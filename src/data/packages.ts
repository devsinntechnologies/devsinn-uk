export interface Package {
  id: string;
  name: string;
  tagline: string;
  startingFrom: string;
  unit?: string;
  description: string;
  includes: string[];
  notIncluded: string[];
  timeline: string;
  idealFor: string;
  color: string;
  glow: string;
  cta: string;
  isFeatured?: boolean;
}

export const packages: Package[] = [
  {
    id: "product-audit",
    name: "Product Audit",
    tagline: "Technical & UX review with a clear improvement roadmap",
    startingFrom: "$300",
    description:
      "A comprehensive review of your existing web or mobile product — covering code quality, UI/UX, API performance, and infrastructure — delivered as a prioritized improvement report.",
    includes: [
      "Full codebase and architecture review",
      "UI/UX assessment with usability findings",
      "API and database performance analysis",
      "Security and deployment review",
      "Prioritized improvement report (PDF)",
      "30-minute findings walkthrough call",
    ],
    notIncluded: [
      "Implementation of fixes",
      "Ongoing monitoring setup",
      "New feature development",
    ],
    timeline: "3–5 business days",
    idealFor: "Teams with an existing product that feels slow, broken, or hard to maintain",
    color: "#4B8EF1",
    glow: "rgba(75,142,241,0.35)",
    cta: "Request an Audit",
  },
  {
    id: "app-rescue-sprint",
    name: "App Rescue / Bug Fix Sprint",
    tagline: "1-week focused sprint to fix, stabilize, and redeploy your app",
    startingFrom: "$700",
    description:
      "A structured 1-week sprint to identify and fix critical bugs, resolve deployment issues, and restore stability to a broken or underperforming web or mobile application.",
    includes: [
      "Day 1: Technical audit and issue prioritization",
      "Days 2–4: Bug fixes and performance improvements",
      "Day 5: Testing, deployment, and handover",
      "Fix documentation and regression checklist",
      "Deployment support on your server or cloud",
      "Post-sprint 7-day support window",
    ],
    notIncluded: [
      "Full product redesign",
      "Tech stack migration without separate scope",
      "24/7 on-call support",
    ],
    timeline: "1 week",
    idealFor: "Businesses with a live product that has critical bugs, errors, or deployment failures",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    cta: "Book a Rescue Sprint",
  },
  {
    id: "ai-automation-sprint",
    name: "AI Automation Sprint",
    tagline: "Map, build, and deploy one or more AI-powered business workflows",
    startingFrom: "$800",
    description:
      "A focused engagement to automate a specific business workflow using AI agents, no-code tools, or custom integrations — delivered within 1–2 weeks with full documentation.",
    includes: [
      "Workflow mapping and automation strategy session",
      "AI chatbot or agent setup (website/WhatsApp/Slack)",
      "CRM/email/tool integration (n8n, Make, or Zapier)",
      "Testing and live deployment",
      "Full documentation and handover",
      "1-week post-launch support",
    ],
    notIncluded: [
      "Multiple unrelated departments in one sprint",
      "Custom ML model training from scratch",
      "Long-term monitoring beyond support window",
    ],
    timeline: "1–2 weeks",
    idealFor: "Businesses losing hours to manual, repetitive workflows or lead follow-up",
    color: "#00C9A7",
    glow: "rgba(0,201,167,0.35)",
    cta: "Start Automating",
    isFeatured: true,
  },
  {
    id: "mvp-sprint",
    name: "MVP Sprint",
    tagline: "From planning to a deployed, testable product with real users",
    startingFrom: "$2,500",
    description:
      "End-to-end MVP delivery — covering product planning, UI/UX design, web or mobile development, backend, admin panel, and deployment. Built to validate with real users and attract early customers.",
    includes: [
      "Product scoping and technical planning",
      "UI/UX design (Figma wireframes and screens)",
      "Frontend development (web or Flutter mobile)",
      "Backend API and database setup",
      "Admin panel for content/user management",
      "Cloud deployment with basic monitoring",
    ],
    notIncluded: [
      "Enterprise compliance (HIPAA, SOC2) in base sprint",
      "Large-scale multi-region infrastructure",
      "Paid marketing or acquisition campaigns",
    ],
    timeline: "4–8 weeks typical",
    idealFor: "Founders and product teams ready to move from idea to working product",
    color: "#6B4CF5",
    glow: "rgba(107,76,245,0.35)",
    cta: "Build My MVP",
    isFeatured: true,
  },
  {
    id: "monthly-maintenance",
    name: "Monthly Maintenance",
    tagline: "Ongoing support, monitoring, and updates for your live product",
    startingFrom: "$500",
    unit: "/month",
    description:
      "A monthly retainer that keeps your product healthy — covering bug fixes, minor feature updates, performance monitoring, and a monthly status report.",
    includes: [
      "Up to 10 hours of bug fixes and minor updates",
      "Performance and uptime monitoring",
      "Dependency and security updates",
      "Monthly status report",
      "Priority support response (within 24 business hours)",
      "Rollover hours available on higher tiers",
    ],
    notIncluded: [
      "Major new feature development",
      "Full product redesign",
      "Dedicated PM or QA allocation in base tier",
    ],
    timeline: "Monthly retainer",
    idealFor: "Businesses with a live product that needs reliable ongoing technical support",
    color: "#4B8EF1",
    glow: "rgba(75,142,241,0.35)",
    cta: "Get Monthly Support",
  },
  {
    id: "dedicated-developer",
    name: "Dedicated Remote Developer",
    tagline: "Full-time or part-time developer allocated to your product",
    startingFrom: "$1,200",
    unit: "/month",
    description:
      "A dedicated Flutter, web, backend, or AI developer working as part of your team — with technical PM support, weekly reporting, and full workflow integration.",
    includes: [
      "Full-time or part-time developer allocation",
      "Technical PM oversight and communication",
      "Weekly progress reports",
      "Full integration with your tools (Jira, Slack, Notion)",
      "Code reviews and documentation included",
      "Flexible to add QA, UI/UX, or second developer",
    ],
    notIncluded: [
      "Hardware or third-party license costs",
      "Non-development project management overhead",
      "Guaranteed delivery without client feedback loops",
    ],
    timeline: "Monthly engagement",
    idealFor: "Product teams and agencies that need reliable technical execution without hiring overhead",
    color: "#6B4CF5",
    glow: "rgba(107,76,245,0.35)",
    cta: "Hire a Developer",
  },
];
