import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);

export const createBlogSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters."),
  slug: z.string().trim().min(2, "Slug must be at least 2 characters.").optional(),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters."),
  content: z.string().trim().min(20, "Content must be at least 20 characters."),
  coverImage: z.string().trim().url("Cover image must be a valid URL.").optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  authorName: z.string().trim().optional().or(z.literal("")),
  readTime: z.string().trim().optional().or(z.literal("")),
  seoTitle: z.string().trim().optional().or(z.literal("")),
  seoDescription: z.string().trim().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  status: statusSchema.default("draft"),
});

export const updateBlogSchema = createBlogSchema.partial();
