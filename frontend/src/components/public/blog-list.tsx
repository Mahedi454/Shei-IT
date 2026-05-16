"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

type Blog = {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  publishedAt?: string;
};

const fallbackBlogs: Blog[] = [
  {
    slug: "why-fast-websites-win",
    title: "Why Fast Websites Convert Better",
    excerpt:
      "A practical look at how performance shapes trust, retention, and lead conversion for modern service businesses.",
    tags: ["Performance", "SEO"],
  },
  {
    slug: "launching-with-less-risk",
    title: "Launching Digital Products With Less Risk",
    excerpt:
      "How we break delivery into smaller milestones so businesses can validate ideas before over-investing.",
    tags: ["Strategy", "Product"],
  },
  {
    slug: "maintenance-is-a-growth-system",
    title: "Maintenance Is Part of Growth",
    excerpt:
      "Shipping is only the start. The real lift usually comes from iteration, fixes, and compounding improvements.",
    tags: ["Support", "Growth"],
  },
];

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>(fallbackBlogs);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await apiRequest<Blog[]>("/blogs");
        if (data.length) {
          setBlogs(data);
        }
      } catch {
        // Keep fallback content when backend is empty or offline.
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => (
        <article
          key={blog._id ?? blog.slug}
          className="rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[0_16px_38px_rgba(15,23,42,0.05)]"
        >
          {blog.coverImage ? (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-52 w-full rounded-xl object-cover"
              loading="lazy"
            />
          ) : null}
          <div className={blog.coverImage ? "mt-5" : ""}>
            <div className="flex flex-wrap gap-2">
              {(blog.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-2.5 py-1 text-[12px] font-medium text-[color:var(--primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-[1.4rem] font-semibold text-[color:var(--foreground)]">
              {blog.title}
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              {blog.excerpt}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-[color:var(--muted-foreground)]">
              <CalendarDays className="h-4 w-4" />
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString()
                : "Latest insights"}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
