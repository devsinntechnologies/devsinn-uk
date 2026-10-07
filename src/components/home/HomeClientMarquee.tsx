"use client";

import SectionDivider from "@/components/ui/SectionDivider";

const clients = [
  "ChatSupplies",
  "DigiNizam",
  "Smart Logo Maker",
  "Drafidox",
  "Certainli",
  "WeTeachs",
  "Jiffy",
  "IQRA",
  "RMS",
  "Umazing",
];

export default function HomeClientMarquee() {
  const track = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden border-y border-stone bg-white py-10 sm:py-12">
      <SectionDivider />
      <div className="mx-auto mb-6 w-full max-w-[1280px] px-4 text-center sm:px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-teal">
          Trusted delivery
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-nearblack sm:text-3xl">
          Trusted by innovative teams worldwide
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap px-6">
          {track.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="text-lg font-semibold tracking-tight text-nearblack/35 transition-colors hover:text-teal/80 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            white-space: normal;
            gap: 1rem 2rem;
          }
        }
      `}</style>
    </section>
  );
}
