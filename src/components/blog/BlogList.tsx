"use client";

import { SearchX, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import Button from "@/components/ui/button";
import { homeTheme as h } from "@/components/home/homeTheme";
import { blogCategories, blogs } from "@/lib/blogs";
import { BlogCard, BlogFeaturedCard } from "./BlogCard";

const ALL = "All";

/** Newest first — display order only, the data source is unchanged. */
const sortedBlogs = [...blogs].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

const categoryCounts = blogs.reduce<Record<string, number>>((acc, blog) => {
  acc[blog.category] = (acc[blog.category] ?? 0) + 1;
  return acc;
}, {});

export default function BlogList() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const normalizedQuery = query.toLowerCase().trim();
  const isFiltering = activeCategory !== ALL || normalizedQuery.length > 0;

  const filteredBlogs = useMemo(
    () =>
      sortedBlogs.filter((blog) => {
        const matchesCategory = activeCategory === ALL || blog.category === activeCategory;
        const matchesQuery =
          !normalizedQuery ||
          blog.title.toLowerCase().includes(normalizedQuery) ||
          blog.excerpt.toLowerCase().includes(normalizedQuery) ||
          blog.category.toLowerCase().includes(normalizedQuery) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, normalizedQuery]
  );

  // Show the newest matching post as a large card, the rest in the grid.
  const [leadBlog, ...gridBlogs] = filteredBlogs;

  const resetFilters = () => {
    setQuery("");
    setActiveCategory(ALL);
  };

  return (
    <main className="bg-white text-nearblack">
      <PageHero
        badge="Blog"
        title={
          <>
            Insights on AI, SaaS &amp; <PageHeroAccent>product engineering</PageHeroAccent>
          </>
        }
        description="Practical guides on AI automation sprints, SaaS MVP budgeting, app rescue, and the engineering decisions behind products that ship."
        compact
      >
        <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-5">
          <label className="relative block w-full max-w-[560px]">
            <span className="sr-only">Search articles</span>
            <Search
              aria-hidden
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, topics or tags…"
              className="h-13 w-full rounded-xl border border-stone bg-white pl-11 pr-11 text-[15px] text-nearblack shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] outline-none transition placeholder:text-gray/70 focus:border-teal focus:ring-4 focus:ring-teal/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray transition-colors hover:bg-[#f4f7f9] hover:text-nearblack"
              >
                <X size={16} />
              </button>
            ) : null}
          </label>

          <div
            role="group"
            aria-label="Filter by category"
            className="flex w-full flex-wrap justify-center gap-2"
          >
            {blogCategories.map((category) => {
              const active = activeCategory === category;
              const count = category === ALL ? blogs.length : categoryCounts[category] ?? 0;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "border-teal bg-teal text-white shadow-[0_8px_24px_-10px_rgba(0,92,255,0.6)]"
                      : "border-stone bg-white text-gray hover:border-teal/40 hover:text-teal"
                  }`}
                >
                  {category}
                  <span
                    className={`rounded-full px-1.5 text-[11px] leading-[18px] ${
                      active ? "bg-white/20 text-white" : "bg-[#f4f7f9] text-gray"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PageHero>

      <section className={`${h.section} bg-white ${h.pad}`}>
        <div className={h.container}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray" aria-live="polite">
              {isFiltering ? (
                <>
                  <span className="font-semibold text-nearblack">{filteredBlogs.length}</span>{" "}
                  {filteredBlogs.length === 1 ? "article" : "articles"}
                  {activeCategory !== ALL ? (
                    <>
                      {" "}in <span className="font-medium text-teal">{activeCategory}</span>
                    </>
                  ) : null}
                  {normalizedQuery ? (
                    <>
                      {" "}matching &ldquo;
                      <span className="font-medium text-nearblack">{query.trim()}</span>&rdquo;
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <span className="font-semibold text-nearblack">{blogs.length}</span> articles, newest first
                </>
              )}
            </p>
            {isFiltering ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-nearblack"
              >
                <X size={15} aria-hidden />
                Clear filters
              </button>
            ) : null}
          </div>

          {leadBlog ? (
            <>
              <BlogFeaturedCard
                key={leadBlog.slug}
                blog={leadBlog}
                label={isFiltering ? "Top match" : "Latest"}
              />

              {gridBlogs.length > 0 ? (
                <>
                  <h2 className="mb-6 mt-14 font-display text-xl font-semibold! tracking-[-0.01em] text-nearblack sm:text-2xl">
                    {isFiltering ? "More results" : "More articles"}
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gridBlogs.map((blog, index) => (
                      <BlogCard key={blog.slug} blog={blog} index={index} />
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <div className="mx-auto flex max-w-[560px] flex-col items-center rounded-2xl border border-dashed border-stone bg-offwhite px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-stone bg-white text-teal shadow-sm">
                <SearchX size={24} aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold! text-nearblack">
                No articles match your search
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-gray">
                Try a different keyword, or browse every topic again.
              </p>
              <Button className="mt-6" variant="secondary" size="md" onClick={resetFilters}>
                Show all articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
