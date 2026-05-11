"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { contactpageBannerDark, contactpageBannerLight } from "@/assets";

const trustItems = [
  {
    title: "Fast Response",
    description: "Within 24 Hours",
    icon: Clock3,
    accent:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
  {
    title: "Expert Guidance",
    description: "From Our Team",
    icon: UserRound,
    accent:
      "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  },
  {
    title: "Secure & Private",
    description: "Your Information",
    icon: ShieldCheck,
    accent:
      "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  },
] as const;

export function ContactHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage =
    mounted && theme === "dark" ? contactpageBannerDark : contactpageBannerLight;

  return (
    <section className="relative overflow-hidden pb-14 pt-14 lg:pb-18 lg:pt-18">
      <div className="relative mx-auto grid w-11/12 max-w-[1440px] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="max-w-[45rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--muted-foreground)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
            <MessageCircle className="h-3.5 w-3.5 fill-[color:var(--primary)]/20 text-[color:var(--primary)]" />
            Let&apos;s Talk
          </div>

          <div className="mt-7 space-y-5">
            <h1 className="text-[2.85rem] font-semibold leading-[1.08] tracking-[-0.07em] text-[color:var(--foreground)] sm:text-[3.8rem] lg:text-[4.45rem] xl:text-[4.75rem]">
              <span className="block">Tell Us What You Need.</span>
              <span className="block">
                We&apos;ll Build the{" "}
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  Right Solution.
                </span>
              </span>
            </h1>
            <p className="max-w-[40rem] text-[15px] leading-8 text-[color:var(--muted-foreground)] sm:text-[16px]">
              Whether you need a website, app, hosting, SEO, or maintenance,
              share your idea and we&apos;ll guide you with the best next step.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="mailto:sheiitofficial@gmail.com"
              className="inline-flex items-center justify-center gap-3 rounded-[0.75rem] bg-[color:var(--cta-dark)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+8801768857058"
              className="inline-flex items-center justify-center gap-3 rounded-[0.75rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-7 py-4 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] dark:shadow-none"
            >
              Book a Call
              <CalendarDays className="h-4 w-4 text-[color:var(--primary)]" />
            </a>
          </div>

          <div className="mt-12 grid max-w-[42rem] gap-4 sm:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.accent}`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold text-[color:var(--foreground)]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-medium text-[color:var(--muted-foreground)]">
                      {item.description}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
          <div className="relative w-full max-w-[820px]">
            <Image
              src={bannerImage}
              alt="Contact project inquiry dashboard"
              priority
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
