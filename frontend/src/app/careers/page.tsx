import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  Code2,
  HeartHandshake,
  Layers3,
  Mail,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  Sparkles,
  Wrench,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Careers | Shei IT",
  description:
    "Explore career opportunities, team culture, and professional growth at Shei IT.",
};

const values = [
  {
    title: "Craft With Care",
    description:
      "We value clean execution, thoughtful design decisions, and digital products that feel reliable for real users.",
    icon: BadgeCheck,
  },
  {
    title: "Grow Together",
    description:
      "Our team shares context, learns openly, and helps each person become stronger at their craft.",
    icon: HeartHandshake,
  },
  {
    title: "Own The Outcome",
    description:
      "We take responsibility for quality, communication, deadlines, and the business impact of our work.",
    icon: Layers3,
  },
];

const openings = [
  {
    role: "Frontend Developer",
    type: "Project / Remote",
    description:
      "Build responsive interfaces, dashboards, and marketing experiences with React, Next.js, and modern UI systems.",
  },
  {
    role: "UI/UX Designer",
    type: "Project / Remote",
    description:
      "Design clean product flows, landing pages, dashboards, and brand-aligned digital experiences.",
  },
  {
    role: "SEO & Content Specialist",
    type: "Part-time / Remote",
    description:
      "Plan search-friendly content, improve on-page SEO, and help clients communicate clearly online.",
  },
];

const serviceTeams = [
  {
    title: "Website Development",
    description:
      "Marketing websites, service pages, landing pages, and conversion-focused business sites.",
    fit: "Frontend developers, QA-minded builders, content-focused designers",
    href: "/services/website-development",
    icon: Code2,
  },
  {
    title: "Mobile App Development",
    description:
      "Android, iOS, and cross-platform app experiences for startup and business workflows.",
    fit: "App developers, product thinkers, interface designers",
    href: "/services/mobile-app-development",
    icon: MonitorSmartphone,
  },
  {
    title: "UI/UX Design",
    description:
      "Product flows, dashboards, wireframes, prototypes, and polished user interfaces.",
    fit: "UI designers, UX researchers, design-system collaborators",
    href: "/services/ui-ux-design",
    icon: PenTool,
  },
  {
    title: "SEO & Marketing",
    description:
      "Search strategy, on-page SEO, content planning, analytics, and campaign support.",
    fit: "SEO specialists, content strategists, analytics-focused marketers",
    href: "/services/seo-marketing",
    icon: Megaphone,
  },
  {
    title: "Hosting & Cloud",
    description:
      "Deployment, hosting setup, domain configuration, reliability, and scalable infrastructure.",
    fit: "Cloud engineers, DevOps learners, technical support specialists",
    href: "/services/hosting-cloud",
    icon: Cloud,
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing updates, bug fixes, performance improvements, security checks, and client support.",
    fit: "Support engineers, maintainers, detail-oriented problem solvers",
    href: "/services/maintenance-support",
    icon: Wrench,
  },
];

const process = [
  "Share your profile, portfolio, or relevant work samples.",
  "We review fit based on skills, communication, and project standards.",
  "Selected candidates complete a short practical conversation or task.",
  "We align on scope, availability, expectations, and collaboration style.",
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat text-[color:var(--foreground)]">
      <SiteHeader />

      <section className="border-b border-[color:var(--stat-border)]">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-10 py-16 lg:grid-cols-[1fr_0.62fr] lg:items-end lg:py-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Careers
            </p>
            <h1 className="page-main-heading mt-5 max-w-4xl">
              Build meaningful digital work with Shei IT
            </h1>
            <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[color:var(--muted-foreground)]">
              We work with practical, curious, quality-focused people who care about clear
              communication, strong execution, and helping businesses grow through better digital
              products.
            </p>
            <div className="mt-8 flex flex-nowrap gap-2 sm:flex-wrap sm:gap-3">
              <a
                href="mailto:sheiitofficial@gmail.com?subject=Career%20Application%20-%20Shei%20IT"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--primary)] px-3 py-3 text-[11px] font-bold text-white shadow-[0_16px_36px_rgba(108,99,255,0.18)] sm:px-5 sm:text-[13px]"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-3 py-3 text-[11px] font-bold text-[color:var(--foreground)] sm:px-5 sm:text-[13px]"
              >
                Contact Team
              </Link>
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="grid gap-4">
              {[
                ["Work Style", "Remote-friendly collaboration"],
                ["Focus", "Web, app, SEO, design, and product systems"],
                ["Standard", "Clear communication and polished delivery"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[0.95rem] bg-[color:var(--card-solid)] p-4 ring-1 ring-[color:var(--stat-border)]/70">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                    {label}
                  </p>
                  <p className="mt-2 text-[14px] font-semibold text-[color:var(--foreground)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-11/12 max-w-[1440px] py-14 lg:py-20">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Culture
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] md:text-[2.6rem]">
              What we look for
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[1.15rem] font-semibold">{value.title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[color:var(--stat-border)] bg-[color:var(--stat-bg)]/55">
        <div className="mx-auto w-11/12 max-w-[1440px] py-14 lg:py-20">
          <div className="mb-7 max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Service Teams
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] md:text-[2.6rem]">
              Work across the services we deliver
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              Careers at Shei IT connect directly with our client services. Whether you build,
              design, optimize, deploy, or support, your work contributes to practical digital
              outcomes for real businesses.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceTeams.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-5 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[1.1rem] font-semibold">{service.title}</h3>
                      <p className="mt-2 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-[0.85rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                      Good fit for
                    </p>
                    <p className="mt-2 text-[12px] leading-5 text-[color:var(--muted-foreground)]">
                      {service.fit}
                    </p>
                  </div>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-[color:var(--primary)]"
                  >
                    View service
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-11/12 max-w-[1440px] gap-7 py-14 lg:grid-cols-[360px_1fr] lg:items-start lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold">Hiring Notes</h2>
                <p className="mt-1 text-[12px] leading-5 text-[color:var(--muted-foreground)]">
                  We are open to skilled collaborators even when a perfect role is not listed.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {process.map((item) => (
                <div
                  key={item}
                  className="flex gap-2 text-[13px] leading-6 text-[color:var(--muted-foreground)]"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--primary)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-5">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Open Roles
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] md:text-[2.6rem]">
              Current opportunities
            </h2>
          </div>

          {openings.map((opening) => (
            <article
              key={opening.role}
              className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em]">
                        {opening.role}
                      </h3>
                      <p className="mt-1 text-[12px] font-semibold text-[color:var(--primary)]">
                        {opening.type}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-3xl text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                    {opening.description}
                  </p>
                </div>
                <a
                  href={`mailto:sheiitofficial@gmail.com?subject=${encodeURIComponent(
                    `${opening.role} Application`,
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-4 py-2.5 text-[13px] font-bold text-[color:var(--foreground)]"
                >
                  <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                  Apply
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
