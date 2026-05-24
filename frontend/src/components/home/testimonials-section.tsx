import { Quote } from "lucide-react";

import { testimonialsSection } from "@/config/site";

export function TestimonialsSection() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="max-w-2xl">
          <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.8rem]">
            What Our{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              {testimonialsSection.highlight}
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            {testimonialsSection.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {testimonialsSection.items.map((item, index) => (
            <article
              key={item.name}
              className="flex h-full flex-col rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
            >
              <Quote className="h-6 w-6 text-[color:var(--primary)]" />
              <p className="mt-4 text-[16px] leading-8 text-[color:var(--muted-foreground)]">
                {item.quote}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-7">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] text-[13px] font-semibold text-[color:var(--foreground)]"
                  style={{
                    boxShadow:
                      index % 2 === 0
                        ? "0 8px 20px rgba(139,124,255,0.14)"
                        : "0 8px 20px rgba(93,174,255,0.14)",
                  }}
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[color:var(--foreground)]">
                    {item.name}
                  </p>
                  <p className="text-[14px] text-[color:var(--muted-foreground)]">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
