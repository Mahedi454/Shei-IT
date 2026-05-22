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
  Crown,
  Headphones,
  Layers,
  Lightbulb,
  LockKeyhole,
  MonitorSmartphone,
  MousePointerClick,
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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import illustratorIcon from "@/assets/ui-ux images/adobe-illustrator-svgrepo-com.svg";
import photoshopIcon from "@/assets/ui-ux images/adobe-photoshop-svgrepo-com.svg";
import adobeXdIcon from "@/assets/ui-ux images/adobe-xd-svgrepo-com.svg";
import ctaImage from "@/assets/cta-image.png";
import figmaIcon from "@/assets/ui-ux images/figma-svgrepo-com.svg";
import framerIcon from "@/assets/ui-ux images/framer-svgrepo-com.svg";
import sketchIcon from "@/assets/ui-ux images/sketch-svgrepo-com.svg";
import uiUxBannerDark from "@/assets/UI-UX-Banner-Dark.png";
import uiUxBannerLight from "@/assets/UI-UX-Banner-Light.png";
import { SiteHeader } from "@/components/layout/site-header";
import { useTheme } from "@/components/providers/theme-provider";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";

const stats = [
  { value: "1+", label: "Work Experience", icon: BadgeCheck },
  { value: "8+", label: "Designs Created", icon: MonitorSmartphone },
  { value: "95%", label: "Client Satisfaction", icon: Sparkles },
  { value: "24/7", label: "Support", icon: Headphones },
] as const;

const offers = [
  {
    title: "UI/UX Design",
    description:
      "Clean, modern interfaces designed around real users and business goals.",
    icon: Brush,
    accent: "violet",
  },
  {
    title: "Wireframes & Prototypes",
    description:
      "Interactive flows and layouts that make ideas easy to test before build.",
    icon: MousePointerClick,
    accent: "violet",
  },
  {
    title: "Mobile & Web App Design",
    description:
      "Responsive product screens for websites, dashboards and mobile apps.",
    icon: MonitorSmartphone,
    accent: "violet",
  },
  {
    title: "Design Systems",
    description:
      "Reusable components, styles and guidelines for consistent products.",
    icon: Layers,
    accent: "mint",
  },
  {
    title: "UX Audit & Redesign",
    description:
      "Improve existing interfaces for clarity, trust and better conversion.",
    icon: RefreshCw,
    accent: "violet",
  },
] as const;

const reasons = [
  {
    title: "User-Centered",
    description: "Every screen is shaped around what users need to do next.",
    icon: Search,
  },
  {
    title: "Clear Interaction",
    description: "Flows, controls and layouts designed to reduce confusion.",
    icon: Timer,
  },
  {
    title: "Brand Consistent",
    description:
      "Visual systems that feel polished and aligned with your brand.",
    icon: Sparkles,
  },
  {
    title: "Conversion Focused",
    description: "Designed to guide users toward meaningful business actions.",
    icon: Target,
  },
  {
    title: "Scalable Systems",
    description: "Reusable components that make future product work easier.",
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
    title: "Research & Discovery",
    description: "We understand your users, goals, problems and product scope.",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "Design & Prototyping",
    description: "Wireframes, visual designs and clickable prototypes.",
    icon: Brush,
    accent: "violet",
  },
  {
    title: "Design System",
    description: "Reusable components, styles and interaction patterns.",
    icon: Layers,
    accent: "violet",
  },
  {
    title: "Review & Testing",
    description: "Feedback, usability review and design refinement.",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "Handoff & Support",
    description: "Developer-ready files, notes and ongoing design support.",
    icon: Rocket,
    accent: "violet",
  },
] as const;

const technologies = [
  { label: "Figma", icon: figmaIcon },
  { label: "Adobe XD", icon: adobeXdIcon },
  { label: "Photoshop", icon: photoshopIcon },
  { label: "Illustrator", icon: illustratorIcon },
  { label: "Framer", icon: framerIcon },
  { label: "Sketch", icon: sketchIcon },
] as const;

