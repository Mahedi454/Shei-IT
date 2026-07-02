import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  AtSign,
  CalendarDays,
  ChevronRight,
  Clock3,
  Globe,
  Link2,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";
import { CtaSection } from "@/components/home/cta-section";
import { ArticleContent } from "@/components/blog/article-content";
import { ArticleToc } from "@/components/blog/article-toc";
import { HelpfulActions, ShareActions } from "@/components/blog/article-actions";
import { API_BASE_URL, type ApiResponse } from "@/lib/api";
import { buildSeoMetadata, type SeoSetting } from "@/lib/seo";
import {
  extractTocHeadings,
  normalizeBlocks,
  type BlogBlock,
} from "@/lib/blog-blocks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentBlocks?: unknown;
  coverImage?: string | null;
  coverCaption?: string | null;
  category?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  authorAvatar?: string | null;
  authorBio?: string | null;
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

// Legacy fallback: turn a plain-text `content` string into simple paragraph and
// bullet-list blocks so posts created before the block editor still render.
function legacyBlocks(content: string): BlogBlock[] {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const bulletLines = lines.filter((line) => /^[-*]\s+/.test(line));

      if (bulletLines.length === lines.length && lines.length > 0) {
        return {
          type: "list" as const,
          style: "bullet" as const,
          items: lines.map((line) => ({ text: line.replace(/^[-*]\s+/, "") })),
        };
      }

      return { type: "paragraph" as const, text: lines.join(" ") };
    });
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
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

