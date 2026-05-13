import { SiteHeader } from "@/components/layout/site-header";
import { BlogList } from "@/components/public/blog-list";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <section className="py-16 lg:py-20">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <h1 className="max-w-[10ch] text-[3rem] font-semibold leading-[1.05] text-[color:var(--foreground)] sm:text-[4rem]">
            Insights From the Work We Do
          </h1>
          <p className="mt-5 max-w-[46rem] text-[16px] leading-8 text-[color:var(--muted-foreground)]">
            Practical writing on websites, product delivery, performance, growth, and long-term digital support.
          </p>
          <div className="mt-10">
            <BlogList />
          </div>
        </div>
      </section>
    </main>
  );
}
