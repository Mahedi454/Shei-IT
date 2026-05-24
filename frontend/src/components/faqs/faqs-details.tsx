"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageCircle,
  Search,
  X,
} from "lucide-react";

import { faqCategories, faqItems, type FaqCategoryId } from "./faq-data";

type ActiveCategory = FaqCategoryId | "all";

export function FaqsDetails() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string>(faqItems[0]?.question ?? "");

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const searchableText = `${item.question} ${item.answer}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const activeLabel =
    activeCategory === "all"
      ? "All FAQs"
      : faqCategories.find((category) => category.id === activeCategory)?.label ?? "FAQs";

  return (
    <>
      <section className="border-b border-[color:var(--stat-border)]">
        <div className="mx-auto grid w-11/12 max-w-[1440px] gap-10 py-16 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:py-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Help Center
            </p>
            <h1 className="page-main-heading mt-5 max-w-4xl">
              Frequently asked questions
            </h1>
            <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[color:var(--muted-foreground)]">
              Find clear answers about Shei IT services, pricing, project timelines, SEO,
              security, support, and what happens before and after launch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-[13px] font-bold text-white shadow-[0_16px_36px_rgba(108,99,255,0.18)]"
              >
                Ask a Question
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:sheiitofficial@gmail.com?subject=Question%20for%20Shei%20IT"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-5 py-3 text-[13px] font-bold text-[color:var(--foreground)]"
              >
                <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                Email Support
              </a>
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["18", "Detailed answers"],
                ["6", "Helpful categories"],
                ["24/7", "Support requests"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[0.95rem] bg-[color:var(--card-solid)] p-4 ring-1 ring-[color:var(--stat-border)]/70"
                >
                  <p className="text-[1.7rem] font-semibold leading-none text-[color:var(--foreground)]">
                    {value}
                  </p>
                  <p className="mt-2 text-[12px] font-semibold text-[color:var(--muted-foreground)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-11/12 max-w-[1440px] gap-7 py-14 lg:grid-cols-[360px_1fr] lg:items-start lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions"
                className="h-12 w-full rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] pl-11 pr-11 text-[14px] font-medium text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--primary)]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[color:var(--muted-foreground)] hover:bg-[color:var(--button-secondary-icon)] hover:text-[color:var(--foreground)]"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`flex w-full items-center justify-between rounded-[0.9rem] px-4 py-3 text-left text-[13px] font-bold ${
                  activeCategory === "all"
                    ? "bg-[color:var(--primary)] text-white shadow-[0_14px_30px_rgba(108,99,255,0.2)]"
                    : "bg-[color:var(--card-solid)] text-[color:var(--foreground)] ring-1 ring-[color:var(--stat-border)]"
                }`}
              >
                All FAQs
                <span className="text-[12px] opacity-75">{faqItems.length}</span>
              </button>

              {faqCategories.map((category) => {
                const Icon = category.icon;
                const count = faqItems.filter((item) => item.category === category.id).length;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex w-full items-start gap-3 rounded-[0.9rem] px-4 py-3 text-left ${
                      isActive
                        ? "bg-[color:var(--primary)] text-white shadow-[0_14px_30px_rgba(108,99,255,0.2)]"
                        : "bg-[color:var(--card-solid)] text-[color:var(--foreground)] ring-1 ring-[color:var(--stat-border)]"
                    }`}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold">{category.label}</span>
                      <span
                        className={`mt-1 block text-[11px] leading-5 ${
                          isActive ? "text-white/78" : "text-[color:var(--muted-foreground)]"
                        }`}
                      >
                        {category.description}
                      </span>
                    </span>
                    <span className="text-[12px] font-bold opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
                {activeLabel}
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold text-[color:var(--foreground)] md:text-[2.6rem]">
                Answers for common questions
              </h2>
            </div>
            <p className="text-[13px] font-semibold text-[color:var(--muted-foreground)]">
              Showing {filteredFaqs.length} of {faqItems.length}
            </p>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const category = faqCategories.find((item) => item.id === faq.category);
                const isOpen = openQuestion === faq.question;
                const Icon = category?.icon ?? HelpCircle;

                return (
                  <article
                    key={faq.question}
                    className="overflow-hidden rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[var(--shadow-soft)] backdrop-blur"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQuestion(isOpen ? "" : faq.question)}
                      className="flex w-full items-start gap-4 px-5 py-5 text-left md:px-6"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                          {category?.label}
                        </span>
                        <span className="mt-1 block text-[15px] font-semibold leading-6 text-[color:var(--foreground)] md:text-[16px]">
                          {faq.question}
                        </span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="mt-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--card-solid)] text-[color:var(--foreground)] ring-1 ring-[color:var(--stat-border)]"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={2.3} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-5 pb-6 md:px-6">
                            <div className="ml-0 rounded-[0.95rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-5 md:ml-[3.75rem]">
                              <p className="text-[14px] font-medium leading-7 text-[color:var(--muted-foreground)]">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur">
              <HelpCircle className="mx-auto h-10 w-10 text-[color:var(--primary)]" />
              <h3 className="mt-4 text-[1.35rem] font-semibold text-[color:var(--foreground)]">
                No matching questions
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                Try a different search term or contact us directly. We will help you find the
                right answer.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative pb-16 lg:pb-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(100deg,#6c63ff_0%,#735dff_45%,#4f8cff_100%)] px-6 py-8 shadow-[0_28px_80px_rgba(108,99,255,0.24)] sm:px-10 lg:px-14">
            <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <span className="hidden h-18 w-18 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--primary)] shadow-[0_22px_50px_rgba(15,23,42,0.18)] md:inline-flex">
                  <MessageCircle className="h-8 w-8" strokeWidth={2.1} />
                </span>
                <div>
                  <h2 className="text-[1.8rem] font-semibold leading-tight text-white sm:text-[2.25rem]">
                    Still need a specific answer?
                  </h2>
                  <p className="mt-2 text-[15px] font-medium leading-7 text-white/82 sm:text-[16px]">
                    Tell us what you are planning, and we will guide you with the best next step.
                  </p>
                </div>
              </div>

              <Link
                href="/contact#contact-form"
                className="inline-flex shrink-0 items-center justify-center gap-3 rounded-[0.95rem] bg-white px-8 py-4 text-[15px] font-semibold text-[color:var(--primary)] shadow-[0_18px_40px_rgba(15,23,42,0.16)] md:mr-10"
              >
                Contact Shei IT
                <ArrowRight className="h-4 w-4" strokeWidth={2.3} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
