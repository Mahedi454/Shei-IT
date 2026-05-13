import { Check } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

const plans = [
  {
    name: "Starter",
    price: "Custom",
    description: "For small businesses launching a focused digital presence.",
    features: ["Business website", "Basic SEO setup", "Launch support"],
  },
  {
    name: "Growth",
    price: "Custom",
    description: "For teams that need web, content, growth support, and iteration.",
    features: ["Custom website or app", "Analytics and SEO", "Ongoing maintenance"],
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For products that need multi-phase delivery and deeper technical support.",
    features: ["Full product build", "Admin/dashboard systems", "Priority support"],
  },
] as const;

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <section className="py-16 lg:py-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <h1 className="max-w-[12ch] text-[3rem] font-semibold leading-[1.05] text-[color:var(--foreground)] sm:text-[4rem]">
            Flexible Pricing for Real Business Needs
          </h1>
          <p className="mt-5 max-w-[44rem] text-[16px] leading-8 text-[color:var(--muted-foreground)]">
            We price around scope and business goals rather than forcing you into artificial package limits.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6">
                <p className="text-[14px] font-semibold text-[color:var(--primary)]">{plan.name}</p>
                <p className="mt-4 text-[2.5rem] font-semibold text-[color:var(--foreground)]">{plan.price}</p>
                <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">{plan.description}</p>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-[15px] text-[color:var(--foreground)]">
                      <Check className="mt-0.5 h-4 w-4 text-[color:var(--primary)]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="/contact" className="mt-7 inline-flex rounded-xl bg-[color:var(--primary)] px-5 py-3 text-[14px] font-semibold text-white">
                  Request Quote
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
