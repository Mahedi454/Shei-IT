import { ArrowRight, ChartNoAxesColumnIncreasing, CloudUpload, Code2, Layers3, Palette, Rocket, ShieldCheck, Smartphone } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { servicesSection } from "@/config/site";

const iconMap = {
  code: Code2,
  smartphone: Smartphone,
  cloud: CloudUpload,
  chart: ChartNoAxesColumnIncreasing,
  layers: Layers3,
  shield: ShieldCheck,
  palette: Palette,
  rocket: Rocket,
} as const;

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <SiteHeader />
      <section className="py-16 lg:py-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <h1 className="max-w-[12ch] text-[3rem] font-semibold leading-[1.05] text-[color:var(--foreground)] sm:text-[4rem]">
            Services That Build and Grow Digital Products
          </h1>
          <p className="mt-5 max-w-[48rem] text-[16px] leading-8 text-[color:var(--muted-foreground)]">
            We handle the practical work modern businesses actually need, from product delivery to launch support and long-term maintenance.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {servicesSection.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--stat-icon-bg)] text-[color:var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-[1.45rem] font-semibold text-[color:var(--foreground)]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                    {item.description}
                  </p>
                  <a href="/contact" className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[color:var(--primary)]">
                    Discuss this service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
