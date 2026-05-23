import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("ui-ux-design", {
    title: "UI/UX Design Services | Shei IT",
    description:
      "UI/UX design services for modern interfaces, product flows, dashboards, apps, and websites.",
    path: "/services/ui-ux-design",
  });

export default function UiUxDesignLayout({ children }: { children: ReactNode }) {
  return children;
}
