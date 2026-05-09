import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <HeroSection />
    </main>
  );
}
