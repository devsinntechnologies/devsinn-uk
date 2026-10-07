import rawBlogs from "@/data/blogs.json";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  views: number;
};

export const blogs = rawBlogs as Blog[];

export const blogCategories = [
  "All",
  ...new Set(blogs.map((blog) => blog.category)),
];

export const featuredBlogs = blogs.filter((blog) => blog.featured);

export const getBlogBySlug = (slug: string) =>
  blogs.find((blog) => blog.slug === slug);

export const getRelatedBlogs = (blog: Blog, limit = 3) =>
  blogs
    .filter((item) => item.id !== blog.id && item.category === blog.category)
    .slice(0, limit);

export const formatBlogDate = (date: string, compact = false) =>
  new Date(date).toLocaleDateString("en-US", compact
    ? { month: "short", day: "numeric", year: "numeric" }
    : { month: "long", day: "numeric", year: "numeric" });
