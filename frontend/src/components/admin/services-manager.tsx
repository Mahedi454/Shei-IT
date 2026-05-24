"use client";

import {
  CheckCheck,
  ExternalLink,
  FilePenLine,
  FolderPlus,
  Plus,
  Trash2,
} from "lucide-react";
import { type FormEvent, type ReactNode, useCallback, useEffect, useState } from "react";

import { AdminModal } from "@/components/admin/admin-modal";
import { ActionConfirmModal } from "@/components/admin/action-confirm-modal";
import { apiRequest } from "@/lib/api";
import {
  SERVICE_ACCENT_OPTIONS,
  SERVICE_ICON_OPTIONS,
  type PublishStatus,
  type Service,
  type ServiceAccent,
  type ServiceFaq,
  type ServiceInfoCard,
  type ServicePricingPackage,
  type ServiceReason,
  type ServiceStat,
  type ServiceTechnology,
} from "@/lib/services";
import { cn } from "@/lib/utils";

import { useAdminAuth } from "./admin-auth-provider";
import { useAdminFeedback } from "./admin-feedback-provider";

type ServiceForm = {
  title: string;
  slug: string;
  cardDescription: string;
  heroSummary: string;
  heroDescription: string;
  heroImageUrl: string;
  icon: string;
  accent: ServiceAccent;
  offersTitle: string;
  offersDescription: string;
  reasonsTitle: string;
  reasonsDescription: string;
  processTitle: string;
  processDescription: string;
  technologyTitle: string;
  technologyDescription: string;
  pricingTitle: string;
  pricingDescription: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  stats: ServiceStat[];
  offers: ServiceInfoCard[];
  reasons: ServiceReason[];
  processSteps: ServiceInfoCard[];
  technologies: ServiceTechnology[];
  pricingPackages: ServicePricingPackage[];
  faqs: ServiceFaq[];
  sortOrder: number;
  status: PublishStatus;
};

const createEmptyStat = (): ServiceStat => ({ value: "", label: "" });
const createEmptyInfoCard = (): ServiceInfoCard => ({
  title: "",
  description: "",
  icon: "code",
  accent: "violet",
});
const createEmptyReason = (): ServiceReason => ({
  title: "",
  description: "",
  icon: "shield",
});
const createEmptyTechnology = (): ServiceTechnology => ({
  label: "",
  imageUrl: "",
});
const createEmptyPricingPackage = (): ServicePricingPackage => ({
  name: "",
  description: "",
  price: "",
  note: "",
  timeline: "",
  action: "",
  icon: "send",
  accent: "violet",
  popular: false,
  features: [""],
});
const createEmptyFaq = (): ServiceFaq => ({ question: "", answer: "" });

const initialForm = (): ServiceForm => ({
  title: "",
  slug: "",
  cardDescription: "",
  heroSummary: "",
  heroDescription: "",
  heroImageUrl: "",
  icon: "code",
  accent: "violet",
  offersTitle: "Complete Service Solutions",
  offersDescription: "",
  reasonsTitle: "Why Choose Us",
  reasonsDescription: "",
  processTitle: "Our Development Process",
  processDescription: "",
  technologyTitle: "Technologies We Use",
  technologyDescription: "",
  pricingTitle: "Transparent Pricing for Every Business Stage",
  pricingDescription: "",
  faqTitle: "Frequently Asked Questions",
  ctaTitle: "Ready to Start Your Project?",
  ctaDescription: "",
  stats: [createEmptyStat()],
  offers: [createEmptyInfoCard()],
  reasons: [createEmptyReason()],
  processSteps: [createEmptyInfoCard()],
  technologies: [createEmptyTechnology()],
  pricingPackages: [createEmptyPricingPackage()],
  faqs: [createEmptyFaq()],
  sortOrder: 0,
  status: "draft",
});

