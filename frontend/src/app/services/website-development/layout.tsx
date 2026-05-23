import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("website-development", {
    title: "Website Development Services | Shei IT",
    description:
      "Custom website development services for fast, responsive, SEO-friendly business websites.",
    path: "/services/website-development",
  });

export default function WebsiteDevelopmentLayout({ children }: { children: ReactNode }) {
  return children;
}
