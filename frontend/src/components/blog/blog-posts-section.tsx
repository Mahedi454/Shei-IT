"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Flame,
  SquareLibrary,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { apiRequest } from "@/lib/api";
import { PublicErrorState } from "@/components/public/public-error-state";
import {
  blogTopicOptions,
  getBlogTopicSearchText,
  topicMatchesValue,
} from "@/lib/services";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  category?: string | null;
  tags?: string[];
  authorName?: string | null;
  readTime?: string | null;
  featured?: boolean;
  publishedAt?: string | null;
};

const fallbackTopics = blogTopicOptions.map((topic) => topic.label);

function BlogThumbnail({
  image,
  title,
  compact = false,
}: {
  compact?: boolean;
  image?: string | null;
  title: string;
}) {
  if (image) {
    return (
      <div className="overflow-hidden rounded-[0.95rem] border border-[color:var(--stat-border)]">
        <img
          src={image}
          alt={title}
          className={
            compact
              ? "aspect-square h-full w-full object-cover"
              : "h-[200px] w-full object-cover"
          }
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[0.95rem] border border-[color:var(--stat-border)] bg-[linear-gradient(135deg,rgba(108,99,255,0.16),rgba(79,140,255,0.14))] ${
        compact ? "aspect-square" : "h-[200px]"
      }`}
    />
  );
}

export function BlogPostsSection() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await apiRequest<Blog[]>("/blogs");
      setBlogs(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const activeTopic = searchParams.get("topic")?.trim() ?? "";
  const activeSearch = searchParams.get("search")?.trim().toLowerCase() ?? "";

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const tags = blog.tags ?? [];
      const category = blog.category ?? "";
      const matchesTopic =
        !activeTopic ||
        topicMatchesValue(activeTopic, category) ||
        tags.some((tag) => topicMatchesValue(activeTopic, tag));
      const searchableText = [
        blog.title,
        blog.excerpt,
        blog.content,
        getBlogTopicSearchText(category, tags),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        !activeSearch || searchableText.includes(activeSearch);

      return matchesTopic && matchesSearch;
    });
  }, [activeSearch, activeTopic, blogs]);

  const featuredPost = filteredBlogs[0] ?? null;
  const latestArticles = filteredBlogs.slice(1, 4);
  const popularPosts = filteredBlogs.slice(4, 8);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();

    blogs.forEach((blog) => {
      const category = blog.category?.trim() ?? "";
      const topic = blogTopicOptions.find(
        (item) =>
          topicMatchesValue(item.value, category) ||
          (blog.tags ?? []).some((tag) => topicMatchesValue(item.value, tag)),
      );
      const topicLabel = topic?.label ?? category;

      if (topicLabel) {
        counts.set(topicLabel, (counts.get(topicLabel) ?? 0) + 1);
      }
    });

    const dynamicTopics = [...counts.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 6);

    if (dynamicTopics.length) {
      return dynamicTopics;
    }

    return fallbackTopics.map((topic) => [topic, 0] as const);
  }, [blogs]);

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto grid w-11/12 max-w-[1440px] gap-8 lg:grid-cols-[1fr_0.5fr]">
        <div className="rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
              <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
              Featured Post
            </div>
            {activeTopic || activeSearch ? (
              <Link
                href="/blog"
                className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-3 py-1.5 text-[12px] font-bold text-[color:var(--primary)]"
              >
                Clear filters
              </Link>
            ) : null}
          </div>

          {error ? (
            <div className="mt-5">
              <PublicErrorState
                title="We could not load the blog feed"
                description="The articles are still safe, but this section is temporarily unavailable. Please try again in a moment."
                onRetry={loadBlogs}
              />
            </div>
          ) : null}

          {loading ? (
            <p className="mt-5 text-[14px] text-[color:var(--muted-foreground)]">
              Loading posts...
            </p>
          ) : featuredPost ? (
            <>
              <article className="mt-5 grid gap-7 border-b border-[color:var(--button-border)] pb-8 lg:grid-cols-[0.88fr_1fr]">
                <BlogThumbnail
                  image={featuredPost.coverImage}
                  title={featuredPost.title}
                />

                <div className="flex flex-col justify-center">
                  <span className="w-fit rounded-full bg-[color:var(--button-secondary-icon)] px-3 py-1 text-[12px] font-semibold text-[color:var(--primary)]">
                    {featuredPost.category ?? "Latest"}
                  </span>
                  <h2 className="mt-4 max-w-[24ch] text-[1.65rem] font-semibold leading-tight tracking-[-0.04em] text-[color:var(--foreground)]">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-[34rem] text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                    <p className="font-semibold text-[color:var(--foreground)]">
                      {featuredPost.authorName || "Shei IT Team"}
                    </p>
                    <p>
                      {featuredPost.publishedAt
                        ? new Date(
                            featuredPost.publishedAt,
                          ).toLocaleDateString()
                        : "Latest"}
                      {featuredPost.readTime
                        ? ` / ${featuredPost.readTime}`
                        : ""}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[color:var(--primary)]"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>

              <div className="mt-8 flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
                <SquareLibrary className="h-5 w-5 text-[color:var(--primary)]" />
                Latest Articles
              </div>

              {latestArticles.length ? (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {latestArticles.map((article) => (
                    <article key={article.id}>
                      <BlogThumbnail
                        image={article.coverImage}
                        title={article.title}
                      />
                      <div className="mt-4 flex flex-wrap gap-2">
                        {Array.from(
                          new Set(
                            [article.category, ...(article.tags ?? [])].filter(
                              (tag): tag is string => Boolean(tag),
                            ),
                          ),
                        )
                          .slice(0, 2)
                          .map((tag) => (
                            <span
                              key={`article-chip-${article.id}-${tag}`}
                              className="rounded-full bg-[color:var(--button-secondary-icon)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--primary)]"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <h3 className="mt-4 text-[18px] font-semibold leading-snug tracking-[-0.035em] text-[color:var(--foreground)]">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                        {article.excerpt}
                      </p>
                      <p className="mt-4 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString()
                          : "Latest"}
                        {article.readTime ? ` / ${article.readTime}` : ""}
                      </p>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--primary)]"
                      >
                        Read article
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-[1rem] border border-dashed border-[color:var(--stat-border)] px-5 py-10 text-center text-[14px] text-[color:var(--muted-foreground)]">
                  Publish more blogs to populate this section.
                </div>
              )}
            </>
          ) : (
            <div className="mt-6 rounded-[1rem] border border-dashed border-[color:var(--stat-border)] px-5 py-12 text-center">
              <h2 className="text-[1.25rem] font-semibold text-[color:var(--foreground)]">
                {blogs.length ? "No topics found" : "No blog posts yet"}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                {blogs.length
                  ? "No blog posts match your current search or selected topic. Try another keyword or clear the filters."
                  : "No blog posts are published yet."}
              </p>
              {blogs.length ? (
                <Link
                  href="/blog"
                  className="mt-5 inline-flex rounded-full bg-[color:var(--primary)] px-4 py-2 text-[12px] font-bold text-white"
                >
                  Clear filters
                </Link>
              ) : null}
            </div>
          )}
        </div>

        <aside className="flex h-full flex-col gap-8">
          <div className="rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
              <Flame className="h-5 w-5 text-[color:var(--primary)]" />
              Popular Posts
            </div>

            <div className="mt-6 space-y-5">
              {popularPosts.length ? (
                popularPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="grid grid-cols-[4.25rem_1rem_1fr] gap-3"
                  >
                    <BlogThumbnail
                      image={post.coverImage}
                      title={post.title}
                      compact
                    />
                    <span className="pt-1 text-[13px] font-semibold text-[color:var(--muted-foreground)]">
                      {index + 1}
                    </span>
                    <div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[13px] font-semibold leading-5 text-[color:var(--foreground)] transition hover:text-[color:var(--primary)]"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-2 text-[11px] font-medium text-[color:var(--muted-foreground)]">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : "Latest"}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-[14px] text-[color:var(--muted-foreground)]">
                  Popular posts will appear here once more blogs are published.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
              <BookOpenCheck className="h-5 w-5 text-[color:var(--primary)]" />
              Topics
            </div>

            <div className="mt-6 space-y-4">
              {topics.map(([topic, count]) => (
                <Link
                  key={topic}
                  href={`/blog?topic=${encodeURIComponent(topic)}`}
                  className="flex items-center justify-between text-[13px] font-medium text-[color:var(--muted-foreground)]"
                >
                  {topic}
                  <span className="font-semibold text-[color:var(--foreground)]">
                    {count}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[0.75rem] bg-[color:var(--button-secondary-icon)] text-[13px] font-semibold text-[color:var(--primary)]">
              <CalendarDays className="h-4 w-4" />
              {blogs.length} published posts
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
