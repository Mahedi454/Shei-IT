import type { Metadata } from "next";

import { API_BASE_URL, type ApiResponse } from "@/lib/api";

export type SeoSetting = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  slug?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  robotsIndex?: boolean | null;
  robotsFollow?: boolean | null;
};

type SeoFallback = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
};

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const defaultSeo = {
  title: "Shei IT | Digital Product, Web, App, SEO & Cloud Solutions",
  description:
    "Shei IT builds practical websites, mobile apps, SEO systems, hosting, and digital product experiences for growing businesses.",
  image: null,
};

export const serviceSeoItems = [
  { id: "website-development", path: "/services/website-development" },
  { id: "mobile-app-development", path: "/services/mobile-app-development" },
  { id: "cross-platform-development", path: "/services/cross-platform-development" },
  { id: "deployment-devops", path: "/services/deployment-devops" },
  { id: "hosting-cloud", path: "/services/hosting-cloud" },
  { id: "maintenance-support", path: "/services/maintenance-support" },
  { id: "seo-marketing", path: "/services/seo-marketing" },
  { id: "ui-ux-design", path: "/services/ui-ux-design" },
] as const;

export async function getSeoSetting(type: string, id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/seo/${type}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as ApiResponse<SeoSetting | null>;
    return payload.data;
  } catch {
    return null;
  }
}

export function buildSeoMetadata(seo: SeoSetting | null, fallback: SeoFallback): Metadata {
  const title = seo?.metaTitle || fallback.title || defaultSeo.title;
  const description = seo?.metaDescription || fallback.description || defaultSeo.description;
  const canonical = seo?.canonicalUrl || `${SITE_URL}${fallback.path}`;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImage = seo?.ogImage || fallback.image || defaultSeo.image;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: seo?.robotsIndex ?? true,
      follow: seo?.robotsFollow ?? true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function pageSeoMetadata(id: string, fallback: SeoFallback) {
  const seo = await getSeoSetting("page", id);
  return buildSeoMetadata(seo, fallback);
}

export async function serviceSeoMetadata(id: string, fallback: SeoFallback) {
  const seo = await getSeoSetting("service", id);
  return buildSeoMetadata(seo, fallback);
}
