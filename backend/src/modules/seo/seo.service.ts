import { prisma } from "../../config/prisma";

type SeoInput = {
  seoableType: string;
  seoableId: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  slug?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
};

const cleanOptional = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : null;

export const normalizeSeoData = (payload: SeoInput) => ({
  seoableType: payload.seoableType,
  seoableId: payload.seoableId,
  metaTitle: cleanOptional(payload.metaTitle),
  metaDescription: cleanOptional(payload.metaDescription),
  focusKeyword: cleanOptional(payload.focusKeyword),
  slug: cleanOptional(payload.slug),
  canonicalUrl: cleanOptional(payload.canonicalUrl),
  ogTitle: cleanOptional(payload.ogTitle),
  ogDescription: cleanOptional(payload.ogDescription),
  ogImage: cleanOptional(payload.ogImage),
  robotsIndex: payload.robotsIndex ?? true,
  robotsFollow: payload.robotsFollow ?? true,
});

export const upsertSeoSetting = async (payload: SeoInput) => {
  const data = normalizeSeoData(payload);

  return prisma.seoSetting.upsert({
    where: {
      seoableType_seoableId: {
        seoableType: data.seoableType,
        seoableId: data.seoableId,
      },
    },
    create: data,
    update: data,
  });
};
