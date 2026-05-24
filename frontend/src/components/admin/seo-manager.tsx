"use client";

import { Save, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";

import { useAdminAuth } from "./admin-auth-provider";
import { ActionConfirmModal } from "./action-confirm-modal";
import { useAdminFeedback } from "./admin-feedback-provider";

type SeoableType = "page" | "service";

type SeoItem = {
  label: string;
  type: SeoableType;
  id: string;
  path: string;
};

type SeoSetting = {
  seoableType: SeoableType;
  seoableId: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  slug?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
};

const seoItems: SeoItem[] = [
  { label: "Home page", type: "page", id: "home", path: "/" },
  { label: "Services page", type: "page", id: "services", path: "/services" },
  { label: "About page", type: "page", id: "about", path: "/about" },
  { label: "Portfolio page", type: "page", id: "portfolio", path: "/portfolio" },
  { label: "Contact page", type: "page", id: "contact", path: "/contact" },
  { label: "Blog page", type: "page", id: "blog", path: "/blog" },
  {
    label: "Website Development",
    type: "service",
    id: "website-development",
    path: "/services/website-development",
  },
  {
    label: "Mobile App Development",
    type: "service",
    id: "mobile-app-development",
    path: "/services/mobile-app-development",
  },
  {
    label: "Cross Platform Development",
    type: "service",
    id: "cross-platform-development",
    path: "/services/cross-platform-development",
  },
  {
    label: "UI/UX Design",
    type: "service",
    id: "ui-ux-design",
    path: "/services/ui-ux-design",
  },
  {
    label: "SEO & Marketing",
    type: "service",
    id: "seo-marketing",
    path: "/services/seo-marketing",
  },
  {
    label: "Hosting & Cloud",
    type: "service",
    id: "hosting-cloud",
    path: "/services/hosting-cloud",
  },
  {
    label: "Deployment DevOps",
    type: "service",
    id: "deployment-devops",
    path: "/services/deployment-devops",
  },
  {
    label: "Maintenance Support",
    type: "service",
    id: "maintenance-support",
    path: "/services/maintenance-support",
  },
];

const emptySeo = (item: SeoItem): SeoSetting => ({
  seoableType: item.type,
  seoableId: item.id,
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
  slug: item.path.replace(/^\//, ""),
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  robotsIndex: true,
  robotsFollow: true,
});

export function SeoManager() {
  const { getToken } = useAdminAuth();
  const { showToast } = useAdminFeedback();
  const [settings, setSettings] = useState<Record<string, SeoSetting>>({});
  const [activeKey, setActiveKey] = useState(`${seoItems[0].type}:${seoItems[0].id}`);
  const [saving, setSaving] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  const activeItem = useMemo(
    () => seoItems.find((item) => `${item.type}:${item.id}` === activeKey) ?? seoItems[0],
    [activeKey],
  );
  const form = settings[activeKey] ?? emptySeo(activeItem);
  const slugPreview = form.slug ? `/${String(form.slug).replace(/^\/+/, "")}` : activeItem.path;

  useEffect(() => {
    const loadSeo = async () => {
      try {
        const token = await getToken();
        const data = await apiRequest<SeoSetting[]>("/seo/admin/all", { token });
        setSettings(
          Object.fromEntries(
            data.map((item) => [`${item.seoableType}:${item.seoableId}`, item]),
          ),
        );
      } catch {
        showToast({
          title: "SEO settings unavailable",
          description: "We could not load the SEO workspace right now. Refresh or try again in a moment.",
          tone: "error",
        });
      }
    };

    loadSeo();
  }, [getToken, showToast]);

  const updateForm = (value: Partial<SeoSetting>) => {
    setSettings((current) => ({
      ...current,
      [activeKey]: { ...form, ...value },
    }));
  };

  const saveSeo = async () => {
    setSaving(true);

    try {
      const token = await getToken();
      const saved = await apiRequest<SeoSetting>("/seo/admin", {
        method: "PUT",
        token,
        body: JSON.stringify({
          ...form,
          seoableType: activeItem.type,
          seoableId: activeItem.id,
        }),
      });

      setSettings((current) => ({
        ...current,
        [`${saved.seoableType}:${saved.seoableId}`]: saved,
      }));
      showToast({
        title: "SEO settings saved",
        description: `${activeItem.label} SEO has been updated.`,
        tone: "success",
      });
      setConfirmSaveOpen(false);
    } catch {
      showToast({
        title: "SEO save failed",
        description: "We could not save these SEO changes right now. Please review them and try again.",
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
          SEO Manager
        </p>
        <h1 className="mt-3 text-[2.45rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
          SEO Settings
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Manage page titles, descriptions, social previews, canonical URLs, and robots rules.
        </p>
      </div>

      <div className="grid gap-7 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-2">
          {seoItems.map((item) => {
            const key = `${item.type}:${item.id}`;
            const active = key === activeKey;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveKey(key)}
                className={cn(
                  "flex w-full items-center justify-between rounded-[0.9rem] border px-3 py-3 text-left text-[13px] font-semibold transition",
                  active
                    ? "border-[color:var(--primary)] bg-[color:var(--button-secondary-icon)] text-[color:var(--foreground)]"
                    : "border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                )}
              >
                {item.label}
                <span className="text-[10px] uppercase tracking-[0.18em]">{item.type}</span>
              </button>
            );
          })}
        </aside>

        <section className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[1.5rem] font-semibold text-[color:var(--foreground)]">
                {activeItem.label}
              </h2>
              <p className="mt-1 text-[13px] text-[color:var(--muted-foreground)]">
                Route: {activeItem.path}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setConfirmSaveOpen(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-[13px] font-bold text-white disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save SEO"}
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="flex justify-between text-[13px] font-semibold text-[color:var(--foreground)]">
                SEO Title
                <span className="text-[11px] text-[color:var(--muted-foreground)]">
                  {(form.metaTitle ?? "").length}/60
                </span>
              </span>
              <input
                className="admin-input w-full"
                value={form.metaTitle ?? ""}
                onChange={(event) => updateForm({ metaTitle: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Focus Keyword
              </span>
              <input
                className="admin-input w-full"
                value={form.focusKeyword ?? ""}
                onChange={(event) => updateForm({ focusKeyword: event.target.value })}
              />
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="flex justify-between text-[13px] font-semibold text-[color:var(--foreground)]">
              Meta Description
              <span className="text-[11px] text-[color:var(--muted-foreground)]">
                {(form.metaDescription ?? "").length}/160
              </span>
            </span>
            <textarea
              className="admin-input min-h-24 w-full"
              value={form.metaDescription ?? ""}
              onChange={(event) => updateForm({ metaDescription: event.target.value })}
            />
          </label>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Slug
              </span>
              <input
                className="admin-input w-full"
                value={form.slug ?? ""}
                onChange={(event) => updateForm({ slug: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Canonical URL
              </span>
              <input
                className="admin-input w-full"
                value={form.canonicalUrl ?? ""}
                onChange={(event) => updateForm({ canonicalUrl: event.target.value })}
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                OG Title
              </span>
              <input
                className="admin-input w-full"
                value={form.ogTitle ?? ""}
                onChange={(event) => updateForm({ ogTitle: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                OG Image
              </span>
              <input
                className="admin-input w-full"
                value={form.ogImage ?? ""}
                onChange={(event) => updateForm({ ogImage: event.target.value })}
              />
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
              OG Description
            </span>
            <textarea
              className="admin-input min-h-20 w-full"
              value={form.ogDescription ?? ""}
              onChange={(event) => updateForm({ ogDescription: event.target.value })}
            />
          </label>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["robotsIndex", "Robots Index", form.robotsIndex ?? true],
                ["robotsFollow", "Robots Follow", form.robotsFollow ?? true],
              ] as const
            ).map(([key, label, active]) => (
              <button
                key={key}
                type="button"
                onClick={() => updateForm({ [key]: !active })}
                className={cn(
                  "admin-input flex h-[50px] items-center justify-between",
                  active ? "text-[color:var(--primary)]" : "",
                )}
              >
                <span>{label}</span>
                <span
                  className={cn(
                    "h-6 w-11 rounded-full p-1 transition",
                    active ? "bg-[color:var(--primary)]" : "bg-white/8",
                  )}
                >
                  <span
                    className={cn(
                      "block h-4 w-4 rounded-full bg-white transition",
                      active ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-[0.95rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-4">
            <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[color:var(--foreground)]">
              <Search className="h-4 w-4 text-[color:var(--primary)]" />
              Google preview
            </div>
            <p className="text-[12px] text-emerald-500">shei-it.com{slugPreview}</p>
            <p className="mt-1 text-[18px] font-medium text-[#8ab4f8]">
              {form.metaTitle || "SEO title preview"}
            </p>
            <p className="mt-1 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
              {form.metaDescription || "Meta description preview for this page."}
            </p>
          </div>
        </section>
      </div>

      <ActionConfirmModal
        open={confirmSaveOpen}
        onClose={() => setConfirmSaveOpen(false)}
        onConfirm={saveSeo}
        isLoading={saving}
        title="Review SEO changes"
        description={`Please confirm that you want to save the SEO settings for ${activeItem.label}.`}
        confirmLabel="Save SEO changes"
      />
    </div>
  );
}
