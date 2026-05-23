import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("maintenance-support", {
    title: "Maintenance & Support Services | Shei IT",
    description:
      "Website and app maintenance support for updates, fixes, security, performance, and ongoing improvements.",
    path: "/services/maintenance-support",
  });

export default function MaintenanceSupportLayout({ children }: { children: ReactNode }) {
  return children;
}
