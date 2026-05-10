import {
  Sparkles,
  TrendingUp,
  UserRound,
  Wrench,
} from "lucide-react";

import { portfolioSection } from "@/config/site";

const iconMap = {
  tools: Wrench,
  sparkles: Sparkles,
  users: UserRound,
  trending: TrendingUp,
} as const;

const accentMap = {
  tools:
    "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  sparkles:
    "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  users:
    "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  trending:
    "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
} as const;

export function PortfolioResultsSection() {
  return (
    <section className="relative pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.4rem]">
            Results{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              That Matter
            </span>
          </h2>
          <p className="mt-2 text-[15px] text-[color:var(--muted-foreground)]">
            Real impact delivered for real businesses.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {portfolioSection.results.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article
                key={item.label}
                className="flex items-center gap-4 rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] dark:shadow-none"
              >
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentMap[item.icon]}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <div>
                  <p className="text-[1.85rem] font-semibold leading-none tracking-[-0.03em] text-[color:var(--primary)]">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[14px] font-medium text-[color:var(--muted-foreground)]">
                    {item.label}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
