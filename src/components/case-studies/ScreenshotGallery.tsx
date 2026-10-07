"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

type ScreenshotGalleryProps = {
  screenshots: string[];
  title: string;
  /** "web" shows browser-framed tiles; "app" shows tall phone-framed tiles. */
  variant?: "web" | "app";
};

const navButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone bg-white text-nearblack shadow-md transition-colors duration-200 hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/35";

export default function ScreenshotGallery({ screenshots, title, variant = "web" }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isApp = variant === "app";

  const showPrev = () =>
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + screenshots.length) % screenshots.length,
    );
  const showNext = () =>
    setActiveIndex((current) => (current === null ? current : (current + 1) % screenshots.length));

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % screenshots.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + screenshots.length) % screenshots.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, screenshots.length]);

  return (
    <>
      {/* Light frame around the thumbnails */}
      <div className="rounded-2xl border border-stone bg-[#f4f7f9] p-4 sm:p-6">
        <div
          className={`grid gap-4 sm:gap-6 ${
            isApp ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {screenshots.map((screenshot, i) => (
            <button
              key={`${screenshot}-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View ${title} screenshot ${i + 1} full size`}
              className={`group relative flex cursor-zoom-in flex-col overflow-hidden border border-stone bg-white text-left shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                isApp ? "rounded-[1.75rem] p-1.5" : "rounded-2xl"
              }`}
            >
              {!isApp ? (
                <span aria-hidden className="flex h-8 shrink-0 items-center gap-1.5 border-b border-stone bg-offwhite px-4">
                  <span className="h-2 w-2 rounded-full bg-stone" />
                  <span className="h-2 w-2 rounded-full bg-stone" />
                  <span className="h-2 w-2 rounded-full bg-stone" />
                </span>
              ) : null}
              <span
                className={`relative block w-full overflow-hidden bg-offwhite ${
                  isApp ? "aspect-[9/19] rounded-[1.4rem]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={screenshot}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  sizes={isApp ? "(max-width: 640px) 50vw, 260px" : "(max-width: 640px) 100vw, 400px"}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-nearblack/0 opacity-0 transition-all duration-300 group-hover:bg-nearblack/20 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-white px-4 py-2 text-xs font-semibold text-nearblack shadow-md">
                    <Maximize2 aria-hidden className="h-3.5 w-3.5" />
                    View full size
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox (modal overlay stays dark for contrast) */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-nearblack/80 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshot viewer`}
        >
          <div
            className="relative mx-auto flex h-full w-full max-w-[1100px] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className={`${navButtonClass} absolute right-0 top-0 z-10`}
              aria-label="Close screenshot viewer"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className={`${navButtonClass} absolute left-0 top-1/2 z-10 -translate-y-1/2`}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft aria-hidden className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className={`${navButtonClass} absolute right-0 top-1/2 z-10 -translate-y-1/2`}
                  aria-label="Next screenshot"
                >
                  <ChevronRight aria-hidden className="h-5 w-5" />
                </button>
                <span className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 rounded-full border border-stone bg-white px-3 py-1 text-xs font-medium text-nearblack shadow-md">
                  {activeIndex + 1} / {screenshots.length}
                </span>
              </>
            )}

            <div className="relative h-[82vh] w-full overflow-hidden rounded-2xl">
              <Image
                src={screenshots[activeIndex]}
                alt={`${title} screenshot ${activeIndex + 1} full size`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
