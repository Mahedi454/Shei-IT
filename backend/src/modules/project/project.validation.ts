import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);
const optionalUrlSchema = z.string().url().optional().or(z.literal(""));

const namedDescriptionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const featureGroupSchema = z.object({
  title: z.string().min(1),
  icon: z.string().optional().or(z.literal("")),
  items: z.array(z.string().min(1)).default([]),
});

const architectureStepSchema = z.object({
  number: z.string().optional().or(z.literal("")),
  title: z.string().min(1),
  description: z.string().min(1),
});

const techStackGroupSchema = z.object({
  title: z.string().min(1),
  tools: z.array(z.string().min(1)).default([]),
});

export const createProjectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  description: z.string().min(10),
  image: z.string().url(),
  categories: z.array(z.string()).default([]),
  metric: z.string().optional().or(z.literal("")),
  metricLabel: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  eyebrow: z.string().optional().or(z.literal("")),
  type: z.string().optional().or(z.literal("")),
  liveUrl: optionalUrlSchema,
  clientRepositoryUrl: optionalUrlSchema,
  serverRepositoryUrl: optionalUrlSchema,
  overview: z.string().optional().or(z.literal("")),
  primaryOutcome: z.string().optional().or(z.literal("")),
  delivery: z.string().optional().or(z.literal("")),
  purpose: z.string().optional().or(z.literal("")),
  features: z.array(featureGroupSchema).default([]),
  accessRoles: z.array(namedDescriptionSchema).default([]),
  architectureSteps: z.array(architectureStepSchema).default([]),
  integrationCards: z.array(namedDescriptionSchema).default([]),
  techStack: z.array(techStackGroupSchema).default([]),
  status: statusSchema.default("draft"),
});

export const updateProjectSchema = createProjectSchema.partial();
