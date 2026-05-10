"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { aboutpageBannerDark, aboutpageBannerLight } from "@/assets";

export function AboutHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark"
    ? aboutpageBannerDark
    : aboutpageBannerLight;

  return (
    <section className="relative overflow-hidden pb-14 pt-20 lg:pb-18 lg:pt-24">
      <div className="relative mx-auto grid w-11/12 max-w-[1440px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-[36rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.25em] text-[color:var(--muted-foreground)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:border-white/10">
            <Sparkles className="h-4 w-4 text-[color:var(--orange)]" />
            About shei-it
          </div>

          <div className="mt-8 space-y-6">
            <h1 className="text-[3rem] font-semibold leading-[0.95] tracking-[-0.07em] text-[color:var(--foreground)] sm:text-[4rem] lg:text-[5rem]">
              SHEI IT,
              <span className="block text-[color:var(--primary)]">Built Around Your Needs</span>
            </h1>
            <p className="max-w-[34rem] text-[16px] leading-8 text-[color:var(--muted-foreground)] sm:text-[17px]">
              We help businesses build modern websites, mobile apps, hosting solutions, SEO foundations, and long-term digital support. Everything we build is made to solve real problems.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#our-story"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--cta-dark)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
            >
              Our Story
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-7 py-4 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)]"
            >
              Let&apos;s Work Together
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute -left-12 top-0 h-[48%] w-[48%] rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
          <div className="relative w-full max-w-[740px]">
            <Image
              src={bannerImage}
              alt="About page hero illustration"
              priority
              className="relative z-10 w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
