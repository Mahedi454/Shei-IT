import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[color:var(--background)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[880px] bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.12),transparent_22%),radial-gradient(circle_at_74%_28%,rgba(159,220,255,0.24),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(111,231,200,0.08),transparent_22%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.16),transparent_22%),radial-gradient(circle_at_74%_28%,rgba(93,174,255,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(111,231,200,0.04),transparent_22%)]" />
      <SiteHeader />
      <section className="relative">
        <HeroSection />
      </section>
      <ServicesSection />
      <ProcessSection />
    </main>
  );
}