const pricingPackages = [
  {
    name: "Starter Design",
    description: "Best for landing pages, simple apps and early ideas.",
    price: "$149",
    note: "Starter UI/UX package",
    timeline: "5 - 7 days",
    action: "Get Started",
    icon: Send,
    accent: "violet",
    popular: false,
    features: [
      "Up to 5 Screens",
      "Basic Wireframes",
      "Modern UI Design",
      "Responsive Layout",
      "Clickable Prototype",
      "Design Handoff",
      "1 Revision Round",
      "1 Month Support",
    ],
  },
  {
    name: "Business Design",
    description: "Ideal for growing websites, apps and digital products.",
    price: "$349",
    note: "Business UI/UX package",
    timeline: "10 - 14 days",
    action: "Choose Plan",
    icon: BriefcaseBusiness,
    accent: "featured",
    popular: true,
    features: [
      "Up to 12 Screens",
      "Custom UI/UX Design",
      "User Flow Mapping",
      "Clickable Prototype",
      "Responsive Design",
      "Component Library",
      "Design System Basics",
      "Developer Handoff",
      "2 Revision Rounds",
      "3 Months Support",
    ],
  },
  {
    name: "Pro Design",
    description:
      "Perfect for SaaS, dashboards and conversion-focused products.",
    price: "$699",
    note: "Advanced UI/UX package",
    timeline: "2 - 4 weeks",
    action: "Design Product",
    icon: ShoppingCart,
    accent: "orange",
    popular: false,
    features: [
      "Up to 25 Screens",
      "Advanced UX Flows",
      "Dashboard Design",
      "Interactive Prototype",
      "Full Design System",
      "Usability Review",
      "Developer Documentation",
      "3 Revision Rounds",
      "6 Months Support",
    ],
  },
  {
    name: "Custom Design",
    description: "For complex products, full design systems and redesigns.",
    price: "Custom",
    note: "Custom project scope",
    timeline: "Depends on scope",
    action: "Book Consultation",
    icon: Box,
    accent: "blue",
    popular: false,
    features: [
      "Requirement Analysis",
      "Product UX Strategy",
      "Custom Design System",
      "Complex User Flows",
      "Multi-Platform Design",
      "Usability Testing Plan",
      "Design QA",
      "Team Handoff",
      "Ongoing Design Support",
    ],
  },
] as const;

const faqs = [
  {
    question: "How fast can you design my product?",
    answer:
      "Starter designs usually take 5 to 7 days, business projects take 10 to 14 days, and complex products depend on scope.",
  },
  {
    question: "What information do you need to start?",
    answer:
      "We need your product goals, page or screen list, brand assets, content, reference designs, and any existing user feedback.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Every package includes support, and we can also provide ongoing design improvements, new screens and design QA.",
  },
  {
    question: "Do you provide developer handoff?",
    answer:
      "Yes. We prepare organized design files, assets, style notes and handoff details so developers can build accurately.",
  },
  {
    question: "Can I schedule a call before starting?",
    answer:
      "Yes. You can book a consultation so we can understand your design goals and recommend the right package.",
  },
] as const;

function UiUxBanner() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage =
    mounted && theme === "dark" ? uiUxBannerDark : uiUxBannerLight;

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
      <div className="relative w-full max-w-[760px]">
        <Image
          src={bannerImage}
          alt="UI/UX design banner"
          priority
          quality={90}
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 92vw"
          className="relative z-10 h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function UiUxDesignPage() {
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
            <span className="text-[color:var(--foreground)]">UI/UX Design</span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="max-w-[44rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--primary)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
                <Sparkles className="h-3.5 w-3.5 fill-[color:var(--primary)]" />
                Our Services
              </div>

              <h1 className="mt-6 text-[3rem] font-semibold leading-[1.04] tracking-[-0.07em] text-[color:var(--foreground)] sm:text-[4rem] lg:text-[4.5rem]">
                UI/UX
                <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  Design
                </span>
              </h1>
              <p className="mt-5 max-w-[38rem] text-[17px] font-medium leading-8 text-[color:var(--muted-foreground)]">
                Clean, modern product design that users understand quickly.
              </p>
              <p className="mt-4 max-w-[40rem] text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                We design polished websites, apps and dashboards that feel
                intuitive, trustworthy and tailored to your business goals. From
                first wireframes to developer handoff, we have you covered.
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

            <UiUxBanner />
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
              <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Complete UI/UX Design Solutions</ServiceGradientHeading>
            </div>
            <p className="max-w-[42rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)] lg:justify-self-end">
              We provide end-to-end design services to help your product look
              polished, feel clear and guide users naturally.
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
            <ServiceGradientHeading className="mt-3 max-w-[26rem] text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.25rem]">Designs That Guide, Convert & Scale</ServiceGradientHeading>
            <p className="mt-4 max-w-[29rem] text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
              We combine research, visual design and interaction strategy to
              create interfaces that are beautiful, usable and business-focused.
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
              A clear, transparent process to deliver polished design work, on
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
              <ServiceGradientHeading className="mt-3 max-w-[34rem] text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Modern Technologies for Powerful Design</ServiceGradientHeading>
            </div>
            <p className="max-w-[40rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)]">
              We use industry-leading design tools to plan, prototype and hand
              off polished digital experiences.
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
              Choose the perfect design package based on your business goals.
              From simple screens to complete product design systems, we have
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
