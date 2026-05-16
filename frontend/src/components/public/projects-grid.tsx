"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { ProjectCard } from "@/components/portfolio/project-card";

type Project = {
  id: string;
  slug: string;
  title: string;
  image: string;
  categories: string[];
  metric?: string;
  metricLabel?: string;
};

export function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest<Project[]>("/projects");
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Projects could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      {error ? (
        <p className="mb-5 text-[14px] text-rose-400">{error}</p>
      ) : null}

      {loading ? (
        <p className="text-[14px] text-[color:var(--muted-foreground)]">Loading projects...</p>
      ) : projects.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              image={project.image}
              categories={project.categories}
              metric={project.metric ?? ""}
              metricLabel={project.metricLabel ?? ""}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.3rem] border border-dashed border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-12 text-center text-[14px] text-[color:var(--muted-foreground)]">
          No projects have been published yet.
        </div>
      )}
    </>
  );
}
