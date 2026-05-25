"use client";

import {
  ArrowRight,
  ChevronDown,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import ctaImage from "@/assets/cta-image.png";
import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";

const benefits = [
  {
    title: "Goal-Oriented Approach",
    description: "We focus on your business goals and growth.",
    icon: Target,
    accent:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    title: "Quick & Reliable",
    description: "Fast delivery with reliable communication.",
    icon: Zap,
    accent:
      "bg-[linear-gradient(180deg,rgba(111,231,200,0.22),rgba(111,231,200,0.08))] text-[#0f9f7f]",
  },
  {
    title: "Quality & Security",
    description:
      "We follow best practices to ensure quality and data security.",
    icon: Shield,
    accent:
      "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  },
  {
    title: "Long-Term Support",
    description: "We're with you even after your project is live.",
    icon: Users,
    accent:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
] as const;

const faqs = [
  {
    question: "How fast will you respond?",
    answer:
      "We usually reply within 24 hours with the next step, project questions, or a suggested call time.",
  },
  {
    question: "What information do you need to start?",
    answer:
      "A short project goal, preferred timeline, required features, and any existing brand or website details are enough to begin.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We provide maintenance, updates, improvements, and technical support after launch.",
  },
  {
    question: "Can I schedule a call before starting?",
    answer:
      "Yes. You can book a call first so we can understand your needs and recommend the best solution.",
  },
] as const;

export function ContactSupportSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="relative pb-14 md:pb-20 lg:pb-28">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none md:rounded-[1.4rem] lg:px-9">
          <ServiceGradientHeading
            highlightText="Shei-it"
            className="text-center text-[1.45rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]"
          >
            Why Work With Shei-it?
          </ServiceGradientHeading>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex items-center gap-4">
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${benefit.accent}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.3} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-[color:var(--foreground)]">
                      {benefit.title}
                    </span>
                    <span className="mt-1 block max-w-[13rem] text-[12px] font-medium leading-5 text-[color:var(--muted-foreground)]">
                      {benefit.description}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid gap-7 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              FAQ
            </p>
            <ServiceGradientHeading className="mt-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              Frequently Asked Questions
            </ServiceGradientHeading>

            <div className="mt-5 space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.question;

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)]"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                      className="flex w-full items-center gap-4 px-4 py-3 text-left"
                    >
                      <span className="flex-1 text-[13px] font-semibold text-[color:var(--foreground)]">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[color:var(--muted-foreground)]"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.26,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <p className="px-4 pb-4 text-[12px] font-medium leading-6 text-[color:var(--muted-foreground)]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[1.25rem] bg-[linear-gradient(100deg,#6c63ff_0%,#735dff_42%,#4f8cff_100%)] p-6 text-white shadow-[0_28px_80px_rgba(108,99,255,0.24)] sm:p-10 md:rounded-[1.35rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(255,255,255,0.26),transparent_25%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.12),transparent_28%)]" />
            <div className="pointer-events-none absolute right-[14%] top-[20%] h-4 w-4 rounded-full bg-[#bfe7ff]/85 blur-[1px]" />
            <div className="pointer-events-none absolute right-[7%] bottom-[34%] h-5 w-5 rounded-full bg-[#d3ccff]/90" />
            <div className="pointer-events-none absolute right-[40%] bottom-[26%] h-6 w-6 rounded-full bg-[#aee7ff]/85 blur-[1px]" />

            <div className="relative z-10 grid min-h-[220px] gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="max-w-[30rem]">
                <h2 className="text-[2rem] font-semibold leading-[1.16] tracking-[-0.035em] sm:text-[2.35rem]">
                  Ready to Start Your Project?
                </h2>
                <p className="mt-4 max-w-[25rem] text-[15px] font-medium leading-7 text-white/86">
                  Let&apos;s turn your idea into a powerful digital solution.
                  We&apos;re excited to help you grow.
                </p>
                <a
                  href="mailto:sheiitofficial@gmail.com"
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-[0.75rem] bg-white px-7 py-4 text-[15px] font-semibold text-[#111827] shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
                </a>
              </div>

              <div className="relative hidden h-52 w-56 overflow-visible md:block xl:h-60 xl:w-64">
                <Image
                  src={ctaImage}
                  alt="Launch CTA illustration"
                  quality={85}
                  sizes="(min-width: 1280px) 256px, 224px"
                  className="h-full w-full scale-[1.75] object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
