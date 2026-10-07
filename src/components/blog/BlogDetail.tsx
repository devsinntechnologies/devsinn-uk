"use client";

import { ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import Button from "@/components/ui/button";
import { homeTheme as h } from "@/components/home/homeTheme";
import type { Blog } from "@/lib/blogs";
import { blogs, getRelatedBlogs } from "@/lib/blogs";
import { BlogCard, BlogCover, BlogMeta } from "./BlogCard";
import BlogMarkdown, { getMarkdownHeadings } from "./BlogMarkdown";
import BlogShareButton from "./BlogShareButton";
import { BlogTocDesktop, BlogTocMobile } from "./BlogToc";

const MORE_POSTS = 3;

/** Same-category posts first, topped up with the newest other posts. */
function getMorePosts(blog: Blog) {
  const related = getRelatedBlogs(blog, MORE_POSTS);
  const taken = new Set([blog.id, ...related.map((item) => item.id)]);
  const latest = [...blogs]
    .filter((item) => !taken.has(item.id))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return [...related, ...latest].slice(0, MORE_POSTS);
}

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-white px-3 py-1.5 text-[12.5px] text-gray"
        >
          <Tag size={12} className="text-teal" aria-hidden />
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function BlogDetail({ blog }: { blog: Blog }) {
  const shouldReduceMotion = useReducedMotion();
  const headings = useMemo(() => getMarkdownHeadings(blog.content), [blog.content]);
  const morePosts = useMemo(() => getMorePosts(blog), [blog]);

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-5%" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className="bg-white text-nearblack">
      <PageHero
        align="left"
        compact
        badge={blog.category}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
        title={blog.title}
        description={blog.excerpt}
      >
        <div className="flex flex-col gap-5 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[13px] text-gray">
              By <span className="font-medium text-nearblack">Devsinn Technologies</span>
            </span>
            <span aria-hidden className="hidden h-4 w-px bg-stone sm:block" />
            <BlogMeta publishedAt={blog.publishedAt} readTime={blog.readTime} className="text-[13px]!" />
          </div>
          <BlogShareButton title={blog.title} excerpt={blog.excerpt} />
        </div>
      </PageHero>

      {/* Cover + article */}
      <section className={`${h.section} bg-white px-5 pb-16 pt-4 sm:px-8 sm:pb-20 lg:px-10 xl:px-16`}>
        <div className={h.container}>
          <motion.div {...fadeUp}>
            <BlogCover
              src={blog.image}
              alt={blog.title}
              priority
              zoom={false}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="aspect-[16/9] w-full rounded-2xl border border-stone shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] lg:aspect-[21/9]"
            />
          </motion.div>

          <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,720px)_260px] lg:justify-center lg:gap-16 xl:gap-24">
            <article className="min-w-0">
              <BlogTocMobile headings={headings} />
              <BlogMarkdown content={blog.content} />

              <div className="mt-14 flex flex-col gap-6 rounded-2xl border border-stone bg-offwhite p-6 sm:p-7">
                {blog.tags.length > 0 ? (
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-nearblack">
                      Topics in this article
                    </p>
                    <TagList tags={blog.tags} />
                  </div>
                ) : null}
                <div className="flex flex-col gap-3 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray transition-colors hover:text-teal"
                  >
                    <ArrowLeft size={16} aria-hidden />
                    Back to all articles
                  </Link>
                  <BlogShareButton title={blog.title} excerpt={blog.excerpt} />
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <BlogTocDesktop headings={headings} />
                <div className="rounded-2xl border border-stone bg-white p-6 shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                    Working on something similar?
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray">
                    Talk through your product with our team and get a clear next step.
                  </p>
                  <Button href="#book-a-call" variant="primary" size="md" fullWidth className="mt-5">
                    Book a call
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {morePosts.length > 0 ? (
        <section className={`${h.section} ${h.bgSoft} ${h.pad}`}>
          <div className={h.container}>
            <div className="flex flex-wrap items-end justify-between gap-x-6">
              <HomeSectionHeader
                badge="Keep reading"
                title={
                  <>
                    More from the <PageHeroAccent>Devsinn blog</PageHeroAccent>
                  </>
                }
                description="Practical guides on AI automation, SaaS MVPs and product engineering."
              />
              <Button href="/blog" variant="secondary" size="md" className="mb-10 bg-white! sm:mb-12">
                View all articles
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((item, index) => (
                <BlogCard key={item.slug} blog={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
