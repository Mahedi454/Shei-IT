"use client";

import { useEffect, useState } from "react";

import { portfolioSection } from "@/config/site";
import { apiRequest } from "@/lib/api";
import { ProjectCard } from "@/components/portfolio/project-card";

type Project = {
  _id?: string;
  slug?: string;
  title: string;
  image: string;
  categories: readonly string[];
  metric?: string;
  metricLabel?: string;
};

export function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([...portfolioSection.projects]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiRequest<Project[]>("/projects");
        if (data.length) {
          setProjects(data);
        }
      } catch {
        // Keep curated fallback data when backend is empty or offline.
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project._id ?? project.slug ?? project.title}
          title={project.title}
          image={project.image}
          categories={project.categories}
          metric={project.metric ?? ""}
          metricLabel={project.metricLabel ?? ""}
        />
      ))}
      {loading ? null : null}
    </div>
  );
}
