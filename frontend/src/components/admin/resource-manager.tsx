"use client";

import Image from "next/image";
import {
  CheckCheck,
  ExternalLink,
  Eye,
  FilePenLine,
  FolderPlus,
  PencilLine,
  Plus,
  Trash2,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { AdminModal } from "@/components/admin/admin-modal";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";

import { useAdminAuth } from "./admin-auth-provider";
import { useAdminFeedback } from "./admin-feedback-provider";

type ResourceType = "blogs" | "projects";
type PublishStatus = "draft" | "published";

type ResourceItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  description?: string | null;
  coverImage?: string | null;
  image?: string | null;
  tags?: string[];
  categories?: string[];
  metric?: string | null;
  metricLabel?: string | null;
  featured?: boolean;
  detailEyebrow?: string | null;
  detailType?: string | null;
  liveUrl?: string | null;
  clientRepositoryUrl?: string | null;
  serverRepositoryUrl?: string | null;
  overview?: string | null;
  problem?: string | null;
  features?: unknown;
  roles?: unknown;
  architectureFlow?: unknown;
  techStack?: unknown;
  paymentTitle?: string | null;
  paymentDescription?: string | null;
  paymentReliabilityTitle?: string | null;
  paymentReliabilityDescription?: string | null;
  status: PublishStatus;
  publishedAt?: string | null;
  createdAt: string;
};

type ResourceManagerProps = {
  resource: ResourceType;
  title: string;
};

const blogTagOptions = [
  "Web Development",
  "SEO",
  "Performance",
  "Growth",
  "Product",
  "Hosting",
  "Mobile",
  "Strategy",
  "Support",
] as const;

const projectCategoryOptions = [
  "Website",
  "SEO",
  "Hosting",
  "SaaS",
  "Booking",
  "Payment",
  "Branding",
  "Dashboard",
  "Analytics",
  "Mobile App",
  "UI/UX",
  "API",
] as const;

const initialForm = {
  content: "",
  description: "",
  excerpt: "",
  featured: false,
  detailEyebrow: "",
  detailType: "",
  liveUrl: "",
  clientRepositoryUrl: "",
  serverRepositoryUrl: "",
  overview: "",
  problem: "",
  featuresJson: `[
  {
    "title": "Public Experience",
    "icon": "public",
    "items": [
      "Responsive landing and discovery pages.",
      "Mobile-friendly project experience."
    ]
  }
]`,
  rolesJson: `[
  {
    "title": "Visitors",
    "description": "Explore the product and understand the core value."
  }
]`,
  architectureFlowJson: `[
  {
    "number": "01",
    "title": "Discovery",
    "description": "Users enter through the public experience."
  }
]`,
  techStackJson: `[
  {
    "title": "Frontend",
    "tools": ["Next.js", "React", "TypeScript", "Tailwind CSS"]
  }
]`,
  paymentTitle: "",
  paymentDescription: "",
  paymentReliabilityTitle: "",
  paymentReliabilityDescription: "",
  image: "",
  metric: "",
  metricLabel: "",
  selectedLabels: [] as string[],
  slug: "",
  status: "draft" as PublishStatus,
  title: "",
};

const formatJson = (value: unknown, fallback: string) => {
  if (value === null || typeof value === "undefined") {
    return fallback;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return fallback;
  }
};

const parseJsonField = (value: string, fieldLabel: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    throw new Error(`${fieldLabel} must be valid JSON.`);
  }
};

