"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Headset,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import { homepageBannerDark, homepageBannerLight } from "@/assets";
import { useTheme } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";

const avatarColors = [
  "from-[#7c8cff] to-[#6fe7c8]",
  "from-[#ffb98a] to-[#ff9f5a]",
  "from-[#8b7cff] to-[#d8b4fe]",
  "from-[#5daeff] to-[#93c5fd]",
  "from-[#6fe7c8] to-[#9fdcff]",
] as const;

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const statIcons = {
    briefcase: BriefcaseBusiness,
    badge: BadgeCheck,
    chart: ChartNoAxesColumnIncreasing,
    spark: Headset,
  } as const;

  const bannerImage = mounted && theme === "dark"
    ? homepageBannerDark
    : homepageBannerLight;

  return (
    <section className="relative pb-18 pt-2">
      <div className="w-full">
        <div className="relative overflow-hidden pb-7 pt-8 lg:pb-10 lg:pt-10">
          <div className="relative mx-auto grid w-11/12 max-w-[1440px] items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(620px,1.02fr)]">
            <div className="max-w-[38rem] pt-2 lg:pt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-medium text-[color:var(--muted-foreground)] shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/8">
                <Sparkles className="h-3.5 w-3.5 text-[color:var(--orange)]" />
                <span>{siteConfig.tagline}</span>
              </div>

              <div className="mt-7 space-y-6">
                <h1 className="text-[3rem] font-semibold leading-[0.95] tracking-[-0.08em] text-[color:var(--foreground)] sm:text-[4.35rem] lg:text-[5.4rem]">
                  <span className="block">We Build Digital</span>
                  <span className="block">Solutions That</span>
                  <span className="block bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                    Drive Real Growth
                  </span>
                </h1>

                <p className="max-w-[26rem] text-[16px] leading-9 text-[color:var(--muted-foreground)]">
                  {siteConfig.description}
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-full bg-[color:var(--cta-dark)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)]"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-full border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-7 py-4 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] dark:shadow-none"
                >
                  View Our Work
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>

              <div className="mt-9 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {avatarColors.map((color, index) => (
                    <span
                      key={color}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-[color:var(--avatar-ring)] bg-gradient-to-br ${color} text-[10px] font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]`}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <p className="text-[15px] font-semibold text-[color:var(--foreground)]">
                    200+ Happy Clients
                  </p>
                  <p className="text-[13px] text-[color:var(--muted-foreground)]">
                    Trusted by businesses worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[560px] items-center justify-center lg:min-h-[700px] lg:justify-end">
              <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[96px]" />
              <div className="relative w-full max-w-[760px]">
                <Image
                  src={bannerImage}
                  alt="shei-it service banner"
                  priority
                  quality={85}
                  sizes="(min-width: 1280px) 760px, (min-width: 1024px) 52vw, 92vw"
                  className="relative z-10 h-auto w-full"
                />
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-8 grid w-11/12 max-w-[1440px] gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siteConfig.stats.map((stat) => {
              const Icon = statIcons[stat.icon];

              return (
                <div
                  key={stat.label}
                  className="rounded-[1.9rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] dark:shadow-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="text-[2.15rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
                        {stat.value}
                      </p>
                      <p className="text-[15px] font-semibold text-[color:var(--foreground)]">
                        {stat.label}
                      </p>
                    </div>

                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--stat-icon-bg)] text-[color:var(--primary)]">
                      <Icon className="h-5 w-5" strokeWidth={2.1} />
                    </span>
                  </div>

                  <p className="mt-4 max-w-[18ch] text-[13px] leading-7 text-[color:var(--muted-foreground)]">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
