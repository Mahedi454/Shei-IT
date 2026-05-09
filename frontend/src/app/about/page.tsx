import { AboutHero } from "@/components/about/about-hero";
import { AboutStorySection } from "@/components/about/about-story";
import { AboutApproachSection } from "@/components/about/about-approach";
import { SiteHeader } from "@/components/layout/site-header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <AboutHero />
      <AboutStorySection />
      <AboutApproachSection />
    </main>
  );
}
