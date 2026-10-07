import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/blog/BlogDetail";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { blogs, getBlogBySlug } from "@/lib/blogs";
import { SITE_URL, articleSchema, breadcrumbSchema } from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url,
      type: "article",
      publishedTime: blog.publishedAt,
      images: blog.image
        ? [{ url: blog.image, alt: blog.title }]
        : [{ url: "/favicon-512x512.png", alt: "Devsinn Technologies AI Automation Company Logo" }],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <Script
        id={`blog-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Blog", url: `${SITE_URL}/blog` },
              { name: blog.title, url },
            ]),
            articleSchema({
              title: blog.title,
              description: blog.excerpt,
              url,
              datePublished: blog.publishedAt,
              image: blog.image ? `${SITE_URL}${blog.image}` : undefined,
            }),
          ]),
        }}
      />
      <BlogDetail blog={blog} />
      <FinalCTA />
      <Footer />
    </>
  );
}
