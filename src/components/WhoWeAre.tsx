"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, card3D } from "@/lib/motion";
import SectionDivider from "@/components/ui/SectionDivider";

export default function WhoWeAre() {
  return (
    <section className="relative bg-[var(--surface-0)] px-5 py-16 sm:px-8 lg:px-10 lg:py-20 xl:px-16 overflow-hidden">
      <SectionDivider />
      {/* Background flourishes */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, var(--primary-subtle) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/2 rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }} />


      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
      >
        {/* Left Picture Side */}
        <motion.div
          variants={card3D}
          whileHover="hover"
          className="relative w-full max-w-[95%] mx-auto lg:max-w-full overflow-visible"
          style={{ aspectRatio: "16/10" }}
        >
          {/* Picture frame glow */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[32px] opacity-20 blur-xl transition-opacity duration-500 hover:opacity-40" style={{ backgroundImage: 'var(--grad-primary)' }} />

          {/* Using absolute inset-0 to prevent height collapse */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] border border-white/10 bg-[var(--surface-1)] shadow-2xl backdrop-blur-md">
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <Image
                src="/pic.png"
                alt="Devsinn software engineering team collaborating"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-0)]/80 via-transparent to-[var(--surface-0)]/20" />
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 right-0 lg:-right-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-[var(--surface-1)]/90 p-4 pr-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ backgroundImage: 'var(--grad-primary)', boxShadow: '0 0 20px var(--primary-glow)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: 'var(--secondary)' }}>Trusted By</p>
              <p className="text-[20px] font-black text-white">100+ Clients</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content Side */}
        <motion.div
          variants={staggerContainer}
          className="flex w-full flex-col items-start"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border px-4 py-2" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--accent-subtle)' }}>
            <span className="text-[12px] font-extrabold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>Who We Are</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mt-4 text-[2rem] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem]"
          >
            Empower Your Teams <br className="hidden lg:block" />
            <span className="text-teal">
              Streamline Operations
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-5 text-[1rem] leading-[1.65] text-white/70 sm:text-[1.1rem]"
          >
            Devsinn Technologies is your gateway to cutting-edge IT services for
            businesses and brands. We are your strategic partner in navigating the
            ever-evolving digital landscape.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mt-3 text-[1rem] leading-[1.65] text-white/70 sm:text-[1.1rem]"
          >
            With a relentless commitment to innovation and excellence, we provide tailored IT solutions that empower your organization to thrive in the modern world.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6">
            <Link
              href="/services"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-lg bg-white px-10 text-[15px] font-bold text-[var(--surface-0)] shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 translate-x-[-100%] transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]" style={{ background: 'linear-gradient(90deg, transparent, var(--primary-subtle), transparent)' }} />
              <span className="relative flex items-center gap-2">
                Discover Our Services
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
