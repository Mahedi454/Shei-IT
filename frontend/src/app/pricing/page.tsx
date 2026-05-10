import { SiteHeader } from "@/components/layout/site-header";
import { PricingCompareSection } from "@/components/pricing/pricing-compare-section";
import { PricingFaqSection } from "@/components/pricing/pricing-faq-section";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingPlansSection } from "@/components/pricing/pricing-plans-section";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <PricingHero />
      <PricingPlansSection />
      <PricingCompareSection />
      <PricingFaqSection />
    </main>
  );
}
