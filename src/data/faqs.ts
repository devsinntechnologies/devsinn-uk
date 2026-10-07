export type FAQItem = {
  question: string;
  /** Plain-text answer for FAQPage schema (no markdown). */
  answer: string;
  /** Optional markdown-style links for UI: [label](/path) */
  answerMd?: string;
};

export const homeFaqs: FAQItem[] = [
  {
    question: "How much does AI automation or SaaS development cost?",
    answer:
      "Our AI automation and SaaS development projects typically start from $300 for a Technical & UX Audit and scale based on project complexity. AI Automation Sprints start from $800, App Rescue from $700, and SaaS MVP Sprints from $2,500. After understanding your business goals, integrations, and timeline, we provide a transparent written estimate with no hidden costs.",
    answerMd:
      "Our AI automation and SaaS development projects typically start from $300 for a Technical & UX Audit and scale based on project complexity. AI Automation Sprints start from $800, App Rescue from $700, and SaaS MVP Sprints from $2,500. After understanding your business goals, integrations, and timeline, we provide a transparent written estimate with no hidden costs. Explore our [AI Automation Sprint](/offers/ai-automation-sprint) and [SaaS MVP Sprint](/offers/saas-mvp-sprint) offers.",
  },
  {
    question: "What is AI Automation?",
    answer:
      "AI automation uses intelligent agents, chatbots, and workflow tools to replace repetitive manual work — such as lead qualification, support replies, document processing, CRM updates, and cross-tool handoffs. At Devsinn Technologies, we map your operations, build and deploy AI workflows, integrate your existing tools, and measure hours saved so your team focuses on high-value work.",
    answerMd:
      "AI automation uses intelligent agents, chatbots, and workflow tools to replace repetitive manual work — such as lead qualification, support replies, document processing, CRM updates, and cross-tool handoffs. At Devsinn Technologies, we map your operations, build and deploy AI workflows, integrate your existing tools, and measure hours saved so your team focuses on high-value work. Learn more on our [AI Automation Services](/services/ai-automation) page.",
  },
  {
    question: "What is SaaS Development?",
    answer:
      "SaaS development is the process of designing, building, and launching subscription-based software products — including multi-tenant architecture, user dashboards, billing, admin panels, and analytics. Devsinn Technologies delivers custom SaaS solutions and MVP builds that help founders validate ideas, acquire early users, and scale product engineering with a dependable delivery team.",
    answerMd:
      "SaaS development is the process of designing, building, and launching subscription-based software products — including multi-tenant architecture, user dashboards, billing, admin panels, and analytics. Devsinn Technologies delivers custom SaaS solutions and MVP builds that help founders validate ideas, acquire early users, and scale product engineering with a dependable delivery team. See our [SaaS MVP Development](/services/saas-mvp) service and [case studies](/case-studies).",
  },
  {
    question: "What is MVP Development?",
    answer:
      "MVP development means building the smallest useful version of a product so you can validate real users, measure adoption, and reduce launch risk. An MVP typically includes core user flows, UI/UX, backend API, admin tooling, and deployment — not every feature on the roadmap. Our SaaS MVP Sprint scopes one primary journey, ships a testable release, and sets analytics so founders can learn fast before expanding.",
    answerMd:
      "MVP development means building the smallest useful version of a product so you can validate real users, measure adoption, and reduce launch risk. An MVP typically includes core user flows, UI/UX, backend API, admin tooling, and deployment — not every feature on the roadmap. Our [SaaS MVP Sprint](/offers/saas-mvp-sprint) scopes one primary journey, ships a testable release, and sets analytics so founders can learn fast before expanding.",
  },
  {
    question: "How long does it take to build a custom SaaS or web application?",
    answer:
      "Delivery time depends on scope. Focused AI automation projects typically take 1–2 weeks. App rescue sprints run about one week. Custom SaaS MVP development and web application builds usually take 4–8 weeks for a first release. Larger custom software platforms and dedicated product engineering engagements are scoped after discovery based on features, integrations, and compliance needs.",
    answerMd:
      "Delivery time depends on scope. Focused AI automation projects typically take 1–2 weeks. App rescue sprints run about one week. Custom SaaS MVP development and web application builds usually take 4–8 weeks for a first release. Larger [custom software development](/services/software-development) platforms and dedicated product engineering engagements are scoped after discovery based on features, integrations, and compliance needs.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes. Every Devsinn engagement includes a post-launch support window. We also offer monthly maintenance retainers from $500/month covering bug fixes, monitoring, security updates, and priority response — plus dedicated remote developers for ongoing SaaS development, mobile app updates, and product engineering expansion.",
    answerMd:
      "Yes. Every Devsinn engagement includes a post-launch support window. We also offer monthly maintenance retainers from $500/month covering bug fixes, monitoring, security updates, and priority response — plus dedicated remote developers for ongoing SaaS development, mobile app updates, and product engineering expansion. See [App Rescue & Maintenance](/services/app-rescue-maintenance).",
  },
  {
    question: "Which industries do you build AI automation and SaaS solutions for?",
    answer:
      "We build AI automation and SaaS solutions for SaaS founders, digital agencies, clinics, hospitality, eCommerce, education, and operations-heavy businesses. Our focus is practical buyer outcomes — reducing manual work, launching MVPs faster, and rescuing unstable apps — across web development, mobile app development, and custom software development.",
    answerMd:
      "We build AI automation and SaaS solutions for SaaS founders, digital agencies, clinics, hospitality, eCommerce, education, and operations-heavy businesses. Our focus is practical buyer outcomes — reducing manual work, launching MVPs faster, and rescuing unstable apps — across web development, mobile app development, and custom software development. Browse real outcomes in our [case studies](/case-studies).",
  },
  {
    question: "Why choose custom software over off-the-shelf software?",
    answer:
      "Off-the-shelf tools are fast to start but often force your processes into generic workflows, create integration gaps, and become expensive as you scale. Custom software development lets you automate the exact operations that drive revenue, connect systems your team already uses, and own the product roadmap. Devsinn Technologies builds custom SaaS, web apps, and automation that match how your business actually works.",
    answerMd:
      "Off-the-shelf tools are fast to start but often force your processes into generic workflows, create integration gaps, and become expensive as you scale. Custom software development lets you automate the exact operations that drive revenue, connect systems your team already uses, and own the product roadmap. Devsinn Technologies builds custom SaaS, web apps, and automation that match how your business actually works. Explore [Custom Software Development](/services/software-development).",
  },
  {
    question: "Why choose Devsinn Technologies?",
    answer:
      "Devsinn Technologies is a product engineering studio focused on AI automation, SaaS development, custom software, and app rescue — not a broad IT menu. We deliver scoped sprints with clear includes and exclusions, measurable outcomes, and support after launch. Founders and operations teams choose us for dependable delivery from planning through product engineering and long-term maintenance.",
    answerMd:
      "Devsinn Technologies is a product engineering studio focused on AI automation, SaaS development, custom software, and app rescue — not a broad IT menu. We deliver scoped sprints with clear includes and exclusions, measurable outcomes, and support after launch. Founders and operations teams choose us for dependable delivery from planning through product engineering and long-term maintenance. [Contact our team](/contact) or [book a free strategy call](/offers/fit-call).",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Custom software development cost depends on scope, integrations, and timeline. Entry productized work starts with a $300 audit. Focused automation and rescue sprints typically start in the hundreds to low thousands. Full SaaS MVP development and multi-feature platforms start from $2,500 and scale with complexity. We clarify budget ranges early and send a written estimate after discovery.",
    answerMd:
      "Custom software development cost depends on scope, integrations, and timeline. Entry productized work starts with a $300 audit. Focused automation and rescue sprints typically start in the hundreds to low thousands. Full SaaS MVP development and multi-feature platforms start from $2,500 and scale with complexity. We clarify budget ranges early and send a written estimate after discovery. Request a quote via our [contact page](/contact).",
  },
  {
    question: "How long does it take to build a SaaS product?",
    answer:
      "A focused SaaS MVP can typically launch in 4–8 weeks when scope is locked to one primary user journey. Expanding into multi-tenant roles, billing, AI features, or compliance extends the timeline. Devsinn Technologies prioritizes a release-ready first version so you can validate SaaS product-market fit, then iterate with maintenance or dedicated product engineering support.",
    answerMd:
      "A focused SaaS MVP can typically launch in 4–8 weeks when scope is locked to one primary user journey. Expanding into multi-tenant roles, billing, AI features, or compliance extends the timeline. Devsinn Technologies prioritizes a release-ready first version so you can validate SaaS product-market fit, then iterate with maintenance or dedicated product engineering support. Read our [MVP budget and timeframe guide](/blog/mvp-budget-scope-timeframe-guide).",
  },
  {
    question: "Do you develop mobile apps?",
    answer:
      "Yes. We develop mobile apps using Flutter and modern web-to-mobile architectures for startups and growing businesses. Mobile app development engagements can be full product builds, companion apps for SaaS platforms, or rescue/maintenance for existing Flutter or hybrid apps that need stability and release readiness.",
    answerMd:
      "Yes. We develop mobile apps using Flutter and modern web-to-mobile architectures for startups and growing businesses. Mobile app development engagements can be full product builds, companion apps for SaaS platforms, or rescue/maintenance for existing Flutter or hybrid apps that need stability and release readiness. See related work in our [case studies](/case-studies).",
  },
  {
    question: "What technologies does Devsinn use?",
    answer:
      "Devsinn Technologies builds with modern product engineering stacks including Next.js, React, Flutter, NestJS, Node.js, FastAPI, PostgreSQL, Supabase, Docker, AWS, and AI tooling such as OpenAI, LangChain, n8n, Make, and Zapier. We select technology based on your roadmap, team skills, and long-term maintainability — not hype.",
  },
  {
    question: "Can you improve an existing application?",
    answer:
      "Yes. Our App Rescue & Maintenance service audits, stabilizes, and improves existing web and mobile applications — fixing critical bugs, performance bottlenecks, broken deployments, and technical debt. Many clients start with a paid Technical & UX Audit, then move into a one-week rescue sprint and optional monthly support.",
    answerMd:
      "Yes. Our App Rescue & Maintenance service audits, stabilizes, and improves existing web and mobile applications — fixing critical bugs, performance bottlenecks, broken deployments, and technical debt. Many clients start with a [paid Technical & UX Audit](/offers/product-audit), then move into a [App Rescue Sprint](/offers/app-rescue-scale) and optional monthly support.",
  },
  {
    question: "What is the difference between the free strategy call and paid audit?",
    answer:
      "The free strategy call is a short qualification conversation to clarify fit, goals, and next steps — with no written deliverable. The paid Technical & UX Audit is a structured review of your product with a prioritized improvement report, performance findings, and a walkthrough. Choose the free call to explore options, or the paid audit when you need an actionable roadmap.",
    answerMd:
      "The free strategy call is a short qualification conversation to clarify fit, goals, and next steps — with no written deliverable. The paid Technical & UX Audit is a structured review of your product with a prioritized improvement report, performance findings, and a walkthrough. Choose the [free strategy call](/offers/fit-call) to explore options, or the [paid Product Audit](/offers/product-audit) when you need an actionable roadmap.",
  },
  {
    question: "Who owns the code and IP?",
    answer:
      "You own the deliverables agreed in your statement of work for custom software development, SaaS projects, and AI automation builds. We hand over repositories, documentation, and deployment access at project completion unless otherwise contracted — so your product engineering assets stay under your control.",
  },
  {
    question: "How quickly will you respond after I reach out?",
    answer:
      "We reply to qualified inquiries about AI automation, SaaS development, and custom software projects within one business day. For urgent app rescue work, WhatsApp is the fastest channel. You can also book a free strategy call to lock a time with our team.",
    answerMd:
      "We reply to qualified inquiries about AI automation, SaaS development, and custom software projects within one business day. For urgent app rescue work, WhatsApp is the fastest channel. You can also [book a free strategy call](/offers/fit-call) to lock a time with our team or [contact us](/contact).",
  },
];
