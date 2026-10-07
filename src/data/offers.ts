export interface Offer {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  idealBuyer: string;
  outcome: string;
  timeline: string;
  startingFrom: string;
  includes: string[];
  notIncluded: string[];
  proofPoints: string[];
  faqs: { question: string; answer: string }[];
  relatedService: string;
  relatedCaseStudy?: string;
  ctaLabel: string;
  contactParam: string;
}

export const offers: Offer[] = [
  {
    slug: "fit-call",
    name: "Free Strategy Call",
    tagline: "A no-commitment discovery call to see if Devsinn is the right team for your AI automation, SaaS, or custom software project.",
    metaTitle: "Free Strategy Call | Devsinn Technologies",
    metaDescription:
      "Book a free strategy call with Devsinn Technologies. Discuss AI automation, SaaS MVP, or app rescue goals and get a clear next step — no sales pressure.",
    idealBuyer:
      "Founders, product owners, and operations leads exploring AI automation, SaaS MVPs, custom software, or app rescue.",
    outcome:
      "You leave with a clearer scope direction, realistic timeline range, and recommended next step — whether that is a paid audit, sprint, or custom proposal.",
    timeline: "20 minutes",
    startingFrom: "Free",
    includes: [
      "20-minute video call with a senior team member",
      "Discussion of your business problem, goals, and constraints",
      "High-level technical approach and delivery model overview",
      "Honest fit assessment — we will tell you if we are not the right team",
      "Recommended next step: strategy call follow-up, paid audit, or sprint scoping",
    ],
    notIncluded: [
      "Detailed technical audit or codebase review",
      "Written scope document or fixed quote",
      "UI/UX review or architecture diagram deliverables",
    ],
    proofPoints: [
      "100+ client projects delivered across SaaS, mobile, and AI automation",
      "Response within one business day after booking",
      "No commitment required to explore options",
    ],
    faqs: [
      {
        question: "What happens on the strategy call?",
        answer:
          "We review your business problem, current systems, timeline, and budget range. You get a candid assessment of whether Devsinn is a good fit and what the recommended next step should be for AI automation or SaaS development.",
      },
      {
        question: "Is this different from the paid Product Audit?",
        answer:
          "Yes. The strategy call is a free qualification conversation. The paid Technical & UX Audit is a deliverable engagement with a written report, prioritized fixes, and a findings walkthrough.",
      },
      {
        question: "Who should join the call?",
        answer:
          "The product owner, founder, or operations lead who can speak to business goals, budget authority, and technical context. A technical co-founder or internal developer is welcome.",
      },
    ],
    relatedService: "ai-automation",
    ctaLabel: "Book Free Strategy Call",
    contactParam: "fit-call",
  },
  {
    slug: "product-audit",
    name: "Paid Technical & UX Audit",
    tagline: "A comprehensive review of your existing product with a prioritized improvement roadmap.",
    metaTitle: "Paid Technical & UX Audit — From $300 | Devsinn Technologies",
    metaDescription:
      "Get a paid Technical & UX Audit for your web or mobile product. Codebase review, performance analysis, security check, and a prioritized improvement report from $300.",
    idealBuyer:
      "Teams with a live product that feels slow, unstable, hard to maintain, or unclear on what to fix first.",
    outcome:
      "A prioritized improvement report covering code quality, UX friction, API performance, security, and deployment — plus a 30-minute findings walkthrough.",
    timeline: "3–5 business days",
    startingFrom: "$300",
    includes: [
      "Full codebase and architecture review",
      "UI/UX assessment with usability findings",
      "API and database performance analysis",
      "Security and deployment review",
      "Prioritized improvement report (PDF)",
      "30-minute findings walkthrough call",
    ],
    notIncluded: [
      "Implementation of fixes (available as App Rescue Sprint)",
      "Ongoing maintenance or monitoring setup",
      "New feature development",
    ],
    proofPoints: [
      "Structured audit format used across rescue and maintenance engagements",
      "Clear separation between quick wins and structural improvements",
      "Actionable output your internal team or our sprint team can execute",
    ],
    faqs: [
      {
        question: "How is this different from the free fit call?",
        answer:
          "The fit call is a 20-minute conversation. The paid audit is a deliverable engagement where we review your product in depth and return a written, prioritized report.",
      },
      {
        question: "What do you need from us?",
        answer:
          "Repository or staging access, a brief on known issues, and 30–45 minutes with someone who understands the product history and business goals.",
      },
      {
        question: "Can the audit lead into a rescue sprint?",
        answer:
          "Yes. Many clients use the audit output as the scope foundation for a 1-week App Rescue Sprint or a monthly maintenance retainer.",
      },
    ],
    relatedService: "app-rescue-maintenance",
    relatedCaseStudy: "diginizam",
    ctaLabel: "Request Paid Audit",
    contactParam: "product-audit",
  },
  {
    slug: "ai-automation-sprint",
    name: "AI Automation Sprint",
    tagline: "Map, build, and deploy AI-powered workflows that cut manual operations work.",
    metaTitle: "AI Automation Sprint — From $800 | Devsinn Technologies",
    metaDescription:
      "Automate lead follow-up, support, documents, and disconnected tools in 1–2 weeks. AI Automation Sprint includes workflow mapping, agent setup, integrations, and handover from $800.",
    idealBuyer:
      "Teams losing hours to manual work: support replies, lead qualification, document processing, follow-ups, or disconnected CRM and communication tools.",
    outcome:
      "One or more live AI workflows with integrations, documentation, team handover, and measurable time savings on the targeted process.",
    timeline: "1–2 weeks",
    startingFrom: "$800",
    includes: [
      "Workflow mapping and automation strategy session",
      "AI chatbot or agent setup (website, WhatsApp, or Slack)",
      "CRM, email, or tool integration (n8n, Make, or Zapier)",
      "Testing and live deployment",
      "Full documentation and team handover",
      "1-week post-launch support",
    ],
    notIncluded: [
      "Multiple unrelated business units in one sprint",
      "Custom ML model training from scratch",
      "Long-term monitoring beyond the support window",
    ],
    proofPoints: [
      "ChatSupplies: AI-driven support reduced response time by ~60%",
      "Drafidox: consolidated document workflows into one AI workspace",
      "Typical sprint targets 8–20 hours/week of manual work removed",
    ],
    faqs: [
      {
        question: "What processes are a good fit?",
        answer:
          "Lead qualification, support triage, document summarization, CRM updates, appointment reminders, internal knowledge search, and cross-tool data sync are common sprint targets.",
      },
      {
        question: "Do you use no-code or custom code?",
        answer:
          "We choose based on your stack and scale. Many sprints combine n8n/Make/Zapier with custom API work or lightweight agents where needed.",
      },
      {
        question: "What proof should I expect?",
        answer:
          "Before/after workflow maps, hours saved estimates, error reduction on the targeted process, and a live demo your team can operate.",
      },
    ],
    relatedService: "ai-automation",
    relatedCaseStudy: "chatsupplies",
    ctaLabel: "Start AI Automation Sprint",
    contactParam: "ai-automation-sprint",
  },
  {
    slug: "saas-mvp-sprint",
    name: "SaaS MVP Sprint",
    tagline: "From validated idea to deployed MVP with real users and analytics.",
    metaTitle: "SaaS MVP Sprint — From $2,500 | Devsinn Technologies",
    metaDescription:
      "Launch a testable SaaS MVP in weeks. Product scoping, UI/UX, web or mobile build, backend, admin panel, deployment, and analytics — SaaS MVP Sprint from $2,500.",
    idealBuyer:
      "Founders with a validated product idea, early users, or a clear problem worth solving — ready to move from slides to a working product.",
    outcome:
      "A deployed MVP with core user flows, admin tooling, analytics hooks, and a launch plan to validate with real users and early customers.",
    timeline: "4–8 weeks typical",
    startingFrom: "$2,500",
    includes: [
      "Product scoping and technical planning",
      "UI/UX design (Figma wireframes and screens)",
      "Frontend development (web or Flutter mobile)",
      "Backend API and database setup",
      "Admin panel for content and user management",
      "Cloud deployment with basic monitoring",
    ],
    notIncluded: [
      "Full enterprise compliance (HIPAA, SOC2) in base sprint",
      "Large-scale multi-region infrastructure",
      "Marketing site copywriting and paid acquisition",
    ],
    proofPoints: [
      "ChatSupplies and Smart Logo Maker built as subscription-ready SaaS foundations",
      "Structured POC → MVP → scale delivery phases",
      "Launch plans include analytics for feature adoption and reliability tracking",
    ],
    faqs: [
      {
        question: "How do you keep MVP scope under control?",
        answer:
          "We define one primary user journey, must-have features, and explicit exclusions before build. Everything else goes to a post-launch roadmap.",
      },
      {
        question: "Web or mobile?",
        answer:
          "We recommend based on your users. Many B2B MVPs launch on web first; consumer or field-use cases often start with Flutter mobile.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We offer maintenance retainers, feature expansion sprints, and analytics reviews to turn early usage data into the next build phase.",
      },
    ],
    relatedService: "saas-mvp",
    relatedCaseStudy: "smart-logo-maker",
    ctaLabel: "Build My MVP",
    contactParam: "mvp-sprint",
  },
  {
    slug: "app-rescue-scale",
    name: "App Rescue & Scale",
    tagline: "Stabilize, fix, and prepare a struggling product for reliable releases.",
    metaTitle: "App Rescue & Scale Sprint — From $700 | Devsinn Technologies",
    metaDescription:
      "Rescue a slow, unstable, or unsupported web or mobile app. Technical review, critical fixes, deployment stabilization, and a maintenance path — from $700.",
    idealBuyer:
      "Businesses with a live product that has critical bugs, performance problems, failed releases, or no dependable technical support.",
    outcome:
      "A stabilized application, fixed critical issues, documented release process, and a clear path to ongoing maintenance or feature expansion.",
    timeline: "1 week sprint + optional retainer",
    startingFrom: "$700",
    includes: [
      "Day 1: Technical audit and issue prioritization",
      "Days 2–4: Bug fixes and performance improvements",
      "Day 5: Testing, deployment, and handover",
      "Fix documentation and regression checklist",
      "Deployment support on your server or cloud",
      "7-day post-sprint support window",
    ],
    notIncluded: [
      "Full product redesign or major feature rebuild in base sprint",
      "Migration to a new tech stack without separate scoping",
      "24/7 on-call beyond the support window",
    ],
    proofPoints: [
      "DigiNizam: consolidated billing, inventory, and tax compliance into one retail OS",
      "Rescue sprints target crash reduction, release readiness, and speed improvements",
      "Monthly maintenance available from $500/month for ongoing stability",
    ],
    faqs: [
      {
        question: "When should I choose rescue over a full rebuild?",
        answer:
          "If the core product has users and revenue but suffers from technical debt, we usually rescue first. We only recommend rebuilds when architecture blocks every future release.",
      },
      {
        question: "Can you work with our existing team?",
        answer:
          "Yes. We integrate with your Jira, Slack, and repos, document changes clearly, and hand back a stable baseline your team can extend.",
      },
      {
        question: "What metrics improve after a rescue?",
        answer:
          "Crash rate, page load or API response time, deployment success rate, and time your team spends firefighting instead of building.",
      },
    ],
    relatedService: "app-rescue-maintenance",
    relatedCaseStudy: "diginizam",
    ctaLabel: "Book Rescue Sprint",
    contactParam: "app-rescue-sprint",
  },
];

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}
