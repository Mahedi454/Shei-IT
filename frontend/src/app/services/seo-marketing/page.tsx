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
  Headphones,
  LineChart,
  Lightbulb,
  LockKeyhole,
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
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import ahrefsIcon from "@/assets/SEO marketing images/Ahrefs.png";
import ctaImage from "@/assets/cta-image.png";
import googleAnalyticsIcon from "@/assets/SEO marketing images/google-analytics-svgrepo-com.svg";
import metaIcon from "@/assets/SEO marketing images/meta.png";
import searchConsoleIcon from "@/assets/SEO marketing images/search-console-icon-2025-1.svg";
import semrushIcon from "@/assets/SEO marketing images/Semrush-Logo.png";
import seoBannerDark from "@/assets/SEO-Banner-Dark.png";
import seoBannerLight from "@/assets/SEO-Banner-Light.png";
import yoastIcon from "@/assets/SEO marketing images/Yoast SEO.png";
import { SiteHeader } from "@/components/layout/site-header";
import { useTheme } from "@/components/providers/theme-provider";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";

const stats = [
  { value: "2+", label: "Work Experience", icon: BadgeCheck },
  { value: "9+", label: "Campaigns Run", icon: TrendingUp },
  { value: "97%", label: "Client Satisfaction", icon: Sparkles },
  { value: "24/7", label: "Support", icon: Headphones },
] as const;

const offers = [
  {
    title: "SEO Strategy & Audit",
    description:
      "Technical audits, keyword research and growth plans for better rankings.",
    icon: Search,
    accent: "violet",
  },
  {
    title: "On-Page Optimization",
    description:
      "Metadata, headings, content structure and page improvements that search engines understand.",
    icon: Code2,
    accent: "violet",
  },
  {
    title: "Content Marketing",
    description:
      "Helpful content plans, blog topics and landing pages built around user intent.",
    icon: Brush,
    accent: "violet",
  },
  {
    title: "Analytics & Tracking",
    description:
      "Google Analytics, Search Console, events and conversion tracking setup.",
    icon: LineChart,
    accent: "mint",
  },
  {
    title: "Paid Social & Remarketing",
    description:
      "Targeted Meta campaigns and retargeting flows to bring qualified traffic.",
    icon: RefreshCw,
    accent: "violet",
  },
] as const;

const reasons = [
  {
    title: "Search Visibility",
    description:
      "Built around better rankings, impressions and organic discovery.",
    icon: Search,
  },
  {
    title: "Performance Focused",
    description:
      "Optimized pages, content and campaigns for measurable growth.",
    icon: Timer,
  },
  {
    title: "Data Driven",
    description:
      "Decisions backed by analytics, search data and campaign metrics.",
    icon: LineChart,
  },
  {
    title: "Conversion Focused",
    description: "Designed to turn traffic into leads, sales and real actions.",
    icon: Target,
  },
  {
    title: "Scalable Growth",
    description:
      "Marketing systems that improve as your content and traffic grow.",
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
    title: "Audit & Research",
    description: "We review your website, competitors, keywords and audience.",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "Strategy Planning",
    description:
      "We create a practical roadmap for SEO, content and campaigns.",
    icon: Brush,
    accent: "violet",
  },
  {
    title: "Optimization",
    description: "We improve pages, metadata, technical issues and tracking.",
    icon: Code2,
    accent: "violet",
  },
  {
    title: "Campaign Launch",
    description: "We launch content, ads, tracking and reporting workflows.",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "Measure & Improve",
    description: "We monitor results and keep improving based on real data.",
    icon: Rocket,
    accent: "violet",
  },
] as const;

const technologies = [
  { label: "Google Analytics", icon: googleAnalyticsIcon },
  { label: "Search Console", icon: searchConsoleIcon },
  { label: "Ahrefs", icon: ahrefsIcon },
  { label: "Semrush", icon: semrushIcon },
  { label: "Yoast SEO", icon: yoastIcon },
  { label: "Meta", icon: metaIcon },
] as const;

