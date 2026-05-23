import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("cross-platform-development", {
    title: "Cross Platform Development Services | Shei IT",
    description:
      "Cross-platform app development for efficient, shared-code mobile and web product delivery.",
    path: "/services/cross-platform-development",
  });

export default function CrossPlatformDevelopmentLayout({ children }: { children: ReactNode }) {
  return children;
}