const toFormState = (service: Service): ServiceForm => ({
  title: service.title,
  slug: service.slug,
  cardDescription: service.cardDescription,
  heroSummary: service.heroSummary,
  heroDescription: service.heroDescription,
  heroImageUrl: service.heroImageUrl ?? "",
  icon: service.icon,
  accent: service.accent,
  offersTitle: service.offersTitle,
  offersDescription: service.offersDescription,
  reasonsTitle: service.reasonsTitle,
  reasonsDescription: service.reasonsDescription,
  processTitle: service.processTitle,
  processDescription: service.processDescription,
  technologyTitle: service.technologyTitle,
  technologyDescription: service.technologyDescription,
  pricingTitle: service.pricingTitle,
  pricingDescription: service.pricingDescription,
  faqTitle: service.faqTitle,
  ctaTitle: service.ctaTitle,
  ctaDescription: service.ctaDescription,
  stats: service.stats.length ? service.stats : [createEmptyStat()],
  offers: service.offers.length ? service.offers : [createEmptyInfoCard()],
  reasons: service.reasons.length ? service.reasons : [createEmptyReason()],
  processSteps: service.processSteps.length ? service.processSteps : [createEmptyInfoCard()],
  technologies: service.technologies.length ? service.technologies : [createEmptyTechnology()],
  pricingPackages: service.pricingPackages.length
    ? service.pricingPackages
    : [createEmptyPricingPackage()],
  faqs: service.faqs.length ? service.faqs : [createEmptyFaq()],
  sortOrder: service.sortOrder,
  status: service.status,
});

