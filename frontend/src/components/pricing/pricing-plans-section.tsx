"use client";

import { Briefcase, Check, Gem, Send, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type BillingCycle = "monthly" | "yearly";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small projects and startups",
    monthlyPrice: 49,
    icon: Send,
    accent:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Basic SEO",
      "Contact Form",
      "1 Month Support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Business",
    description: "Ideal for growing businesses",
    monthlyPrice: 99,
    icon: ShieldCheck,
    accent:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
    features: [
      "Up to 15 Pages",
      "Responsive Design",
      "Advanced SEO",
      "CMS Integration",
      "3 Months Support",
      "Speed Optimization",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Professional",
    description: "For advanced websites and systems",
    monthlyPrice: 199,
    icon: Briefcase,
    accent:
      "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[color:var(--mint)]",
    features: [
      "Up to 30 Pages",
      "Responsive Design",
      "Advanced SEO",
      "CMS + Custom Features",
      "6 Months Support",
      "Speed & Security",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large businesses",
    monthlyPrice: null,
    icon: Gem,
    accent:
      "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
    features: [
      "Unlimited Pages",
      "Custom Features",
      "Advanced Integrations",
      "Priority Support",
      "Maintenance & Updates",
      "Scalable Architecture",
    ],
    cta: "Contact Us",
    featured: false,
  },
] as const;

const yearlyDiscount = 0.15;

function getPlanPrice(
  monthlyPrice: number | null,
  billingCycle: BillingCycle,
) {
  if (monthlyPrice === null) {
    return {
      price: "Custom",
      suffix: "",
    };
  }

  if (billingCycle === "yearly") {
    return {
      price: `$${Math.round(monthlyPrice * 12 * (1 - yearlyDiscount)).toLocaleString()}`,
      suffix: "/year",
    };
  }

  return {
    price: `$${monthlyPrice}`,
    suffix: "/month",
  };
}

export function PricingPlansSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="relative pb-24 lg:pb-28">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="mx-auto flex w-fit rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-1 shadow-[0_16px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none">
          <button
            type="button"
            aria-pressed={billingCycle === "monthly"}
            onClick={() => setBillingCycle("monthly")}
            className={`relative rounded-[0.85rem] px-9 py-3 text-[14px] font-semibold transition-colors ${
              billingCycle === "monthly"
                ? "text-[color:var(--foreground)]"
                : "text-[color:var(--muted-foreground)]"
            }`}
          >
            {billingCycle === "monthly" ? (
              <motion.span
                layoutId="billing-cycle-pill"
                className="absolute inset-0 rounded-[0.85rem] bg-[color:var(--card-solid)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            type="button"
            aria-pressed={billingCycle === "yearly"}
            onClick={() => setBillingCycle("yearly")}
            className={`relative rounded-[0.85rem] px-9 py-3 text-[14px] font-semibold transition-colors ${
              billingCycle === "yearly"
                ? "text-[color:var(--foreground)]"
                : "text-[color:var(--muted-foreground)]"
            }`}
          >
            {billingCycle === "yearly" ? (
              <motion.span
                layoutId="billing-cycle-pill"
                className="absolute inset-0 rounded-[0.85rem] bg-[color:var(--card-solid)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative z-10">
              Yearly <span className="text-[color:var(--mint)]">(Save 15%)</span>
            </span>
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const { price, suffix } = getPlanPrice(
              plan.monthlyPrice,
              billingCycle,
            );

            return (
              <article
                key={plan.name}
                className="relative flex min-h-[620px] flex-col rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none"
              >
                {plan.featured ? (
                  <div className="absolute inset-x-5 -top-4 rounded-full bg-[image:var(--gradient-primary)] py-2 text-center text-[13px] font-semibold text-white shadow-[0_16px_34px_rgba(108,99,255,0.28)]">
                    Most Popular
                  </div>
                ) : null}

                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-[1.25rem] ${plan.accent}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={2.1} />
                </span>

                <h3 className="mt-8 text-[1.9rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
                  {plan.name}
                </h3>
                <p className="mt-3 max-w-[15rem] text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                  {plan.description}
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${plan.name}-${billingCycle}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="mt-7 flex items-end gap-2"
                  >
                    <span className="text-[2.55rem] font-semibold leading-none tracking-[-0.06em] text-[color:var(--foreground)]">
                      {price}
                    </span>
                    {suffix ? (
                      <span className="pb-1 text-[14px] font-medium text-[color:var(--muted-foreground)]">
                        {suffix}
                      </span>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-[14px] font-medium text-[color:var(--muted-foreground)]"
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 ${plan.name === "Enterprise" || plan.name === "Professional" ? "text-[color:var(--mint)]" : "text-[color:var(--primary)]"}`}
                        strokeWidth={2.7}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`mt-auto inline-flex items-center justify-center rounded-[0.9rem] px-7 py-4 text-[15px] font-semibold ${
                    plan.featured
                      ? "bg-[image:var(--gradient-primary)] text-white shadow-[0_18px_40px_rgba(108,99,255,0.22)]"
                      : plan.name === "Enterprise"
                        ? "bg-[linear-gradient(180deg,rgba(255,159,90,0.16),rgba(255,159,90,0.08))] text-[color:var(--orange)]"
                        : "bg-[color:var(--button-secondary)] text-[color:var(--primary)]"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
