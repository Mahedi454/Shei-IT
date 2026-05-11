import { ArrowRight, Send } from "lucide-react";

export function ServicesCtaSection() {
  return (
    <section className="relative pb-16 lg:pb-20">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[linear-gradient(100deg,#6c63ff_0%,#735dff_42%,#4f8cff_100%)] px-6 py-8 shadow-[0_28px_80px_rgba(108,99,255,0.24)] sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute left-8 top-7 h-8 w-8 rounded-full bg-[color:var(--sky)] opacity-80 blur-[1px]" />
          <div className="pointer-events-none absolute left-16 top-20 h-11 w-11 rounded-full bg-[linear-gradient(135deg,#fff,#ff9f9f)] opacity-90 shadow-[0_14px_28px_rgba(255,159,90,0.3)]" />
          <div className="pointer-events-none absolute right-10 top-8 h-5 w-5 rounded-full bg-[linear-gradient(135deg,#fff,#ff7da8)] opacity-90" />
          <div className="pointer-events-none absolute bottom-8 right-10 h-10 w-10 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(139,124,255,0.5))] blur-[1px]" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-8 md:pl-16 lg:pl-24">
              <span className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--primary)] shadow-[0_22px_50px_rgba(15,23,42,0.18)] md:inline-flex">
                <Send className="h-9 w-9" strokeWidth={2.1} />
              </span>

              <div>
                <h2 className="max-w-[42rem] text-[1.9rem] font-semibold leading-[1.35] tracking-[-0.04em] text-white sm:text-[2.25rem] lg:text-[2.65rem]">
                  Need One Service or a
                  <span className="block">Complete Digital System?</span>
                </h2>
                <p className="mt-3 text-[15px] font-medium leading-7 text-white/82 sm:text-[16px]">
                  Tell us your goal. We&apos;ll suggest the best solution for your business.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-[0.95rem] bg-white px-8 py-4 text-[15px] font-semibold text-[color:var(--primary)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] md:mr-16 lg:mr-24"
            >
              Get Free Consultation
              <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
