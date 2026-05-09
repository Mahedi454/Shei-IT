import { ArrowRight } from "lucide-react";

import { selectedWorkSection } from "@/config/site";

const tagAccentMap = {
  violet:
    "bg-[linear-gradient(180deg,rgba(139,124,255,0.14),rgba(139,124,255,0.06))] text-[color:var(--primary)]",
  blue:
    "bg-[linear-gradient(180deg,rgba(93,174,255,0.14),rgba(93,174,255,0.06))] text-[color:var(--blue)]",
  peach:
    "bg-[linear-gradient(180deg,rgba(255,185,138,0.14),rgba(255,185,138,0.06))] text-[color:var(--orange)]",
} as const;

function WorkPreview({ theme }: { theme: "restaurant" | "tutor" | "portfolio" }) {
  if (theme === "restaurant") {
    return (
      <div className="relative h-[240px] overflow-hidden rounded-[1.8rem] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(238,242,255,0.82))] p-5 dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(20,22,32,0.95),rgba(14,16,24,0.96))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,124,255,0.12),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(111,231,200,0.12),transparent_30%)]" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-[#0f1116] p-4 shadow-[0_24px_50px_rgba(15,23,42,0.16)] dark:bg-[#0b0d12]">
          <div className="flex items-center justify-between rounded-full bg-white/6 px-4 py-2 text-[10px] font-medium text-white/70">
            <span>Menu</span>
            <span>Reserve</span>
            <span>Order</span>
          </div>
          <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="space-y-3">
              <div className="h-4 w-28 rounded-full bg-white/10" />
              <div className="h-14 rounded-[1rem] bg-[linear-gradient(135deg,#1c2b1b,#32482f)]" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-[1rem] bg-white/6" />
                <div className="h-14 rounded-[1rem] bg-white/6" />
              </div>
            </div>
            <div className="flex items-end justify-end">
              <div className="h-[138px] w-[82px] rounded-[1.5rem] border border-white/10 bg-white p-2 shadow-[0_12px_24px_rgba(15,23,42,0.18)]">
                <div className="h-full rounded-[1rem] bg-[linear-gradient(180deg,#f8fafc,#e2e8f0)] p-2">
                  <div className="h-12 rounded-[0.8rem] bg-[linear-gradient(135deg,#374151,#111827)]" />
                  <div className="mt-1.5 space-y-1.5">
                    <div className="h-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-4/5 rounded-full bg-slate-200" />
                    <div className="h-6 rounded-full bg-[color:var(--mint)]/35" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (theme === "tutor") {
    return (
      <div className="relative h-[240px] overflow-hidden rounded-[1.8rem] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(238,242,255,0.86))] p-5 dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(20,22,32,0.95),rgba(14,16,24,0.96))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(93,174,255,0.12),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(139,124,255,0.12),transparent_28%)]" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-[linear-gradient(180deg,#f8fbff,#eef4ff)] p-4 shadow-[0_24px_50px_rgba(15,23,42,0.1)] dark:bg-[linear-gradient(180deg,#111827,#0f172a)]">
          <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 dark:text-white/60">
            <span>Courses</span>
            <span>Mentors</span>
            <span>Pricing</span>
          </div>
          <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1fr_0.42fr] gap-4">
            <div className="space-y-3">
              <div className="h-4 w-40 rounded-full bg-slate-300 dark:bg-white/10" />
              <div className="h-10 w-32 rounded-full bg-[color:var(--primary)]/12 dark:bg-[color:var(--primary)]/18" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 rounded-[1rem] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:bg-white/8 dark:shadow-none" />
                <div className="h-16 rounded-[1rem] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:bg-white/8 dark:shadow-none" />
                <div className="h-16 rounded-[1rem] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:bg-white/8 dark:shadow-none" />
              </div>
            </div>
            <div className="flex items-end justify-end">
              <div className="h-[140px] w-[82px] rounded-[1.5rem] border border-white/20 bg-white p-2 shadow-[0_12px_24px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-[#0f172a]">
                <div className="h-full rounded-[1rem] bg-[linear-gradient(180deg,#f8fafc,#dbeafe)] p-2 dark:bg-[linear-gradient(180deg,#1e293b,#0f172a)]">
                  <div className="h-9 rounded-[0.8rem] bg-[color:var(--sky)]/30 dark:bg-[color:var(--blue)]/20" />
                  <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                    <div className="h-6 rounded-[0.6rem] bg-white dark:bg-white/10" />
                    <div className="h-6 rounded-[0.6rem] bg-white dark:bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[240px] overflow-hidden rounded-[1.8rem] border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(244,240,255,0.86))] p-5 dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(20,22,32,0.95),rgba(14,16,24,0.96))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,124,255,0.12),transparent_30%),radial-gradient(circle_at_85%_65%,rgba(255,159,90,0.1),transparent_28%)]" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-white p-4 shadow-[0_24px_50px_rgba(15,23,42,0.1)] dark:bg-[#111827] dark:shadow-none">
        <div className="flex items-center justify-between rounded-full bg-slate-100 px-4 py-2 text-[10px] font-medium text-slate-400 dark:bg-white/6 dark:text-white/60">
          <span>Home</span>
          <span>Work</span>
          <span>Contact</span>
        </div>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1fr_0.36fr] gap-4">
          <div className="space-y-3">
            <div className="h-20 rounded-[1rem] bg-[linear-gradient(135deg,#0f172a,#334155)]" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 rounded-[1rem] bg-slate-100 dark:bg-white/8" />
              <div className="h-14 rounded-[1rem] bg-slate-100 dark:bg-white/8" />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="h-[142px] w-[82px] rounded-[1.5rem] border border-white/20 bg-white p-2 shadow-[0_12px_24px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-[#0f172a]">
              <div className="h-full rounded-[1rem] bg-[linear-gradient(180deg,#f8fafc,#e5e7eb)] p-2 dark:bg-[linear-gradient(180deg,#1f2937,#111827)]">
                <div className="h-10 rounded-[0.8rem] bg-[linear-gradient(135deg,#374151,#111827)]" />
                <div className="mt-1.5 space-y-1.5">
                  <div className="h-2.5 rounded-full bg-slate-300 dark:bg-white/10" />
                  <div className="h-2.5 w-3/4 rounded-full bg-slate-200 dark:bg-white/8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SelectedWorkSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto w-11/12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.8rem]">
              Selected{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                {selectedWorkSection.highlight}
              </span>
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              {selectedWorkSection.description}
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-3 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_30px_rgba(15,23,42,0.05)] dark:shadow-none"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
          </a>
        </div>

        <div className="mt-10 grid items-stretch gap-6 xl:grid-cols-3">
          {selectedWorkSection.items.map((item) => (
            <article
              key={item.title}
              className="flex min-h-[500px] flex-col rounded-[2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none xl:min-h-[540px]"
            >
              <WorkPreview theme={item.theme} />

              <div className="mt-6 flex flex-1 flex-col">
                <h3 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
                  {item.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${tagAccentMap[item.accent]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-4 py-3 text-[14px] font-semibold text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.04)] dark:bg-[color:var(--card-solid)] dark:shadow-none"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
