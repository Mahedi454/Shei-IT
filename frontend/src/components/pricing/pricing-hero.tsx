"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { pricingBannerDark, pricingBannerLight } from "@/assets";
import { useTheme } from "@/components/providers/theme-provider";

export function PricingHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark"
    ? pricingBannerDark
    : pricingBannerLight;

  return (
    <section className="relative overflow-hidden pb-12 pt-14 lg:pb-16 lg:pt-18">
      <div className="relative mx-auto grid w-11/12 max-w-[1440px] items-center gap-12 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="max-w-[44rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--muted-foreground)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
            <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--primary)]" />
            Simple, Transparent Pricing
          </div>

          <div className="mt-7 space-y-5">
            <h1 className="text-[3rem] font-semibold leading-[0.98] tracking-[-0.07em] text-[color:var(--foreground)] sm:text-[4rem] lg:text-[4.5rem] xl:text-[4.85rem]">
              <span className="block">Plans That Fit</span>
              <span className="block">
                Your{" "}
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  Business
                </span>
              </span>
            </h1>
            <p className="max-w-[37rem] text-[15px] leading-8 text-[color:var(--muted-foreground)] sm:text-[16px]">
              Choose the right plan for your project. Need something custom?
              <br />
              We&apos;re here to help.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-[0.75rem] bg-[color:var(--cta-dark)] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)]"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-[0.75rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-6 py-3.5 text-[14px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] dark:shadow-none"
            >
              Contact Us
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
          <div className="relative w-full max-w-[820px]">
            <Image
              src={bannerImage}
              alt="Pricing plans overview"
              priority
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
