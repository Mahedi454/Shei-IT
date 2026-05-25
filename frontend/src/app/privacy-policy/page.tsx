import type { Metadata } from "next";
import {
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy | Shei IT",
  description:
    "Read how Shei IT collects, uses, protects, and manages information shared through our website, contact forms, and services.",
};

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect your name, email address, phone number, company name, project details, budget range, and messages when you contact us or request a service.",
      "We may also collect basic technical information such as browser type, device information, pages visited, and general analytics data to improve website performance and user experience.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use submitted information to respond to inquiries, prepare project proposals, provide support, manage client communication, and improve our services.",
      "We do not sell personal information. We only share information when needed to deliver requested services, comply with legal obligations, or protect our website and business.",
    ],
  },
  {
    title: "Cookies and Analytics",
    body: [
      "Our website may use cookies or analytics tools to understand visitor behavior, measure page performance, and improve content quality.",
      "You can control cookies through your browser settings, though some parts of the website may work differently if cookies are disabled.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We use reasonable technical and administrative safeguards to protect submitted information from unauthorized access, misuse, or disclosure.",
      "No online transmission or storage system is completely risk-free, but we work to keep your information handled responsibly.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may request access, correction, or deletion of personal information you have shared with us, subject to reasonable business and legal requirements.",
      "You can also choose not to provide optional information, though this may limit how accurately we can respond to your project needs.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "We may update this Privacy Policy as our website, services, or legal requirements change. The latest version will always be available on this page.",
      "Continued use of our website after updates means you accept the revised Privacy Policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat text-[color:var(--foreground)]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[color:var(--stat-border)]">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-10 py-16 lg:grid-cols-[1fr_0.62fr] lg:items-end lg:py-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Privacy Policy
            </p>
            <h1 className="page-main-heading mt-5 max-w-4xl">
              How we protect and manage your information
            </h1>
            <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[color:var(--muted-foreground)]">
              This policy explains what information Shei IT collects, why we
              collect it, and how we handle it when you use our website, contact
              forms, and digital services.
            </p>
          </div>

          <div className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">
                    Responsible data handling
                  </p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">
                    Clear purpose, limited use, careful protection.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">Effective date</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">
                    May 24, 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">Privacy contact</p>
                  <a
                    href="mailto:sheiitofficial@gmail.com"
                    className="text-[12px] text-[color:var(--primary)]"
                  >
                    sheiitofficial@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-11/12 max-w-[1440px] gap-7 py-14 lg:grid-cols-[0.32fr_1fr] lg:py-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center text-[color:var(--primary)]">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold">Quick Summary</h2>
                <p className="mt-1 text-[12px] leading-5 text-[color:var(--muted-foreground)]">
                  We collect only practical information needed to communicate,
                  support projects, and improve the website experience.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                "No selling personal data",
                "Used for service communication",
                "Security-focused handling",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[13px] text-[color:var(--muted-foreground)]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--primary)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          {policySections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur md:p-7"
            >
              <h2 className="text-[1.35rem] font-semibold tracking-[-0.04em]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-8 text-[color:var(--muted-foreground)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
