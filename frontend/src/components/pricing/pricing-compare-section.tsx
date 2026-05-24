import { Check, X } from "lucide-react";

const rows = [
  ["Responsive Design", true, true, true, true],
  ["Pages", "Up to 5", "Up to 15", "Up to 30", "Unlimited"],
  ["CMS Integration", false, true, true, true],
  ["SEO Optimization", "Basic", "Advanced", "Advanced", "Advanced"],
  ["Support", "1 Month", "3 Months", "6 Months", "Priority"],
  ["Custom Features", false, "Limited", "Yes", "Custom"],
  ["Speed Optimization", false, true, true, true],
] as const;

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--mint)]/14 text-[color:var(--mint)]">
        <Check className="h-4 w-4" strokeWidth={2.6} />
      </span>
    );
  }

  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-[color:var(--muted-foreground)]/70" strokeWidth={2.4} />;
  }

  return <span>{value}</span>;
}

export function PricingCompareSection() {
  return (
    <section className="relative pb-16 lg:pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="grid gap-7 rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none sm:p-8 lg:grid-cols-[0.72fr_1.58fr] lg:items-center lg:gap-9 lg:rounded-[1.8rem] lg:p-10">
          <div className="max-w-[30rem] lg:-mt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Compare Plans
            </p>
            <h2 className="mt-3 text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.05em] text-[color:var(--foreground)] sm:mt-4 sm:text-[2.75rem]">
              Find the Right Plan
              <span className="block">for You</span>
            </h2>
            <p className="mt-4 max-w-[25rem] text-[14px] leading-7 text-[color:var(--muted-foreground)] sm:mt-6 sm:text-[15px] sm:leading-8">
              All plans include high-quality design, clean code, and reliable
              support. Choose a plan that matches your needs.
            </p>
          </div>

          <div className="grid gap-4 lg:hidden">
            {rows.map((row) => (
              <article
                key={row[0]}
                className="rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-4"
              >
                <h3 className="text-[14px] font-semibold text-[color:var(--foreground)]">
                  {row[0]}
                </h3>
                <div className="mt-4 grid gap-3">
                  {["Starter", "Business", "Professional", "Enterprise"].map(
                    (plan, index) => (
                      <div
                        key={`${row[0]}-${plan}`}
                        className="flex min-h-10 items-center justify-between gap-4 rounded-[0.8rem] bg-[color:var(--stat-bg)] px-3 py-2"
                      >
                        <span className="text-[12px] font-semibold text-[color:var(--muted-foreground)]">
                          {plan}
                        </span>
                        <span className="text-right text-[12px] font-semibold text-[color:var(--foreground)]">
                          <CellValue value={row[index + 1]} />
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="relative hidden pt-4 lg:block">
            <span className="absolute left-[calc(20%+30%)] top-0 z-20 -translate-x-1/2 rounded-full bg-[image:var(--gradient-primary)] px-4 py-1 text-[12px] font-semibold text-white shadow-[0_12px_24px_rgba(108,99,255,0.24)]">
              Popular
            </span>

            <div className="overflow-hidden rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none">
              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                <div className="grid grid-cols-[1.25fr_repeat(4,1fr)] border-b border-[color:var(--stat-border)]">
                  {["Features", "Starter", "Business", "Professional", "Enterprise"].map((heading) => (
                    <div
                      key={heading}
                      className="border-r border-[color:var(--stat-border)] px-7 py-4 text-[14px] font-semibold text-[color:var(--foreground)] last:border-r-0"
                    >
                      <span>{heading}</span>
                    </div>
                  ))}
                </div>

                {rows.map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.25fr_repeat(4,1fr)] border-b border-[color:var(--stat-border)] last:border-b-0"
                  >
                    {row.map((value, index) => (
                      <div
                        key={`${row[0]}-${index}`}
                        className={`border-r border-[color:var(--stat-border)] px-7 py-3.5 text-[14px] font-medium last:border-r-0 ${
                          index === 0
                            ? "text-[color:var(--muted-foreground)]"
                            : "text-center text-[color:var(--foreground)]"
                        }`}
                      >
                        <CellValue value={value} />
                      </div>
                    ))}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
