import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Syne } from "next/font/google";
import Header from "@/components/header";
import ScrollChrome from "@/components/ui/ScrollChrome";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import {
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Section headings (h1/h2) — see globals.css. */
const syne = Syne({
  variable: "--font-syne-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Automation & SaaS Development | Devsinn Technologies",
    template: "%s | Devsinn Technologies",
  },
  description:
    "Devsinn Technologies builds AI automation, SaaS products, web apps, and custom software to help businesses automate workflows, launch faster, and scale their business.",
  keywords: [
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
  ],
  authors: [{ name: "Devsinn Technologies", url: "https://www.devsinntechnologies.com" }],
  creator: "Devsinn Technologies",
  metadataBase: new URL("https://www.devsinntechnologies.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.devsinntechnologies.com",
    siteName: "Devsinn Technologies",
    title: "AI Automation & SaaS Development | Devsinn Technologies",
    description:
      "Devsinn Technologies builds AI automation, SaaS products, web apps, and custom software to help businesses automate workflows, launch faster, and scale.",
    images: [
      {
        url: "/favicon-512x512.png",
        width: 512,
        height: 512,
        alt: "Devsinn Technologies AI Automation Company Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Automation & SaaS Development | Devsinn Technologies",
    description:
      "AI automation, SaaS products, web apps, and custom software to help businesses automate workflows, launch faster, and scale.",
    images: ["/favicon-512x512.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${syne.variable} antialiased`}
    >
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            professionalServiceSchema,
          ]),
        }}
      />
      <body suppressHydrationWarning className="relative flex flex-col bg-offwhite text-nearblack selection:bg-teal selection:text-offwhite">
        <SmoothScroll />
        <CustomCursor />
        <ScrollChrome />
        <Header />
        <main className="relative flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
