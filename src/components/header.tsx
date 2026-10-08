"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/button";
import { slideDown, staggerContainer } from "@/lib/motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "AI Consultant", href: "/ai-consultant" },
  { label: "AI Projects", href: "/ai-projects" },
  { label: "AI Specialist", href: "/ai-specialist" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const isHome = pathname === "/";
  const isOverHero = isHome && !isScrolled && !isOpen;
  const isSolid = !isOverHero;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.includes("#")) {
      const [path, linkHash] = href.split("#");
      return pathname === path && hash === `#${linkHash}`;
    }
    if (href === "/") {
      return pathname === "/" && !hash;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const readY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const apply = (y: number) => setIsScrolled(y > 16);

    const handleWindowScroll = () => apply(readY());
    const handleAppScroll = (event: Event) => {
      const detail = (event as CustomEvent<{ scroll?: number }>).detail;
      apply(typeof detail?.scroll === "number" ? detail.scroll : readY());
    };

    handleWindowScroll();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("app-scroll", handleAppScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("app-scroll", handleAppScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full pointer-events-none">
      <div
        className={`pointer-events-auto relative w-full transition-all duration-500 ease-out ${
          isSolid
            ? "border-b border-stone/80 bg-white/98 shadow-[0_8px_30px_rgba(26,26,24,0.06)] backdrop-blur-xl"
            : "border-b border-white/10 bg-transparent"
        }`}
      >
        {!isSolid && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            aria-hidden
          />
        )}

        <div
          className={`mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4 xl:px-10`}
        >
          <motion.div
            className="relative shrink-0"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="block" onClick={() => setIsOpen(false)}>
              <div
                className="relative h-9 w-32 sm:w-36"
              >
                <Image
                  src="/devsinnlogo0.svg"
                  alt="Devsinn Technologies AI Automation Company Logo"
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  priority
                  className={`object-contain object-left transition-[filter] duration-500 ${
                    isOverHero ? "brightness-0 invert" : ""
                  }`}
                />
              </div>
            </Link>
          </motion.div>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-6 lg:flex xl:gap-8">
            <motion.nav
              className="flex min-w-0 items-center gap-0.5 xl:gap-1"
              aria-label="Primary navigation"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <motion.div key={item.label} variants={slideDown} className="shrink-0">
                    <Link
                      href={item.href}
                      className={`relative rounded-lg px-3 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 xl:px-3.5 xl:text-sm ${
                        isOverHero
                          ? active
                            ? "bg-white/15 text-white"
                            : "text-white/85 hover:bg-white/10 hover:text-white"
                          : active
                            ? "bg-teal/10 text-teal"
                            : "text-nearblack/80 hover:bg-stone/50 hover:text-nearblack"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`shrink-0 pl-6 xl:pl-8 ${
                isOverHero ? "border-l border-white/20" : "border-l border-stone"
              }`}
            >
              <Button
                href="/contact"
                size="md"
                variant={isOverHero ? "secondary" : "primary"}
                className={`!px-5 !py-2.5 !text-sm transition-all duration-300 ${
                  isOverHero
                    ? "!border-white/30 !bg-white/10 !text-white hover:!border-white/50 hover:!bg-white/20"
                    : ""
                }`}
              >
                Hire Us
              </Button>
            </motion.div>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 lg:hidden cursor-pointer ${
              isOverHero
                ? "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/15"
                : "border-stone bg-white text-nearblack hover:border-teal/30 hover:bg-stone/40"
            }`}
          >
            <span className="flex flex-col items-center justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`pointer-events-auto absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-stone bg-white shadow-xl transition-all duration-300 ease-out lg:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto w-full max-w-lg px-5 py-6 sm:px-6">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                    active
                      ? "bg-teal/10 text-teal"
                      : "text-nearblack/90 hover:bg-stone/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 border-t border-stone pt-6">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              fullWidth
              onClick={() => setIsOpen(false)}
            >
              Hire Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
