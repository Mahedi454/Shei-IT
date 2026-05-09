import { ArrowRight } from "lucide-react";

import { ctaSection } from "@/config/site";

export function CtaSection() {
  return (
    <section className="relative pb-24 pt-10">
      <div className="mx-auto w-11/12">
        <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--stat-border)] bg-[linear-gradient(120deg,rgba(108,99,255,0.9),rgba(139,124,255,0.86),rgba(93,174,255,0.8))] px-8 py-14 text-white shadow-[0_24px_60px_rgba(108,99,255,0.22)] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -left-14 top-2 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[rgba(255,159,90,0.5)] blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.12)] blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_84%_84%,rgba(255,255,255,0.2),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="pointer-events-none absolute -left-3 bottom-10 h-3 w-3 rounded-full bg-white/80" />
          <div className="pointer-events-none absolute right-14 top-14 h-2.5 w-2.5 rounded-full bg-[#ffd7b8]" />
          <div className="pointer-events-none absolute right-24 bottom-10 h-4 w-4 rounded-full bg-[#bfe7ff]/90" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-[2.05rem] font-semibold tracking-[-0.05em] sm:text-[2.5rem] lg:text-[2.8rem]">
                {ctaSection.title}
              </h3>
              <p className="mt-4 max-w-[620px] text-[16px] leading-8 text-white/90 sm:text-[17px]">
                {ctaSection.description}
              </p>
            </div>

            <a
              href={ctaSection.primaryAction.href}
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white px-8 text-[16px] font-semibold text-[#1a1f34] shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition hover:translate-y-[-1px] hover:bg-white/95"
            >
              {ctaSection.primaryAction.label}
              <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