export function ServicesManager() {
  const { getToken } = useAdminAuth();
  const { showToast } = useAdminFeedback();
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);

    try {
      const token = await getToken();
      const data = await apiRequest<Service[]>("/services/admin/all", { token });
      setItems(data);
    } catch {
      showToast({
        title: "Services unavailable",
        description: "We could not load services right now. Refresh or try again in a moment.",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [getToken, showToast]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadItems();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadItems]);

  const resetForm = () => {
    setEditing(null);
    setForm(initialForm());
  };

  const openCreateModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const openEditModal = (item: Service) => {
    setEditing(item);
    setForm(toFormState(item));
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setConfirmSaveOpen(false);
    resetForm();
  };

  const updateArrayItem = <T,>(key: keyof ServiceForm, index: number, value: T) => {
    setForm((current) => ({
      ...current,
      [key]: (current[key] as T[]).map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  };

  const addArrayItem = <T,>(key: keyof ServiceForm, value: T) => {
    setForm((current) => ({
      ...current,
      [key]: [...(current[key] as T[]), value],
    }));
  };

  const removeArrayItem = (key: keyof ServiceForm, index: number) => {
    setForm((current) => ({
      ...current,
      [key]: (current[key] as unknown[]).filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmSaveOpen(true);
  };

  const performSubmit = async () => {
    setSaving(true);

    try {
      const token = await getToken();
      await apiRequest(editing ? `/services/admin/${editing.id}` : "/services/admin", {
        method: editing ? "PATCH" : "POST",
        token,
        body: JSON.stringify({
          ...form,
          slug: form.slug || undefined,
          heroImageUrl: form.heroImageUrl || undefined,
          sortOrder: Number(form.sortOrder) || 0,
          pricingPackages: form.pricingPackages.map((pack) => ({
            ...pack,
            features: pack.features.filter(Boolean),
          })),
        }),
      });

      showToast({
        title: editing ? "Service updated" : "Service created",
        description: editing
          ? "Your service changes are now saved successfully."
          : "The new service has been created successfully.",
        tone: "success",
      });

      closeModal();
      await loadItems();
    } catch {
      showToast({
        title: "Service not saved",
        description: "We could not save this service right now. Please review the form and try again.",
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
      await apiRequest(`/services/admin/${deleteTarget.id}`, {
        method: "DELETE",
        token,
      });

      showToast({
        title: "Service deleted",
        description: "The service has been removed from the system.",
        tone: "success",
      });

      setDeleteTarget(null);
      await loadItems();
    } catch {
      showToast({
        title: "Delete failed",
        description: "We could not remove this service right now. Please try again in a moment.",
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
            Services
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            Manage service cards and fully dynamic service detail pages without changing
            the live design structure.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)]"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <div className="grid gap-4 border-b border-[color:var(--stat-border)] py-8 sm:grid-cols-3">
        {[
          ["Total", items.length],
          ["Published", items.filter((item) => item.status === "published").length],
          ["Draft", items.filter((item) => item.status === "draft").length],
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
          <p className="text-[14px] text-[color:var(--muted-foreground)]">Loading services...</p>
        ) : items.length ? (
          <div className="grid gap-6 xl:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)]"
              >
                {item.heroImageUrl ? (
                  <div className="relative h-56 overflow-hidden border-b border-[color:var(--stat-border)]">
                    <img
                      src={item.heroImageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex h-56 items-center justify-center border-b border-[color:var(--stat-border)] bg-[color:var(--button-secondary-icon)] text-[14px] text-[color:var(--muted-foreground)]">
                    No hero image URL
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
                        <span className="rounded-full border border-[color:var(--stat-border)] px-3 py-1 text-[12px] font-semibold text-[color:var(--foreground)]">
                          #{item.sortOrder}
                        </span>
                      </div>
                      <h2 className="mt-3 text-[1.6rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-[13px] text-[color:var(--muted-foreground)]">
                        /services/{item.slug}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--stat-border)] text-[color:var(--foreground)]"
                      >
                        <FilePenLine className="h-4 w-4" />
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
                    {item.cardDescription}
                  </p>

                  <div className="grid gap-2 text-[12px] text-[color:var(--muted-foreground)] sm:grid-cols-2">
                    <p>{item.stats.length} stats</p>
                    <p>{item.offers.length} offers</p>
                    <p>{item.reasons.length} reasons</p>
                    <p>{item.pricingPackages.length} pricing cards</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--stat-border)] pt-4">
                    <div className="text-[12px] text-[color:var(--muted-foreground)]">
                      Created {new Date(item.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-3">
                      {item.status === "published" ? (
                        <a
                          href={`/services/${item.slug}`}
                          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--primary)]"
                        >
                          <ExternalLink className="h-4 w-4" />
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
            ))}
          </div>
        ) : (
          <div className="rounded-[1.3rem] border border-dashed border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-6 py-12 text-center">
            <FolderPlus className="mx-auto h-10 w-10 text-[color:var(--primary)]" />
            <h3 className="mt-4 text-[1.35rem] font-semibold text-[color:var(--foreground)]">
              No services yet
            </h3>
            <p className="mt-2 text-[14px] text-[color:var(--muted-foreground)]">
              Add your first service to start populating the live frontend.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)]"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </button>
          </div>
        )}
      </div>

      <AdminModal
        open={openModal}
        onClose={closeModal}
        title={editing ? "Edit Service" : "Add Service"}
        description="Fill in the service card content and the detail-page sections. Image fields use URLs for now."
      >
        <form onSubmit={handleSubmit} className="space-y-8">
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
                placeholder="Website Development"
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
                placeholder="website-development"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Card icon
              </span>
              <select
                className="admin-input w-full"
                value={form.icon}
                onChange={(event) =>
                  setForm((current) => ({ ...current, icon: event.target.value }))
                }
              >
                {SERVICE_ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Card accent
              </span>
              <select
                className="admin-input w-full"
                value={form.accent}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    accent: event.target.value as ServiceAccent,
                  }))
                }
              >
                {SERVICE_ACCENT_OPTIONS.filter((accent) => accent !== "featured").map(
                  (accent) => (
                    <option key={accent} value={accent}>
                      {accent}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
              Card description
            </span>
            <textarea
              className="admin-input min-h-24 w-full"
              value={form.cardDescription}
              onChange={(event) =>
                setForm((current) => ({ ...current, cardDescription: event.target.value }))
              }
              placeholder="Short service summary for service cards"
            />
          </label>

          <div className="rounded-[1rem] border border-[color:var(--stat-border)] p-5">
            <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">
              Hero Section
            </h3>
            <div className="mt-4 space-y-4">
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Hero summary
                </span>
                <textarea
                  className="admin-input min-h-20 w-full"
                  value={form.heroSummary}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, heroSummary: event.target.value }))
                  }
                  placeholder="Modern, fast and scalable websites that drive results."
                />
              </label>
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Hero description
                </span>
                <textarea
                  className="admin-input min-h-32 w-full"
                  value={form.heroDescription}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      heroDescription: event.target.value,
                    }))
                  }
                  placeholder="Longer introduction for the service detail page"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Hero image URL
                </span>
                <input
                  className="admin-input w-full"
                  value={form.heroImageUrl}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, heroImageUrl: event.target.value }))
                  }
                  placeholder="https://..."
                />
              </label>
            </div>
          </div>

          <SectionRows
            title="Stats"
            actionLabel="Add stat"
            items={form.stats}
            onAdd={() => addArrayItem("stats", createEmptyStat())}
            onRemove={(index) => removeArrayItem("stats", index)}
            renderRow={(item, index) => (
              <div className="grid gap-3 lg:grid-cols-2">
                <input
                  className="admin-input w-full"
                  value={item.value}
                  onChange={(event) =>
                    updateArrayItem("stats", index, { ...item, value: event.target.value })
                  }
                  placeholder="150+"
                />
                <input
                  className="admin-input w-full"
                  value={item.label}
                  onChange={(event) =>
                    updateArrayItem("stats", index, { ...item, label: event.target.value })
                  }
                  placeholder="Websites Built"
                />
              </div>
            )}
          />

          <SectionCopyEditor
            title="Offers Section"
            heading={form.offersTitle}
            description={form.offersDescription}
            onHeadingChange={(value) =>
              setForm((current) => ({ ...current, offersTitle: value }))
            }
            onDescriptionChange={(value) =>
              setForm((current) => ({ ...current, offersDescription: value }))
            }
          />
          <InfoCardRows
            title="Offer Cards"
            actionLabel="Add offer"
            items={form.offers}
            onAdd={() => addArrayItem("offers", createEmptyInfoCard())}
            onRemove={(index) => removeArrayItem("offers", index)}
            onChange={(index, value) => updateArrayItem("offers", index, value)}
          />

          <SectionCopyEditor
            title="Reasons Section"
            heading={form.reasonsTitle}
            description={form.reasonsDescription}
            onHeadingChange={(value) =>
              setForm((current) => ({ ...current, reasonsTitle: value }))
            }
            onDescriptionChange={(value) =>
              setForm((current) => ({ ...current, reasonsDescription: value }))
            }
          />
          <SectionRows
            title="Reason Cards"
            actionLabel="Add reason"
            items={form.reasons}
            onAdd={() => addArrayItem("reasons", createEmptyReason())}
            onRemove={(index) => removeArrayItem("reasons", index)}
            renderRow={(item, index) => (
              <div className="grid gap-3">
                <div className="grid gap-3 lg:grid-cols-[1fr_1fr_220px]">
                  <input
                    className="admin-input w-full"
                    value={item.title}
                    onChange={(event) =>
                      updateArrayItem("reasons", index, { ...item, title: event.target.value })
                    }
                    placeholder="SEO-Friendly"
                  />
                  <input
                    className="admin-input w-full"
                    value={item.description}
                    onChange={(event) =>
                      updateArrayItem("reasons", index, {
                        ...item,
                        description: event.target.value,
                      })
                    }
                    placeholder="Built with clean code and best practices."
                  />
                  <select
                    className="admin-input w-full"
                    value={item.icon}
                    onChange={(event) =>
                      updateArrayItem("reasons", index, { ...item, icon: event.target.value })
                    }
                  >
                    {SERVICE_ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          />

          <SectionCopyEditor
            title="Process Section"
            heading={form.processTitle}
            description={form.processDescription}
            onHeadingChange={(value) =>
              setForm((current) => ({ ...current, processTitle: value }))
            }
            onDescriptionChange={(value) =>
              setForm((current) => ({ ...current, processDescription: value }))
            }
          />
          <InfoCardRows
            title="Process Steps"
            actionLabel="Add step"
            items={form.processSteps}
            onAdd={() => addArrayItem("processSteps", createEmptyInfoCard())}
            onRemove={(index) => removeArrayItem("processSteps", index)}
            onChange={(index, value) => updateArrayItem("processSteps", index, value)}
          />

          <SectionCopyEditor
            title="Technology Section"
            heading={form.technologyTitle}
            description={form.technologyDescription}
            onHeadingChange={(value) =>
              setForm((current) => ({ ...current, technologyTitle: value }))
            }
            onDescriptionChange={(value) =>
              setForm((current) => ({
                ...current,
                technologyDescription: value,
              }))
            }
          />
          <SectionRows
            title="Technologies"
            actionLabel="Add technology"
            items={form.technologies}
            onAdd={() => addArrayItem("technologies", createEmptyTechnology())}
            onRemove={(index) => removeArrayItem("technologies", index)}
            renderRow={(item, index) => (
              <div className="grid gap-3 lg:grid-cols-2">
                <input
                  className="admin-input w-full"
                  value={item.label}
                  onChange={(event) =>
                    updateArrayItem("technologies", index, {
                      ...item,
                      label: event.target.value,
                    })
                  }
                  placeholder="React"
                />
                <input
                  className="admin-input w-full"
                  value={item.imageUrl}
                  onChange={(event) =>
                    updateArrayItem("technologies", index, {
                      ...item,
                      imageUrl: event.target.value,
                    })
                  }
                  placeholder="https://..."
                />
              </div>
            )}
          />

          <SectionCopyEditor
            title="Pricing Section"
            heading={form.pricingTitle}
            description={form.pricingDescription}
            onHeadingChange={(value) =>
              setForm((current) => ({ ...current, pricingTitle: value }))
            }
            onDescriptionChange={(value) =>
              setForm((current) => ({ ...current, pricingDescription: value }))
            }
          />
          <SectionRows
            title="Pricing Packages"
            actionLabel="Add package"
            items={form.pricingPackages}
            onAdd={() => addArrayItem("pricingPackages", createEmptyPricingPackage())}
            onRemove={(index) => removeArrayItem("pricingPackages", index)}
            renderRow={(item, index) => (
              <div className="space-y-3">
                <div className="grid gap-3 lg:grid-cols-2">
                  <input
                    className="admin-input w-full"
                    value={item.name}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        name: event.target.value,
                      })
                    }
                    placeholder="Starter Package"
                  />
                  <input
                    className="admin-input w-full"
                    value={item.description}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        description: event.target.value,
                      })
                    }
                    placeholder="Best for startups and small businesses."
                  />
                </div>
                <div className="grid gap-3 lg:grid-cols-3">
                  <input
                    className="admin-input w-full"
                    value={item.price}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        price: event.target.value,
                      })
                    }
                    placeholder="$149"
                  />
                  <input
                    className="admin-input w-full"
                    value={item.note}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        note: event.target.value,
                      })
                    }
                    placeholder="Starter website package"
                  />
                  <input
                    className="admin-input w-full"
                    value={item.timeline}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        timeline: event.target.value,
                      })
                    }
                    placeholder="5 - 7 days"
                  />
                </div>
                <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
                  <input
                    className="admin-input w-full"
                    value={item.action}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        action: event.target.value,
                      })
                    }
                    placeholder="Get Started"
                  />
                  <select
                    className="admin-input w-full"
                    value={item.icon}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        icon: event.target.value,
                      })
                    }
                  >
                    {SERVICE_ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <select
                    className="admin-input w-full"
                    value={item.accent}
                    onChange={(event) =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        accent: event.target.value as ServiceAccent,
                      })
                    }
                  >
                    {SERVICE_ACCENT_OPTIONS.map((accent) => (
                      <option key={accent} value={accent}>
                        {accent}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-3 text-[13px] font-semibold text-[color:var(--foreground)]">
                  <button
                    type="button"
                    onClick={() =>
                      updateArrayItem("pricingPackages", index, {
                        ...item,
                        popular: !item.popular,
                      })
                    }
                    className={cn(
                      "inline-flex h-6 w-11 rounded-full p-1 transition",
                      item.popular ? "bg-[color:var(--primary)]" : "bg-white/8",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-4 w-4 rounded-full bg-white transition",
                        item.popular ? "translate-x-5" : "translate-x-0",
                      )}
                    />
                  </button>
                  Mark as popular
                </label>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Features
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateArrayItem("pricingPackages", index, {
                          ...item,
                          features: [...item.features, ""],
                        })
                      }
                      className="text-[12px] font-semibold text-[color:var(--primary)]"
                    >
                      Add feature
                    </button>
                  </div>
                  {item.features.map((feature, featureIndex) => (
                    <div key={`${index}-${featureIndex}`} className="flex gap-2">
                      <input
                        className="admin-input w-full"
                        value={feature}
                        onChange={(event) =>
                          updateArrayItem("pricingPackages", index, {
                            ...item,
                            features: item.features.map((entry, entryIndex) =>
                              entryIndex === featureIndex ? event.target.value : entry,
                            ),
                          })
                        }
                        placeholder="Responsive Design"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateArrayItem("pricingPackages", index, {
                            ...item,
                            features: item.features.filter(
                              (_, entryIndex) => entryIndex !== featureIndex,
                            ),
                          })
                        }
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

          <div className="rounded-[1rem] border border-[color:var(--stat-border)] p-5">
            <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">
              FAQ & CTA
            </h3>
            <div className="mt-4 grid gap-4">
              <input
                className="admin-input w-full"
                value={form.faqTitle}
                onChange={(event) =>
                  setForm((current) => ({ ...current, faqTitle: event.target.value }))
                }
                placeholder="Frequently Asked Questions"
              />
              <input
                className="admin-input w-full"
                value={form.ctaTitle}
                onChange={(event) =>
                  setForm((current) => ({ ...current, ctaTitle: event.target.value }))
                }
                placeholder="Ready to Start Your Project?"
              />
              <textarea
                className="admin-input min-h-24 w-full"
                value={form.ctaDescription}
                onChange={(event) =>
                  setForm((current) => ({ ...current, ctaDescription: event.target.value }))
                }
                placeholder="Let's turn your idea into a powerful digital solution."
              />
            </div>
          </div>

          <SectionRows
            title="FAQs"
            actionLabel="Add FAQ"
            items={form.faqs}
            onAdd={() => addArrayItem("faqs", createEmptyFaq())}
            onRemove={(index) => removeArrayItem("faqs", index)}
            renderRow={(item, index) => (
              <div className="grid gap-3">
                <input
                  className="admin-input w-full"
                  value={item.question}
                  onChange={(event) =>
                    updateArrayItem("faqs", index, {
                      ...item,
                      question: event.target.value,
                    })
                  }
                  placeholder="How fast can you build my website?"
                />
                <textarea
                  className="admin-input min-h-20 w-full"
                  value={item.answer}
                  onChange={(event) =>
                    updateArrayItem("faqs", index, {
                      ...item,
                      answer: event.target.value,
                    })
                  }
                  placeholder="Starter websites usually take..."
                />
              </div>
            )}
          />

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_140px]">
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
            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Sort order
              </span>
              <input
                className="admin-input w-full"
                type="number"
                value={form.sortOrder}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    sortOrder: Number(event.target.value),
                  }))
                }
              />
            </label>
            <div className="flex items-end">
              <a
                href={form.slug ? `/services/${form.slug}` : "#"}
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
                  ? "Update Service"
                  : "Create Service"}
            </button>
          </div>
        </form>
      </AdminModal>

      <AdminModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete service?"
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
              Yes, delete it
            </button>
          </div>
        </div>
      </AdminModal>

      <ActionConfirmModal
        open={confirmSaveOpen}
        onClose={() => setConfirmSaveOpen(false)}
        onConfirm={performSubmit}
        isLoading={saving}
        title={editing ? "Review service update" : "Review new service"}
        description={
          editing
            ? "Please confirm that you want to save these service changes before they are applied."
            : "Please confirm that this service is ready to be created before we add it to the system."
        }
        confirmLabel={editing ? "Save service changes" : "Create service"}
      />
    </div>
  );
}

