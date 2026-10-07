"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user prefers-reduced-motion settings
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scrolling with GSAP ScrollTrigger updates
    lenis.on("scroll", ({ scroll }) => {
      ScrollTrigger.update();
      window.dispatchEvent(
        new CustomEvent("app-scroll", { detail: { scroll } })
      );
    });

    // Connect Lenis to the GSAP ticker
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);

    // Synchronize ScrollTrigger refreshes (e.g. after pinning) back to Lenis
    const handleRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    // Sync resize events to recalculate heights
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(updateRaf);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
    };
  }, []);

  return null;
}
