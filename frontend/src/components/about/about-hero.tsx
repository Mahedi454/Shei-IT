"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { aboutpageBannerDark, aboutpageBannerLight } from "@/assets";
import { useTheme } from "@/components/providers/theme-provider";

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
      <div className="relative mx-auto grid w-11/12 max-w-[1440px] items-center gap-10 md:grid-cols-[0.95fr_1.05fr] xl:gap-12">
        <div className="max-w-[36rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.25em] text-[color:var(--muted-foreground)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:border-white/10">
            <Sparkles className="h-4 w-4 text-[color:var(--orange)]" />
            About shei-it
          </div>

          <div className="mt-8 space-y-6">
            <h1 className="page-main-heading">
              SHEI IT,
              <span className="page-main-heading-accent block">Built Around Your Needs</span>
            </h1>
            <p className="max-w-[34rem] text-[16px] leading-8 text-[color:var(--muted-foreground)] sm:text-[17px]">
              We help businesses build modern websites, mobile apps, hosting solutions, SEO foundations, and long-term digital support. Everything we build is made to solve real problems.
            </p>
          </div>

          <div className="mt-10 flex flex-nowrap items-center gap-2 sm:flex-wrap sm:gap-4">
            <a
              href="/about/our-story"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--cta-dark)] px-3 py-3 text-[11px] font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:gap-3 sm:px-7 sm:py-4 sm:text-[15px]"
            >
              Our Story
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact#contact-form"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-3 py-3 text-[11px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] sm:gap-3 sm:px-7 sm:py-4 sm:text-[15px]"
            >
              Let&apos;s Work Together
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <div className="absolute -left-12 top-0 h-[48%] w-[48%] rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
          <div className="relative w-full max-w-[740px]">
            <Image
              src={bannerImage}
              alt="About page hero illustration"
              priority
              quality={85}
              sizes="(min-width: 1280px) 740px, (min-width: 1024px) 52vw, 92vw"
              className="relative z-10 w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
