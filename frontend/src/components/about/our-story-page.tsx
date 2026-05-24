"use client";

import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Compass,
  Handshake,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ourStoryBannerDark, ourStoryBannerLight } from "@/assets";
import { SiteHeader } from "@/components/layout/site-header";
import { useTheme } from "@/components/providers/theme-provider";
import { ServicesCtaSection } from "@/components/services/services-cta";

const storyStats = [
  { value: "25+", label: "Projects delivered" },
  { value: "3+", label: "Years in delivery" },
  { value: "98%", label: "Client satisfaction" },
] as const;

const timeline = [
  {
    year: "2024",
    title: "Started With Practical Client Work",
    description:
      "Shei IT began by helping small teams fix the basics: clearer websites, faster pages, better communication, and systems that were easier to maintain.",
  },
  {
    year: "2025",
    title: "Moved Toward Full Product Delivery",
    description:
      "As client needs grew, we expanded beyond single pages into apps, dashboards, SEO foundations, hosting support, and long-term product improvements.",
  },
  {
    year: "Now",
    title: "Focused On Reliable Digital Growth",
    description:
      "Today we work as a careful technical partner for businesses that need clean design, dependable development, and honest guidance before every build.",
  },
] as const;

const principles = [
  {
    title: "We Start With The Business Case",
    description:
      "Before design or development begins, we clarify what the work should improve: leads, operations, speed, visibility, trust, or customer experience.",
    icon: Compass,
  },
  {
    title: "We Keep The Build Maintainable",
    description:
      "A good launch should not become a maintenance problem. We choose clean structure, practical tools, and documentation where it matters.",
    icon: Code2,
  },
  {
    title: "We Communicate In Plain Language",
    description:
      "Clients should understand what is happening, what is blocked, and why a decision matters without needing to translate technical noise.",
    icon: Handshake,
  },
  {
    title: "We Support After Launch",
    description:
      "Real products change after they meet real users. We stay available for improvements, fixes, monitoring, and the next version.",
    icon: ShieldCheck,
  },
] as const;

const deliveryNotes = [
  "Clear scope before work begins",
  "Modern interface design with practical UX decisions",
  "Responsive frontend and scalable backend development",
  "SEO, analytics, and performance considered from the start",
  "Hosting, deployment, and support handled with care",
] as const;

export function OurStoryPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark" ? ourStoryBannerDark : ourStoryBannerLight;

  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />

      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-20 lg:pt-24">
        <div className="mx-auto grid w-11/12 max-w-[1440px] items-center gap-10 md:grid-cols-[0.92fr_1.08fr] xl:gap-12">
          <div className="max-w-[40rem]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.25em] text-[color:var(--muted-foreground)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:border-white/10">
              <BriefcaseBusiness className="h-4 w-4 text-[color:var(--orange)]" />
              Our story
            </div>

            <h1 className="page-main-heading mt-8">
              Built For Teams Who Need
              <span className="page-main-heading-accent block">Practical Digital Progress</span>
            </h1>

            <p className="mt-6 max-w-[36rem] text-[16px] leading-8 text-[color:var(--muted-foreground)] sm:text-[17px]">
              Shei IT was created for businesses that want dependable digital work without confusion, inflated scope, or short-term thinking. We build websites, apps, SEO systems, and support workflows around what a business actually needs to move forward.
            </p>

            <div className="mt-9 flex flex-nowrap items-center gap-2 sm:flex-wrap sm:gap-4">
              <a
                href="/contact#contact-form"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--cta-dark)] px-3 py-3 text-[11px] font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:gap-3 sm:px-7 sm:py-4 sm:text-[15px]"
              >
                Start A Project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-3 py-3 text-[11px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] sm:gap-3 sm:px-7 sm:py-4 sm:text-[15px]"
              >
                Back To About
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {storyStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-4 shadow-[0_18px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
                >
                  <p className="text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--primary)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[12px] font-medium text-[color:var(--muted-foreground)]">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-[color:var(--card)] shadow-[0_28px_80px_rgba(15,23,42,0.1)] dark:border-white/10">
              <Image
                src={bannerImage}
                alt="Shei IT team story illustration"
                priority
                quality={85}
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 52vw, 92vw"
                className="h-[420px] w-full object-cover sm:h-[560px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="max-w-[34rem]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.26em] text-[color:var(--primary)]">
              Why we exist
            </p>
            <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[3.05rem]">
              We Saw Too Many Projects Miss The{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                Real Problem
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              Many businesses do not fail online because they lack ambition. They struggle because the work around them is fragmented: one person designs, another develops, someone else handles SEO, and nobody owns the full outcome.
            </p>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              Our role is to bring those pieces together with clear thinking. We help clients understand what should be built now, what can wait, and how each decision affects the business after launch.
            </p>
          </div>

          <div className="grid gap-5">
            {timeline.map((item) => (
              <article
                key={item.title}
                className="grid gap-5 rounded-[1.25rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[0_18px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:grid-cols-[112px_1fr] dark:shadow-none"
              >
                <div className="flex h-16 w-24 items-center justify-center rounded-[1rem] bg-[color:var(--button-secondary-icon)] text-[1rem] font-bold text-[color:var(--primary)]">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="max-w-[44rem]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.26em] text-[color:var(--primary)]">
              How we think
            </p>
            <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[3.05rem]">
              Principles That Shape{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                Every Project
              </span>
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-[1.25rem] border border-[color:var(--stat-border)] bg-transparent p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                    <Icon className="h-6 w-6" strokeWidth={2.1} />
                  </span>
                  <h3 className="mt-5 text-[1.25rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-10 rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">
              What Clients Can Expect{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                From Us
              </span>
            </h2>
            <p className="mt-4 max-w-[38rem] text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              We prefer careful execution over noise. That means fewer surprises, cleaner handover, and decisions that make sense for the next stage of your business.
            </p>
          </div>

          <div className="grid gap-3">
            {deliveryNotes.map((note) => (
              <div
                key={note}
                className="flex items-start gap-3 rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-4 py-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--mint)]" />
                <span className="text-[14px] font-medium leading-7 text-[color:var(--foreground)]">
                  {note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesCtaSection
        title={
          <>
            Bring Us The Problem.
            <span className="block">We&apos;ll Shape The Right Solution.</span>
          </>
        }
        description="Share your goal with us. We'll help you decide what to build, what to improve, and what can wait."
        buttonLabel="Talk To Us"
      />
    </main>
  );
}
