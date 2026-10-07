"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { allProjects, projectTabs, type ProjectCategoryKey } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

const colors = [
  "#4B8EF1", "#00C9A7", "#6B4CF5", "#33D9BC", "#7CB3F7", "#8E75F8"
];

export default function OurTechnology() {
  const [activeTab, setActiveTab] = useState<ProjectCategoryKey>(projectTabs[0].key);

  const currentCards = allProjects.filter(p => p.categoryKey === activeTab);

  return (
    <section className="relative overflow-hidden bg-[var(--surface-0)] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-16">
      <SectionDivider />
      {/* Soft Glow Backgrounds */}
      <div className="pointer-events-none absolute left-0 top-[20%] h-[600px] w-[600px] -translate-x-1/4 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, var(--primary-subtle) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute right-0 top-[60%] h-[600px] w-[600px] translate-x-1/4 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-12 lg:gap-20"
      >
        <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row">
          <motion.div variants={fadeInUp} className="max-w-[500px]">
            <h2 className="text-[2.2rem] font-black leading-[1.1] tracking-[-0.04em] sm:text-[3rem]">
              Featured <br />
              <span className="text-teal">
                Portfolio
              </span>
            </h2>
          </motion.div>

          {/* Animated Tabs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-2 rounded-[2rem] border border-white/10 bg-[var(--surface-1)] p-2 shadow-2xl"
          >
            {projectTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex h-[50px] sm:h-[60px] items-center justify-center rounded-[1.5rem] px-5 sm:px-8 text-[14px] sm:text-[15px] font-bold transition-colors duration-300 ${isActive ? "text-[var(--surface-0)]" : "text-white/60 hover:text-white"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabOurTechDark"
                      className="absolute inset-0 rounded-[1.5rem]"
                      style={{
                        backgroundImage: 'var(--grad-primary)',
                        boxShadow: '0 0 20px var(--primary-glow)'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        <div key={activeTab} className="mx-auto w-full max-w-[1280px] grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-8">
          {currentCards.map((item, index) => (
            <ProjectCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
