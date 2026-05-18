"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  publishedAt?: string;
};

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await apiRequest<Blog[]>("/blogs");
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Blogs could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <>
      {error ? <p className="mb-5 text-[14px] text-rose-400">{error}</p> : null}
      {loading ? (
        <p className="text-[14px] text-[color:var(--muted-foreground)]">Loading blogs...</p>
      ) : blogs.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
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
      ) : (
        <div className="rounded-[1.3rem] border border-dashed border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-12 text-center text-[14px] text-[color:var(--muted-foreground)]">
          No blog posts have been published yet.
        </div>
      )}
    </>
  );
}
