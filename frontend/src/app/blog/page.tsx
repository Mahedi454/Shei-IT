import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPostsSection } from "@/components/blog/blog-posts-section";
import { SiteHeader } from "@/components/layout/site-header";
import { pageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  pageSeoMetadata("blog", {
    title: "Blog | Shei IT Insights",
    description:
      "Read Shei IT insights about web development, SEO, mobile apps, hosting, product strategy, and business growth.",
    path: "/blog",
  });

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <BlogHero />
      <BlogPostsSection />
    </main>
  );
}
