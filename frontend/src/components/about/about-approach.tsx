import { Code2, LayoutGrid, Lightbulb, Repeat } from "lucide-react";

const approachSteps = [
  {
    title: "Need-First Planning",
    description: "We understand your goals and plan the right solution.",
    icon: Lightbulb,
    accent: "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    title: "Clean UI/UX",
    description: "We design simple, beautiful and user-friendly interfaces.",
    icon: LayoutGrid,
    accent: "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
  {
    title: "Scalable Development",
    description: "We build with modern tech and clean architecture.",
    icon: Code2,
    accent: "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
  },
  {
    title: "Continuous Improvement",
    description: "We support, improve, and grow with your business.",
    icon: Repeat,
    accent: "bg-[linear-gradient(180deg,rgba(244,114,182,0.18),rgba(244,114,182,0.08))] text-[#ec4899]",
  },
] as const;

export function AboutApproachSection() {
  return (
    <section className="relative pb-16 lg:pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] items-start">
          <div className="max-w-[36rem]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.26em] text-[color:var(--primary)]">
              Our Approach
            </p>
            <h2 className="mt-4 text-[2.6rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[3.4rem]">
              How We Work
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              A clear and simple approach to turn your ideas into real products.
            </p>
          </div>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {approachSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === approachSteps.length - 1;

              return (
                <div key={step.title} className="relative h-full">
                  {!isLast ? (
                    <div className="pointer-events-none absolute right-[-2rem] top-1/2 hidden h-0.5 w-[88px] -translate-y-1/2 bg-[color:var(--primary-soft)] xl:block" />
                  ) : null}

                  <article className="flex h-full flex-col rounded-[2rem] border border-[color:var(--stat-border)] bg-transparent p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:bg-transparent dark:shadow-none">
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-[1.4rem] ${step.accent}`}>
                      <Icon className="h-6 w-6" strokeWidth={2.1} />
                    </span>
                    <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                      {step.description}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
