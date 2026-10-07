export interface UseCase {
  id: string;
  industry: string;
  icon: string;
  headline: string;
  description: string;
  examples: string[];
  relatedService: string;
  color: string;
}

export const useCases: UseCase[] = [
  {
    id: "real-estate",
    industry: "Real Estate & Property",
    icon: "🏢",
    headline: "Property listing portals, CRM dashboards, and agent management tools",
    description:
      "We build property listing platforms, lead management systems, and agent portals that help real estate businesses move faster and close more deals.",
    examples: [
      "Property listing and search platform with filters and map view",
      "Agent CRM with lead tracking and follow-up automation",
      "Rental and property management dashboard",
      "WhatsApp lead qualification bot for property inquiries",
    ],
    relatedService: "web-app-development",
    color: "#4B8EF1",
  },
  {
    id: "travel",
    industry: "Travel & Tourism",
    icon: "✈️",
    headline: "Booking systems, itinerary builders, and travel management platforms",
    description:
      "Custom booking platforms, travel agency management tools, and AI-powered itinerary assistants that reduce manual coordination.",
    examples: [
      "Tour booking and scheduling web application",
      "Travel agency management dashboard with payment tracking",
      "AI-powered itinerary builder for custom travel packages",
      "Mobile app for real-time trip updates and communication",
    ],
    relatedService: "saas-mvp",
    color: "#00C9A7",
  },
  {
    id: "clinics",
    industry: "Healthcare & Clinics",
    icon: "🏥",
    headline: "Patient apps, appointment systems, and clinic management platforms",
    description:
      "We build HIPAA-conscious digital tools for clinics, wellness centers, and health startups — from patient booking to practice management dashboards.",
    examples: [
      "Patient appointment booking app (Flutter/web)",
      "Clinic management dashboard with patient records",
      "Doctor availability and scheduling system",
      "WhatsApp appointment reminder automation",
    ],
    relatedService: "flutter-mobile-apps",
    color: "#6B4CF5",
  },
  {
    id: "agencies",
    industry: "Digital Agencies & SaaS",
    icon: "🚀",
    headline: "White-label tools, client portals, and agency workflow automation",
    description:
      "We work as a technical partner for digital agencies — building white-label products, client-facing portals, and internal automation that reduce operational overhead.",
    examples: [
      "White-label SaaS dashboard for agency clients",
      "Client reporting portal with live campaign metrics",
      "Internal project and task management tool",
      "Lead qualification and onboarding automation",
    ],
    relatedService: "dedicated-teams",
    color: "#4B8EF1",
  },
  {
    id: "education",
    industry: "Education & EdTech",
    icon: "📚",
    headline: "Learning platforms, course management systems, and student apps",
    description:
      "We build digital learning environments for schools, tutors, and EdTech startups — from course platforms to student progress dashboards.",
    examples: [
      "Online course platform with video, quizzes, and certificates",
      "Student progress dashboard and parent portal",
      "Live tutoring booking and session management app",
      "AI-powered learning assistant for Q&A and study guidance",
    ],
    relatedService: "saas-mvp",
    color: "#00C9A7",
  },
  {
    id: "ecommerce",
    industry: "eCommerce & Retail",
    icon: "🛒",
    headline: "Custom storefronts, inventory systems, and order management platforms",
    description:
      "We build custom ecommerce experiences beyond what Shopify templates offer — including unique product flows, inventory management, and B2B ordering portals.",
    examples: [
      "Custom ecommerce storefront with product configurator",
      "B2B bulk ordering portal with pricing tiers",
      "Inventory and warehouse management system",
      "Abandoned cart and order follow-up automation",
    ],
    relatedService: "web-app-development",
    color: "#6B4CF5",
  },
  {
    id: "local-services",
    industry: "Local & Field Services",
    icon: "🔧",
    headline: "Service booking apps, field team management, and customer portals",
    description:
      "For plumbers, cleaners, delivery companies, and local service businesses — we build booking apps, dispatch tools, and customer portals that run the operation.",
    examples: [
      "Service booking app with real-time availability",
      "Field technician dispatch and job tracking app",
      "Customer portal with service history and invoices",
      "WhatsApp booking and confirmation automation",
    ],
    relatedService: "flutter-mobile-apps",
    color: "#f59e0b",
  },
];
