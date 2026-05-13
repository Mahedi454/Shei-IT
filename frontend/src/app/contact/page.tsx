import { Mail, MapPin, Phone } from "lucide-react";

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
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="max-w-[10ch] text-[3rem] font-semibold leading-[1.05] text-[color:var(--foreground)] sm:text-[4rem]">
              Tell Us What You Need
            </h1>
            <p className="mt-5 max-w-[34rem] text-[16px] leading-8 text-[color:var(--muted-foreground)]">
              No signup wall. Just tell us about the project, timeline, or problem you want solved and we will respond directly.
            </p>
            <div className="mt-8 space-y-4">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 text-[15px] text-[color:var(--foreground)]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--stat-bg)] text-[color:var(--primary)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
