import {
  ChartNoAxesColumnIncreasing,
  Code2,
  Headphones,
  Rocket,
  Search,
  Smartphone,
  UserRound,
} from "lucide-react";

import { signMahediDark, signMahediLight } from "@/assets";

const processSteps = [
  {
    number: "01",
    title: "Understand",
    description: "We listen to your idea and understand your requirements.",
    icon: Search,
    accent:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    number: "02",
    title: "Plan",
    description: "We create the perfect plan and solution for your goals.",
    icon: Smartphone,
    accent:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
  {
    number: "03",
    title: "Build",
    description: "We design, develop, and test with quality and precision.",
    icon: Code2,
    accent:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We launch your project and stay with your long-term.",
    icon: Rocket,
    accent:
      "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
  },
] as const;

const benefits = [
  {
    title: "Need-based Solution",
    description: "We build exactly what you need, nothing more, nothing less.",
    icon: UserRound,
    accent:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    title: "Clean Scalable Code",
    description: "Modern technologies and best practices for long-term growth.",
    icon: Code2,
    accent:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
  {
    title: "SEO & Performance Focus",
    description: "We follow SEO best practices and ensure blazing fast performance.",
    icon: ChartNoAxesColumnIncreasing,
    accent:
      "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  },
  {
    title: "Support After Launch",
    description: "We provide ongoing support, maintenance, and improvements.",
    icon: Headphones,
    accent:
      "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  },
] as const;

export function ServicesProcessSection() {
  return (
    <section className="relative pb-24 lg:pb-28">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="mx-auto max-w-[42rem] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
            Our Process
          </p>
          <h2 className="mt-3 text-[2.25rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.85rem]">
            Simple Process. Clear Delivery.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === processSteps.length - 1;

            return (
              <div key={step.title} className="relative">
                {!isLast ? (
                  <div className="pointer-events-none absolute left-[calc(100%-0.2rem)] top-1/2 hidden w-[calc(100%+0.4rem)] -translate-y-1/2 border-t-2 border-dashed border-[color:var(--primary-soft)]/50 lg:block" />
                ) : null}

                <article className="relative z-10 min-h-[170px] rounded-[1.4rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-7 pb-6 pt-12 shadow-[0_18px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none">
                  <span className="absolute -top-4 left-7 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] text-[15px] font-semibold text-[color:var(--primary)] shadow-[0_16px_36px_rgba(15,23,42,0.08)] dark:shadow-none">
                    {step.number}
                  </span>
                  <span
                    className={`absolute left-14 top-5 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] ${step.accent}`}
                  >
                    <Icon className="h-5.5 w-5.5" strokeWidth={2.2} />
                  </span>

                  <h3 className="mt-6 text-[1.12rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[20rem] text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                    {step.description}
                  </p>
                </article>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 bottom-4 hidden h-32 w-20 bg-[radial-gradient(circle,rgba(139,124,255,0.18)_1px,transparent_1px)] [background-size:12px_12px] lg:block" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Why Choose shei-it
            </p>
            <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[3.1rem]">
              Not Just Services.
              <span className="block">
                A{" "}
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  Digital Partner.
                </span>
              </span>
            </h2>
            <p className="mt-5 max-w-[31rem] text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              We focus on delivering value, building trust, and growing
              together with our clients. Your success is always our priority.
            </p>

            <div className="mt-7 flex items-center gap-1">
              <span
                aria-label="Mahedi Hasan signature"
                role="img"
                className="block h-18 w-30 bg-[color:var(--foreground)] dark:hidden"
                style={{
                  WebkitMaskImage: `url(${signMahediLight.src})`,
                  maskImage: `url(${signMahediLight.src})`,
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
              <span
                aria-label="Mahedi Hasan signature"
                role="img"
                className="hidden h-18 w-30 bg-[color:var(--foreground)] dark:block"
                style={{
                  WebkitMaskImage: `url(${signMahediDark.src})`,
                  maskImage: `url(${signMahediDark.src})`,
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
              <span className="text-[13px] font-semibold text-[color:var(--muted-foreground)]">
                Founder, shei-it
              </span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="flex min-h-[132px] items-center gap-5 rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[0_18px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
                >
                  <span
                    className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.2rem] ${benefit.accent}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block text-[1.2rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                      {benefit.title}
                    </span>
                    <span className="mt-2 block text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                      {benefit.description}
                    </span>
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
