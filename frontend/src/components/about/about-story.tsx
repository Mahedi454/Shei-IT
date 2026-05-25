"use client";

import Image from "next/image";
import { Compass, Eye, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { ourStoryBannerDark, ourStoryBannerLight } from "@/assets";
import { useTheme } from "@/components/providers/theme-provider";

const storyCards = [
  {
    title: "Our Mission",
    description: "Build digital solutions that actually solve business problems.",
    icon: Compass,
    accent: "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    title: "Our Vision",
    description: "Become a trusted digital partner for modern businesses worldwide.",
    icon: Eye,
    accent: "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
  {
    title: "Our Values",
    description: "Clarity, quality, honesty, speed, and long-term support.",
    icon: ShieldCheck,
    accent: "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  },
] as const;

export function AboutStorySection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark"
    ? ourStoryBannerDark
    : ourStoryBannerLight;

  return (
    <section id="our-story" className="relative pb-16 lg:pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] xl:gap-12">
          <div className="relative hidden pb-8 pl-4 sm:pb-12 sm:pl-8 xl:block">
            <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/50 bg-[color:var(--card)] shadow-[0_28px_80px_rgba(15,23,42,0.1)] dark:border-white/10">
              <Image
                src={bannerImage}
                alt="About story illustration"
                priority
                quality={85}
                sizes="(min-width: 1280px) 680px, (min-width: 1024px) 48vw, 92vw"
                className="relative z-10 h-[280px] w-full rounded-[2rem] object-cover sm:h-[420px] xl:h-[540px]"
              />
            </div>

            <div className="absolute bottom-0 left-0 z-20 rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-4 text-center shadow-[0_24px_60px_rgba(108,99,255,0.14)] backdrop-blur-2xl dark:shadow-[var(--shadow-soft)] sm:rounded-[1.8rem] sm:px-7 sm:py-6">
              <p className="text-[1.6rem] font-semibold text-[color:var(--primary)] sm:text-[2rem]">3+</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)] sm:text-[12px] sm:tracking-[0.26em]">Years Experience</p>
            </div>
          </div>

          <div className="max-w-[42rem]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">
              Our Story
            </p>
            <h2 className="mt-4 text-[2.05rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.6rem] xl:text-[3.4rem]">
              Why{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                We Started
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              We noticed that many businesses struggle because they get solutions they don&apos;t need, or systems that don&apos;t fit their actual goals. shei-it exists to change that. We build only what you need, nothing more and nothing less.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 xl:mt-10 xl:gap-5">
              {storyCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.25rem] border border-[color:var(--stat-border)] bg-transparent p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:bg-transparent dark:shadow-none xl:rounded-[2rem] xl:p-6"
                  >
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-[1.4rem] ${card.accent}`}>
                      <Icon className="h-6 w-6" strokeWidth={2.1} />
                    </span>
                    <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
