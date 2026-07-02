import { z } from "zod";

import { optionalSeoSchema } from "../seo/seo.validation";

const statusSchema = z.enum(["draft", "published"]);

const blockTypeSchema = z.enum([
  "paragraph",
  "heading",
  "list",
  "quote",
  "table",
  "code",
  "callout",
  "imageGrid",
  "image",
  "stat",
]);

// Permissive block schema: validates the discriminator only and passes the
// rest of the type-specific fields through untouched so future block shapes
// never trigger a 400.
const blockSchema = z
  .object({ type: blockTypeSchema })
  .passthrough();

export const createBlogSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters."),
  slug: z.string().trim().min(2, "Slug must be at least 2 characters.").optional(),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters."),
  content: z.string().trim().optional().or(z.literal("")),
  contentBlocks: z.array(blockSchema).optional(),
  coverImage: z.string().trim().url("Cover image must be a valid URL.").optional().or(z.literal("")),
  coverCaption: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  authorName: z.string().trim().optional().or(z.literal("")),
  authorRole: z.string().trim().optional().or(z.literal("")),
  authorAvatar: z.string().trim().url("Author avatar must be a valid URL.").optional().or(z.literal("")),
  authorBio: z.string().trim().optional().or(z.literal("")),
  readTime: z.string().trim().optional().or(z.literal("")),
  seoTitle: z.string().trim().optional().or(z.literal("")),
  seoDescription: z.string().trim().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  status: statusSchema.default("draft"),
  seo: optionalSeoSchema.optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