const pricingPackages = [
  {
    name: "Starter SEO",
    description: "Best for small websites that need a clean SEO foundation.",
    price: "$149",
    note: "Starter SEO package",
    timeline: "7 - 10 days",
    action: "Get Started",
    icon: Send,
    accent: "violet",
    popular: false,
    features: [
      "SEO Audit",
      "Keyword Research",
      "Up to 5 Pages Optimized",
      "Metadata Setup",
      "Search Console Setup",
      "Google Analytics Setup",
      "Basic Speed Review",
      "1 Month Support",
    ],
  },
  {
    name: "Business Growth",
    description: "Ideal for businesses that want steady organic growth.",
    price: "$349",
    note: "Business SEO package",
    timeline: "2 - 4 weeks",
    action: "Choose Plan",
    icon: BriefcaseBusiness,
    accent: "featured",
    popular: true,
    features: [
      "Full SEO Audit",
      "Competitor Research",
      "Up to 12 Pages Optimized",
      "Content Plan",
      "Technical SEO Fixes",
      "Analytics Integration",
      "Monthly Report",
      "Conversion Tracking",
      "3 Months Support",
    ],
  },
  {
    name: "Pro Marketing",
    description: "Perfect for SEO, content and paid campaign growth.",
    price: "$699",
    note: "Advanced marketing package",
    timeline: "4 - 8 weeks",
    action: "Grow Traffic",
    icon: ShoppingCart,
    accent: "orange",
    popular: false,
    features: [
      "Advanced SEO Strategy",
      "Content Calendar",
      "Landing Page Optimization",
      "Meta Ads Setup",
      "Remarketing Setup",
      "Conversion Funnel Review",
      "Advanced Analytics",
      "6 Months Support",
    ],
  },
  {
    name: "Custom Growth",
    description: "For complex SEO, content and multi-channel campaigns.",
    price: "Custom",
    note: "Custom project scope",
    timeline: "Depends on scope",
    action: "Book Consultation",
    icon: Box,
    accent: "blue",
    popular: false,
    features: [
      "Requirement Analysis",
      "Custom SEO Strategy",
      "Multi-Channel Campaigns",
      "Technical SEO Roadmap",
      "Content Production Plan",
      "Analytics Dashboard",
      "Lead Funnel Planning",
      "Growth Experiments",
      "Monthly Optimization",
    ],
  },
] as const;

const faqs = [
  {
    question: "How fast can SEO show results?",
    answer:
      "SEO foundations can be set up within days, but meaningful ranking and traffic improvements usually take 2 to 3 months depending on competition.",
  },
  {
    question: "What information do you need to start?",
    answer:
      "We need your website URL, target locations, service list, business goals, existing analytics access, and competitors or keywords you care about.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. SEO and marketing work best with ongoing optimization, reporting, content updates and campaign improvements.",
  },
  {
    question: "Can you set up analytics and tracking?",
    answer:
      "Yes. We can configure Google Analytics, Search Console, conversion events, campaign tracking and reporting workflows.",
  },
  {
    question: "Can I schedule a call before starting?",
    answer:
      "Yes. You can book a consultation so we can understand your growth goals and recommend the right package.",
  },
] as const;

function SeoMarketingBanner() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark" ? seoBannerDark : seoBannerLight;

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
      <div className="relative w-full max-w-[760px]">
        <Image
          src={bannerImage}
          alt="SEO and marketing service banner"
          priority
          quality={90}
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 92vw"
          className="relative z-10 h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function SeoMarketingPage() {
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
              SEO & Marketing
            </span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="max-w-[39rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--primary)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
                <Sparkles className="h-3.5 w-3.5 fill-[color:var(--primary)]" />
                Our Services
              </div>

              <h1 className="page-main-heading mt-6">
                SEO &
                <span className="page-main-heading-accent block">
                  Marketing
                </span>
              </h1>
              <p className="mt-5 max-w-[38rem] text-[17px] font-medium leading-8 text-[color:var(--muted-foreground)]">
                Practical SEO and marketing that drives measurable growth.
              </p>
              <p className="mt-4 max-w-[40rem] text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                We improve search visibility, traffic quality and conversions
                with clear strategy, technical SEO, analytics and practical
                digital campaigns tailored to your business goals.
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

              <div className="mt-8 flex flex-nowrap items-center gap-2 sm:flex-wrap sm:gap-4">
                <a
                  href="/contact#contact-form"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.9rem] bg-[color:var(--cta-dark)] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)] sm:gap-3 sm:px-7 sm:py-4 sm:text-[15px]"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.9rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-4 py-3 text-[12px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] dark:shadow-none sm:gap-3 sm:px-7 sm:py-4 sm:text-[15px]"
                >
                  View Our Work
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>

            <SeoMarketingBanner />
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
              <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Complete SEO & Marketing Solutions</ServiceGradientHeading>
            </div>
            <p className="max-w-[42rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)] lg:justify-self-end">
              We provide end-to-end SEO and marketing services to help your
              business attract qualified traffic and turn visitors into leads.
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
            <ServiceGradientHeading className="mt-3 max-w-[26rem] text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.25rem]">Marketing That Ranks, Converts & Scales</ServiceGradientHeading>
            <p className="mt-4 max-w-[29rem] text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
              We combine search data, content, analytics and campaign strategy
              to deliver growth work that is practical and measurable.
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
              A clear, transparent process to deliver focused growth work, on
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
              <ServiceGradientHeading className="mt-3 max-w-[34rem] text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Modern Technologies for Powerful Marketing</ServiceGradientHeading>
            </div>
            <p className="max-w-[40rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)]">
              We use industry-leading tools to research, measure and improve
              your SEO and marketing performance.
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
              Choose the perfect SEO and marketing package based on your
              business goals. From foundation setup to advanced growth
              campaigns, we have you covered.
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
                    href="/contact#contact-form"
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
                href="/contact#contact-form"
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
