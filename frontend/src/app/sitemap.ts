import type { MetadataRoute } from "next";

import { API_BASE_URL, type ApiResponse } from "@/lib/api";
import { serviceSeoItems, SITE_URL } from "@/lib/seo";

type SlugItem = {
  slug: string;
  updatedAt?: string | null;
};

async function getSlugs(path: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ApiResponse<SlugItem[]>;
    return payload.data;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects] = await Promise.all([getSlugs("/blogs"), getSlugs("/projects")]);
  const staticPages = [
    "/",
    "/services",
    "/about",
    "/portfolio",
    "/contact",
    "/blog",
    "/careers",
    "/faqs",
    "/privacy-policy",
    "/terms-of-service",
  ];
  const now = new Date();

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...serviceSeoItems.map((service) => ({
      url: `${SITE_URL}${service.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