function AuthorAvatar({
  blog,
  size = "md",
}: {
  blog: Blog;
  size?: "sm" | "md" | "lg";
}) {
  const dimensions =
    size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const author = blog.authorName || "Shei IT Team";

  if (blog.authorAvatar) {
    return (
      <img
        src={blog.authorAvatar}
        alt={author}
        className={`${dimensions} shrink-0 rounded-full object-cover ring-2 ring-[color:var(--avatar-ring)]`}
        loading="lazy"
      />
    );
  }

  return (
    <span
      className={`${dimensions} inline-flex shrink-0 items-center justify-center rounded-full bg-[color:var(--gradient-primary)] bg-[image:var(--gradient-primary)] text-[13px] font-bold text-white ring-2 ring-[color:var(--avatar-ring)]`}
    >
      {getInitials(author)}
    </span>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] transition hover:border-[color:var(--primary)]"
    >
      {blog.coverImage ? (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="aspect-[16/9] w-full bg-[color:var(--premium-pill)]" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--primary)]">
          {blog.category || "General"}
        </span>
        <h3 className="text-[15px] font-semibold leading-6 text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
          {blog.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
          {blog.excerpt}
        </p>
      </div>
    </Link>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const parsedBlocks = normalizeBlocks(blog.contentBlocks);
  const blocks =
    parsedBlocks.length > 0 ? parsedBlocks : legacyBlocks(blog.content);
  const tocHeadings = extractTocHeadings(blocks);
  const otherBlogs = blogs.filter((item) => item.slug !== blog.slug);
  const blogCategory = blog.category || "General";
  const author = blog.authorName || "Shei IT Team";
  const relatedBlogs = uniqueBySlug([
    ...otherBlogs.filter(
      (item) => (item.category || "General") === blogCategory,
    ),
    ...otherBlogs.filter((item) =>
      (item.tags ?? []).some((tag) => (blog.tags ?? []).includes(tag)),
    ),
    ...otherBlogs,
  ]).slice(0, 3);

  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat text-[color:var(--foreground)]">
      <SiteHeader />

      <div className="mx-auto w-11/12 max-w-[1180px] pb-16 pt-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-[color:var(--muted-foreground)]">
          <Link href="/" className="hover:text-[color:var(--primary)]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-[color:var(--primary)]">
            Insights
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[color:var(--foreground)]">{blogCategory}</span>
        </nav>

        {/* Article header */}
        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[color:var(--button-secondary-icon)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--primary)]">
              {blogCategory}
            </span>
            {(blog.tags ?? []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1 text-[11px] font-semibold text-[color:var(--foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {blog.title.trim().split(/\s+/).length > 4 ? (
            <ServiceGradientHeading as="h1" className="page-main-heading mt-5">
              {blog.title}
            </ServiceGradientHeading>
          ) : (
            <h1 className="page-main-heading mt-5">{blog.title}</h1>
          )}

          <p className="mt-5 text-[17px] leading-8 text-[color:var(--muted-foreground)]">
            {blog.excerpt}
          </p>

          {/* Byline */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-[color:var(--stat-border)] py-4">
            <div className="flex items-center gap-3">
              <AuthorAvatar blog={blog} />
              <div>
                <p className="text-[14px] font-semibold text-[color:var(--foreground)]">
                  {author}
                </p>
                {blog.authorRole ? (
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">
                    {blog.authorRole}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                <CalendarDays className="h-4 w-4 text-[color:var(--primary)]" />
                {publishedDate}
              </span>
              {blog.readTime ? (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                  <Clock3 className="h-4 w-4 text-[color:var(--primary)]" />
                  {blog.readTime}
                </span>
              ) : null}
              <ShareActions title={blog.title} />
            </div>
          </div>
        </header>

        {/* Hero image */}
        {blog.coverImage ? (
          <figure className="mt-8">
            <div className="overflow-hidden rounded-[1.4rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[var(--shadow-soft)]">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="aspect-[16/7] w-full object-cover"
                loading="eager"
              />
            </div>
            {blog.coverCaption ? (
              <figcaption className="mt-3 text-center text-[12px] text-[color:var(--muted-foreground)]">
                {blog.coverCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        {/* Body + sidebar */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <article className="min-w-0">
            <ArticleContent blocks={blocks} />

            {/* Author bio */}
            {blog.authorBio ? (
              <section className="mt-12 rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur">
                <div className="flex flex-wrap items-start gap-4">
                  <AuthorAvatar blog={blog} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[color:var(--primary)]">
                      Written by
                    </p>
                    <h3 className="mt-1 text-[17px] font-semibold text-[color:var(--foreground)]">
                      {author}
                    </h3>
                    {blog.authorRole ? (
                      <p className="text-[13px] text-[color:var(--muted-foreground)]">
                        {blog.authorRole}
                      </p>
                    ) : null}
                    <p className="mt-3 text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                      {blog.authorBio}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      {[Link2, AtSign, Globe].map((Icon, index) => (
                        <span
                          key={index}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] text-[color:var(--muted-foreground)]"
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {/* Tags + helpful */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--stat-border)] pt-6">
              <div className="flex flex-wrap gap-2">
                {(blog.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1 text-[12px] font-semibold text-[color:var(--muted-foreground)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <HelpfulActions />
            </div>

            {/* Inline CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="max-w-xl">
                <h3 className="text-[18px] font-semibold text-[color:var(--foreground)]">
                  Planning a scalable software product?
                </h3>
                <p className="mt-1.5 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                  Talk to the Shei IT engineering team about architecture
                  strategy and implementation.
                </p>
              </div>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--cta-dark)] px-6 py-3 text-[13px] font-semibold text-[color:var(--talk-fg)]"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {tocHeadings.length > 0 ? <ArticleToc headings={tocHeadings} /> : null}

            {relatedBlogs.length > 0 ? (
              <section className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
                <h2 className="mb-4 text-[14px] font-semibold text-[color:var(--foreground)]">
                  Related reading
                </h2>
                <div className="space-y-3">
                  {relatedBlogs.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="group block rounded-[0.85rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-3 transition hover:border-[color:var(--primary)]"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--primary)]">
                        {item.category || "General"}
                      </span>
                      <h3 className="mt-1 line-clamp-2 text-[13px] font-semibold leading-5 text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </div>

      {/* Continue reading */}
      {relatedBlogs.length > 0 ? (
        <section className="border-t border-[color:var(--stat-border)] bg-[color:var(--surface)] py-14">
          <div className="mx-auto w-11/12 max-w-[1180px]">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="text-[24px] font-bold text-[color:var(--foreground)]">
                Continue reading
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--primary)]"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((item) => (
                <BlogCard key={item.slug} blog={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Global CTA */}
      <CtaSection />
    </main>
  );
}
