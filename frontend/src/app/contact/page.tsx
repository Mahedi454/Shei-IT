import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMessageSection } from "@/components/contact/contact-message-section";
import { ContactSupportSection } from "@/components/contact/contact-support-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <ContactHero />
      <ContactMessageSection />
      <ContactSupportSection />
    </main>
  );
}
