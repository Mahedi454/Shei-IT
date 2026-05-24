import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { FaqsDetails } from "@/components/faqs/faqs-details";
import { faqItems } from "@/components/faqs/faq-data";

export const metadata: Metadata = {
  title: "FAQs | Shei IT",
  description:
    "Find answers about Shei IT services, pricing, timelines, SEO, hosting, security, maintenance, and project support.",
};

export default function FaqsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat text-[color:var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />
      <FaqsDetails />
    </main>
  );
}
