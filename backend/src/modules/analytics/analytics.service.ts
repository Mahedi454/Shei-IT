import { prisma } from "../../config/prisma";
import { AnalyticsSettingsInput } from "./analytics.validation";

export type AnalyticsSettings = {
  googleAnalyticsEnabled: boolean;
  googleAnalyticsMeasurementId: string;
  googleTagManagerId: string;
  googleSearchConsoleVerification: string;
  metaPixelId: string;
  linkedInInsightTagId: string;
  customHeadScripts: string;
  customBodyScripts: string;
};

const settingKeys = [
  "googleAnalyticsEnabled",
  "googleAnalyticsMeasurementId",
  "googleTagManagerId",
  "googleSearchConsoleVerification",
  "metaPixelId",
  "linkedInInsightTagId",
  "customHeadScripts",
  "customBodyScripts",
] as const;

const defaultAnalyticsSettings: AnalyticsSettings = {
  googleAnalyticsEnabled: false,
  googleAnalyticsMeasurementId: "",
  googleTagManagerId: "",
  googleSearchConsoleVerification: "",
  metaPixelId: "",
  linkedInInsightTagId: "",
  customHeadScripts: "",
  customBodyScripts: "",
};

const normalizeSearchConsoleVerification = (value?: string) => {
  const trimmed = value?.trim() ?? "";
  const fullMetaMatch = trimmed.match(
    /^<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']\s*\/?>$/i,
  );

  return fullMetaMatch?.[1] ?? trimmed;
};

const serialize = (key: keyof AnalyticsSettings, value: AnalyticsSettings[keyof AnalyticsSettings]) =>
  key === "googleAnalyticsEnabled" ? String(Boolean(value)) : String(value ?? "").trim();

const deserializeSettings = (rows: { key: string; value: string }[]): AnalyticsSettings => {
  const settings = { ...defaultAnalyticsSettings };

  rows.forEach((row) => {
    if (!settingKeys.includes(row.key as (typeof settingKeys)[number])) {
      return;
    }

    if (row.key === "googleAnalyticsEnabled") {
      settings.googleAnalyticsEnabled = row.value === "true";
      return;
    }

    settings[row.key as Exclude<keyof AnalyticsSettings, "googleAnalyticsEnabled">] =
      row.value;
  });

  return settings;
};

export const getAnalyticsSettings = async () => {
  const rows = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: [...settingKeys],
      },
    },
  });

  return deserializeSettings(rows);
};

export const upsertAnalyticsSettings = async (input: AnalyticsSettingsInput) => {
  const settings: AnalyticsSettings = {
    ...defaultAnalyticsSettings,
    ...input,
    googleSearchConsoleVerification: normalizeSearchConsoleVerification(
      input.googleSearchConsoleVerification,
    ),
  };

  await prisma.$transaction(
    settingKeys.map((key) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: serialize(key, settings[key]) },
        create: { key, value: serialize(key, settings[key]) },
      }),
    ),
  );

  return getAnalyticsSettings();
};
