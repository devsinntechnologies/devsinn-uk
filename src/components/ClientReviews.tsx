"use client";

import { MapPin, Quote, Star } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeTheme as h } from "@/components/home/homeTheme";

const testimonials = [
  {
    stars: 5,
    content: "Arham is a skilled, innovative Flutter/FlutterFlow expert with strong leadership, dedication, and holistic thinking. Highly recommended and eager to rehire.",
    name: "Taimur Khan",
    designation: "UK",
    initials: "TK",
  },
  {
    stars: 5,
    content: "Thank you for your hard work. The delivery was on time and the quality exceeded our expectations. Will definitely work together again.",
    name: "TrustLab Co., Ltd.",
    designation: "South Korea",
    initials: "TL",
  },
  {
    stars: 5,
    content: "Great remote desktop support. Very professional and knowledgeable. I would highly recommend him to anyone looking for top-tier technical assistance.",
    name: "Elizabeth",
    designation: "United States",
    initials: "EL",
  },
  {
    stars: 5,
    content: "Amazing experience with this cooperative seller — thanks a lot! The communication was smooth and the results were exactly what I was looking for.",
    name: "toyoucreative",
    designation: "Morocco",
    initials: "TC",
  },
  {
    stars: 5,
    content: "Really wonderful experience with this seller. I highly recommend him to anyone who needs quality work done efficiently and professionally.",
    name: "marwanbougsid",
    designation: "Morocco",
    initials: "MB",
  },
  {
    stars: 5,
    content: "An exceptional experience. Arham is very skilled and quick to find a solution. He is my first choice when it comes to FlutterFlow back-end support.",
    name: "vaidassaltenis",
    designation: "Lithuania",
    initials: "VS",
  },
  {
    stars: 5,
    content: "Excellent developer — gave me the best quality of work. Every detail was handled with care and precision. Strongly recommend for any development project.",
    name: "amritdhr",
    designation: "India",
    initials: "AD",
  },
  {
    stars: 5,
    content: "Did a great job! Quick turnaround, clear communication, and professional delivery. I'm very happy with the results and will be returning for more work.",
    name: "princessele",
    designation: "United States",
    initials: "PE",
  },
];

export default function ClientReviews() {
  return (
    <section className={`${h.section} ${h.pad} ${h.bgBase}`}>
      <SectionDivider />

      <div className={h.container}>
        <HomeSectionHeader
          align="center"
          badge="Testimonials"
          title={
            <>
              What our clients <span className="text-teal">say about us</span>
            </>
          }
          description="Feedback from founders and teams we've worked with across the globe."
        />
      </div>

      {/* Single row that scrolls sideways; the list is doubled so the -50% loop is seamless. */}
      <div className="reviews-marquee relative z-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <ul className="reviews-track flex w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="w-[300px] shrink-0 pr-5 sm:w-[380px]"
            >
              <div className={`${h.card} ${h.cardHover} flex h-full flex-col p-6 sm:p-7`}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-[#f59e0b]" aria-label={`${t.stars} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={16} fill={s < t.stars ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden />
                    ))}
                  </div>
                  <Quote size={26} className="text-teal/20" fill="currentColor" strokeWidth={0} aria-hidden />
                </div>

                <blockquote className="mt-4 flex-1 text-[15px] leading-[1.75] text-nearblack/85">&ldquo;{t.content}&rdquo;</blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-stone pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/10 text-sm font-semibold text-teal">
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-nearblack">{t.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[13px] text-gray">
                      <MapPin size={12} strokeWidth={2} aria-hidden />
                      {t.designation}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes reviews-scroll {
          to {
            transform: translateX(-50%);
          }
        }
        .reviews-track {
          animation: reviews-scroll 60s linear infinite;
        }
        .reviews-marquee:hover .reviews-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-track {
            animation: none;
          }
          .reviews-marquee {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
