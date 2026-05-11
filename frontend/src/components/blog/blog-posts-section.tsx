import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  ChevronDown,
  Cloud,
  Code2,
  Flame,
  Rocket,
  Search,
  Smartphone,
  SquareLibrary,
  TrendingUp,
} from "lucide-react";

const featuredPost = {
  category: "Web Development",
  title: "How a Fast Website Boosts User Experience and Conversions",
  description:
    "Discover why website speed matters and how it directly impacts your business growth.",
  author: "Shei-It Team",
  date: "May 15, 2024",
  readTime: "6 min read",
};

const latestArticles = [
  {
    title: "A Complete SEO Checklist for 2024",
    description:
      "Step-by-step SEO checklist to improve rankings and drive more organic traffic.",
    date: "May 12, 2024",
    readTime: "5 min read",
    icon: Search,
    accent: "from-[#c7d2fe] via-[#a5b4fc] to-[#8b7cff]",
  },
  {
    title: "Native vs Cross-Platform Apps: What's Best?",
    description:
      "Compare native and cross-platform development to choose the right approach for your app.",
    date: "May 9, 2024",
    readTime: "6 min read",
    icon: Smartphone,
    accent: "from-[#ddd6fe] via-[#a78bfa] to-[#6c63ff]",
  },
  {
    title: "How to Choose the Right Hosting Plan",
    description:
      "A simple guide to picking the perfect hosting for performance, security, and scalability.",
    date: "May 6, 2024",
    readTime: "4 min read",
    icon: Cloud,
    accent: "from-[#dbeafe] via-[#93c5fd] to-[#6c63ff]",
  },
] as const;

const popularPosts = [
  {
    title: "10 Essential Features Every Business Website Must Have",
    date: "May 10, 2024",
    readTime: "5 min read",
    icon: Code2,
  },
  {
    title: "SEO Best Practices to Rank Higher in 2024",
    date: "May 8, 2024",
    readTime: "7 min read",
    icon: Search,
  },
  {
    title: "Choosing the Right Hosting for Your Website",
    date: "May 5, 2024",
    readTime: "4 min read",
    icon: Cloud,
  },
  {
    title: "Mobile App Development Trends to Watch in 2024",
    date: "May 2, 2024",
    readTime: "6 min read",
    icon: Smartphone,
  },
] as const;

const topicCounts = [
  ["Web Development", "12"],
  ["Mobile Development", "9"],
  ["SEO & Marketing", "11"],
  ["Hosting & DevOps", "7"],
  ["Business Growth", "8"],
  ["Tips & Guides", "10"],
] as const;

function Thumbnail({
  icon: Icon,
  className,
  compact = false,
}: {
  icon: typeof Search;
  className: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[0.85rem] border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_78%_28%,rgba(255,255,255,0.28),transparent_25%)]" />
      <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-white/22 blur-2xl" />
      <div
        className={`relative flex h-full items-center justify-center ${
          compact ? "min-h-0" : "min-h-[150px]"
        }`}
      >
        <span
          className={`inline-flex items-center justify-center bg-white/26 text-white shadow-[0_20px_42px_rgba(76,29,149,0.22)] backdrop-blur-md ${
            compact
              ? "h-11 w-11 rounded-[0.75rem]"
              : "h-20 w-20 rounded-[1.25rem]"
          }`}
        >
          <Icon className={compact ? "h-6 w-6" : "h-10 w-10"} strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
}

export function BlogPostsSection() {
  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto grid w-11/12 max-w-[1440px] gap-8 lg:grid-cols-[1fr_0.5fr]">
        <div className="rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)] sm:p-7">
          <div className="flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
            <BadgeCheck className="h-5 w-5 text-[color:var(--primary)]" />
            Featured Post
          </div>

          <article className="mt-5 grid gap-7 border-b border-[color:var(--button-border)] pb-8 lg:grid-cols-[0.88fr_1fr]">
            <Thumbnail
              icon={Rocket}
              className="bg-gradient-to-br from-[#b56cff] via-[#7c5cff] to-[#5347d8]"
            />

            <div className="flex flex-col justify-center">
              <span className="w-fit rounded-full bg-[color:var(--button-secondary-icon)] px-3 py-1 text-[12px] font-semibold text-[color:var(--primary)]">
                {featuredPost.category}
              </span>
              <h2 className="mt-4 max-w-[24ch] text-[1.65rem] font-semibold leading-tight tracking-[-0.04em] text-[color:var(--foreground)]">
                {featuredPost.title}
              </h2>
              <p className="mt-4 max-w-[34rem] text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                {featuredPost.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#111827] to-[#8b7cff] text-[11px] font-semibold text-white">
                  ST
                </span>
                <div className="text-[12px] font-medium text-[color:var(--muted-foreground)]">
                  <p className="font-semibold text-[color:var(--foreground)]">
                    {featuredPost.author}
                  </p>
                  <p>
                    {featuredPost.date} <span className="px-1.5">•</span>{" "}
                    {featuredPost.readTime}
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[color:var(--primary)]"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>

          <div className="mt-8 flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
            <SquareLibrary className="h-5 w-5 text-[color:var(--primary)]" />
            Latest Articles
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {latestArticles.map((article) => {
              const Icon = article.icon;

              return (
                <article key={article.title}>
                  <Thumbnail icon={Icon} className={`bg-gradient-to-br ${article.accent}`} />
                  <h3 className="mt-4 text-[18px] font-semibold leading-snug tracking-[-0.035em] text-[color:var(--foreground)]">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                    {article.description}
                  </p>
                  <p className="mt-4 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                    {article.date} <span className="px-1.5">•</span>{" "}
                    {article.readTime}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--primary)]"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.75rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-10 text-[13px] font-semibold text-[color:var(--muted-foreground)] shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              Load More Articles
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="flex h-full flex-col gap-8">
          <div className="rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
              <Flame className="h-5 w-5 text-[color:var(--primary)]" />
              Popular Posts
            </div>

            <div className="mt-6 space-y-5">
              {popularPosts.map((post, index) => {
                const Icon = post.icon;

                return (
                  <article key={post.title} className="grid grid-cols-[4.25rem_1rem_1fr] gap-3">
                    <Thumbnail
                      icon={Icon}
                      compact
                      className="aspect-square bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#c4b5fd] dark:from-[#1f1b3d] dark:via-[#23204a] dark:to-[#3b2fb8]"
                    />
                    <span className="pt-1 text-[13px] font-semibold text-[color:var(--muted-foreground)]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[13px] font-semibold leading-5 text-[color:var(--foreground)]">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[11px] font-medium text-[color:var(--muted-foreground)]">
                        {post.date} <span className="px-1">•</span>{" "}
                        {post.readTime}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1rem] border border-[color:var(--button-border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-2 text-[16px] font-semibold text-[color:var(--foreground)]">
              <BookOpenCheck className="h-5 w-5 text-[color:var(--primary)]" />
              Topics
            </div>

            <div className="mt-6 space-y-4">
              {topicCounts.map(([topic, count]) => (
                <a
                  key={topic}
                  href="#"
                  className="flex items-center justify-between text-[13px] font-medium text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                >
                  {topic}
                  <span className="font-semibold text-[color:var(--foreground)]">
                    {count}
                  </span>
                </a>
              ))}
            </div>

            <a
              href="#"
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[0.75rem] bg-[color:var(--button-secondary-icon)] text-[13px] font-semibold text-[color:var(--primary)]"
            >
              View All Topics
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
