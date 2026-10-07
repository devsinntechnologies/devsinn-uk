"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollChrome() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Force scroll to top on path transitions
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? (scrollTop / total) * 100 : 0;

      setProgress(nextProgress);
      setShowTop(scrollTop > 320);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar - Strict Colors Only */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-stone"
      >
        <div
          className="h-full bg-teal transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scroll-to-Top Button - Strict Colors Only */}
      <button
        type="button"
        aria-label="Scroll back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-lg border border-stone bg-teal text-offwhite shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-nearblack sm:bottom-7 sm:right-7 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 19V5M5 12L12 5L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
