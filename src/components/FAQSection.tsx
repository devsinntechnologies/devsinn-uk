"use client";

import { Fragment, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { MessageCircleQuestion, Minus, Plus } from "lucide-react";
import Button from "@/components/ui/button";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import { homeTheme as h } from "@/components/home/homeTheme";
import { homeFaqs } from "@/data/faqs";

function renderAnswerWithLinks(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      return <Fragment key={index}>{part}</Fragment>;
    }
    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal underline-offset-4 hover:underline"
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        key={index}
        href={href}
        className="font-semibold text-teal underline-offset-4 hover:underline"
      >
        {label}
      </Link>
    );
  });
}

export default function FAQSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHero
        badge="FAQ"
        title={
          <>
            AI Automation, SaaS &amp; Custom Software — <PageHeroAccent>FAQ</PageHeroAccent>
          </>
        }
        description="Answers about cost, timeline, MVP development, post-launch support, and how Devsinn Technologies works."
        compact
      />

      <section id="faq" className={`${h.section} ${h.pad} bg-white`}>
        <div className="relative z-10 mx-auto w-full max-w-[900px]">
          <div className="space-y-3">
            {homeFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                    isOpen ? "border-teal/40 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]" : "border-stone hover:border-teal/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm font-medium text-nearblack sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                        isOpen ? "bg-teal text-white" : "bg-teal/10 text-teal"
                      }`}
                      aria-hidden
                    >
                      {isOpen ? <Minus size={16} strokeWidth={2.25} /> : <Plus size={16} strokeWidth={2.25} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="border-t border-stone px-5 py-4 text-sm leading-[1.75] text-gray sm:px-6 sm:text-[15px]">
                          {renderAnswerWithLinks(faq.answerMd ?? faq.answer)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="relative mt-12 overflow-hidden rounded-2xl border border-stone bg-[#f4f7f9] p-6 text-center sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-teal/10 blur-[80px]" aria-hidden />
            <span className="relative mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <MessageCircleQuestion size={22} strokeWidth={2} aria-hidden />
            </span>
            <h3 className="relative mt-4 font-display text-xl font-semibold! text-nearblack sm:text-2xl">
              Still have questions?
            </h3>
            <p className="relative mx-auto mt-3 max-w-[520px] text-sm leading-relaxed text-gray sm:text-base">
              Book a Free Strategy Call with our team. We&apos;ll clarify AI automation, SaaS development, or custom software scope — with no commitment required.
            </p>
            <div className="relative mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button id="faq-cta-strategy" variant="primary" href="/offers/fit-call">
                Book Free Consultation
              </Button>
              <Button id="faq-cta-contact" variant="secondary" href="/contact">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
