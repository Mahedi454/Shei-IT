import Image from "next/image";
import { ArrowRight } from "lucide-react";

import ctaImage from "@/assets/cta-image.png";
import { ctaSection } from "@/config/site";

export function CtaSection() {
  return (
    <section className="relative pb-24 pt-10">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--stat-border)] bg-[linear-gradient(120deg,#6c63ff_0%,#796dff_35%,#6f78ff_70%,#6d99ff_100%)] px-8 py-10 text-white shadow-[0_24px_60px_rgba(108,99,255,0.22)] sm:px-10 lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.32),transparent_26%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.12),transparent_34%)]" />
          <div className="pointer-events-none absolute -left-4 top-6 h-3 w-3 rounded-full bg-[#ffcfab]/90" />
          <div className="pointer-events-none absolute left-[58%] top-[42%] h-4 w-4 rounded-full bg-[#bfe7ff]/80 blur-[1px]" />
          <div className="pointer-events-none absolute right-[10%] top-[24%] h-3 w-3 rounded-full bg-[#d3ccff]/90" />
          <div className="pointer-events-none absolute right-[18%] bottom-[18%] h-5 w-5 rounded-full bg-[#f5a6ff]/75 blur-[1px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-[540px] py-2">
              <h3 className="text-[2rem] font-semibold tracking-[-0.04em] sm:text-[2.4rem] lg:text-[2.8rem]">
                {ctaSection.title}
              </h3>
              <p className="mt-4 max-w-[490px] text-[18px] leading-8 text-white/92">
                {ctaSection.description}
              </p>

              <a
                href={ctaSection.primaryAction.href}
                className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white px-10 text-[16px] font-semibold text-[#1a1f34] shadow-[0_14px_34px_rgba(15,23,42,0.2)] transition hover:translate-y-[-1px] hover:bg-white/95"
              >
                {ctaSection.primaryAction.label}
                <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[556px] lg:mx-0 lg:ml-auto">
              <Image
                src={ctaImage}
                alt="Launch CTA illustration"
                quality={85}
                sizes="(min-width: 1280px) 556px, (min-width: 1024px) 42vw, 92vw"
                className="h-auto w-full object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
