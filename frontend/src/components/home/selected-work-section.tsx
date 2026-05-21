import { ArrowRight } from "lucide-react";

import { ProjectShowcaseCard } from "@/components/shared/project-showcase-card";
import { selectedWorkSection } from "@/config/site";

export function SelectedWorkSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.8rem]">
              Selected{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                {selectedWorkSection.highlight}
              </span>
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              {selectedWorkSection.description}
            </p>
          </div>

          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-3 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_30px_rgba(15,23,42,0.05)] dark:shadow-none"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 text-[color:var(--primary)]" />
          </a>
        </div>

        <div className="mt-10 grid items-stretch gap-6 xl:grid-cols-3">
          {selectedWorkSection.items.map((item) => (
            <ProjectShowcaseCard
              key={item.title}
              title={item.title}
              tags={item.tags}
              previewTheme={item.theme}
              accent={item.accent}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
