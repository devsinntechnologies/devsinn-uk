export const SITE_URL = "https://www.devsinntechnologies.com";
export const SITE_NAME = "Devsinn Technologies";

export const defaultDescription =
  "Devsinn Technologies builds AI automation, SaaS products, web apps, and custom software to help businesses automate workflows, launch faster, and scale their business.";

export const defaultTitle = "AI Automation & SaaS Development | Devsinn Technologies";

export const seoKeywords = [
  "AI Automation Services",
  "Custom Software Development",
  "SaaS Development Company",
  "MVP Development",
  "Product Engineering",
  "Web Application Development",
  "Mobile App Development",
  "Flutter App Development",
  "React Development",
  "Next.js Development",
  "AI Agent Development",
  "Business Process Automation",
  "Workflow Automation",
  "Enterprise Software Development",
  "CRM Development",
  "ERP Development",
  "Custom SaaS Solutions",
  "Cloud Application Development",
  "Software Development Company",
  "Technology Consulting",
  "Product Design",
  "Startup Product Development",
  "API Development",
  "DevOps Services",
  "Business Automation",
  "Generative AI Solutions",
  "Chatbot Development",
  "Software Engineering Services",
  "Pakistan Software House",
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512x512.png`,
  image: `${SITE_URL}/favicon-512x512.png`,
  description: defaultDescription,
  email: "hello@devsinn.co.uk",
  telephone: "+92-336-5918295",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.linkedin.com/company/devsinn-technologies/",
    "https://www.facebook.com/devsinntechnology",
    "https://www.instagram.com/devsinn_technologies/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@devsinn.co.uk",
    telephone: "+92-336-5918295",
    availableLanguage: ["English"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: defaultDescription,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: `${SITE_URL}/favicon-512x512.png`,
  },
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/favicon-512x512.png`,
  description: defaultDescription,
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceType: [
    "AI Automation & Agents",
    "SaaS MVP Development",
    "Custom Software Development",
    "App Rescue & Maintenance",
  ],
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    image: article.image ?? `${SITE_URL}/favicon-512x512.png`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon-512x512.png`,
      },
    },
  };
}
