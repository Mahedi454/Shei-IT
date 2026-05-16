import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  company: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  service: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(10),
});

export const updateContactSchema = z.object({
  status: z.enum(["new", "replied", "archived"]),
});
