import { z } from "zod";

export const seoableTypeSchema = z.enum(["page", "service", "blog"]);

export const upsertSeoSchema = z.object({
  seoableType: seoableTypeSchema,
  seoableId: z.string().trim().min(1, "SEO item id is required."),
  metaTitle: z.string().trim().optional().or(z.literal("")),
  metaDescription: z.string().trim().optional().or(z.literal("")),
  focusKeyword: z.string().trim().optional().or(z.literal("")),
  slug: z.string().trim().optional().or(z.literal("")),
  canonicalUrl: z.string().trim().url("Canonical URL must be valid.").optional().or(z.literal("")),
  ogTitle: z.string().trim().optional().or(z.literal("")),
  ogDescription: z.string().trim().optional().or(z.literal("")),
  ogImage: z.string().trim().url("OG image must be a valid URL.").optional().or(z.literal("")),
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),
});

export const optionalSeoSchema = upsertSeoSchema
  .omit({ seoableType: true, seoableId: true })
  .partial();
