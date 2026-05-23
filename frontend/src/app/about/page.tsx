import { AboutHero } from "@/components/about/about-hero";
import { AboutStorySection } from "@/components/about/about-story";
import { AboutApproachSection } from "@/components/about/about-approach";
import { AboutCtaSection } from "@/components/about/about-cta";
import { AboutImpactTeamSection } from "@/components/about/about-impact-team";
import { SiteHeader } from "@/components/layout/site-header";
import { pageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  pageSeoMetadata("about", {
    title: "About Shei IT | Digital Product Team",
    description:
      "Learn about Shei IT, a practical digital team building websites, apps, SEO systems, and scalable digital products.",
    path: "/about",
  });

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <AboutHero />
      <AboutStorySection />
      <AboutApproachSection />
      <AboutImpactTeamSection />
      <AboutCtaSection />
    </main>
  );
}
