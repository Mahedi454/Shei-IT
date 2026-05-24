import Link from "next/link";

import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { API_BASE_URL } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import type { Service } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getService(slug: string) {
  const response = await fetch(`${API_BASE_URL}/services/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as ApiResponse<Service>;
  return payload.data;
}

export default async function ServiceDetailsRoute({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
        <div className="mx-auto flex min-h-screen w-11/12 max-w-[960px] items-center justify-center">
          <div className="rounded-[1.4rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-8 py-12 text-center">
            <h1 className="text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
              Service not found
            </h1>
            <p className="mt-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              This service is unavailable or has not been published yet.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)]"
            >
              Back to services
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <ServiceDetailPage service={service} />;
}
