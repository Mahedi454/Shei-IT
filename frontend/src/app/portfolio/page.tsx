import { portfolioSection } from "@/config/site";
import { PortfolioHeroSection } from "@/components/portfolio/portfolio-hero-section";
import { PortfolioResultsSection } from "@/components/portfolio/portfolio-results-section";
import { ProjectsGrid } from "@/components/public/projects-grid";
import { SiteHeader } from "@/components/layout/site-header";
import { pageSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  pageSeoMetadata("portfolio", {
    title: "Portfolio | Shei IT Work",
    description:
      "Browse Shei IT portfolio projects across websites, SaaS, dashboards, mobile apps, UI/UX, and business platforms.",
    path: "/portfolio",
  });

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-[color:var(--background)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.1),transparent_20%),radial-gradient(circle_at_75%_35%,rgba(159,220,255,0.2),transparent_22%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.14),transparent_20%),radial-gradient(circle_at_75%_35%,rgba(93,174,255,0.12),transparent_22%)]" />
      <SiteHeader />

      <PortfolioHeroSection />

      <section className="relative pb-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
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

          <ProjectsGrid />
        </div>
      </section>

      <PortfolioResultsSection />
    </main>
  );
}
