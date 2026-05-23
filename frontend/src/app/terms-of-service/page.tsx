import type { Metadata } from "next";
import { CalendarDays, CheckCircle2, FileText, Mail, ShieldCheck } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Terms of Service | Shei IT",
  description:
    "Read the terms that apply when using the Shei IT website, requesting services, and working with our digital product team.",
};

const termsSections = [
  {
    title: "Use of Our Website",
    body: [
      "You may use this website to learn about Shei IT, review our services, read content, and contact us about potential projects.",
      "You agree not to misuse the website, attempt unauthorized access, disrupt service availability, or use the website in a way that violates applicable laws.",
    ],
  },
  {
    title: "Service Requests and Proposals",
    body: [
      "Submitting a contact form or project request does not create a binding service agreement. A project begins only after scope, timeline, pricing, and payment terms are confirmed by both parties.",
      "Any proposal, estimate, or timeline shared before a formal agreement is for planning purposes and may change based on final requirements.",
    ],
  },
  {
    title: "Client Responsibilities",
    body: [
      "Clients are responsible for providing accurate project information, required content, brand assets, access credentials, feedback, and approvals on time.",
      "Delays in providing required materials or decisions may affect delivery timelines and project milestones.",
    ],
  },
  {
    title: "Payments and Delivery",
    body: [
      "Payment schedules, deliverables, revisions, and ownership terms are defined in each project agreement or invoice.",
      "Final delivery may depend on completed payments, approved scope, and any third-party platform requirements involved in the project.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "Unless otherwise agreed, client-specific final deliverables become the client’s property after full payment is received.",
      "Shei IT may retain rights to reusable methods, internal tools, frameworks, workflows, and general know-how developed or used during service delivery.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "Projects may use third-party services such as hosting providers, payment gateways, analytics platforms, APIs, or plugins.",
      "Shei IT is not responsible for outages, pricing changes, policy changes, or limitations caused by third-party providers.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "We work carefully to deliver reliable digital solutions, but we do not guarantee uninterrupted operation of third-party platforms or services outside our control.",
      "To the fullest extent permitted by law, Shei IT is not liable for indirect, incidental, or consequential damages arising from website use or service engagement.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these Terms of Service as our website, services, or business requirements change.",
      "The latest version will always be available on this page, and continued use of the website means you accept the updated terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat text-[color:var(--foreground)]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[color:var(--stat-border)]">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-10 py-16 lg:grid-cols-[1fr_0.62fr] lg:items-end lg:py-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Terms of Service
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.7rem,6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Clear terms for using our website and services
            </h1>
            <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[color:var(--muted-foreground)]">
              These terms explain how our website may be used, how service requests are handled,
              and what clients can expect when working with Shei IT.
            </p>
          </div>

          <div className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">Professional service terms</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">
                    Scope, responsibilities, payments, and delivery.
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
                  <p className="text-[14px] font-semibold">Questions</p>
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
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold">Quick Summary</h2>
                <p className="mt-1 text-[12px] leading-5 text-[color:var(--muted-foreground)]">
                  These terms keep project expectations clear before work begins and while
                  services are delivered.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {["Project scope is agreed first", "Client materials affect timelines", "Third-party services have separate terms"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[13px] text-[color:var(--muted-foreground)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--primary)]" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          {termsSections.map((section) => (
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
