"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { servicepageBannerDark, servicepageBannerLight } from "@/assets";
import { useTheme } from "@/components/providers/theme-provider";

const clientAvatars = ["MH", "SA", "PM", "RA", "NJ"] as const;
const avatarColors = [
  "from-[#6c63ff] to-[#5daeff]",
  "from-[#ff9f5a] to-[#ffb98a]",
  "from-[#6fe7c8] to-[#5daeff]",
  "from-[#8b7cff] to-[#d8b4fe]",
  "from-[#111827] to-[#64748b]",
] as const;

export function ServicesHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerImage = mounted && theme === "dark"
    ? servicepageBannerDark
    : servicepageBannerLight;

  return (
    <section className="relative overflow-hidden pb-10 pt-10 lg:pb-12 lg:pt-12">
      <div className="relative mx-auto grid w-11/12 max-w-[1440px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="max-w-[42rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[color:var(--hero-pill)] px-4 py-2 text-[12px] font-semibold text-[color:var(--muted-foreground)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10">
            <Star className="h-3.5 w-3.5 fill-[color:var(--orange)] text-[color:var(--orange)]" />
            Complete Digital Services
          </div>

          <div className="mt-8 space-y-6">
            <h1 className="page-main-heading">
              <span className="block whitespace-nowrap">Digital Services Built</span>
              <span className="block whitespace-nowrap">Around Your</span>
              <span className="page-main-heading-accent block whitespace-nowrap">
                Business Needs
              </span>
            </h1>
            <p className="max-w-[35rem] text-[16px] leading-9 text-[color:var(--muted-foreground)] sm:text-[17px]">
              Choose only what you need — website, app, hosting, SEO,
              maintenance, or a complete digital system.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="/contact#contact-form"
              className="inline-flex items-center justify-center gap-3 rounded-[0.9rem] bg-[color:var(--cta-dark)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)]"
            >
              Discuss Your Project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-3 rounded-[0.9rem] border border-[color:var(--button-border)] bg-[color:var(--button-secondary)] px-7 py-4 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_32px_rgba(15,23,42,0.06)] dark:shadow-none"
            >
              View Services
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              {clientAvatars.map((avatar, index) => (
                <span
                  key={avatar}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-[color:var(--avatar-ring)] bg-gradient-to-br ${avatarColors[index]} text-[10px] font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]`}
                >
                  {avatar}
                </span>
              ))}
            </div>

            <div className="space-y-0.5">
              <p className="text-[15px] font-semibold text-[color:var(--primary)]">
                200+ Happy Clients
              </p>
              <p className="text-[13px] text-[color:var(--muted-foreground)]">
                Trusted by businesses worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--purple-glow)] blur-[120px]" />
          <div className="relative w-full max-w-[820px]">
            <Image
              src={bannerImage}
              alt="Digital services workflow"
              priority
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
