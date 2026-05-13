import { ArrowRight, Send } from "lucide-react";

export function AboutCtaSection() {
  return (
    <section className="relative pb-16 lg:pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[linear-gradient(100deg,#6c63ff_0%,#735dff_42%,#4f8cff_100%)] px-6 py-7 shadow-[0_28px_80px_rgba(108,99,255,0.24)] sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute left-8 top-2 h-4 w-4 rounded-full bg-[color:var(--sky)] opacity-70 blur-[1px]" />
          <div className="pointer-events-none absolute left-9 top-11 h-7 w-7 rounded-full bg-[color:var(--orange)] opacity-90 shadow-[0_10px_24px_rgba(255,159,90,0.35)]" />
          <div className="pointer-events-none absolute right-7 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(139,124,255,0.5))] blur-[1px]" />

          <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-7">
              <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--primary)] shadow-[0_22px_50px_rgba(15,23,42,0.18)]">
                <Send className="h-9 w-9" strokeWidth={2.1} />
              </span>

              <div>
                <h2 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[2rem] lg:text-[2.35rem]">
                  Let&apos;s Build Something Excellent Together
                </h2>
                <p className="mt-2 text-[15px] font-medium leading-7 text-white/82">
                  Share your idea with us. We&apos;ll help you turn it into a
                  <br />
                  powerful digital solution.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-[0.9rem] bg-white px-8 py-4 text-[15px] font-semibold text-[color:var(--primary)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] md:mr-14 lg:mr-20 xl:mr-24"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
