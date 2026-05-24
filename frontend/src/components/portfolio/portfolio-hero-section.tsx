 "use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

import portfolioHeroDark from "@/assets/portfolio-hero-dark.png";
import portfolioHeroLight from "@/assets/portfolio-hero-light.png";
import { useTheme } from "@/components/providers/theme-provider";
import { portfolioSection } from "@/config/site";

export function PortfolioHeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroAsset =
    mounted && resolvedTheme === "dark" ? portfolioHeroDark : portfolioHeroLight;

  return (
    <section className="relative pb-16 pt-8 lg:pb-20">
      <div className="mx-auto grid w-11/12 max-w-[1440px] items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-3 py-1.5 text-[12px] font-medium text-[color:var(--muted-foreground)]">
            <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--primary)]" />
            {portfolioSection.badge}
          </span>

          <h1 className="page-main-heading mt-5 max-w-[13ch]">
            Digital Products Designed to{" "}
            <span className="page-main-heading-accent">
              {portfolioSection.highlight}
            </span>
          </h1>

          <p className="mt-4 max-w-[52ch] text-[16px] leading-8 text-[color:var(--muted-foreground)]">
            {portfolioSection.description}
          </p>
        </div>

        <div className="relative hidden md:block">
          <Image
            src={heroAsset}
            alt="Portfolio showcase hero"
            quality={85}
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 50vw, 92vw"
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
