"use client";

import {
  ArrowRight,
  BadgeCheck,
  Box,
  BriefcaseBusiness,
  Brush,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Crown,
  Gauge,
  Globe2,
  Headphones,
  Lightbulb,
  LockKeyhole,
  MonitorCog,
  MonitorSmartphone,
  PackageCheck,
  RefreshCw,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Timer,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import ctaImage from "@/assets/cta-image.png";
import dockerIcon from "@/assets/maintaince support images/docker2-svgrepo-com.svg";
import githubIcon from "@/assets/maintaince support images/github-142-svgrepo-com.svg";
import grafanaIcon from "@/assets/maintaince support images/grafana-svgrepo-com.svg";
import jiraIcon from "@/assets/maintaince support images/jira-svgrepo-com.svg";
import sentryIcon from "@/assets/maintaince support images/sentry-svgrepo-com.svg";
import uptimeRobotIcon from "@/assets/maintaince support images/uptimerobot-svgrepo-com.svg";
import { SiteHeader } from "@/components/layout/site-header";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";

const stats = [
  { value: "2+", label: "Work Experience", icon: BadgeCheck },
  { value: "11+", label: "Systems Supported", icon: MonitorCog },
  { value: "95%", label: "Client Satisfaction", icon: Sparkles },
  { value: "24/7", label: "Support", icon: Headphones },
] as const;

const offers = [
  {
    title: "Website & App Maintenance",
    description:
      "Regular updates, fixes and improvements for websites and applications.",
    icon: Wrench,
    accent: "violet",
  },
  {
    title: "Bug Fixing & Troubleshooting",
    description:
      "Find and fix issues quickly so your digital products keep working.",
    icon: Code2,
    accent: "violet",
  },
  {
    title: "Monitoring & Uptime",
    description:
      "Track uptime, errors and performance before small issues become big problems.",
    icon: Gauge,
    accent: "violet",
  },
  {
    title: "Security Updates",
    description:
      "Patch dependencies, improve protection and keep your systems safer.",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "Performance Improvements",
    description:
      "Optimize speed, stability and user experience through ongoing improvements.",
    icon: RefreshCw,
    accent: "violet",
  },
] as const;

const reasons = [
  {
    title: "Reliable Uptime",
    description:
      "Monitoring and maintenance that help keep services available.",
    icon: Gauge,
  },
  {
    title: "Fast Fixes",
    description: "Quick troubleshooting for bugs, errors and broken workflows.",
    icon: Timer,
  },
  {
    title: "Secure & Reliable",
    description: "Strong security and regular updates for peace of mind.",
    icon: LockKeyhole,
  },
  {
    title: "Business Continuity",
    description: "Support plans designed to reduce downtime and disruption.",
    icon: Target,
  },
  {
    title: "Continuous Improvement",
    description: "Ongoing enhancements that help your product stay useful.",
    icon: PackageCheck,
  },
  {
    title: "Ongoing Support",
    description: "We're here whenever you need us.",
    icon: Headphones,
  },
] as const;

const processSteps = [
  {
    title: "Audit & Handover",
    description: "We review your product, access, issues and support needs.",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "Monitoring Setup",
    description: "We configure uptime, error and performance monitoring.",
    icon: Gauge,
    accent: "violet",
  },
  {
    title: "Fixes & Updates",
    description: "We handle bugs, patches, content updates and improvements.",
    icon: Code2,
    accent: "violet",
  },
  {
    title: "Testing & QA",
    description: "Thorough testing after fixes, updates and maintenance work.",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "Report & Improve",
    description: "We share updates, status and recommendations for next steps.",
    icon: Rocket,
    accent: "violet",
  },
] as const;

const technologies = [
  { label: "GitHub", icon: githubIcon },
  { label: "Sentry", icon: sentryIcon },
  { label: "Grafana", icon: grafanaIcon },
  { label: "Jira", icon: jiraIcon },
  { label: "UptimeRobot", icon: uptimeRobotIcon },
  { label: "Docker", icon: dockerIcon },
] as const;

const pricingPackages = [
  {
    name: "Starter Support",
    description: "Best for small websites that need light monthly support.",
    price: "$99",
    note: "Starter maintenance package",
    timeline: "Monthly support",
    action: "Get Started",
    icon: Send,
    accent: "violet",
    popular: false,
    features: [
      "Monthly Health Check",
      "Basic Bug Fixes",
      "Content Updates",
      "Plugin or Dependency Review",
      "Backup Check",
      "Basic Uptime Monitoring",
      "Email Support",
      "1 Month Support",
    ],
  },
  {
    name: "Business Support",
    description: "Ideal for active business sites, apps and dashboards.",
    price: "$249",
    note: "Business maintenance package",
    timeline: "Monthly support",
    action: "Choose Plan",
    icon: BriefcaseBusiness,
    accent: "featured",
    popular: true,
    features: [
      "Priority Bug Fixing",
      "Security Updates",
      "Uptime Monitoring",
      "Error Tracking",
      "Performance Review",
      "Monthly Report",
      "Content & Feature Updates",
      "Backup Verification",
      "3 Months Support",
    ],
  },
  {
    name: "Pro Support",
    description: "Perfect for stores, SaaS products and critical workflows.",
    price: "$499",
    note: "Advanced maintenance package",
    timeline: "Monthly support",
    action: "Protect Product",
    icon: MonitorCog,
    accent: "orange",
    popular: false,
    features: [
      "Advanced Monitoring",
      "Priority Response",
      "Incident Support",
      "Dependency Updates",
      "Database Backup Checks",
      "Performance Optimization",
      "Release Support",
      "Technical Recommendations",
      "6 Months Support",
    ],
  },
  {
    name: "Custom Support",
    description: "For complex platforms that need dedicated technical support.",
    price: "Custom",
    note: "Custom project scope",
    timeline: "Depends on scope",
    action: "Book Consultation",
    icon: Box,
    accent: "blue",
    popular: false,
    features: [
      "Requirement Analysis",
      "Dedicated Support Plan",
      "Custom SLA",
      "Infrastructure Monitoring",
      "Incident Response Workflow",
      "Security Maintenance",
      "Release Management",
      "Scalability Review",
      "Maintenance Roadmap",
    ],
  },
] as const;

const faqs = [
  {
    question: "How fast can you start support?",
    answer:
      "We can usually begin after a short audit and access handover. Simple support setups can start within 1 to 2 business days.",
  },
  {
    question: "What information do you need to start?",
    answer:
      "We need access to your website or app, hosting, repository, admin panel, current issue list, and any backup or monitoring tools.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Maintenance & Support is built for ongoing help, including updates, fixes, monitoring, reports and improvements.",
  },
  {
    question: "Can you fix urgent issues?",
    answer:
      "Yes. We can help with urgent bugs, downtime, broken features and release issues depending on the support plan and access.",
  },
  {
    question: "Can I schedule a call before starting?",
    answer:
      "Yes. You can book a consultation so we can understand your support needs and recommend the right package.",
  },
] as const;

function MaintenanceSupportMockup() {
  return (
    <div className="relative mx-auto aspect-[1.18/1] w-full max-w-[660px]">
      <div className="absolute left-[9%] top-[7%] h-[74%] w-[76%] rounded-full bg-[color:var(--purple-glow)]" />
      <div className="absolute right-[6%] top-[9%] h-5 w-5 rounded-full bg-[linear-gradient(135deg,#fff,#ff9f5a)] shadow-[0_10px_24px_rgba(255,159,90,0.35)]" />
      <div className="absolute left-[15%] top-[5%] h-10 w-10 rounded-full bg-[linear-gradient(135deg,#a78bfa,#6c63ff)] shadow-[0_16px_36px_rgba(108,99,255,0.35)]" />
      <div className="absolute right-[11%] bottom-[19%] h-20 w-20 rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <div className="flex h-full items-center justify-center text-[color:var(--primary)]">
          <Globe2 className="h-9 w-9" strokeWidth={2.1} />
        </div>
      </div>
      <div className="absolute left-[7%] top-[24%] z-20 flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] text-[color:var(--primary)] shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl">
        <Code2 className="h-8 w-8" strokeWidth={2.2} />
      </div>
      <div className="absolute left-[1%] top-[47%] z-20 flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] text-[color:var(--blue)] shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl">
        <Gauge className="h-8 w-8" strokeWidth={2.2} />
      </div>
      <div className="absolute bottom-[7%] right-[2%] z-20 h-20 w-20 rounded-[1.5rem] bg-[color:var(--card-solid)] shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:bg-[color:var(--card)]">
        <div className="absolute left-6 top-6 h-8 w-4 rounded-full bg-[color:var(--mint)]" />
        <div className="absolute bottom-4 left-4 h-9 w-9 rounded-full border-[10px] border-[color:var(--primary-soft)]" />
      </div>
      <div className="absolute bottom-[2%] right-[22%] h-16 w-16 rounded-[1.25rem] bg-[color:var(--card-solid)] shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:bg-[color:var(--card)]">
        <div className="mx-auto mt-4 h-9 w-3 rounded-full bg-[color:var(--mint)]" />
        <div className="absolute left-5 top-8 h-4 w-8 -rotate-45 rounded-full bg-[color:var(--orange)]" />
      </div>

      <div className="absolute bottom-[13%] left-[20%] z-10 h-[16%] w-[58%] -skew-x-12 rounded-b-[1rem] bg-[linear-gradient(180deg,#d7dbe7,#9ca3af)] shadow-[0_26px_42px_rgba(15,23,42,0.2)]" />
      <div className="absolute bottom-[21%] left-[27%] z-20 h-[3%] w-[40%] rounded-full bg-[linear-gradient(90deg,#6b7280,#d1d5db,#4b5563)]" />
      <div className="absolute left-[22%] top-[13%] z-30 h-[62%] w-[62%] rotate-[5deg] rounded-[1rem] border-[10px] border-[#262b36] bg-[color:var(--card-solid)] shadow-[0_34px_80px_rgba(15,23,42,0.28)] dark:bg-[#151722]">
        <div className="h-full rounded-[0.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,247,255,0.88))] p-4 dark:bg-[linear-gradient(180deg,rgba(27,28,40,0.96),rgba(12,12,18,0.94))]">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#fde68a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
          </div>
          <div className="mt-5 h-8 rounded-md bg-[image:var(--gradient-primary)]" />
          <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-4">
            <div className="h-28 rounded-lg bg-[linear-gradient(135deg,rgba(139,124,255,0.24),rgba(93,174,255,0.12))]">
              <div className="mx-auto mt-8 h-12 w-16 rounded-t-full bg-[color:var(--primary-soft)] opacity-65" />
              <div className="mx-auto -mt-2 h-10 w-24 rounded-t-full bg-[color:var(--blue)] opacity-35" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-20 rounded-full bg-[color:var(--background-secondary)]" />
              <div className="h-3 w-28 rounded-full bg-[color:var(--background-secondary)]" />
              <div className="h-9 w-24 rounded-lg bg-[color:var(--background-secondary)]" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="h-10 rounded-lg bg-[color:var(--background-secondary)]" />
            <div className="h-10 rounded-lg bg-[color:var(--background-secondary)]" />
            <div className="h-10 rounded-lg bg-[color:var(--background-secondary)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MaintenanceSupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />

      <section className="relative overflow-hidden pb-12 pt-8 lg:pb-16 lg:pt-10">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <nav className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[color:var(--muted-foreground)]">
            <a href="/" className="hover:text-[color:var(--foreground)]">
              Home
            </a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a
              href="/services"
              className="hover:text-[color:var(--foreground)]"
            >
              Services
            </a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[color:var(--foreground)]">
              Maintenance & Support
            </span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="max-w-[44rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--primary)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
                <Sparkles className="h-3.5 w-3.5 fill-[color:var(--primary)]" />
                Our Services
              </div>

              <h1 className="mt-6 text-[3rem] font-semibold leading-[1.04] tracking-[-0.07em] text-[color:var(--foreground)] sm:text-[4rem] lg:text-[4.5rem]">
                Maintenance &
                <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  Support
                </span>
              </h1>
              <p className="mt-5 max-w-[38rem] text-[17px] font-medium leading-8 text-[color:var(--muted-foreground)]">
                Reliable technical support that keeps your product running.
              </p>
              <p className="mt-4 max-w-[40rem] text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                We maintain websites, apps and digital systems with updates,
                fixes, monitoring and continuous improvements tailored to your
                business needs.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-4 py-3 shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-[0.75rem] bg-[color:var(--stat-icon-bg)] text-[color:var(--primary)]">
                        <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                      </span>
                      <span>
                        <span className="block text-[14px] font-bold text-[color:var(--foreground)]">
                          {item.value}
                        </span>
                        <span className="block text-[11px] font-semibold text-[color:var(--muted-foreground)]">
                          {item.label}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-[0.9rem] bg-[color:var(--cta-dark)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)]"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-3 rounded-[0.9rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-7 py-4 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] dark:shadow-none"
                >
                  View Our Work
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>

            <MaintenanceSupportMockup />
          </div>
        </div>
      </section>

      <section className="relative pb-14 pt-4 lg:pb-16">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
                What We Offer
              </p>
              <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Complete Maintenance & Support Solutions</ServiceGradientHeading>
            </div>
            <p className="max-w-[42rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)] lg:justify-self-end">
              We provide end-to-end maintenance and support services to keep
              your digital products stable, secure and improving over time.
            </p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {offers.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="min-h-[250px] rounded-[1.15rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
                >
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-[1rem] ${
                      item.accent === "mint"
                        ? "bg-[linear-gradient(180deg,rgba(111,231,200,0.22),rgba(111,231,200,0.08))] text-[color:var(--mint)]"
                        : "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.15} />
                  </span>

                  <h3 className="mt-7 text-[1.08rem] font-semibold leading-snug tracking-[-0.04em] text-[color:var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-12 lg:pb-14">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Why Choose Us
            </p>
            <ServiceGradientHeading className="mt-3 max-w-[26rem] text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.25rem]">Support That Protects, Improves & Scales</ServiceGradientHeading>
            <p className="mt-4 max-w-[29rem] text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
              We combine monitoring, maintenance, security and technical
              guidance to reduce downtime and keep your product healthy.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                    <Icon className="h-5 w-5" strokeWidth={2.15} />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] font-medium leading-6 text-[color:var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-16 lg:pb-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
                Our Process
              </p>
              <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Our Development Process</ServiceGradientHeading>
            </div>
            <p className="max-w-[40rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)]">
              A clear, transparent process to deliver dependable support, on
              time and on budget.
            </p>
          </div>

          <div className="relative mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <div className="pointer-events-none absolute left-[5%] right-[5%] top-10 hidden border-t-2 border-dashed border-[rgba(139,124,255,0.28)] xl:block" />
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="relative pt-12">
                  <span
                    className={`absolute left-1/2 top-0 z-10 inline-flex h-18 w-18 -translate-x-1/2 items-center justify-center rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[0_18px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl ${
                      step.accent === "mint"
                        ? "text-[color:var(--mint)]"
                        : "text-[color:var(--primary)]"
                    }`}
                  >
                    <Icon className="h-8 w-8" strokeWidth={2.1} />
                  </span>
                  <div className="flex h-[190px] flex-col items-center justify-center rounded-[1.15rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 pb-6 pt-8 text-center shadow-[0_18px_48px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none">
                    <h3 className="text-[1.08rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
                Technologies We Use
              </p>
              <ServiceGradientHeading className="mt-3 max-w-[34rem] text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Modern Technologies for Powerful Support</ServiceGradientHeading>
            </div>
            <p className="max-w-[40rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)]">
              We use industry-leading tools to monitor, debug, manage and
              improve your digital products.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {technologies.map((tech) => (
              <div
                key={tech.label}
                className="group flex min-h-[64px] items-center justify-center gap-2.5 rounded-[0.9rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-3 shadow-[0_14px_34px_rgba(15,23,42,0.045)] backdrop-blur-xl dark:shadow-none"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center transition-transform group-hover:-translate-y-0.5">
                  <Image
                    src={tech.icon}
                    alt={`${tech.label} logo`}
                    className="h-8 w-8 object-contain"
                  />
                </span>
                <span className="whitespace-nowrap text-[12px] font-semibold text-[color:var(--foreground)]">
                  {tech.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-16 lg:pb-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.88fr] lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
                Pricing Packages
              </p>
              <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Transparent Pricing for Every Business Stage</ServiceGradientHeading>
            </div>
            <p className="max-w-[43rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)]">
              Choose the perfect maintenance package based on your business
              needs. From light updates to dedicated product support, we have
              you covered.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {pricingPackages.map((pack) => {
              const Icon = pack.icon;
              const isFeatured = pack.accent === "featured";
              const iconClass =
                pack.accent === "orange"
                  ? "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]"
                  : pack.accent === "blue"
                    ? "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]"
                    : isFeatured
                      ? "bg-white/18 text-white"
                      : "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]";

              return (
                <article
                  key={pack.name}
                  className={`relative flex h-full flex-col rounded-[1.25rem] border p-6 shadow-[0_20px_56px_rgba(15,23,42,0.06)] backdrop-blur-xl ${
                    isFeatured
                      ? "border-transparent bg-[linear-gradient(145deg,#6c63ff_0%,#735dff_46%,#4f8cff_100%)] text-white shadow-[0_28px_70px_rgba(108,99,255,0.28)]"
                      : "border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] text-[color:var(--foreground)] dark:shadow-none"
                  }`}
                >
                  {pack.popular ? (
                    <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[color:var(--primary)] shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
                      <Crown className="h-3.5 w-3.5 fill-[color:var(--primary)]" />
                      Most Popular
                    </div>
                  ) : null}

                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] ${iconClass}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.15} />
                    </span>
                    <div>
                      <h3
                        className={`text-[1.18rem] font-semibold tracking-[-0.04em] ${isFeatured ? "text-white" : "text-[color:var(--foreground)]"}`}
                      >
                        {pack.name}
                      </h3>
                      <p
                        className={`mt-2 text-[13px] font-medium leading-6 ${isFeatured ? "text-white/78" : "text-[color:var(--muted-foreground)]"}`}
                      >
                        {pack.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`mt-7 rounded-[1rem] border p-4 ${
                      isFeatured
                        ? "border-white/40 bg-white text-[color:var(--foreground)] shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                        : "border-[color:var(--stat-border)] bg-white/45 dark:bg-white/5"
                    }`}
                  >
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                        Package Price
                      </p>
                      <p
                        className={`mt-2 text-[2.25rem] font-semibold tracking-[-0.06em] ${isFeatured ? "text-[color:var(--primary)]" : "text-[color:var(--foreground)]"}`}
                      >
                        {pack.price}
                      </p>
                      <p className="mt-1 text-[12px] font-semibold text-[color:var(--muted-foreground)]">
                        {pack.note}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2
                          className={`h-4.5 w-4.5 shrink-0 ${isFeatured ? "text-white" : "text-[color:var(--mint)]"}`}
                          strokeWidth={2.25}
                        />
                        <span
                          className={`text-[14px] font-medium ${isFeatured ? "text-white/86" : "text-[color:var(--muted-foreground)]"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-7 flex items-center gap-2 text-[13px] font-bold ${isFeatured ? "text-white/78" : "text-[color:var(--muted-foreground)]"}`}
                  >
                    <CalendarClock className="h-4 w-4" strokeWidth={2.1} />
                    Timeline: {pack.timeline}
                  </div>

                  <a
                    href="/contact"
                    className={`mt-5 inline-flex h-13 w-full items-center justify-center gap-3 rounded-[0.85rem] border text-[14px] font-bold shadow-[0_14px_30px_rgba(15,23,42,0.06)] ${
                      isFeatured
                        ? "border-white/20 bg-white text-[color:var(--primary)]"
                        : "border-[color:var(--button-border)] bg-[color:var(--button-secondary)] text-[color:var(--primary)]"
                    }`}
                  >
                    {pack.action}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pb-16 lg:pb-20">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-7 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              FAQ
            </p>
            <ServiceGradientHeading className="mt-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">Frequently Asked Questions</ServiceGradientHeading>

            <div className="mt-5 space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.question;

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)]"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                      className="flex w-full items-center gap-4 px-4 py-3 text-left"
                    >
                      <span className="flex-1 text-[13px] font-semibold text-[color:var(--foreground)]">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[color:var(--muted-foreground)]"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.26,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <p className="px-4 pb-4 text-[12px] font-medium leading-6 text-[color:var(--muted-foreground)]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[1.35rem] bg-[linear-gradient(100deg,#6c63ff_0%,#735dff_42%,#4f8cff_100%)] p-8 text-white shadow-[0_28px_80px_rgba(108,99,255,0.24)] sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(255,255,255,0.26),transparent_25%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.12),transparent_28%)]" />
            <div className="pointer-events-none absolute right-[14%] top-[20%] h-4 w-4 rounded-full bg-[#bfe7ff]/85 blur-[1px]" />
            <div className="pointer-events-none absolute right-[7%] bottom-[34%] h-5 w-5 rounded-full bg-[#d3ccff]/90" />
            <div className="pointer-events-none absolute right-[40%] bottom-[26%] h-6 w-6 rounded-full bg-[#aee7ff]/85 blur-[1px]" />

            <div className="relative z-10 max-w-[25rem] pt-8 sm:max-w-[20rem] xl:max-w-[24rem]">
              <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-white sm:text-[2.35rem]">Ready to Start Your Project?</h2>
              <p className="mt-3 max-w-[21rem] text-[15px] font-medium leading-7 text-white/86">
                Let&apos;s turn your idea into a powerful digital solution.
                We&apos;re excited to help you grow.
              </p>
              <a
                href="/contact"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-[0.75rem] bg-white px-7 py-4 text-[15px] font-semibold text-[#111827] shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
              </a>
            </div>

            <div className="pointer-events-none absolute right-0 top-1/2 hidden w-[52%] max-w-[430px] -translate-y-1/2 sm:block xl:w-[56%]">
              <Image
                src={ctaImage}
                alt="Launch CTA illustration"
                className="h-auto w-full object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
