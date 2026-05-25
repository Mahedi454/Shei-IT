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

import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";
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
  blue: "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  mint: "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  orange:
    "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  pink: "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
  purple:
    "bg-[linear-gradient(180deg,rgba(167,139,250,0.18),rgba(167,139,250,0.08))] text-[color:var(--primary-soft)]",
  sky: "bg-[linear-gradient(180deg,rgba(159,220,255,0.2),rgba(159,220,255,0.08))] text-[color:var(--sky)]",
  indigo:
    "bg-[linear-gradient(180deg,rgba(99,102,241,0.18),rgba(99,102,241,0.08))] text-[#6366f1]",
} as const;

export function ServicesCoreSection() {
  return (
    <section className="relative py-14 lg:py-16">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
            What We Can Build For You
          </p>
          <ServiceGradientHeading
            highlightText="Services"
            className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.5rem] xl:text-[3rem]"
          >
            Our Core Services
          </ServiceGradientHeading>
          <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            Focused services for businesses that want practical digital growth.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:mt-9 xl:grid-cols-4 xl:gap-5">
          {servicesSection.items.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <article
                key={item.title}
                className="flex min-h-[178px] flex-col rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none xl:min-h-[198px] xl:rounded-[1.45rem]"
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] ${accentMap[item.accent]}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2.1} />
                  </span>

                  <div>
                    <h3 className="text-[1.25rem] font-semibold leading-tight tracking-[-0.04em] text-[color:var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-6 text-[color:var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <a
                  href={"href" in item ? item.href : "/contact#contact-form"}
                  className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-semibold text-[color:var(--primary)]"
                >
                  View details
                  <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
