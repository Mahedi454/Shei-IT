import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { API_BASE_URL, type ApiResponse } from "@/lib/api";
import { buildSeoMetadata, type SeoSetting } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  category?: string | null;
  authorName?: string | null;
  readTime?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  featured?: boolean;
  tags?: string[];
  publishedAt?: string | null;
  createdAt: string;
  seo?: SeoSetting | null;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Blog could not be loaded.");
  }

  const payload = (await response.json()) as ApiResponse<Blog>;
  return payload.data;
}

async function getPublishedBlogs() {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as ApiResponse<Blog[]>;
  return payload.data;
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Latest insight";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const bulletLines = lines.filter((line) => /^[-*]\s+/.test(line));

      if (bulletLines.length === lines.length) {
        return {
          type: "list" as const,
          items: lines.map((line) => line.replace(/^[-*]\s+/, "")),
        };
      }

      return {
        type: "paragraph" as const,
        text: lines.join(" "),
      };
    });
}

function uniqueBySlug(blogs: Blog[]) {
  const seen = new Set<string>();
  return blogs.filter((blog) => {
    if (seen.has(blog.slug)) {
      return false;
    }

    seen.add(blog.slug);
    return true;
  });
}

function SidebarPost({ blog, compact = false }: { blog: Blog; compact?: boolean }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group grid gap-3 rounded-[0.9rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-3 transition hover:border-[color:var(--primary)]"
    >
      {!compact && blog.coverImage ? (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="aspect-[16/8] w-full rounded-[0.7rem] object-cover"
          loading="lazy"
        />
      ) : null}
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
        {blog.category || "General"}
      </span>
      <h3 className="text-[13px] font-semibold leading-5 text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
        {blog.title}
      </h3>
      <p className="line-clamp-2 text-[12px] leading-5 text-[color:var(--muted-foreground)]">
        {blog.excerpt}
      </p>
    </Link>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlog(slug);

    return buildSeoMetadata(blog.seo ?? null, {
      title: blog.seoTitle || `${blog.title} | Shei IT Blog`,
      description: blog.seoDescription || blog.excerpt,
      path: `/blog/${blog.slug}`,
      image: blog.coverImage,
    });
  } catch {
    return {
      title: "Blog | Shei IT",
    };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [blog, blogs] = await Promise.all([getBlog(slug), getPublishedBlogs()]);
  const publishedDate = formatDate(blog.publishedAt || blog.createdAt);
  const contentBlocks = renderContent(blog.content);
  const otherBlogs = blogs.filter((item) => item.slug !== blog.slug);
  const blogCategory = blog.category || "General";
  const relatedBlogs = uniqueBySlug([
    ...otherBlogs.filter((item) => (item.category || "General") === blogCategory),
    ...otherBlogs.filter((item) => (item.tags ?? []).some((tag) => (blog.tags ?? []).includes(tag))),
    ...otherBlogs,
  ]).slice(0, 4);
  const featuredBlogs = uniqueBySlug([
    ...otherBlogs.filter((item) => item.featured),
    ...otherBlogs,
  ]).slice(0, 5);
  const categoryGroups = [...otherBlogs, blog].reduce(
    (groups, item) => {
      const category = item.category || "General";
      const current = groups.get(category) ?? [];
      groups.set(category, [...current, item]);
      return groups;
    },
    new Map<string, Blog[]>(),
  );
  const relatedCategories = [...categoryGroups.entries()]
    .sort((left, right) => {
      if (left[0] === blogCategory) return -1;
      if (right[0] === blogCategory) return 1;
      return right[1].length - left[1].length;
    })
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat text-[color:var(--foreground)]">
      <SiteHeader />

      <div className="mx-auto w-11/12 max-w-[1440px] pb-20 pt-8">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-4 py-2 text-[12px] font-bold text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <div className="grid gap-7 lg:grid-cols-[7fr_3fr] lg:items-start">
          <article className="min-w-0">
            <header className="pb-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[color:var(--button-secondary-icon)] px-3 py-1 text-[12px] font-semibold text-[color:var(--primary)]">
                  {blogCategory}
                </span>
                {(blog.tags ?? []).slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1 text-[12px] font-semibold text-[color:var(--foreground)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="page-main-heading mt-5 max-w-5xl">
                {blog.title}
              </h1>
              <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[color:var(--muted-foreground)]">
                {blog.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-[13px] font-semibold text-[color:var(--muted-foreground)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1.5">
                  <UserRound className="h-4 w-4 text-[color:var(--primary)]" />
                  {blog.authorName || "Shei IT Team"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1.5">
                  <CalendarDays className="h-4 w-4 text-[color:var(--primary)]" />
                  {publishedDate}
                </span>
                {blog.readTime ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1.5">
                    <Clock3 className="h-4 w-4 text-[color:var(--primary)]" />
                    {blog.readTime}
                  </span>
                ) : null}
              </div>
            </header>

            {blog.coverImage ? (
              <div className="overflow-hidden rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[var(--shadow-soft)]">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="aspect-[16/8] w-full object-cover"
                  loading="eager"
                />
              </div>
            ) : null}

            <div className="mt-8 rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur md:p-8">
              <div className="mx-auto max-w-4xl space-y-6">
                {contentBlocks.map((block, index) =>
                  block.type === "list" ? (
                    <ul
                      key={`list-${index}`}
                      className="space-y-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]"
                    >
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      key={`paragraph-${index}`}
                      className="text-[15px] leading-8 text-[color:var(--muted-foreground)]"
                    >
                      {block.text}
                    </p>
                  ),
                )}
              </div>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-[color:var(--foreground)]">
                  Featured Blogs
                </h2>
                <span className="rounded-full bg-[color:var(--button-secondary-icon)] px-2.5 py-1 text-[11px] font-bold text-[color:var(--primary)]">
                  {featuredBlogs.length}
                </span>
              </div>
              <div className="space-y-3">
                {featuredBlogs.map((item) => (
                  <SidebarPost key={item.slug} blog={item} compact />
                ))}
              </div>
            </section>

            <section className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
              <h2 className="mb-4 text-[15px] font-semibold text-[color:var(--foreground)]">
                Related Blogs
              </h2>
              <div className="space-y-3">
                {relatedBlogs.map((item) => (
                  <SidebarPost key={item.slug} blog={item} />
                ))}
              </div>
            </section>

            <section className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
              <h2 className="mb-4 text-[15px] font-semibold text-[color:var(--foreground)]">
                Related Categories
              </h2>
              <div className="space-y-3">
                {relatedCategories.map(([category, items]) => {
                  const firstPost = items.find((item) => item.slug !== blog.slug) ?? items[0];

                  return (
                    <Link
                      key={category}
                      href={`/blog/${firstPost.slug}`}
                      className="flex items-center justify-between gap-3 rounded-[0.85rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-3 py-3 text-[13px] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
                    >
                      <span>{category}</span>
                      <span className="inline-flex items-center gap-1 text-[12px] text-[color:var(--muted-foreground)]">
                        {items.length}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
