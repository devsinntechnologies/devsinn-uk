"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projectTabs, allProjects, type ProjectCategoryKey } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/button";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { homeTheme as h } from "@/components/home/homeTheme";

type PortfolioListProps = {
  /** Kept for backwards compatibility; the list always renders in the light home theme. */
  theme?: "light" | "dark";
};

const INITIAL_COUNT = 6;

export default function PortfolioList({ theme = "light" }: PortfolioListProps) {
  void theme;
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ProjectCategoryKey>("webDesign");
  const [showAll, setShowAll] = useState(false);
  const activeProjects = allProjects.filter((p) => p.categoryKey === activeTab);
  const displayedProjects = showAll ? activeProjects : activeProjects.slice(0, INITIAL_COUNT);

  return (
    <section className={`${h.section} ${h.bgBase} ${h.pad}`}>
      <div className={h.container}>
        <HomeSectionHeader
          align="center"
          badge="Full Portfolio"
          title="Explore our recent projects."
          description="Filter our work across web design, web development and native mobile apps."
        />

        {/* Filter pills (client-side only) */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="scrollbar-hide -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:mb-12 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {projectTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = allProjects.filter((p) => p.categoryKey === tab.key).length;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(tab.key);
                  setShowAll(false);
                }}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30 ${
                  isActive
                    ? "border-teal bg-teal text-white shadow-sm"
                    : "border-stone bg-white text-gray hover:border-teal/40 hover:text-nearblack"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    isActive ? "bg-white/20 text-white" : "bg-[#f4f7f9] text-gray"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          role="tabpanel"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayedProjects.map((item, index) => (
            <ProjectCard key={`${item.categoryKey}-${item.slug}`} item={item} index={index} />
          ))}
        </motion.div>

        {!showAll && activeProjects.length > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">
            <Button id="portfolio-show-all" onClick={() => setShowAll(true)} variant="secondary" size="md">
              View all {activeProjects.length} projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
