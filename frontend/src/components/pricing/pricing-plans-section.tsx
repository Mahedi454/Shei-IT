import {
  ArrowRight,
  Box,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Crown,
  Send,
  ShoppingCart,
} from "lucide-react";

import { ServiceGradientHeading } from "@/components/services/service-gradient-heading";

const plans = [
  {
    name: "Starter Package",
    description: "Best for personal brands, portfolios and small businesses.",
    price: "$149",
    note: "Starter website package",
    timeline: "5 - 7 days",
    action: "Get Started",
    icon: Send,
    accent: "violet",
    popular: false,
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Modern UI Design",
      "Contact Form",
      "Basic SEO Setup",
      "Speed Optimization",
      "Social Media Integration",
      "1 Month Support",
    ],
  },
  {
    name: "Business Package",
    description: "Ideal for growing businesses and corporate websites.",
    price: "$349",
    note: "Business website package",
    timeline: "10 - 14 days",
    action: "Choose Plan",
    icon: BriefcaseBusiness,
    accent: "featured",
    popular: true,
    features: [
      "Up to 10 Pages",
      "Custom UI/UX Design",
      "CMS Integration",
      "Blog System",
      "Advanced SEO Setup",
      "Analytics Integration",
      "Security Optimization",
      "Performance Optimization",
      "3 Months Support",
    ],
  },
  {
    name: "Pro Package",
    description: "Perfect for online stores and conversion-focused businesses.",
    price: "$699",
    note: "E-commerce website package",
    timeline: "2 - 4 weeks",
    action: "Launch Store",
    icon: ShoppingCart,
    accent: "orange",
    popular: false,
    features: [
      "Unlimited Products",
      "Payment Gateway",
      "Inventory Management",
      "Customer Dashboard",
      "Order Management",
      "Coupon System",
      "Mobile Optimization",
      "Advanced Analytics",
      "6 Months Support",
    ],
  },
  {
    name: "Custom Package",
    description: "For complex platforms and custom web applications.",
    price: "Custom",
    note: "Custom project scope",
    timeline: "Depends on scope",
    action: "Book Consultation",
    icon: Box,
    accent: "blue",
    popular: false,
    features: [
      "Requirement Analysis",
      "Custom Dashboard",
      "API Integration",
      "Database Architecture",
      "Authentication System",
      "Admin Panel",
      "Scalability Planning",
      "Maintenance Plan",
    ],
  },
] as const;

export function PricingPlansSection() {
  return (
    <section className="relative pb-24 lg:pb-28">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              Pricing Packages
            </p>
            <ServiceGradientHeading className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.55rem]">
              Transparent Pricing for Every Business Stage
            </ServiceGradientHeading>
          </div>
          <p className="max-w-[43rem] text-[15px] font-medium leading-8 text-[color:var(--muted-foreground)] lg:justify-self-end">
            Choose the perfect website package based on your business goals.
            From startup landing pages to advanced platforms, we have you
            covered.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isFeatured = plan.accent === "featured";
            const iconClass =
              plan.accent === "orange"
                ? "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]"
                : plan.accent === "blue"
                  ? "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]"
                  : isFeatured
                    ? "bg-white/18 text-white"
                    : "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]";

            return (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-[1.25rem] border p-6 shadow-[0_20px_56px_rgba(15,23,42,0.06)] backdrop-blur-xl ${
                  isFeatured
                    ? "border-transparent bg-[linear-gradient(145deg,#6c63ff_0%,#735dff_46%,#4f8cff_100%)] text-white shadow-[0_28px_70px_rgba(108,99,255,0.28)]"
                    : "border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] text-[color:var(--foreground)] dark:shadow-none"
                }`}
              >
                {plan.popular ? (
                  <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[color:var(--primary)] shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
                    <Crown className="h-3.5 w-3.5 fill-[color:var(--primary)]" />
                    Most Popular
                  </div>
                ) : null}

                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] ${iconClass}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.15} />
                  </span>
                  <div>
                    <h3
                      className={`text-[1.18rem] font-semibold tracking-[-0.04em] ${
                        isFeatured
                          ? "text-white"
                          : "text-[color:var(--foreground)]"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-2 text-[13px] font-medium leading-6 ${
                        isFeatured
                          ? "text-white/78"
                          : "text-[color:var(--muted-foreground)]"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-7 rounded-[1rem] border p-4 ${
                    isFeatured
                      ? "border-white/40 bg-white text-[color:var(--foreground)] shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                      : "border-[color:var(--stat-border)] bg-white/45 dark:bg-white/5"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                    Package Price
                  </p>
                  <p
                    className={`mt-2 text-[2.25rem] font-semibold tracking-[-0.06em] ${
                      isFeatured
                        ? "text-[color:var(--primary)]"
                        : "text-[color:var(--foreground)]"
                    }`}
                  >
                    {plan.price}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-[color:var(--muted-foreground)]">
                    {plan.note}
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2
                        className={`h-4.5 w-4.5 shrink-0 ${
                          isFeatured ? "text-white" : "text-[color:var(--mint)]"
                        }`}
                        strokeWidth={2.25}
                      />
                      <span
                        className={`text-[14px] font-medium ${
                          isFeatured
                            ? "text-white/86"
                            : "text-[color:var(--muted-foreground)]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-7 flex items-center gap-2 text-[13px] font-bold ${
                    isFeatured
                      ? "text-white/78"
                      : "text-[color:var(--muted-foreground)]"
                  }`}
                >
                  <CalendarClock className="h-4 w-4" strokeWidth={2.1} />
                  Timeline: {plan.timeline}
                </div>

                <a
                  href="/contact#contact-form"
                  className={`mt-5 inline-flex h-13 w-full items-center justify-center gap-3 rounded-[0.85rem] border text-[14px] font-bold shadow-[0_14px_30px_rgba(15,23,42,0.06)] ${
                    isFeatured
                      ? "border-white/20 bg-white text-[color:var(--primary)]"
                      : "border-[color:var(--button-border)] bg-[color:var(--button-secondary)] text-[color:var(--primary)]"
                  }`}
                >
                  {plan.action}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
