import { SiteHeader } from "@/components/layout/site-header";
import { ServicesCoreSection } from "@/components/services/services-core-section";
import { ServicesCtaSection } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesProcessSection } from "@/components/services/services-process-section";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <ServicesHero />
      <div id="services">
        <ServicesCoreSection />
      </div>
      <ServicesProcessSection />
      <ServicesCtaSection />
    </main>
  );
}
