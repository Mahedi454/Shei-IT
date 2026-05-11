"use client";

import { ArrowRight, ChevronDown, HelpCircle, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes. You can upgrade whenever your website needs more pages, features, integrations, or support. We will adjust the plan based on the new scope.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Support is included with every plan, and we also offer maintenance packages for updates, improvements, security checks, and content changes.",
  },
  {
    question: "Do you provide domain and hosting?",
    answer:
      "Yes. We can help you choose, set up, and connect your domain and hosting. If you already have them, we can work with your existing provider.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes. We build with clean structure, responsive layouts, fast performance, metadata, and basic on-page SEO so your website starts from a strong foundation.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Most small websites take 1 to 2 weeks. Larger websites, custom features, or advanced systems may take longer depending on the final requirements.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refunds depend on the project stage and completed work. Before starting, we clarify the scope, timeline, and payment terms so everything is transparent.",
  },
] as const;

export function PricingFaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

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

        <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.question;

            return (
            <article
              key={faq.question}
              className="overflow-hidden rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                className="flex w-full items-center gap-5 px-6 py-5 text-left"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]">
                  <HelpCircle className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="flex-1 text-[15px] font-semibold text-[color:var(--foreground)]">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-[color:var(--foreground)]"
                >
                  <ChevronDown className="h-5 w-5" strokeWidth={2.2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.p
                      initial={{ y: -8 }}
                      animate={{ y: 0 }}
                      exit={{ y: -8 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="px-6 pb-6 pl-[5.75rem] pr-8 text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
            );
          })}
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
