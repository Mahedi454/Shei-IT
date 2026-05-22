import { ProjectShowcaseCard } from "@/components/shared/project-showcase-card";

type ProjectCardProps = {
  title: string;
  categories: readonly string[];
  image: string;
  metric: string;
  metricLabel: string;
  href?: string;
};

export function ProjectCard({
  title,
  categories,
  image,
  metric,
  metricLabel,
  href,
}: ProjectCardProps) {
  return (
    <ProjectShowcaseCard
      title={title}
      tags={categories}
      image={image}
      metric={metric}
      metricLabel={metricLabel}
      href={href}
      ctaLabel="View Project"
    />
  );
}
