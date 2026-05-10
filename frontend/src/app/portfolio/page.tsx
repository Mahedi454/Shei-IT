import { portfolioSection } from "@/config/site";
import { PortfolioHeroSection } from "@/components/portfolio/portfolio-hero-section";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PortfolioResultsSection } from "@/components/portfolio/portfolio-results-section";
import { SiteHeader } from "@/components/layout/site-header";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-[color:var(--background)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.1),transparent_20%),radial-gradient(circle_at_75%_35%,rgba(159,220,255,0.2),transparent_22%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.14),transparent_20%),radial-gradient(circle_at_75%_35%,rgba(93,174,255,0.12),transparent_22%)]" />
      <SiteHeader />

      <PortfolioHeroSection />

      <section className="relative pb-20">
        <div className="mx-auto w-11/12">
          <div className="mb-7 max-w-2xl">
            <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-[2.4rem]">
              Featured{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="mt-2 text-[15px] text-[color:var(--muted-foreground)]">
              {portfolioSection.projectsDescription}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portfolioSection.projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <PortfolioResultsSection />
    </main>
  );
}
