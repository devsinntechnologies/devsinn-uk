"use client";

import { useEffect } from "react";

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
};

export default function CalendlyModal({
  isOpen,
  onClose,
  url,
}: CalendlyModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-nearblack/75 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a call"
    >
      <div
        className="relative mx-auto flex h-full w-full max-w-[1100px] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone bg-offwhite text-nearblack shadow-md transition-transform duration-200 hover:scale-105 hover:bg-teal hover:text-offwhite cursor-pointer"
          aria-label="Close booking modal"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="h-[82vh] w-full overflow-hidden rounded-[28px] border border-stone bg-offwhite shadow-lg">
          <iframe
            src={url}
            title="Calendly booking"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