function SectionCopyEditor({
  title,
  heading,
  description,
  onHeadingChange,
  onDescriptionChange,
}: {
  title: string;
  heading: string;
  description: string;
  onHeadingChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[1rem] border border-[color:var(--stat-border)] p-5">
      <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">{title}</h3>
      <div className="mt-4 grid gap-4">
        <input
          className="admin-input w-full"
          value={heading}
          onChange={(event) => onHeadingChange(event.target.value)}
          placeholder="Section heading"
        />
        <textarea
          className="admin-input min-h-24 w-full"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Section description"
        />
      </div>
    </div>
  );
}

function InfoCardRows({
  title,
  actionLabel,
  items,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  actionLabel: string;
  items: ServiceInfoCard[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: ServiceInfoCard) => void;
}) {
  return (
    <SectionRows
      title={title}
      actionLabel={actionLabel}
      items={items}
      onAdd={onAdd}
      onRemove={onRemove}
      renderRow={(item, index) => (
        <div className="grid gap-3">
          <div className="grid gap-3 lg:grid-cols-2">
            <input
              className="admin-input w-full"
              value={item.title}
              onChange={(event) => onChange(index, { ...item, title: event.target.value })}
              placeholder="Card title"
            />
            <input
              className="admin-input w-full"
              value={item.description}
              onChange={(event) =>
                onChange(index, { ...item, description: event.target.value })
              }
              placeholder="Card description"
            />
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <select
              className="admin-input w-full"
              value={item.icon}
              onChange={(event) => onChange(index, { ...item, icon: event.target.value })}
            >
              {SERVICE_ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <select
              className="admin-input w-full"
              value={item.accent ?? "violet"}
              onChange={(event) =>
                onChange(index, {
                  ...item,
                  accent: event.target.value as ServiceAccent,
                })
              }
            >
              {SERVICE_ACCENT_OPTIONS.filter((accent) => accent !== "featured").map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    />
  );
}

function SectionRows<T>({
  title,
  actionLabel,
  items,
  onAdd,
  onRemove,
  renderRow,
}: {
  title: string;
  actionLabel: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderRow: (item: T, index: number) => ReactNode;
}) {
  return (
    <div className="rounded-[1rem] border border-[color:var(--stat-border)] p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--primary)]"
        >
          <CheckCheck className="h-4 w-4" />
          {actionLabel}
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-[0.95rem] border border-[color:var(--stat-border)] p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                Item {index + 1}
              </span>
              {items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            {renderRow(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
