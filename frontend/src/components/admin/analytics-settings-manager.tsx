"use client";

import { RefreshCcw, Save, Signal } from "lucide-react";
import { useEffect, useState } from "react";

import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { useAdminFeedback } from "@/components/admin/admin-feedback-provider";
import { apiRequest } from "@/lib/api";
import { type AnalyticsSettings } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const emptySettings: AnalyticsSettings = {
  googleAnalyticsEnabled: false,
  googleAnalyticsMeasurementId: "",
  googleTagManagerId: "",
  googleSearchConsoleVerification: "",
  metaPixelId: "",
  linkedInInsightTagId: "",
  customHeadScripts: "",
  customBodyScripts: "",
};

const textFields = [
  {
    key: "googleAnalyticsMeasurementId",
    label: "Google Analytics Measurement ID",
    placeholder: "G-XXXXXXXXXX",
  },
  {
    key: "googleTagManagerId",
    label: "Google Tag Manager ID",
    placeholder: "GTM-XXXXXXX",
  },
  {
    key: "googleSearchConsoleVerification",
    label: "Google Search Console verification meta code",
    placeholder: "verification token or meta tag",
  },
  { key: "metaPixelId", label: "Meta Pixel ID", placeholder: "1234567890" },
  {
    key: "linkedInInsightTagId",
    label: "LinkedIn Insight Tag ID",
    placeholder: "1234567",
  },
] as const;

export function AnalyticsSettingsManager() {
  const { getToken } = useAdminAuth();
  const { showToast } = useAdminFeedback();
  const [initialSettings, setInitialSettings] =
    useState<AnalyticsSettings>(emptySettings);
  const [form, setForm] = useState<AnalyticsSettings>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = await getToken();
        const settings = await apiRequest<AnalyticsSettings>(
          "/analytics-settings/admin",
          { token },
        );
        setInitialSettings(settings);
        setForm(settings);
      } catch (error) {
        showToast({
          title: "Analytics settings could not be loaded",
          description: error instanceof Error ? error.message : "Please try again.",
          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [getToken, showToast]);

  const updateForm = (value: Partial<AnalyticsSettings>) => {
    setForm((current) => ({ ...current, ...value }));
  };

  const resetForm = () => {
    setForm(initialSettings);
    showToast({
      title: "Analytics form reset",
      description: "Unsaved changes have been cleared.",
      tone: "info",
    });
  };

  const saveSettings = async () => {
    setSaving(true);

    try {
      const token = await getToken();
      const settings = await apiRequest<AnalyticsSettings>(
        "/analytics-settings/admin",
        {
          method: "PUT",
          token,
          body: JSON.stringify(form),
        },
      );

      setInitialSettings(settings);
      setForm(settings);
      showToast({
        title: "Analytics settings saved",
        description: "Tracking configuration has been updated.",
        tone: "success",
      });
    } catch (error) {
      showToast({
        title: "Analytics save failed",
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="border-b border-[color:var(--stat-border)] pb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
          Analytics Manager
        </p>
        <h1 className="mt-3 text-[2.45rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
          Analytics Settings
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Manage analytics, tag managers, verification codes, pixels, and custom tracking snippets.
        </p>
      </div>

      <section className="py-8">
        <div className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
                <Signal className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-[1.5rem] font-semibold text-[color:var(--foreground)]">
                Tracking Configuration
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetForm}
                disabled={loading || saving}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 py-3 text-[13px] font-bold text-[color:var(--foreground)] disabled:opacity-60"
              >
                <RefreshCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={saveSettings}
                disabled={loading || saving}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-[13px] font-bold text-white disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              updateForm({
                googleAnalyticsEnabled: !form.googleAnalyticsEnabled,
              })
            }
            disabled={loading}
            className={cn(
              "admin-input flex min-h-[58px] w-full items-center justify-between gap-4 text-left",
              form.googleAnalyticsEnabled ? "text-[color:var(--primary)]" : "",
            )}
          >
            <span>
              <span className="block text-[14px] font-semibold">
                Enable Google Analytics
              </span>
              <span className="mt-1 block text-[12px] text-[color:var(--muted-foreground)]">
                {form.googleAnalyticsEnabled ? "Enabled" : "Disabled"}
              </span>
            </span>
            <span
              className={cn(
                "h-7 w-12 rounded-full p-1 transition",
                form.googleAnalyticsEnabled
                  ? "bg-[color:var(--primary)]"
                  : "bg-white/8",
              )}
            >
              <span
                className={cn(
                  "block h-5 w-5 rounded-full bg-white transition",
                  form.googleAnalyticsEnabled ? "translate-x-5" : "translate-x-0",
                )}
              />
            </span>
          </button>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {textFields.map((field) => (
              <label key={field.key} className="space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  {field.label}
                </span>
                <input
                  className="admin-input w-full"
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(event) =>
                    updateForm({ [field.key]: event.target.value })
                  }
                />
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Custom Head Scripts
              </span>
              <textarea
                className="admin-input min-h-56 w-full font-mono text-[12px] leading-6"
                value={form.customHeadScripts}
                onChange={(event) =>
                  updateForm({ customHeadScripts: event.target.value })
                }
              />
            </label>

            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Custom Body Scripts
              </span>
              <textarea
                className="admin-input min-h-56 w-full font-mono text-[12px] leading-6"
                value={form.customBodyScripts}
                onChange={(event) =>
                  updateForm({ customBodyScripts: event.target.value })
                }
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
