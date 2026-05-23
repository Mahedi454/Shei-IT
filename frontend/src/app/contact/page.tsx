import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMessageSection } from "@/components/contact/contact-message-section";
import { ContactSupportSection } from "@/components/contact/contact-support-section";
import { SiteHeader } from "@/components/layout/site-header";
import { pageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  pageSeoMetadata("contact", {
    title: "Contact Shei IT | Start Your Project",
    description:
      "Contact Shei IT to discuss your website, app, SEO, hosting, UI/UX, or digital product project.",
    path: "/contact",
  });

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
