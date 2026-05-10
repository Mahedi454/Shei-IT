import { ArrowRight, ChevronDown, HelpCircle, Send } from "lucide-react";

const faqs = [
  "Can I upgrade my plan later?",
  "Do you offer ongoing support?",
  "Do you provide domain and hosting?",
  "Will my website be SEO-friendly?",
  "How long does it take to complete a project?",
  "Do you offer refunds?",
] as const;

export function PricingFaqSection() {
  return (
    <section className="relative pb-16 lg:pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
            FAQ
          </p>
          <h2 className="mt-3 text-[2.35rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[3rem]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqs.map((question) => (
            <button
              key={question}
              className="flex items-center gap-5 rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-5 text-left shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]">
                <HelpCircle className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="flex-1 text-[15px] font-semibold text-[color:var(--foreground)]">
                {question}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-[color:var(--foreground)]" strokeWidth={2.2} />
            </button>
          ))}
        </div>

        <div className="relative mt-7 overflow-hidden rounded-[1.45rem] bg-[linear-gradient(100deg,#6c63ff_0%,#735dff_42%,#4f8cff_100%)] px-6 py-8 shadow-[0_28px_80px_rgba(108,99,255,0.24)] sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute left-10 top-8 h-9 w-9 rounded-full bg-[linear-gradient(135deg,#fff,#ff9f9f)] opacity-70 blur-[1px]" />
          <div className="pointer-events-none absolute left-10 bottom-9 h-7 w-7 rounded-full bg-[linear-gradient(135deg,#fff,#a78bfa)] opacity-80" />
          <div className="pointer-events-none absolute right-9 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(139,124,255,0.5))] blur-[1px]" />

          <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-8">
              <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--primary)] shadow-[0_22px_50px_rgba(15,23,42,0.18)]">
                <Send className="h-9 w-9" strokeWidth={2.1} />
              </span>

              <div>
                <h3 className="text-[1.9rem] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[2.3rem]">
                  Not Sure Which Plan is Right for You?
                </h3>
                <p className="mt-2 text-[15px] font-medium leading-7 text-white/82 sm:text-[16px]">
                  Let&apos;s discuss your project and find the best solution together.
                </p>
              </div>
            </div>

            <a
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-[0.9rem] bg-white px-8 py-4 text-[15px] font-semibold text-[color:var(--primary)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] md:mr-16"
            >
              Talk to Us
              <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
