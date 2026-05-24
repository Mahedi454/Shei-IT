import { z } from "zod";

const optionalTrimmed = z.string().trim().optional().or(z.literal(""));
const googleAnalyticsId = /^G-[A-Z0-9]{4,}$/i;
const googleTagManagerId = /^GTM-[A-Z0-9]{4,}$/i;
const metaPixelId = /^\d{5,30}$/;
const linkedInPartnerId = /^\d{5,30}$/;
const searchConsoleToken = /^[A-Za-z0-9_-]{16,200}$/;

const scriptSourceSchema = z
  .string()
  .trim()
  .max(20000, "Custom scripts must be 20,000 characters or less.")
  .refine((value) => !/<\/?(html|body|head|script)\b/i.test(value), {
    message: "Custom scripts must be JavaScript only, without html, head, body, or script tags.",
  })
  .optional()
  .or(z.literal(""));

const searchConsoleSchema = optionalTrimmed.refine(
  (value) => {
    if (!value) {
      return true;
    }

    const fullMetaMatch = value.match(
      /^<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']\s*\/?>$/i,
    );
    const token = fullMetaMatch?.[1] ?? value;

    return searchConsoleToken.test(token);
  },
  {
    message:
      "Google Search Console verification must be a valid verification token or meta tag.",
  },
);

export const analyticsSettingsSchema = z
  .object({
    googleAnalyticsEnabled: z.boolean().default(false),
    googleAnalyticsMeasurementId: optionalTrimmed.refine(
      (value) => !value || googleAnalyticsId.test(value),
      "Google Analytics Measurement ID must look like G-XXXXXXXX.",
    ),
    googleTagManagerId: optionalTrimmed.refine(
      (value) => !value || googleTagManagerId.test(value),
      "Google Tag Manager ID must look like GTM-XXXXXXX.",
    ),
    googleSearchConsoleVerification: searchConsoleSchema,
    metaPixelId: optionalTrimmed.refine(
      (value) => !value || metaPixelId.test(value),
      "Meta Pixel ID must be numeric.",
    ),
    linkedInInsightTagId: optionalTrimmed.refine(
      (value) => !value || linkedInPartnerId.test(value),
      "LinkedIn Insight Tag ID must be numeric.",
    ),
    customHeadScripts: scriptSourceSchema,
    customBodyScripts: scriptSourceSchema,
  })
  .refine(
    (value) =>
      !value.googleAnalyticsEnabled || Boolean(value.googleAnalyticsMeasurementId),
    {
      message: "Google Analytics Measurement ID is required when analytics is enabled.",
      path: ["googleAnalyticsMeasurementId"],
    },
  );

export type AnalyticsSettingsInput = z.infer<typeof analyticsSettingsSchema>;
