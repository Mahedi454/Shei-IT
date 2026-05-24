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
  Lightbulb,
  LockKeyhole,
  Layers,
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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import capacitorIcon from "@/assets/cross platform dev images/capacitor-svgrepo-com.svg";
import crossBannerDark from "@/assets/Cross-banner-dark.png";
import crossBannerLight from "@/assets/Cross-banner-light.png";
import ctaImage from "@/assets/cta-image.png";
import dartIcon from "@/assets/cross platform dev images/dart.svg";
import dockerIcon from "@/assets/cross platform dev images/docker2-svgrepo-com.svg";
import expoIcon from "@/assets/cross platform dev images/expo-icon-svgrepo-com.svg";
import firebaseIcon from "@/assets/cross platform dev images/firebase-svgrepo-com.svg";
import flutterIcon from "@/assets/cross platform dev images/flutter-svgrepo-com.svg";
import ionicIcon from "@/assets/cross platform dev images/ionic-icon-svgrepo-com.svg";
import javascriptIcon from "@/assets/cross platform dev images/javascript-svgrepo-com.svg";
import reactIcon from "@/assets/cross platform dev images/react-svgrepo-com.svg";
import typescriptIcon from "@/assets/cross platform dev images/typescript-official-svgrepo-com.svg";
import { SiteHeader } from "@/components/layout/site-header";
import { useTheme } from "@/components/providers/theme-provider";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";

const stats = [
  { value: "3+", label: "Work Experience", icon: BadgeCheck },
  { value: "14+", label: "Products Built", icon: MonitorSmartphone },
  { value: "98%", label: "Client Satisfaction", icon: Sparkles },
  { value: "24/7", label: "Support", icon: Headphones },
] as const;

const offers = [
  {
    title: "Cross-Platform App Development",
    description:
      "Build one product that works smoothly across mobile, web and desktop.",
    icon: Layers,
    accent: "violet",
  },
  {
    title: "Shared Codebase Architecture",
    description:
      "Reusable logic, components and workflows to reduce build time and cost.",
    icon: Code2,
    accent: "violet",
  },
  {
    title: "Mobile & Web UI/UX",
    description:
      "Consistent interfaces designed to feel native on every platform.",
    icon: Brush,
    accent: "violet",
  },
  {
    title: "API & Cloud Integration",
    description:
      "Authentication, backend APIs, real-time data and cloud services connected.",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "Platform Migration & Optimization",
    description:
      "Modernize existing apps into a unified, faster cross-platform product.",
    icon: RefreshCw,
    accent: "violet",
  },
] as const;

const reasons = [
  {
    title: "Multi-Platform Ready",
    description:
      "Prepared for Android, iOS, web and desktop delivery from one plan.",
    icon: Layers,
  },
  {
    title: "Fast Performance",
    description: "Optimized for responsive screens and smooth interactions.",
    icon: Timer,
  },
  {
    title: "Secure & Reliable",
    description: "Strong security and regular updates for peace of mind.",
    icon: LockKeyhole,
  },
  {
    title: "User Focused",
    description: "Designed around consistent user journeys across devices.",
    icon: Target,
  },
  {
    title: "Scalable Codebase",
    description: "Shared architecture that grows without duplicating effort.",
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
    title: "Discovery & Strategy",
    description: "We define your users, platforms, features and release plan.",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "Design & Prototyping",
    description: "Unified UI/UX flows for mobile, web and desktop experiences.",
    icon: Brush,
    accent: "violet",
  },
  {
    title: "Cross-Platform Build",
    description: "Clean shared-code development with platform-specific polish.",
    icon: Code2,
    accent: "violet",
  },
  {
    title: "Testing & QA",
    description: "Thorough testing for bugs, speed, and security.",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "Launch & Support",
    description: "On-time launch and ongoing maintenance.",
    icon: Rocket,
    accent: "violet",
  },
] as const;

const technologies = [
  { label: "Flutter", icon: flutterIcon },
  { label: "Dart", icon: dartIcon },
  { label: "React Native", icon: reactIcon },
  { label: "Expo", icon: expoIcon },
  { label: "Ionic", icon: ionicIcon },
  { label: "Capacitor", icon: capacitorIcon },
  { label: "TypeScript", icon: typescriptIcon },
  { label: "JavaScript", icon: javascriptIcon },
  { label: "Firebase", icon: firebaseIcon },
  { label: "Docker", icon: dockerIcon },
] as const;

