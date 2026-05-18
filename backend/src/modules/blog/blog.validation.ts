import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);

export const createBlogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  status: statusSchema.default("draft"),
});

export const updateBlogSchema = createBlogSchema.partial();
