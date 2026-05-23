import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("mobile-app-development", {
    title: "Mobile App Development Services | Shei IT",
    description:
      "Mobile app development for Android, iOS, and cross-platform products built for growth.",
    path: "/services/mobile-app-development",
  });

export default function MobileAppDevelopmentLayout({ children }: { children: ReactNode }) {
  return children;
}
