export interface Solution {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  problems: string[];
  outcomes: string[];
  deliverables: string[];
  timeline: string;
  idealBuyer: string;
  relatedOffer: string;
  relatedService: string;
  relatedCaseStudy?: string;
  faqs: { question: string; answer: string }[];
}

export const solutions: Solution[] = [
  {
    slug: "reduce-manual-operations-with-ai",
    title: "Reduce Manual Operations With AI",
    metaTitle: "Reduce Manual Operations With AI | Devsinn Technologies",
    metaDescription:
      "Cut manual support, lead follow-up, document work, and disconnected tool workflows with AI automation. Map processes, deploy agents, and measure hours saved.",
    headline: "Stop Losing Hours to Manual Operations",
    subheadline:
      "We help growing businesses automate repetitive workflows — support replies, lead qualification, document handling, CRM updates, and cross-tool handoffs — with AI agents and smart integrations.",
    problems: [
      "Your team manually copies data between CRM, email, WhatsApp, and spreadsheets",
      "Support or sales follow-up depends on one person remembering the next step",
      "Document review, summarization, or data entry eats hours every week",
      "You have tried ChatGPT prompts but nothing is connected to real business workflows",
      "Lead response time is slow and opportunities go cold",
    ],
    outcomes: [
      "Mapped workflow with clear automation boundaries",
      "Live AI agent or automation on your website, WhatsApp, Slack, or internal tools",
      "CRM and communication tool integrations that remove duplicate entry",
      "Measurable reduction in manual hours on the targeted process",
      "Documentation and handover so your team can operate and extend the system",
    ],
    deliverables: [
      "Current-state workflow map and automation opportunity analysis",
      "AI agent or automation build for one high-impact process",
      "Integration with your existing tools (n8n, Make, Zapier, or custom APIs)",
      "Testing, deployment, and operator documentation",
      "Before/after metrics: time saved, response time, error reduction",
    ],
    timeline: "1–2 weeks for a focused AI Automation Sprint",
    idealBuyer:
      "Operations leaders, agency owners, clinic admins, and SaaS teams spending 10+ hours/week on repetitive coordination work.",
    relatedOffer: "ai-automation-sprint",
    relatedService: "ai-automation",
    relatedCaseStudy: "chatsupplies",
    faqs: [
      {
        question: "What is a realistic first automation to build?",
        answer:
          "Lead qualification chatbots, support triage, appointment reminders, document summarization, and CRM sync are high-ROI first targets because they have clear before/after metrics.",
      },
      {
        question: "Will this replace my team?",
        answer:
          "No. The goal is to remove repetitive work so your team focuses on judgment, relationships, and exceptions — not copying data or answering the same questions.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We agree on a baseline before build: hours spent per week, average response time, error rate, or tasks automated. We report against that after launch.",
      },
    ],
  },
  {
    slug: "launch-or-rescue-saas-product",
    title: "Launch or Rescue Your SaaS or Mobile Product",
    metaTitle: "Launch or Rescue Your SaaS or Mobile Product | Devsinn Technologies",
    metaDescription:
      "Launch a SaaS MVP from a validated idea or rescue a failing app with bugs, slow performance, or no support. Scoping, build, stabilization, and maintenance path.",
    headline: "Launch Faster or Rescue What You Already Built",
    subheadline:
      "Whether you are moving from idea to MVP or trying to save a product that is slow, unstable, or unsupported — Devsinn delivers scoped sprints with clear outcomes and a path to long-term support.",
    problems: [
      "You have an idea or early users but no dependable product team to ship an MVP",
      "Your live app has critical bugs, failed deployments, or angry users",
      "Freelancers disappeared and nobody understands the codebase",
      "Performance is poor and releases are risky",
      "You need a credible plan, timeline, and budget — not another vague estimate",
    ],
    outcomes: [
      "For new products: deployed MVP with core flows, admin panel, analytics, and launch plan",
      "For rescue: stabilized app, fixed critical issues, documented release process",
      "Clear scope with includes, exclusions, and realistic timeline",
      "Option for monthly maintenance or feature expansion after sprint completion",
      "Measurable improvements: launch time, crash reduction, speed, release readiness",
    ],
    deliverables: [
      "Discovery and scoping session with written sprint boundaries",
      "UI/UX design or technical audit depending on project stage",
      "Focused build or fix sprint with daily progress visibility",
      "QA, deployment, and handover documentation",
      "Post-sprint support window and retainer options",
    ],
    timeline: "MVP: 4–8 weeks typical | Rescue: 1-week sprint + optional retainer",
    idealBuyer:
      "Founders launching a SaaS or mobile product, or business owners with a live product that needs stabilization before it loses users or revenue.",
    relatedOffer: "saas-mvp-sprint",
    relatedService: "saas-mvp",
    relatedCaseStudy: "drafidox",
    faqs: [
      {
        question: "Should I start with MVP or rescue?",
        answer:
          "If you have no working product, start with MVP scoping. If you have users but the product is broken or slow, start with a paid audit or rescue sprint.",
      },
      {
        question: "How do you reduce MVP risk?",
        answer:
          "We lock one primary user journey, define must-haves vs later, and ship a testable release with analytics so you validate with real users before expanding scope.",
      },
      {
        question: "What if we need ongoing help after launch?",
        answer:
          "We offer monthly maintenance from $500/month and dedicated developer allocations for teams that need continuous delivery without hiring overhead.",
      },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
