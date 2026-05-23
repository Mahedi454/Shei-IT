import type { ReactNode } from "react";

import { serviceSeoMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const generateMetadata = () =>
  serviceSeoMetadata("deployment-devops", {
    title: "Deployment & DevOps Services | Shei IT",
    description:
      "Deployment and DevOps services for reliable launches, automation, infrastructure, and release workflows.",
    path: "/services/deployment-devops",
  });

export default function DeploymentDevopsLayout({ children }: { children: ReactNode }) {
  return children;
}
