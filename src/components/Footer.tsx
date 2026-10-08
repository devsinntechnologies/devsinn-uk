"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const columns = [
  {
    title: "Services",
    links: [
      { label: "AI Consultant", href: "/ai-consultant" },
      { label: "AI Projects", href: "/ai-projects" },
      { label: "AI Specialist", href: "/ai-specialist" },
      { label: "AI Automation & Agents", href: "/services/ai-automation" },
      { label: "SaaS MVP Development", href: "/services/saas-mvp" },
      { label: "Custom Software", href: "/services/software-development" },
      { label: "App Rescue & Maintenance", href: "/services/app-rescue-maintenance" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Book a Strategy Call", href: "/offers/fit-call" },
      { label: "Paid Product Audit", href: "/offers/product-audit" },
      { label: "Reduce Manual Ops with AI", href: "/solutions/reduce-manual-operations-with-ai" },
      { label: "Launch or Rescue SaaS", href: "/solutions/launch-or-rescue-saas-product" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/termsandconditions" },
];

const CONTACT_EMAIL = "info@devsinntechnologies.com";
const CONTACT_PHONE = "+92 336 5918295";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/devsinntechnology",
    brandColor: "#1877F2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/devsinn_technologies/",
    brandColor: "#E1306C",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#instaGradient)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="instaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f9ce34" />
            <stop offset="50%" stopColor="#ee2a7b" />
            <stop offset="100%" stopColor="#6228d7" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/devsinn-technologies/",
    brandColor: "#0A66C2",
    icon: (
      <svg width="18" height="18" viewBox="-2 -2 28 28" fill="#0A66C2">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Product Hunt",
    href: "https://www.producthunt.com/@devsinn_technologies",
    brandColor: "#DA552F",
    icon: (
      <img src="/footer/producthunt.png" alt="" className="h-[18px] w-[18px] object-contain" />
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/devsinnt/",
    brandColor: "#E60023",
    icon: (
      <svg width="18" height="18" viewBox="-2 -2 28 28" fill="#E60023">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.907 2.17-2.907 1.025 0 1.522.771 1.522 1.692 0 1.03-.657 2.571-.994 3.998-.284 1.197.599 2.174 1.776 2.174 2.133 0 3.772-2.25 3.772-5.498 0-2.876-2.067-4.887-5.019-4.887-3.419 0-5.424 2.564-5.424 5.215 0 1.033.399 2.14.896 2.742.098.12.112.224.083.344-.091.378-.293 1.189-.332 1.354-.052.217-.172.263-.396.16-1.482-.689-2.409-2.85-2.409-4.59 0-3.738 2.716-7.172 7.832-7.172 4.113 0 7.309 2.932 7.309 6.848 0 4.087-2.577 7.376-6.155 7.376-1.201 0-2.33-.624-2.717-1.362l-.742 2.827c-.269 1.025-1.001 2.309-1.494 3.111 1.125.347 2.316.536 3.551.536 6.62 0 11.986-5.366 11.986-11.987C23.997 5.367 18.63 0 12.017 0z" />
      </svg>
    ),
  },
  {
    label: "Quora",
    href: "https://www.quora.com/profile/Devsinn-Technologies",
    brandColor: "#B92B27",
    icon: (
      <img src="/footer/quora.png" alt="" className="h-[18px] w-[18px] object-contain" />
    ),
  },
];

function scrollTopIfSamePage(href: string) {
  if (href.includes("#") || typeof window === "undefined") return;
  const targetUrl = new URL(href, window.location.origin);
  if (targetUrl.pathname === window.location.pathname) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      scroll
      onClick={() => scrollTopIfSamePage(href)}
      className="group inline-flex w-fit items-center text-sm text-gray transition-colors duration-200 hover:text-teal focus-visible:text-teal focus-visible:outline-none"
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-teal transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
    </Link>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-stone bg-[#f4f7f9] text-nearblack">
      {/* Huge background wordmark */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 flex justify-center opacity-[0.035] select-none" aria-hidden>
        <span className="font-syne text-[18vw] font-black leading-[0.75] tracking-tighter whitespace-nowrap text-nearblack">
          DEVSINN
        </span>
      </div>
      <div className="pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-teal/[0.06] blur-[100px]" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-16">
        {/* Top bar: tagline + CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-stone py-10 sm:py-12 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-medium leading-tight tracking-[-0.01em] text-nearblack sm:text-[1.75rem]">
              Have a project in mind?
            </p>
            <p className="mt-1.5 text-sm text-gray sm:text-base">
              Tell us what you&apos;re building — we reply within 1 business day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button id="footer-cta-call" variant="primary" href="/offers/fit-call">
              Book a Strategy Call
            </Button>
            <Button id="footer-cta-contact" variant="secondary" href="/contact">
              Hire Us
            </Button>
          </div>
        </div>

        {/* Main grid */}
        <motion.div
          className="grid gap-10 border-b border-stone py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1fr] lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            <Link href="/" className="inline-flex w-fit" aria-label="Devsinn Technologies home">
              <img
                src="/devsinnlogo0.svg"
                alt="Devsinn Technologies AI Automation Company Logo"
                className="h-10 w-36 object-contain object-left sm:w-44"
              />
            </Link>

            <p className="max-w-[340px] text-sm leading-relaxed text-gray">
              AI-enabled SaaS, mobile products, and operations automation — from planning to launch
              and long-term support.
            </p>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="group inline-flex items-center gap-3 text-gray transition-colors hover:text-teal">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone bg-white text-teal">
                    <Mail size={15} />
                  </span>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className="group inline-flex items-center gap-3 text-gray transition-colors hover:text-teal">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone bg-white text-teal">
                    <Phone size={15} />
                  </span>
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-gray">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone bg-white text-teal">
                  <MapPin size={15} />
                </span>
                Serving clients in the US, UK &amp; worldwide
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-2.5">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone bg-white shadow-sm transition-colors duration-300 hover:border-teal/40"
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {columns.map((column) => (
            <motion.div key={column.title} variants={fadeInUp}>
              <h4 className="mb-5 text-[11px] font-bold! uppercase tracking-[0.14em] text-nearblack">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-7 md:flex-row">
          <p className="text-xs text-gray">
            &copy; {year} Devsinn Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-gray transition-colors hover:text-teal">
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 text-xs font-semibold text-nearblack transition-colors hover:text-teal"
            >
              Back to top
              <ArrowUpRight size={14} className="-rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
