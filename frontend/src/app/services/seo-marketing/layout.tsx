import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("seo-marketing", {
    title: "SEO & Marketing Services | Shei IT",
    description:
      "SEO and marketing services for search visibility, content strategy, analytics, and growth campaigns.",
    path: "/services/seo-marketing",
  });

export default function SeoMarketingLayout({ children }: { children: ReactNode }) {
  return children;
}
