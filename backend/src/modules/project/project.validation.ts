import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);

export const createProjectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  description: z.string().min(10),
  image: z.string().url(),
  categories: z.array(z.string()).default([]),
  metric: z.string().optional().or(z.literal("")),
  metricLabel: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: statusSchema.default("draft"),
});

export const updateProjectSchema = createProjectSchema.partial();
