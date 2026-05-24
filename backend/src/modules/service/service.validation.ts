import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);
const accentSchema = z.enum([
  "violet",
  "blue",
  "mint",
  "orange",
  "pink",
  "purple",
  "sky",
  "indigo",
  "featured",
]);

const stringListSchema = z.array(z.string().min(1)).default([]);

const serviceStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const serviceInfoCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  accent: accentSchema.optional(),
});

const serviceReasonSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});

const serviceTechnologySchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().url(),
});

const servicePricingPackageSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  note: z.string().min(1),
  timeline: z.string().min(1),
  action: z.string().min(1),
  icon: z.string().min(1),
  accent: accentSchema,
  popular: z.boolean().default(false),
  features: stringListSchema,
});

const serviceFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const createServiceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  cardDescription: z.string().min(10),
  heroSummary: z.string().min(10),
  heroDescription: z.string().min(10),
  heroImageUrl: z.string().url().optional().or(z.literal("")),
  icon: z.string().min(1),
  accent: accentSchema,
  offersTitle: z.string().min(2),
  offersDescription: z.string().min(10),
  reasonsTitle: z.string().min(2),
  reasonsDescription: z.string().min(10),
  processTitle: z.string().min(2),
  processDescription: z.string().min(10),
  technologyTitle: z.string().min(2),
  technologyDescription: z.string().min(10),
  pricingTitle: z.string().min(2),
  pricingDescription: z.string().min(10),
  faqTitle: z.string().min(2),
  ctaTitle: z.string().min(2),
  ctaDescription: z.string().min(10),
  stats: z.array(serviceStatSchema).min(1),
  offers: z.array(serviceInfoCardSchema).min(1),
  reasons: z.array(serviceReasonSchema).min(1),
  processSteps: z.array(serviceInfoCardSchema).min(1),
  technologies: z.array(serviceTechnologySchema).min(1),
  pricingPackages: z.array(servicePricingPackageSchema).min(1),
  faqs: z.array(serviceFaqSchema).min(1),
  sortOrder: z.number().int().default(0),
  status: statusSchema.default("draft"),
});

export const updateServiceSchema = createServiceSchema.partial();
