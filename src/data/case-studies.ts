export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  industry: string;
  category: string;
  clientContext: string;
  challenge: string;
  solution: string;
  features: string[];
  techStack: string[];
  businessImpact: string[];
  metrics: { label: string; value: string }[];
  heroImage: string;
  screenshots: string[];
  relatedService: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "chatsupplies",
    title: "ChatSupplies",
    tagline: "AI-powered chat and supply management platform for B2B businesses",
    industry: "B2B SaaS",
    category: "SaaS MVP Development",
    clientContext: "B2B supply platform team · early-stage SaaS · multi-user operations",
    challenge:
      "The client needed a platform that combined intelligent real-time chat with supplier and inventory management — two workflows that were being handled separately across multiple disconnected tools, causing delays and data inconsistencies.",
    solution:
      "We designed and built a unified SaaS platform with AI-assisted chat, supplier onboarding flows, order management, and a real-time admin dashboard. The architecture was built to handle multi-user environments with role-based access from day one.",
    features: [
      "AI-assisted chat interface with smart response suggestions",
      "Supplier onboarding and management dashboard",
      "Order tracking and inventory visibility",
      "Role-based access for admin, supplier, and buyer roles",
      "Real-time notifications and activity feed",
      "Admin analytics panel with exportable reports",
    ],
    techStack: ["Next.js", "React", "NestJS", "PostgreSQL", "WebSocket", "Tailwind CSS", "Docker"],
    businessImpact: [
      "Reduced manual coordination between buyers and suppliers",
      "Improved operational visibility across the supply chain",
      "Created a scalable product foundation for future feature expansion",
      "Eliminated dependency on disconnected tools for communication and order tracking",
    ],
    metrics: [
      { label: "Support response time", value: "~60% faster with AI-assisted ops" },
      { label: "Tools consolidated", value: "Chat + orders in one platform" },
      { label: "Delivery model", value: "MVP to multi-role SaaS foundation" },
    ],
    heroImage: "/images/thumbnails/chatsupplies_case.png",
    screenshots: [
      "/images/singlePageProjects/web/chatsupplies/sneak-1.png",
      "/images/singlePageProjects/web/chatsupplies/sneak-3.png",
    ],
    relatedService: "saas-mvp",
  },
  {
    slug: "drafidox",
    title: "Drafidox",
    tagline: "AI-powered document, image, and text processing SaaS platform",
    industry: "AI SaaS / Productivity",
    category: "AI Automation & SaaS MVP",
    clientContext: "Productivity SaaS · document and image workflows · subscription-ready",
    challenge:
      "Users needed a single workspace to process documents, extract information, summarize content, and perform image-based tasks — without switching between multiple AI tools or writing prompts manually.",
    solution:
      "We built an AI-powered SaaS platform with a clean workspace interface, multi-modal processing capabilities (documents, images, text), task queuing, and a user account system with usage tracking. The platform connects to LLM APIs and processes files asynchronously.",
    features: [
      "Document upload and AI-powered extraction and summarization",
      "Image processing with AI-generated descriptions and analysis",
      "Multi-task queue with real-time progress tracking",
      "User accounts with usage history and saved outputs",
      "Export functionality (PDF, markdown, plain text)",
      "Admin panel with user management and usage analytics",
    ],
    techStack: ["Next.js", "React", "FastAPI", "OpenAI API", "PostgreSQL", "Supabase", "AWS S3", "Tailwind CSS"],
    businessImpact: [
      "Reduced time spent on manual document processing and summarization",
      "Created a subscription-ready AI product with clear user workflow",
      "Improved output consistency compared to manual LLM prompting",
      "Built a scalable foundation ready for additional AI task types",
    ],
    metrics: [
      { label: "Workflows consolidated", value: "Docs, images, and text in one workspace" },
      { label: "Processing model", value: "Async queue with saved outputs" },
      { label: "Product readiness", value: "Subscription and usage tracking built in" },
    ],
    heroImage: "/images/thumbnails/drafidox_case.png",
    screenshots: [
      "/images/singlePageProjects/web/drafidox/sneak-1.png",
    ],
    relatedService: "ai-automation",
  },
  {
    slug: "smart-logo-maker",
    title: "Smart Logo Maker",
    tagline: "AI-powered logo generation platform for brand identity creation",
    industry: "AI Design Tools / SaaS",
    category: "AI-Powered SaaS",
    clientContext: "SMB and founder users · self-serve brand design · credit-based SaaS",
    challenge:
      "Small businesses and solo founders needed professional logo creation without the cost or time of hiring a designer — but existing AI tools produced generic results with poor editing capabilities.",
    solution:
      "We built an AI-powered logo generation SaaS where users input their brand details and receive multiple logo concepts, then refine them through an interactive editor. The platform handles style preferences, color palettes, typography, and export formats.",
    features: [
      "AI logo generation based on brand name, industry, and style preferences",
      "Interactive logo editor with real-time preview",
      "Color palette and typography customization",
      "Multiple export formats (SVG, PNG, PDF)",
      "Brand kit generation with logo variations",
      "User accounts with saved designs and generation history",
    ],
    techStack: ["Next.js", "React", "OpenAI API", "Stable Diffusion", "Node.js", "PostgreSQL", "Canvas API", "Stripe"],
    businessImpact: [
      "Reduced logo creation time from days to minutes for early-stage businesses",
      "Created a self-serve product that requires no design expertise",
      "Improved brand output quality compared to template-only tools",
      "Built a monetizable SaaS with clear credit-based and subscription pricing model",
    ],
    metrics: [
      { label: "Creation time", value: "Days → minutes for brand assets" },
      { label: "Export formats", value: "SVG, PNG, PDF brand kit" },
      { label: "Monetization", value: "Credits + subscription pricing live" },
    ],
    heroImage: "/images/thumbnails/smart_logo_case.png",
    screenshots: [
      "/images/singlePageProjects/web/smart-logo-maker/sneak-1.png",
    ],
    relatedService: "saas-mvp",
  },
  {
    slug: "diginizam",
    title: "DigiNizam — AI-Powered Retail POS Platform",
    tagline: "POS software for growing businesses in Pakistan",
    industry: "Retail Technology / POS SaaS",
    category: "Custom Web App Development",
    clientContext: "Multi-vertical retail & food businesses · multi-store operations · local tax compliance",
    challenge:
      "Growing retail and food businesses across Pakistan were managing billing, inventory, and reporting across disconnected tools and spreadsheets, while also needing compliant integration with FBR and regional tax authorities plus local payment methods.",
    solution:
      "We built DigiNizam, a cloud-based, AI-powered retail operating system that unifies point-of-sale, inventory, and reporting into a single platform — supporting restaurants, retail stores, pharmacies, salons, and other retail verticals with online/offline functionality, multi-store sync, and built-in fiscal compliance.",
    features: [
      "Online/offline POS with automatic sync when connectivity returns",
      "Multi-store and multi-outlet management from one dashboard",
      "Real-time inventory tracking with low-stock alerts",
      "Order management for dine-in, takeaway, and counter service",
      "AI-assisted sales forecasting and demand prediction",
      "Financial and performance reporting across branches",
      "Discount and loyalty program management",
      "FBR fiscal integration plus SRB, PRA, and KPRA tax authority sync",
      "JazzCash and EasyPaisa payment integration",
      "Cloud or on-premise deployment options",
    ],
    techStack: ["Next.js", "React", "NestJS", "PostgreSQL", "Redis", "WebSocket", "Tailwind CSS", "Docker"],
    businessImpact: [
      "Consolidated billing, inventory, and reporting into a single retail OS across multiple business verticals",
      "Enabled compliant operations through built-in FBR and regional tax authority integration",
      "Supported multi-store businesses with real-time cross-branch synchronization",
      "Reduced dependence on spreadsheets and disconnected point solutions",
    ],
    metrics: [
      { label: "Tax compliance", value: "FBR + SRB/PRA/KPRA integrated" },
      { label: "Deployment", value: "Cloud or on-premise, online/offline POS" },
      { label: "Verticals supported", value: "Restaurants, retail, pharmacy, salons & more" },
    ],
    heroImage: "/case-studies/diginizam-case-study.svg",
    screenshots: [
      "/case-studies/diginizam-case-study.svg",
      "/case-studies/diginizam-preview.png",
    ],
    relatedService: "app-rescue-maintenance",
  },
  // {
  //   slug: "meri-ride",
  //   title: "Meri Ride",
  //   tagline: "Inclusive ride and mobility platform for individuals with different abilities",
  //   industry: "Non-Profit / Social Tech / Mobility",
  //   category: "Flutter Mobile App & Web Platform",
  //   challenge:
  //     "The organization needed a digital platform to connect people with different abilities to accessible transport options — while also enabling income opportunities for drivers willing to provide inclusive services.",
  //   solution:
  //     "We built a web platform and companion mobile app that handles ride requests, driver onboarding, accessibility preferences, and booking management — designed with inclusivity as a core product requirement, not an afterthought.",
  //   features: [
  //     "Ride booking with accessibility requirement inputs",
  //     "Driver onboarding with inclusive service certification",
  //     "Real-time ride tracking and status updates",
  //     "User profiles with saved accessibility preferences",
  //     "Admin dashboard for ride oversight and driver management",
  //     "Multilingual interface support",
  //   ],
  //   techStack: ["Next.js", "React", "Flutter", "Firebase", "Node.js", "PostgreSQL", "Google Maps API", "Tailwind CSS"],
  //   businessImpact: [
  //     "Created accessible mobility infrastructure for an underserved community",
  //     "Improved service discoverability for individuals with different abilities",
  //     "Enabled driver income opportunities through an inclusive marketplace model",
  //     "Delivered a scalable platform foundation for city-level expansion",
  //   ],
  //   heroImage: "/images/thumbnails/meriride.png",
  //   screenshots: [
  //     "/images/singlePageProjects/meriride/meriride1.png",
  //     "/images/singlePageProjects/meriride/meriride2.png",
  //     "/images/singlePageProjects/meriride/meriride3.png",
  //   ],
  //   relatedService: "flutter-mobile-apps",
  // },
];
