"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";

const offices = [
  {
    id: "pak",
    label: "Devsinn PAK",
    title: "Global Headquarters",
    address: "H#14B-III, Butt Street, Rustam Park, Samnabad, Lahore, Pakistan",
    phone: "+92 336 5918295",
    email: "devsinntechnologies@gmail.com",
    pinLabel: "LAHORE",
    country: "PAKISTAN",
    // Coordinates tailored for the map graphic
    top: "54%",
    left: "71%",
    color: "var(--primary)",
    glow: "rgba(56,189,248,0.5)",
  },
  {
    id: "uk",
    label: "Devsinn UK",
    title: "European Hub",
    address: "Nottingham, Nottinghamshire County, England, United Kingdom",
    phone: "+44 7868 862651",
    email: "devsinntechnologies@gmail.com",
    pinLabel: "NOTTINGHAM",
    country: "UNITED KINGDOM",
    // Coordinates tailored for the map graphic
    top: "32%",
    left: "48%",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.5)",
  },
];

import Image from "next/image";

function WorldMapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      {/* Dynamic Radar Sweep */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          background: "conic-gradient(from 0deg, transparent 60%, rgba(56,189,248,0.05) 80%, rgba(56,189,248,0.3) 100%)",
        }}
      />


      {/* REALISTIC HIGH-RES MAP (Using original image) */}
      <div className="absolute inset-0 opacity-70 mix-blend-screen px-8 py-8 pointer-events-none">
        <Image
          src="/office/office2.png"
          alt="World Map Graphic"
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-contain object-center opacity-80"
          priority
        />
      </div>

      {/* Connection Arc & Grid Overlay Vector */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.85] mix-blend-screen drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] pointer-events-none" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">



        {/* Global Connection Arc from UK (x:48, y:32) to PAK (x:71, y:54) */}
        <path
          d="M 48 32 Q 59.5 12 71 54"
          stroke="url(#arc-grad)"
          strokeWidth="0.3"
          strokeDasharray="1 1"
          fill="none"
          className="animate-[dash_30s_linear_infinite]"
          style={{ filter: 'drop-shadow(0 0 2px rgba(5, 102, 158, 0.8))' }}
        />

        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0156B4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#0156B4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0156B4" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash {
          to { stroke-dashoffset: -2000; }
        }
      `}} />
    </div>
  );
}

export default function DevsinnOffice() {
  const [activeOfficeId, setActiveOfficeId] = useState(offices[0].id);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOfficeId((current) => {
        const idx = offices.findIndex((o) => o.id === current);
        return offices[(idx + 1) % offices.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeOffice = offices.find((o) => o.id === activeOfficeId) || offices[0];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#02050d] text-white">
      <SectionDivider />

      {/* ── BACKGROUND AMBIENT GLOWS ── */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[700px] w-[700px] -translate-x-[40%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute right-[10%] bottom-[10%] h-[700px] w-[700px] translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.05)_0%,transparent_70%)] blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-16">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col items-center text-center lg:mb-20"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: activeOffice.color }} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/80">Global Network</span>
          </div>
          <h2 className="text-[2.2rem] font-extrabold tracking-tight sm:text-[3rem] lg:text-[3.8rem]">
            Boundless <span className=" text-teal">Innovation</span>
          </h2>
          <p className="mt-4 max-w-[500px] mx-auto text-[1rem] leading-[1.8] text-white/45">
            Operating from strategic tech hubs across the world to deliver unparalleled digital excellence.
          </p>
        </motion.div>

        {/* ── MAIN LAYOUT CONTINER ── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-10">

          {/* LEFT PANEL - OFFICE CARDS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 relative z-20"
          >
            {offices.map((office) => {
              const active = office.id === activeOfficeId;
              return (
                <button
                  key={office.id}
                  onClick={() => setActiveOfficeId(office.id)}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-6 py-7 text-left backdrop-blur-2xl transition-all duration-500 hover:border-white/10 sm:px-8 sm:py-8"
                  style={{
                    borderColor: active ? `${office.color}40` : "rgba(255,255,255,0.05)",
                    boxShadow: active ? `0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px ${office.glow.replace("0.5", "0.1")}` : "0 10px 30px rgba(0,0,0,0.2)"
                  }}
                >
                  {/* Neon Line Overlay */}
                  {active && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b transition-all duration-500"
                      style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${office.color}, transparent)` }}
                    />
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-4 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0a1122]">
                      {active && (
                        <motion.div
                          layoutId="activeBoxIndicator"
                          className="absolute inset-0 rounded-xl"
                          style={{ border: `1.5px solid ${office.color}`, boxShadow: `0 0 15px ${office.color}40` }}
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      )}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? office.color : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <div>
                      <h3 className="text-[1.4rem] font-bold tracking-tight transition-colors duration-500 sm:text-[1.6rem]" style={{ color: active ? "white" : "rgba(255,255,255,0.5)" }}>
                        {office.label}
                      </h3>
                    </div>
                  </div>

                  {/* Content (Expanded State) */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: active ? "auto" : 0,
                      opacity: active ? 1 : 0,
                      marginTop: active ? 24 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 pt-2">
                      <div>
                        <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 block w-fit">
                          {office.title}
                        </span>
                        <p className="text-[14px] leading-[1.8] text-white/60">
                          {office.address}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a1122]/50 px-4 py-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={office.color} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                          <span className="text-[13px] font-semibold text-white/80">{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a1122]/50 px-4 py-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={office.color} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                          <span className="text-[13px] font-semibold text-white/80 break-all">{office.email}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </button>
              );
            })}
          </motion.div>

          {/* RIGHT PANEL - FUTURISTIC MAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a1122] to-[#040812] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group min-h-[380px] sm:aspect-auto sm:min-h-[500px] lg:min-h-full"
          >
            {/* Background Map Overlay & Radar Sweep */}
            <WorldMapBackground />

            {/* Glowing Map Pins */}
            {offices.map((office) => {
              const active = office.id === activeOfficeId;
              return (
                <div
                  key={`pin-${office.id}`}
                  className="absolute z-20 transition-all duration-700 ease-in-out"
                  style={{ top: office.top, left: office.left }}
                >
                  <button
                    onClick={() => setActiveOfficeId(office.id)}
                    className="group/pin relative flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
                  >
                    {/* Radar Pulse Rings on Active Pin */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            key={`ripples-${office.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            {/* Staggered smooth ripples */}
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="absolute rounded-full bg-transparent"
                                style={{ border: `1.5px solid ${office.color}`, width: 30, height: 30 }}
                                initial={{ scale: 1, opacity: 0 }}
                                animate={{
                                  scale: [1, 6],
                                  opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: i * 1,
                                  ease: [0.215, 0.61, 0.355, 1]
                                }}
                              />
                            ))}
                            {/* Central Pulse */}
                            <motion.div
                              className="absolute rounded-full bg-transparent"
                              style={{ border: `1px dashed ${office.color}`, width: 120, height: 120, opacity: 0.3 }}
                              animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* HUD Label hovering above Pin */}
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute bottom-[35px] flex flex-col items-center z-30"
                        >
                          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-white/20 bg-[#020610]/95 px-2.5 py-1.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] sm:gap-3 sm:px-4 sm:py-2">
                            <span className="h-1 w-1 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ background: office.color, color: office.color }} />
                            <span className="text-[9px] font-black uppercase tracking-[0.15em] sm:text-[11px]" style={{ color: office.color }}>
                              {office.pinLabel}
                            </span>
                            <span className="text-[8px] font-mono text-white/40 border-l border-white/20 pl-2 ml-1">{office.country}</span>
                          </div>
                          <div className="h-4 sm:h-8 w-[1.5px]" style={{ background: `linear-gradient(to bottom, ${office.color}, transparent)` }} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Core Point / Pin */}
                    <div
                      className="relative z-10 flex h-5 w-5 items-center justify-center rounded-lg transition-transform duration-300 cursor-pointer border-2"
                      style={{
                        background: active ? office.color : "#1e293b",
                        borderColor: active ? "#ffffff" : "rgba(255,255,255,0.2)",
                        boxShadow: active ? `0 0 30px ${office.color}, 0 0 60px ${office.color}` : "0 0 10px rgba(0,0,0,0.5)",
                        transform: active ? "scale(1.3)" : "scale(1)"
                      }}
                    >
                      {active && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white mix-blend-overlay"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                    </div>

                  </button>
                </div>
              );
            })}

            {/* Super intense ambient vignette to focus the center radar */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,5,13,0.95)_100%)]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
