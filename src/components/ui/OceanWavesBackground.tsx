"use client";

import { useReducedMotion } from "framer-motion";

export default function OceanWavesBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-offwhite"
    >
      {/* Subtle glowing orb in the center for a futuristic tech feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-teal/5 blur-[120px] opacity-60" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-clear-blue/5 blur-[100px] opacity-50" />

      <style>{`
        @keyframes wave-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .wave-layer {
          position: absolute;
          width: 200vw;
          height: 100%;
          display: flex;
          align-items: center;
          will-change: transform;
        }
        .glow-stroke {
          filter: drop-shadow(0 0 8px rgba(1, 86, 180, 0.3));
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.35]" style={{ maskImage: "radial-gradient(ellipse at center, black 10%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 80%)" }}>

        {/* Layer 1 - Deep & Slow */}
        <div
          className="wave-layer text-teal/40"
          style={{
            top: '-15%',
            animation: shouldReduceMotion ? 'none' : 'wave-scroll-left 40s linear infinite'
          }}
        >
          <svg className="w-full h-[120vh]" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0,50 Q150,10 300,50 T600,50 Q750,10 900,50 T1200,50" />
          </svg>
        </div>

        {/* Layer 2 - Medium glowing */}
        <div
          className="wave-layer text-clear-blue/50 glow-stroke"
          style={{
            top: '-5%',
            animation: shouldReduceMotion ? 'none' : 'wave-scroll-right 30s linear infinite'
          }}
        >
          <svg className="w-full h-[100vh]" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0,50 Q150,25 300,50 T600,50 Q750,25 900,50 T1200,50" />
          </svg>
        </div>

        {/* Layer 3 - Foreground / Fast neon */}
        <div
          className="wave-layer text-teal/60 glow-stroke"
          style={{
            top: '10%',
            animation: shouldReduceMotion ? 'none' : 'wave-scroll-left 20s linear infinite'
          }}
        >
          <svg className="w-full h-[80vh]" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" stroke="url(#neonGradient)" strokeWidth="2">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-teal)" />
                <stop offset="50%" stopColor="var(--color-clear-blue)" />
                <stop offset="100%" stopColor="var(--color-teal)" />
              </linearGradient>
            </defs>
            <path d="M0,50 Q150,40 300,50 T600,50 Q750,40 900,50 T1200,50" />
          </svg>
        </div>

        {/* Layer 4 - Lowest layer, slow rolling */}
        <div
          className="wave-layer text-stone/40"
          style={{
            top: '30%',
            animation: shouldReduceMotion ? 'none' : 'wave-scroll-right 45s linear infinite'
          }}
        >
          <svg className="w-full h-[90vh]" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0,50 Q150,15 300,50 T600,50 Q750,15 900,50 T1200,50" />
          </svg>
        </div>

      </div>
    </div>
  );
}