const normalizeOptionalText = (value: string) => {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

const normalizeOptionalUrl = (value: string) => {
  const trimmed = value.trim();
  return trimmed && trimmed !== "https://..." ? trimmed : undefined;
};

const normalizeOptionalDetailText = (value: string) => {
  const trimmed = value.trim();
  return trimmed && !["What the project is...", "Why it was built..."].includes(trimmed)
    ? trimmed
    : undefined;
};

export function ResourceManager({ resource, title }: ResourceManagerProps) {
  const isBlog = resource === "blogs";
  const { getToken } = useAdminAuth();
  const { showToast } = useAdminFeedback();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ResourceItem | null>(null);

  const labelOptions = isBlog ? blogTagOptions : projectCategoryOptions;

  const counts = useMemo(() => {
    const total = items.length;
    const published = items.filter((item) => item.status === "published").length;
    return { draft: total - published, published, total };
  }, [items]);

  const loadItems = async () => {
    setLoading(true);

    try {
      const token = await getToken();
      const data = await apiRequest<ResourceItem[]>(`/${resource}/admin/all`, { token });
      setItems(data);
    } catch (error) {
      showToast({
        title: `${title} could not be loaded`,
        description:
          error instanceof Error ? error.message : "Something went wrong while loading content.",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [resource]);

  const resetForm = () => {
    setEditing(null);
    setForm(initialForm);
  };

  const openCreateModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (item: ResourceItem) => {
    setEditing(item);
    setForm({
      content: item.content ?? "",
      description: item.description ?? "",
      excerpt: item.excerpt ?? "",
      featured: Boolean(item.featured),
      detailEyebrow: item.detailEyebrow ?? "",
      detailType: item.detailType ?? "",
      liveUrl: item.liveUrl ?? "",
      clientRepositoryUrl: item.clientRepositoryUrl ?? "",
      serverRepositoryUrl: item.serverRepositoryUrl ?? "",
      overview: item.overview ?? "",
      problem: item.problem ?? "",
      featuresJson: formatJson(item.features, initialForm.featuresJson),
      rolesJson: formatJson(item.roles, initialForm.rolesJson),
      architectureFlowJson: formatJson(
        item.architectureFlow,
        initialForm.architectureFlowJson,
      ),
      techStackJson: formatJson(item.techStack, initialForm.techStackJson),
      paymentTitle: item.paymentTitle ?? "",
      paymentDescription: item.paymentDescription ?? "",
      paymentReliabilityTitle: item.paymentReliabilityTitle ?? "",
      paymentReliabilityDescription: item.paymentReliabilityDescription ?? "",
      image: item.coverImage ?? item.image ?? "",
      metric: item.metric ?? "",
      metricLabel: item.metricLabel ?? "",
      selectedLabels: [...(item.tags ?? item.categories ?? [])],
      slug: item.slug ?? "",
      status: item.status ?? "draft",
      title: item.title ?? "",
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const toggleLabel = (value: string) => {
    setForm((current) => ({
      ...current,
      selectedLabels: current.selectedLabels.includes(value)
        ? current.selectedLabels.filter((item) => item !== value)
        : [...current.selectedLabels, value],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const token = await getToken();
      const payload = isBlog
        ? {
            title: form.title,
            slug: form.slug || undefined,
            excerpt: form.excerpt,
            content: form.content,
            coverImage: form.image,
            tags: form.selectedLabels,
            status: form.status,
          }
        : {
            title: form.title,
            slug: form.slug || undefined,
            description: form.description,
            image: form.image,
            categories: form.selectedLabels,
            metric: normalizeOptionalText(form.metric),
            metricLabel: normalizeOptionalText(form.metricLabel),
            featured: form.featured,
            detailEyebrow: normalizeOptionalText(form.detailEyebrow),
            detailType: normalizeOptionalText(form.detailType),
            liveUrl: normalizeOptionalUrl(form.liveUrl),
            clientRepositoryUrl: normalizeOptionalUrl(form.clientRepositoryUrl),
            serverRepositoryUrl: normalizeOptionalUrl(form.serverRepositoryUrl),
            overview: normalizeOptionalDetailText(form.overview),
            problem: normalizeOptionalDetailText(form.problem),
            features: parseJsonField(form.featuresJson, "Features"),
            roles: parseJsonField(form.rolesJson, "Roles"),
            architectureFlow: parseJsonField(
              form.architectureFlowJson,
              "Architecture flow",
            ),
            techStack: parseJsonField(form.techStackJson, "Tech stack"),
            paymentTitle: normalizeOptionalText(form.paymentTitle),
            paymentDescription: normalizeOptionalText(form.paymentDescription),
            paymentReliabilityTitle: normalizeOptionalText(form.paymentReliabilityTitle),
            paymentReliabilityDescription: normalizeOptionalText(
              form.paymentReliabilityDescription,
            ),
            status: form.status,
          };

      await apiRequest(
        editing ? `/${resource}/admin/${editing.id}` : `/${resource}/admin`,
        {
          method: editing ? "PATCH" : "POST",
          token,
          body: JSON.stringify(payload),
        },
      );

      showToast({
        title: editing ? `${title.slice(0, -1)} updated` : `${title.slice(0, -1)} created`,
        description: editing
          ? "Your content changes were saved successfully."
          : "The new item has been added successfully.",
        tone: "success",
      });

      closeModal();
      await loadItems();
    } catch (error) {
      showToast({
        title: `${title.slice(0, -1)} save failed`,
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      const token = await getToken();
      await apiRequest(`/${resource}/admin/${deleteTarget.id}`, {
        method: "DELETE",
        token,
      });

      showToast({
        title: `${title.slice(0, -1)} deleted`,
        description: "The item has been removed from the system.",
        tone: "success",
      });

      setDeleteTarget(null);
      await loadItems();
    } catch (error) {
      showToast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Please try again.",
        tone: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-[color:var(--stat-border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
            Content Manager
          </p>
          <h1 className="mt-3 text-[2.45rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            Review existing {title.toLowerCase()}, edit them in place, or add new ones
            without leaving the page.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)]"
        >
          <Plus className="h-4 w-4" />
          Add {title.slice(0, -1)}
        </button>
      </div>

      <div className="grid gap-4 border-b border-[color:var(--stat-border)] py-8 sm:grid-cols-3">
        {[
          ["Total", counts.total],
          ["Published", counts.published],
          ["Draft", counts.draft],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[1.15rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-4"
          >
            <p className="text-[13px] text-[color:var(--muted-foreground)]">{label}</p>
            <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
              {loading ? "—" : value}
            </p>
          </div>
        ))}
      </div>

      <div className="py-8">
        {loading ? (
          <p className="text-[14px] text-[color:var(--muted-foreground)]">
            Loading {title.toLowerCase()}...
          </p>
        ) : items.length ? (
          <div className="grid gap-6 xl:grid-cols-2">
            {items.map((item) => {
              const labels = item.tags ?? item.categories ?? [];
              const image = item.coverImage ?? item.image ?? "";

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)]"
                >
                  {image ? (
                    <div className="relative h-56 overflow-hidden border-b border-[color:var(--stat-border)]">
                      <img
                        src={image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center border-b border-[color:var(--stat-border)] bg-[color:var(--button-secondary-icon)] text-[14px] text-[color:var(--muted-foreground)]">
                      No preview image
                    </div>
                  )}

                  <div className="space-y-5 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-[12px] font-semibold capitalize",
                              item.status === "published"
                                ? "bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]"
                                : "bg-[color:var(--stat-bg)] text-[color:var(--muted-foreground)]",
                            )}
                          >
                            {item.status}
                          </span>
                          {!isBlog && item.featured ? (
                            <span className="rounded-full bg-[linear-gradient(180deg,rgba(111,231,200,0.18),rgba(111,231,200,0.08))] px-3 py-1 text-[12px] font-semibold text-[color:var(--mint)]">
                              Featured
                            </span>
                          ) : null}
                        </div>
                        <h2 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-[13px] text-[color:var(--muted-foreground)]">
                          /{item.slug}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--stat-border)] text-[color:var(--foreground)]"
                        >
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                      {isBlog ? item.excerpt : item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {labels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-3 py-1 text-[12px] font-medium text-[color:var(--primary)]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--stat-border)] pt-4">
                      <div className="text-[12px] text-[color:var(--muted-foreground)]">
                        {isBlog ? (
                          item.publishedAt ? (
                            <>Published {new Date(item.publishedAt).toLocaleDateString()}</>
                          ) : (
                            <>Draft saved {new Date(item.createdAt).toLocaleDateString()}</>
                          )
                        ) : item.metric || item.metricLabel ? (
                          <>
                            {item.metric || "Metric"} {item.metricLabel ? `/ ${item.metricLabel}` : ""}
                          </>
                        ) : (
                          <>Created {new Date(item.createdAt).toLocaleDateString()}</>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {item.status === "published" ? (
                          <a
                            href={isBlog ? `/blog` : `/portfolio/${item.slug}`}
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--primary)]"
                          >
                            <Eye className="h-4 w-4" />
                            View live
                          </a>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--foreground)]"
                        >
                          <FilePenLine className="h-4 w-4 text-[color:var(--primary)]" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[1.3rem] border border-dashed border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-12 text-center">
            <FolderPlus className="mx-auto h-10 w-10 text-[color:var(--primary)]" />
            <h3 className="mt-4 text-[1.35rem] font-semibold text-[color:var(--foreground)]">
              No {title.toLowerCase()} yet
            </h3>
            <p className="mt-2 text-[14px] text-[color:var(--muted-foreground)]">
              Add your first {title.slice(0, -1).toLowerCase()} to start populating the
              live frontend.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)]"
            >
              <Plus className="h-4 w-4" />
              Add {title.slice(0, -1)}
            </button>
          </div>
        )}
      </div>

      <AdminModal
        open={openModal}
        onClose={closeModal}
        title={editing ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}
        description={
          isBlog
            ? "Fill in the article details and choose the tags and publish status."
            : "Fill in the project content and portfolio metadata using image URLs for now."
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Title
              </span>
              <input
                className="admin-input w-full"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="Enter a strong title"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Slug
              </span>
              <input
                className="admin-input w-full"
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                placeholder="Optional custom slug"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
              {isBlog ? "Cover image URL" : "Project image URL"}
            </span>
            <input
              className="admin-input w-full"
              value={form.image}
              onChange={(event) =>
                setForm((current) => ({ ...current, image: event.target.value }))
              }
              placeholder="https://..."
            />
          </label>

          {form.image ? (
            <div className="overflow-hidden rounded-[1rem] border border-[color:var(--stat-border)]">
              <img
                src={form.image}
                alt="Preview"
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>
          ) : null}

          {isBlog ? (
            <>
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Excerpt
                </span>
                <textarea
                  className="admin-input min-h-24 w-full"
                  value={form.excerpt}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, excerpt: event.target.value }))
                  }
                  placeholder="Short summary for cards and previews"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Content
                </span>
                <textarea
                  className="admin-input min-h-56 w-full"
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, content: event.target.value }))
                  }
                  placeholder="Write the full blog content"
                />
              </label>
            </>
          ) : (
            <>
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Project description
                </span>
                <textarea
                  className="admin-input min-h-40 w-full"
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, description: event.target.value }))
                  }
                  placeholder="Describe the project, value, and scope"
                />
              </label>

              <div className="grid gap-4 lg:grid-cols-3">
                <label className="space-y-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Metric
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.metric}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, metric: event.target.value }))
                    }
                    placeholder="+42%"
                  />
                </label>
                <label className="space-y-2 lg:col-span-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Metric label
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.metricLabel}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        metricLabel: event.target.value,
                      }))
                    }
                    placeholder="More orders"
                  />
                </label>
              </div>

              <div className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5">
                <div className="mb-5">
                  <h3 className="text-[1.1rem] font-semibold text-[color:var(--foreground)]">
                    Project detail page
                  </h3>
                  <p className="mt-1 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                    These fields power the dynamic case-study page for this project.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Detail eyebrow
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.detailEyebrow}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          detailEyebrow: event.target.value,
                        }))
                      }
                      placeholder="Tutoring Marketplace Frontend"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Project type
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.detailType}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          detailType: event.target.value,
                        }))
                      }
                      placeholder="Full-stack marketplace frontend"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {[
                    ["Live URL", "liveUrl", "https://..."],
                    ["Client repository URL", "clientRepositoryUrl", "https://github.com/..."],
                    ["Server repository URL", "serverRepositoryUrl", "https://github.com/..."],
                  ].map(([label, key, placeholder]) => (
                    <label key={key} className="space-y-2">
                      <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                        {label}
                      </span>
                      <input
                        className="admin-input w-full"
                        value={String(form[key as keyof typeof form] ?? "")}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            [key]: event.target.value,
                          }))
                        }
                        placeholder={placeholder}
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Overview
                    </span>
                    <textarea
                      className="admin-input min-h-32 w-full"
                      value={form.overview}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, overview: event.target.value }))
                      }
                      placeholder="What the project is..."
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Problem / purpose
                    </span>
                    <textarea
                      className="admin-input min-h-32 w-full"
                      value={form.problem}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, problem: event.target.value }))
                      }
                      placeholder="Why it was built..."
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {[
                    ["Features JSON", "featuresJson"],
                    ["Roles JSON", "rolesJson"],
                    ["Architecture flow JSON", "architectureFlowJson"],
                    ["Tech stack JSON", "techStackJson"],
                  ].map(([label, key]) => (
                    <label key={key} className="space-y-2">
                      <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                        {label}
                      </span>
                      <textarea
                        className="admin-input min-h-52 w-full font-mono text-[12px]"
                        value={String(form[key as keyof typeof form] ?? "")}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            [key]: event.target.value,
                          }))
                        }
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Integration section title
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.paymentTitle}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          paymentTitle: event.target.value,
                        }))
                      }
                      placeholder="Stripe checkout with backend verification"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Reliability title
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.paymentReliabilityTitle}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          paymentReliabilityTitle: event.target.value,
                        }))
                      }
                      placeholder="Why it is reliable"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Integration description
                    </span>
                    <textarea
                      className="admin-input min-h-32 w-full"
                      value={form.paymentDescription}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          paymentDescription: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Reliability description
                    </span>
                    <textarea
                      className="admin-input min-h-32 w-full"
                      value={form.paymentReliabilityDescription}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          paymentReliabilityDescription: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                {isBlog ? "Choose tags" : "Choose categories"}
              </span>
              <span className="text-[12px] text-[color:var(--muted-foreground)]">
                {form.selectedLabels.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {labelOptions.map((label) => {
                const active = form.selectedLabels.includes(label);

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleLabel(label)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-semibold transition",
                      active
                        ? "border-transparent bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]"
                        : "border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                    )}
                  >
                    {active ? <CheckCheck className="h-3.5 w-3.5" /> : null}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Status
              </span>
              <select
                className="admin-input w-full"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as PublishStatus,
                  }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            {!isBlog ? (
              <label className="space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Featured
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({ ...current, featured: !current.featured }))
                  }
                  className={cn(
                    "admin-input flex h-[50px] items-center justify-between",
                    form.featured ? "text-[color:var(--primary)]" : "",
                  )}
                >
                  <span>{form.featured ? "Featured on" : "Feature on homepage"}</span>
                  <span
                    className={cn(
                      "h-6 w-11 rounded-full p-1 transition",
                      form.featured ? "bg-[color:var(--primary)]" : "bg-white/8",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-4 w-4 rounded-full bg-white transition",
                        form.featured ? "translate-x-5" : "translate-x-0",
                      )}
                    />
                  </span>
                </button>
              </label>
            ) : (
              <div />
            )}

            <div className="flex items-end">
              <a
                href={form.slug ? `/${isBlog ? "blog" : "portfolio"}/${form.slug}` : "#"}
                className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full border border-[color:var(--stat-border)] px-4 text-[13px] font-semibold text-[color:var(--foreground)]"
              >
                <ExternalLink className="h-4 w-4 text-[color:var(--primary)]" />
                Preview route
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-[color:var(--stat-border)] pt-5">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full border border-[color:var(--stat-border)] px-5 py-3 text-[14px] font-semibold text-[color:var(--foreground)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[color:var(--talk-bg)] px-6 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)] disabled:opacity-60"
            >
              {saving
                ? editing
                  ? "Updating..."
                  : "Creating..."
                : editing
                  ? `Update ${title.slice(0, -1)}`
                  : `Create ${title.slice(0, -1)}`}
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title={`Delete ${title.slice(0, -1)}?`}
        description="This action cannot be undone."
        widthClassName="max-w-lg"
      >
        <div className="space-y-5">
          <p className="text-[14px] leading-7 text-[color:var(--muted-foreground)]">
            You are about to permanently delete{" "}
            <span className="font-semibold text-[color:var(--foreground)]">
              {deleteTarget?.title}
            </span>
            .
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-full border border-[color:var(--stat-border)] px-5 py-3 text-[14px] font-semibold text-[color:var(--foreground)]"
            >
              Keep it
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full bg-rose-500 px-5 py-3 text-[14px] font-semibold text-white"
            >
              Delete now
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
