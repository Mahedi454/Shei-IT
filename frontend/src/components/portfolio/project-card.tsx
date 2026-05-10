type ProjectCardProps = {
  title: string;
  categories: readonly string[];
  image: string;
  metric: string;
  metricLabel: string;
};

export function ProjectCard({
  title,
  categories,
  image,
  metric,
  metricLabel,
}: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.3rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-3 shadow-[0_16px_38px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-none">
      <div className="overflow-hidden rounded-[1rem] border border-[color:var(--stat-border)]">
        <img
          src={image}
          alt={title}
          className="h-[216px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
            {title}
          </h3>
          <div className="shrink-0 text-right">
            <p className="text-[15px] font-semibold text-[color:var(--primary)]">{metric}</p>
            <p className="text-[12px] text-[color:var(--muted-foreground)]">{metricLabel}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-2.5 py-1 text-[12px] font-medium text-[color:var(--primary)]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
