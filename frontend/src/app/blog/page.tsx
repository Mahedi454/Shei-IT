import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPostsSection } from "@/components/blog/blog-posts-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <BlogHero />
      <BlogPostsSection />
    </main>
  );
}
