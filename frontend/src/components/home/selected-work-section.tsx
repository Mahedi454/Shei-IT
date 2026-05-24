"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ProjectShowcaseCard } from "@/components/shared/project-showcase-card";
import { selectedWorkSection } from "@/config/site";
import { apiRequest } from "@/lib/api";

type Project = {
  id: string;
  slug: string;
  title: string;
  image: string;
  categories: string[];
  metric?: string | null;
  metricLabel?: string | null;
};

export function SelectedWorkSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest<Project[]>("/projects");
        setProjects(data.slice(0, 3));
      } catch {
        setProjects([]);
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="relative py-12 md:py-24">
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
            className="group inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-3 text-[15px] font-semibold text-[color:var(--foreground)] shadow-[0_16px_30px_rgba(15,23,42,0.05)] transition duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white hover:shadow-[0_18px_36px_rgba(108,99,255,0.2)] dark:shadow-none"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 text-[color:var(--primary)] transition duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>
        </div>

        <div className="mt-10 grid items-stretch gap-6 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectShowcaseCard
              key={project.id}
              title={project.title}
              tags={project.categories}
              image={project.image}
              metric={project.metric ?? ""}
              metricLabel={project.metricLabel ?? ""}
              href={`/portfolio/${project.slug}`}
              ctaLabel="View Project"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
