import { Mail, MapPin, Phone } from "lucide-react";

import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMessageSection } from "@/components/contact/contact-message-section";
import { ContactSupportSection } from "@/components/contact/contact-support-section";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm } from "@/components/public/contact-form";

const details = [
  { label: "hello@shei-it.com", icon: Mail },
  { label: "+880 1234 567890", icon: Phone },
  { label: "Dhaka, Bangladesh", icon: MapPin },
] as const;

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
