"use client";

import { ArrowUpRight, Calendar, Clock, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Blog } from "@/lib/blogs";
import { formatBlogDate } from "@/lib/blogs";

export const blogCardClass =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-stone bg-white shadow-[0_12px_40px_-16px_rgba(16,24,40,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_50px_-18px_rgba(0,92,255,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30";

/** Cover image with a soft branded fallback if the file fails to load. */
export function BlogCover({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  zoom = true,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  zoom?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#f4f7f9] ${className}`}>
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`object-cover ${
            zoom ? "transition-transform duration-700 ease-out group-hover:scale-[1.04]" : ""
          }`}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal/[0.12] via-white to-[#7B9CFF]/[0.18]"
        >
          <Newspaper className="h-10 w-10 text-teal/50" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

export function CategoryPill({
  children,
  floating = false,
}: {
  children: string;
  floating?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-teal ${
        floating
          ? "border border-white/60 bg-white/90 shadow-sm backdrop-blur-sm"
          : "border border-teal/25 bg-teal/[0.08]"
      }`}
    >
      {children}
    </span>
  );
}

export function BlogMeta({
  publishedAt,
  readTime,
  compactDate = false,
  className = "",
}: {
  publishedAt: string;
  readTime: string;
  compactDate?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-gray ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={14} className="text-teal" aria-hidden />
        <time dateTime={publishedAt}>{formatBlogDate(publishedAt, compactDate)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} className="text-teal" aria-hidden />
        {readTime}
      </span>
    </div>
  );
}

function useFadeUp(delay = 0) {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-8%" },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
      };
}

/** Standard post card used in the blog grid and "keep reading" rows. */
export function BlogCard({ blog, index = 0 }: { blog: Blog; index?: number }) {
  const fadeUp = useFadeUp(Math.min(index, 5) * 0.06);

  return (
    <motion.div className="h-full" {...fadeUp}>
      <Link href={`/blog/${blog.slug}`} className={blogCardClass}>
        <div className="relative">
          <BlogCover
            src={blog.image}
            alt={blog.title}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px"
            className="aspect-[16/10] w-full"
          />
          <div className="absolute left-4 top-4">
            <CategoryPill floating>{blog.category}</CategoryPill>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <BlogMeta publishedAt={blog.publishedAt} readTime={blog.readTime} compactDate />
          <h3 className="mt-3 font-display text-lg font-semibold! leading-snug tracking-[-0.01em] text-nearblack transition-colors group-hover:text-teal! sm:text-[19px]">
            {blog.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 flex-1 text-[15px] leading-relaxed text-gray">
            {blog.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
            Read article
            <ArrowUpRight
              size={16}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/** Large horizontal card for the latest / highlighted post. */
export function BlogFeaturedCard({ blog, label }: { blog: Blog; label: string }) {
  const fadeUp = useFadeUp();

  return (
    <motion.div {...fadeUp}>
      <Link
        href={`/blog/${blog.slug}`}
        className={`${blogCardClass} lg:grid lg:grid-cols-[1.15fr_1fr]`}
      >
        <BlogCover
          src={blog.image}
          alt={blog.title}
          priority
          sizes="(max-width: 1023px) 100vw, 680px"
          className="aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[380px]"
        />
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal to-[#7B9CFF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {label}
            </span>
            <CategoryPill>{blog.category}</CategoryPill>
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold! leading-[1.2] tracking-[-0.02em] text-nearblack transition-colors group-hover:text-teal! sm:text-[28px] lg:text-[32px]">
            {blog.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray sm:text-[17px]">
            {blog.excerpt}
          </p>
          <BlogMeta className="mt-6" publishedAt={blog.publishedAt} readTime={blog.readTime} />
          <span className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal">
            Read the article
            <ArrowUpRight
              size={18}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
