import { SiteHeader } from "@/components/layout/site-header";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";
import { ServicesCoreSection } from "@/components/services/services-core-section";
import { ServicesCtaSection } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesProcessSection } from "@/components/services/services-process-section";
import { pageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  pageSeoMetadata("services", {
    title: "Services | Shei IT",
    description:
      "Explore Shei IT services for web development, mobile apps, SEO, hosting, UI/UX, and cloud support.",
    path: "/services",
  });

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
