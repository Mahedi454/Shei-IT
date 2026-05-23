import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("hosting-cloud", {
    title: "Hosting & Cloud Services | Shei IT",
    description:
      "Hosting and cloud services for fast, secure, reliable websites, apps, and backend systems.",
    path: "/services/hosting-cloud",
  });

export default function HostingCloudLayout({ children }: { children: ReactNode }) {
  return children;
}
