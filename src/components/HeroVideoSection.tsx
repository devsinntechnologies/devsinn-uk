"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GraduationCap, Laptop, Pause, Play, Rocket, Volume2, VolumeX } from "lucide-react";
import Button from "@/components/ui/button";
import SectionDivider from "@/components/ui/SectionDivider";
import { homeTheme as h } from "@/components/home/homeTheme";

const CAREERS_VIDEO = "/7693468-hd_1280_720_25fps.mp4";
const CAREERS_POSTER = "/pexels-silverkblack-36733322.jpg";

const perks = [
  { icon: Rocket, label: "Real products, real users" },
  { icon: GraduationCap, label: "Learn from senior engineers" },
  { icon: Laptop, label: "Flexible, remote-friendly" },
];

export default function HeroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Play only while the banner is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10%" },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="careers"
      className={`${h.section} ${h.pad} bg-white`}
      aria-labelledby="careers-video-heading"
    >
      <SectionDivider />

      <div className={h.container}>
        <motion.div
          className="relative isolate flex min-h-[520px] overflow-hidden rounded-[2rem] border border-stone bg-[#0b1220] shadow-[0_24px_60px_-24px_rgba(16,24,40,0.35)] sm:min-h-[560px]"
          {...reveal()}
        >
          <video
            ref={videoRef}
            src={CAREERS_VIDEO}
            poster={CAREERS_POSTER}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
          />
          {/* Readability overlays: strong on the text side, clear on the right. */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#0b1220]/95 via-[#0b1220]/70 to-[#0b1220]/30 md:bg-gradient-to-r md:from-[#0b1220]/95 md:via-[#0b1220]/65 md:to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute -left-24 top-1/2 -z-10 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-teal/25 blur-[110px]" aria-hidden />

          <div className="flex w-full flex-col justify-end p-7 sm:p-10 md:justify-center lg:p-14">
            <div className="max-w-[540px]">
              <motion.div
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                {...reveal(0.05)}
              >
                <span className="h-2 w-2 rounded-full bg-[#4d8dff]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  Careers at Devsinn
                </span>
              </motion.div>

              <motion.h2
                id="careers-video-heading"
                className="mt-5 font-display text-[2rem] font-medium! leading-[1.1] tracking-[-0.02em] text-white! sm:text-[2.5rem] lg:text-[3rem]"
                {...reveal(0.1)}
              >
                Where careers{" "}
                <span className="text-[#7aa8ff]">
                  take shape
                </span>
              </motion.h2>

              <motion.p
                className="mt-4 max-w-[460px] text-base leading-[1.7] text-white/80 sm:text-lg"
                {...reveal(0.15)}
              >
                Build meaningful work with a team that values growth, collaboration, and real impact.
              </motion.p>

              <motion.ul className="mt-6 flex flex-wrap gap-2.5" {...reveal(0.2)}>
                {perks.map((perk) => (
                  <li
                    key={perk.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-sm"
                  >
                    <perk.icon size={14} className="text-[#7aa8ff]" aria-hidden />
                    {perk.label}
                  </li>
                ))}
              </motion.ul>

              <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...reveal(0.25)}>
                <Button id="careers-banner-explore" variant="primary" href="/careers">
                  Explore careers
                </Button>
                <Link
                  href="/careers#open-roles"
                  className="group inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-white/85 transition-colors hover:text-white"
                >
                  View open roles
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="absolute right-5 top-5 flex items-center gap-2 sm:bottom-6 sm:right-6 sm:top-auto">
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-px" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
