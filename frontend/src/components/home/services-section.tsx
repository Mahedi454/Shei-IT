import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  CloudUpload,
  Code2,
  Layers3,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { servicesSection } from "@/config/site";

const iconMap = {
  code: Code2,
  smartphone: Smartphone,
  cloud: CloudUpload,
  chart: ChartNoAxesColumnIncreasing,
  layers: Layers3,
  shield: ShieldCheck,
  palette: Palette,
  rocket: Rocket,
} as const;

const accentMap = {
  violet:
    "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  blue:
    "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  mint:
    "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  orange:
    "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  pink:
    "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
  purple:
    "bg-[linear-gradient(180deg,rgba(167,139,250,0.18),rgba(167,139,250,0.08))] text-[color:var(--primary-soft)]",
  sky:
    "bg-[linear-gradient(180deg,rgba(159,220,255,0.2),rgba(159,220,255,0.08))] text-[color:var(--sky)]",
  indigo:
    "bg-[linear-gradient(180deg,rgba(99,102,241,0.18),rgba(99,102,241,0.08))] text-[#6366f1]",
} as const;

export function ServicesSection() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="max-w-2xl">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.8rem]">
            Our{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              {servicesSection.highlight}
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            {servicesSection.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {servicesSection.items.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <article
                key={item.title}
                className="rounded-[2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
              >
                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-[1.4rem] ${accentMap[item.accent]}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={2.1} />
                </span>

                <h3 className="mt-6 max-w-[12ch] text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.05em] text-[color:var(--foreground)]">
                  {item.title}
                </h3>

                <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                  {item.description}
                </p>

                <a
                  href={"href" in item ? item.href : "#"}
                  className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-[color:var(--primary)]"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
