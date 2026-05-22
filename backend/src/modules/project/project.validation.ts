import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);
const optionalUrlSchema = z.string().url().optional().or(z.literal(""));
const detailJsonSchema = z.unknown().optional();

export const createProjectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  description: z.string().min(10),
  image: z.string().url(),
  categories: z.array(z.string()).default([]),
  metric: z.string().optional().or(z.literal("")),
  metricLabel: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  detailEyebrow: z.string().optional().or(z.literal("")),
  detailType: z.string().optional().or(z.literal("")),
  liveUrl: optionalUrlSchema,
  clientRepositoryUrl: optionalUrlSchema,
  serverRepositoryUrl: optionalUrlSchema,
  overview: z.string().optional().or(z.literal("")),
  problem: z.string().optional().or(z.literal("")),
  features: detailJsonSchema,
  roles: detailJsonSchema,
  architectureFlow: detailJsonSchema,
  techStack: detailJsonSchema,
  paymentTitle: z.string().optional().or(z.literal("")),
  paymentDescription: z.string().optional().or(z.literal("")),
  paymentReliabilityTitle: z.string().optional().or(z.literal("")),
  paymentReliabilityDescription: z.string().optional().or(z.literal("")),
  status: statusSchema.default("draft"),
});

export const updateProjectSchema = createProjectSchema.partial();