const pricingPackages = [
  {
    name: "Starter Cross-Platform",
    description: "Best for MVPs and simple multi-platform products.",
    price: "$399",
    note: "Starter cross-platform package",
    timeline: "2 - 3 weeks",
    action: "Get Started",
    icon: Send,
    accent: "violet",
    popular: false,
    features: [
      "Up to 6 Screens",
      "Android & iOS Build",
      "Responsive UI Design",
      "Shared Codebase Setup",
      "Basic Authentication",
      "API Integration",
      "App Testing",
      "1 Month Support",
    ],
  },
  {
    name: "Business Cross-Platform",
    description: "Ideal for growing teams that need mobile and web support.",
    price: "$899",
    note: "Business cross-platform package",
    timeline: "4 - 6 weeks",
    action: "Choose Plan",
    icon: BriefcaseBusiness,
    accent: "featured",
    popular: true,
    features: [
      "Up to 14 Screens",
      "Android, iOS & Web",
      "Custom UI/UX Design",
      "Reusable Component System",
      "User Authentication",
      "Admin Dashboard",
      "Analytics Integration",
      "Security Optimization",
      "Performance Optimization",
      "3 Months Support",
    ],
  },
  {
    name: "Pro Cross-Platform",
    description: "Perfect for SaaS, marketplace and real-time products.",
    price: "$1,699",
    note: "Advanced cross-platform package",
    timeline: "8 - 12 weeks",
    action: "Launch Product",
    icon: Layers,
    accent: "orange",
    popular: false,
    features: [
      "Advanced App Features",
      "Payment Gateway",
      "Real-Time Database",
      "User Dashboard",
      "Role-Based Access",
      "Push Notifications",
      "Platform-Specific Polish",
      "Advanced Analytics",
      "6 Months Support",
    ],
  },
  {
    name: "Custom Platform",
    description: "For complex ecosystems across mobile, web and desktop.",
    price: "Custom",
    note: "Custom project scope",
    timeline: "Depends on scope",
    action: "Book Consultation",
    icon: Box,
    accent: "blue",
    popular: false,
    features: [
      "Requirement Analysis",
      "Custom Platform Architecture",
      "Advanced API Integration",
      "Database Architecture",
      "Authentication System",
      "Admin Panel",
      "Scalability Planning",
      "Maintenance Plan",
    ],
  },
] as const;

const faqs = [
  {
    question: "How fast can you build my cross-platform product?",
    answer:
      "Starter cross-platform products usually take 2 to 3 weeks, business products take 4 to 6 weeks, and larger platforms depend on scope.",
  },
  {
    question: "What information do you need to start?",
    answer:
      "We need your business goals, target platforms, feature list, brand assets, reference products, and any required integrations.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Every package includes support, and we can also provide monthly maintenance for updates, backups, fixes, and improvements.",
  },
  {
    question: "Can one codebase support multiple platforms?",
    answer:
      "Yes. We use shared architecture where it makes sense, while still applying platform-specific polish for better user experience.",
  },
  {
    question: "Can I schedule a call before starting?",
    answer:
      "Yes. You can book a consultation so we can understand your platform goals and recommend the right package.",
  },
] as const;

function CrossPlatformBanner() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark" ? crossBannerDark : crossBannerLight;

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
      <div className="relative w-full max-w-[760px]">
        <Image
          src={bannerImage}
          alt="Cross-platform development service banner"
          priority
          quality={90}
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 92vw"
          className="relative z-10 h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function CrossPlatformDevelopmentPage() {
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
              Cross Platform Development
            </span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="max-w-[39rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--primary)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
                <Sparkles className="h-3.5 w-3.5 fill-[color:var(--primary)]" />
                Our Services
              </div>

              <h1 className="page-main-heading mt-6">
                Cross Platform
                <span className="page-main-heading-accent block">
                  Development
                </span>
              </h1>
              <p className="mt-5 max-w-[38rem] text-[17px] font-medium leading-8 text-[color:var(--muted-foreground)]">
                Modern, fast and scalable products for every platform.
              </p>
              <p className="mt-4 max-w-[40rem] text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                We build polished cross-platform apps that work across mobile,
                web and desktop while staying secure, scalable and aligned with
                your business goals.
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

            <CrossPlatformBanner />
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
              <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Complete Cross Platform Solutions</ServiceGradientHeading>
            </div>
            <p className="max-w-[42rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)] lg:justify-self-end">
              We provide end-to-end cross-platform development services to help
              your business reach users across devices with one cohesive
              product.
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
            <ServiceGradientHeading className="mt-3 max-w-[26rem] text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.25rem]">Products That Perform, Engage & Scale</ServiceGradientHeading>
            <p className="mt-4 max-w-[29rem] text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
              We combine design, technology, and strategy to deliver products
              that feel consistent across platforms and support business growth.
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
              A clear, transparent process to deliver outstanding products, on
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
              <ServiceGradientHeading className="mt-3 max-w-[34rem] text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">Modern Technologies for Powerful Platforms</ServiceGradientHeading>
            </div>
            <p className="max-w-[40rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)]">
              We use industry-leading technologies to build fast, secure, and
              future-ready cross-platform products.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-10">
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
              Choose the perfect cross-platform package based on your business
              goals. From MVPs to advanced platforms, we have you covered.
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
