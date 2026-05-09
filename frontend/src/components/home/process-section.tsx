import {
  ArrowRight,
  Code2,
  Rocket,
  Search,
  ShieldCheck,
  SquarePen,
} from "lucide-react";

import { processSection } from "@/config/site";

const iconMap = {
  search: Search,
  pen: SquarePen,
  code: Code2,
  rocket: Rocket,
  shield: ShieldCheck,
} as const;

const iconShellMap = {
  violet:
    "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  mint:
    "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  blue:
    "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  pink:
    "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
  purple:
    "bg-[linear-gradient(180deg,rgba(167,139,250,0.18),rgba(167,139,250,0.08))] text-[color:var(--primary-soft)]",
} as const;

export function ProcessSection() {
  return (
    <section className="relative pb-28 pt-8">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="max-w-2xl">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.8rem]">
            From{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              {processSection.highlight}
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            {processSection.description}
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-5">
          {processSection.steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isLast = index === processSection.steps.length - 1;

            return (
              <div key={step.title} className="relative">
                {!isLast ? (
                  <div className="pointer-events-none absolute left-[calc(100%-0.4rem)] top-8 hidden w-[calc(100%+0.8rem)] items-center xl:flex">
                    <div className="h-0 border-t-2 border-dashed border-[color:var(--primary-soft)]/60 flex-[1_1_0%]" />
                    <span className="mx-2 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[color:var(--primary-soft)] bg-[color:var(--card-solid)] text-[color:var(--primary)] shadow-[0_12px_28px_rgba(108,99,255,0.08)] dark:bg-[color:var(--card-solid)]">
                      <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.8} />
                    </span>
                    <div className="h-0 border-t-2 border-dashed border-[color:var(--primary-soft)]/60 flex-[1_1_0%]" />
                  </div>
                ) : null}

                <article className="relative rounded-[2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-7 pb-8 pt-14 text-center shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none">
                  <span
                    className={`absolute left-1/2 top-0 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${iconShellMap[step.accent]}`}
                  >
                    <Icon className="h-8 w-8" strokeWidth={2.1} />
                  </span>

                  <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                    {step.description}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
