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
import { ActionConfirmModal } from "@/components/admin/action-confirm-modal";
import { BlogBlocksEditor } from "@/components/admin/blog-blocks-editor";
import { servicesSection } from "@/config/site";
import { apiRequest } from "@/lib/api";
import {
  blocksToPlainText,
  cleanBlocks,
  normalizeBlocks,
  type BlogBlock,
} from "@/lib/blog-blocks";
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
  contentBlocks?: unknown;
  description?: string | null;
  coverImage?: string | null;
  coverCaption?: string | null;
  image?: string | null;
  category?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  authorAvatar?: string | null;
  authorBio?: string | null;
  readTime?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  tags?: string[];
  categories?: string[];
  metric?: string | null;
  metricLabel?: string | null;
  featured?: boolean;
  eyebrow?: string | null;
  type?: string | null;
  liveUrl?: string | null;
  clientRepositoryUrl?: string | null;
  serverRepositoryUrl?: string | null;
  overview?: string | null;
  primaryOutcome?: string | null;
  delivery?: string | null;
  purpose?: string | null;
  features?: unknown;
  accessRoles?: unknown;
  architectureSteps?: unknown;
  integrationCards?: unknown;
  techStack?: unknown;
  status: PublishStatus;
  publishedAt?: string | null;
  createdAt: string;
  seo?: SeoForm | null;
};

type SeoForm = {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  slug: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
};

type DetailCard = {
  title: string;
  description: string;
};

type FeatureGroup = {
  title: string;
  icon: string;
  items: string[];
};

type ArchitectureStep = DetailCard & {
  number: string;
};

type TechStackGroup = {
  title: string;
  tools: string[];
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

const blogCategoryOptions: string[] = servicesSection.items.map(
  (service) => service.title,
);
const defaultBlogCategory = blogCategoryOptions[0] ?? "General";

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

const defaultFeatures: FeatureGroup[] = [
  {
    title: "Product Scope",
    icon: "dashboard",
    items: [
      "Visitor-facing pages for discovery and conversion.",
      "Admin-managed content and project data.",
      "Responsive layouts for mobile and desktop.",
    ],
  },
];

const defaultAccessRoles: DetailCard[] = [
  {
    title: "Visitors",
    description: "Explore the product and understand the core value.",
  },
];

const defaultArchitectureSteps: ArchitectureStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Users enter through the public experience.",
  },
];

const defaultIntegrationCards: DetailCard[] = [
  {
    title: "Workflow behavior",
    description:
      "Important user actions are coordinated with backend-confirmed state.",
  },
  {
    title: "Why it is reliable",
    description: "The interface keeps important status checks tied to the API.",
  },
];

const defaultTechStack: TechStackGroup[] = [
  {
    title: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    tools: ["Node.js", "Express", "Prisma"],
  },
  {
    title: "Database",
    tools: ["PostgreSQL"],
  },
];

const initialForm = {
  content: "",
  contentBlocks: [] as BlogBlock[],
  description: "",
  excerpt: "",
  featured: false,
  category: defaultBlogCategory,
  authorName: "Shei IT Team",
  authorRole: "",
  authorAvatar: "",
  authorBio: "",
  coverCaption: "",
  readTime: "",
  seoTitle: "",
  seoDescription: "",
  eyebrow: "",
  type: "",
  liveUrl: "",
  clientRepositoryUrl: "",
  serverRepositoryUrl: "",
  overview: "",
  primaryOutcome: "",
  delivery: "",
  purpose: "",
  features: defaultFeatures,
  accessRoles: defaultAccessRoles,
  architectureSteps: defaultArchitectureSteps,
  integrationCards: defaultIntegrationCards,
  techStack: defaultTechStack,
  image: "",
  metric: "",
  metricLabel: "",
  selectedLabels: [] as string[],
  slug: "",
  status: "draft" as PublishStatus,
  title: "",
  seo: {
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    slug: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    robotsIndex: true as boolean,
    robotsFollow: true as boolean,
  } satisfies SeoForm,
};

const createDefaultSeo = (): SeoForm => ({
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
  slug: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  robotsIndex: true,
  robotsFollow: true,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const readDetailCards = (
  value: unknown,
  fallback: DetailCard[],
): DetailCard[] => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const parsed = value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      return {
        title: typeof item.title === "string" ? item.title : "",
        description:
          typeof item.description === "string" ? item.description : "",
      };
    })
    .filter((item): item is DetailCard =>
      Boolean(item?.title || item?.description),
    );

  return parsed.length ? parsed : fallback;
};

const readFeatures = (value: unknown): FeatureGroup[] => {
  if (!Array.isArray(value)) {
    return defaultFeatures;
  }

  const parsed = value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      return {
        title: typeof item.title === "string" ? item.title : "",
        icon: typeof item.icon === "string" ? item.icon : "",
        items: Array.isArray(item.items)
          ? item.items.filter(
              (entry): entry is string => typeof entry === "string",
            )
          : [],
      };
    })
    .filter((item): item is FeatureGroup =>
      Boolean(item?.title || item?.items.length),
    );

  return parsed.length ? parsed : defaultFeatures;
};

const readArchitectureSteps = (value: unknown): ArchitectureStep[] => {
  if (!Array.isArray(value)) {
    return defaultArchitectureSteps;
  }

  const parsed = value
    .map((item, index) => {
      if (!isRecord(item)) {
        return null;
      }

      return {
        number:
          typeof item.number === "string"
            ? item.number
            : String(index + 1).padStart(2, "0"),
        title: typeof item.title === "string" ? item.title : "",
        description:
          typeof item.description === "string" ? item.description : "",
      };
    })
    .filter((item): item is ArchitectureStep =>
      Boolean(item?.title || item?.description),
    );

  return parsed.length ? parsed : defaultArchitectureSteps;
};

const readTechStack = (value: unknown): TechStackGroup[] => {
  if (!Array.isArray(value)) {
    return defaultTechStack;
  }

  const parsed = value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      return {
        title: typeof item.title === "string" ? item.title : "",
        tools: Array.isArray(item.tools)
          ? item.tools.filter(
              (entry): entry is string => typeof entry === "string",
            )
          : [],
      };
    })
    .filter((item): item is TechStackGroup =>
      Boolean(item?.title || item?.tools.length),
    );

  return parsed.length ? parsed : defaultTechStack;
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
  return trimmed &&
    !["What the project is...", "Why it was built..."].includes(trimmed)
    ? trimmed
    : undefined;
};

const cleanFeatures = (features: FeatureGroup[]) =>
  features
    .map((feature) => ({
      title: feature.title.trim(),
      icon: feature.icon.trim(),
      items: feature.items.map((item) => item.trim()).filter(Boolean),
    }))
    .filter((feature) => feature.title && feature.items.length);

const cleanDetailCards = (cards: DetailCard[]) =>
  cards
    .map((card) => ({
      title: card.title.trim(),
      description: card.description.trim(),
    }))
    .filter((card) => card.title && card.description);

const cleanArchitectureSteps = (steps: ArchitectureStep[]) =>
  steps
    .map((step, index) => ({
      number: step.number.trim() || String(index + 1).padStart(2, "0"),
      title: step.title.trim(),
      description: step.description.trim(),
    }))
    .filter((step) => step.title && step.description);

const cleanTechStack = (groups: TechStackGroup[]) =>
  groups
    .map((group) => ({
      title: group.title.trim(),
      tools: group.tools.map((tool) => tool.trim()).filter(Boolean),
    }))
    .filter((group) => group.title && group.tools.length);

// Seed the block editor: use stored blocks when present, otherwise convert a
// legacy plain-text `content` string into paragraph blocks so old posts remain
// editable in the new editor.
const seedBlocks = (blocks: unknown, content?: string | null): BlogBlock[] => {
  const parsed = normalizeBlocks(blocks);
  if (parsed.length > 0) {
    return parsed;
  }

  if (!content || !content.trim()) {
    return [];
  }

  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({ type: "paragraph" as const, text: paragraph }));
};

function SeoEditor({
  seo,
  updateSeo,
}: {
  seo: SeoForm;
  updateSeo: (value: Partial<SeoForm>) => void;
}) {
  const slugPreview = seo.slug
    ? `/${seo.slug.replace(/^\/+/, "")}`
    : "/your-slug";
  const previewTitle = seo.metaTitle || "SEO title preview";
  const previewDescription =
    seo.metaDescription || "Meta description preview for search results.";

  return (
    <section className="rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5">
      <div className="mb-5">
        <h3 className="text-[1.1rem] font-semibold text-[color:var(--foreground)]">
          SEO Settings
        </h3>
        <p className="mt-1 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
          Control search previews, social sharing, canonical URL, and robots
          rules.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="flex items-center justify-between gap-3 text-[13px] font-semibold text-[color:var(--foreground)]">
            SEO Title
            <span className="text-[11px] text-[color:var(--muted-foreground)]">
              {seo.metaTitle.length}/60
            </span>
          </span>
          <input
            className="admin-input w-full"
            value={seo.metaTitle}
            onChange={(event) => updateSeo({ metaTitle: event.target.value })}
            placeholder="Search result title"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
            Focus Keyword
          </span>
          <input
            className="admin-input w-full"
            value={seo.focusKeyword}
            onChange={(event) =>
              updateSeo({ focusKeyword: event.target.value })
            }
            placeholder="Primary keyword"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="flex items-center justify-between gap-3 text-[13px] font-semibold text-[color:var(--foreground)]">
          Meta Description
          <span className="text-[11px] text-[color:var(--muted-foreground)]">
            {seo.metaDescription.length}/160
          </span>
        </span>
        <textarea
          className="admin-input min-h-24 w-full"
          value={seo.metaDescription}
          onChange={(event) =>
            updateSeo({ metaDescription: event.target.value })
          }
          placeholder="Search result description"
        />
      </label>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
            Slug
          </span>
          <input
            className="admin-input w-full"
            value={seo.slug}
            onChange={(event) => updateSeo({ slug: event.target.value })}
            placeholder="page-slug"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
            Canonical URL
          </span>
          <input
            className="admin-input w-full"
            value={seo.canonicalUrl}
            onChange={(event) =>
              updateSeo({ canonicalUrl: event.target.value })
            }
            placeholder="https://example.com/page"
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
            value={seo.ogTitle}
            onChange={(event) => updateSeo({ ogTitle: event.target.value })}
            placeholder="Social share title"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
            OG Image
          </span>
          <input
            className="admin-input w-full"
            value={seo.ogImage}
            onChange={(event) => updateSeo({ ogImage: event.target.value })}
            placeholder="https://example.com/og.jpg"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
          OG Description
        </span>
        <textarea
          className="admin-input min-h-20 w-full"
          value={seo.ogDescription}
          onChange={(event) => updateSeo({ ogDescription: event.target.value })}
          placeholder="Social share description"
        />
      </label>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => updateSeo({ robotsIndex: !seo.robotsIndex })}
          className={cn(
            "admin-input flex h-[50px] items-center justify-between",
            seo.robotsIndex ? "text-[color:var(--primary)]" : "",
          )}
        >
          <span>Robots Index</span>
          <span
            className={cn(
              "h-6 w-11 rounded-full p-1 transition",
              seo.robotsIndex ? "bg-[color:var(--primary)]" : "bg-white/8",
            )}
          >
            <span
              className={cn(
                "block h-4 w-4 rounded-full bg-white transition",
                seo.robotsIndex ? "translate-x-5" : "translate-x-0",
              )}
            />
          </span>
        </button>
        <button
          type="button"
          onClick={() => updateSeo({ robotsFollow: !seo.robotsFollow })}
          className={cn(
            "admin-input flex h-[50px] items-center justify-between",
            seo.robotsFollow ? "text-[color:var(--primary)]" : "",
          )}
        >
          <span>Robots Follow</span>
          <span
            className={cn(
              "h-6 w-11 rounded-full p-1 transition",
              seo.robotsFollow ? "bg-[color:var(--primary)]" : "bg-white/8",
            )}
          >
            <span
              className={cn(
                "block h-4 w-4 rounded-full bg-white transition",
                seo.robotsFollow ? "translate-x-5" : "translate-x-0",
              )}
            />
          </span>
        </button>
      </div>

      <div className="mt-5 rounded-[0.95rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-4">
        <p className="text-[12px] text-emerald-500">shei-it.com{slugPreview}</p>
        <p className="mt-1 text-[18px] font-medium text-[#8ab4f8]">
          {previewTitle}
        </p>
        <p className="mt-1 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
          {previewDescription}
        </p>
      </div>
    </section>
  );
}

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
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ResourceItem | null>(null);

  const labelOptions = isBlog ? blogTagOptions : projectCategoryOptions;

  const counts = useMemo(() => {
    const total = items.length;
    const published = items.filter(
      (item) => item.status === "published",
    ).length;
    return { draft: total - published, published, total };
  }, [items]);

  const loadItems = async () => {
    setLoading(true);

    try {
      const token = await getToken();
      const data = await apiRequest<ResourceItem[]>(`/${resource}/admin/all`, {
        token,
      });
      setItems(data);
    } catch (error) {
      showToast({
        title: `${title} unavailable`,
        description: `We could not load ${title.toLowerCase()} right now. Refresh or try again in a moment.`,
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
      contentBlocks: seedBlocks(item.contentBlocks, item.content),
      description: item.description ?? "",
      excerpt: item.excerpt ?? "",
      featured: Boolean(item.featured),
      category: item.category ?? defaultBlogCategory,
      authorName: item.authorName ?? "Shei IT Team",
      authorRole: item.authorRole ?? "",
      authorAvatar: item.authorAvatar ?? "",
      authorBio: item.authorBio ?? "",
      coverCaption: item.coverCaption ?? "",
      readTime: item.readTime ?? "",
      seoTitle: item.seoTitle ?? "",
      seoDescription: item.seoDescription ?? "",
      eyebrow: item.eyebrow ?? "",
      type: item.type ?? "",
      liveUrl: item.liveUrl ?? "",
      clientRepositoryUrl: item.clientRepositoryUrl ?? "",
      serverRepositoryUrl: item.serverRepositoryUrl ?? "",
      overview: item.overview ?? "",
      primaryOutcome: item.primaryOutcome ?? "",
      delivery: item.delivery ?? "",
      purpose: item.purpose ?? "",
      features: readFeatures(item.features),
      accessRoles: readDetailCards(item.accessRoles, defaultAccessRoles),
      architectureSteps: readArchitectureSteps(item.architectureSteps),
      integrationCards: readDetailCards(
        item.integrationCards,
        defaultIntegrationCards,
      ),
      techStack: readTechStack(item.techStack),
      image: item.coverImage ?? item.image ?? "",
      metric: item.metric ?? "",
      metricLabel: item.metricLabel ?? "",
      selectedLabels: [...(item.tags ?? item.categories ?? [])],
      slug: item.slug ?? "",
      status: item.status ?? "draft",
      title: item.title ?? "",
      seo: {
        ...createDefaultSeo(),
        metaTitle: item.seo?.metaTitle ?? "",
        metaDescription: item.seo?.metaDescription ?? "",
        focusKeyword: item.seo?.focusKeyword ?? "",
        slug: item.seo?.slug ?? item.slug ?? "",
        canonicalUrl: item.seo?.canonicalUrl ?? "",
        ogTitle: item.seo?.ogTitle ?? "",
        ogDescription: item.seo?.ogDescription ?? "",
        ogImage: item.seo?.ogImage ?? "",
        robotsIndex: item.seo?.robotsIndex ?? true,
        robotsFollow: item.seo?.robotsFollow ?? true,
      },
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setConfirmSaveOpen(false);
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

  const updateFeature = (index: number, value: Partial<FeatureGroup>) => {
    setForm((current) => ({
      ...current,
      features: current.features.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...value } : item,
      ),
    }));
  };

  const updateFeatureItem = (
    groupIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      features: current.features.map((group, currentGroupIndex) =>
        currentGroupIndex === groupIndex
          ? {
              ...group,
              items: group.items.map((item, currentItemIndex) =>
                currentItemIndex === itemIndex ? value : item,
              ),
            }
          : group,
      ),
    }));
  };

  const updateDetailCard = (
    key: "accessRoles" | "integrationCards",
    index: number,
    value: Partial<DetailCard>,
  ) => {
    setForm((current) => ({
      ...current,
      [key]: current[key].map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...value } : item,
      ),
    }));
  };

  const updateArchitectureStep = (
    index: number,
    value: Partial<ArchitectureStep>,
  ) => {
    setForm((current) => ({
      ...current,
      architectureSteps: current.architectureSteps.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...value } : item,
      ),
    }));
  };

  const updateTechStack = (index: number, value: Partial<TechStackGroup>) => {
    setForm((current) => ({
      ...current,
      techStack: current.techStack.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...value } : item,
      ),
    }));
  };

  const updateTechTool = (
    groupIndex: number,
    toolIndex: number,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      techStack: current.techStack.map((group, currentGroupIndex) =>
        currentGroupIndex === groupIndex
          ? {
              ...group,
              tools: group.tools.map((tool, currentToolIndex) =>
                currentToolIndex === toolIndex ? value : tool,
              ),
            }
          : group,
      ),
    }));
  };

  const updateSeo = (value: Partial<SeoForm>) => {
    setForm((current) => ({
      ...current,
      seo: { ...current.seo, ...value },
    }));
  };

  const validateBlogForm = () => {
    const titleValue = form.title.trim();
    const excerptValue = form.excerpt.trim();

    if (titleValue.length < 2) {
      return "Title must be at least 2 characters.";
    }

    if (excerptValue.length < 10) {
      return "Excerpt must be at least 10 characters.";
    }

    if (cleanBlocks(form.contentBlocks).length === 0) {
      return "Add at least one content block with text.";
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBlog) {
      const validationError = validateBlogForm();

      if (validationError) {
        showToast({
          title: `${title.slice(0, -1)} needs attention`,
          description: validationError,
          tone: "error",
        });
        return;
      }
    }

    setConfirmSaveOpen(true);
  };

  const performSubmit = async () => {
    setSaving(true);

    try {
      const token = await getToken();
      const cleanedBlocks = cleanBlocks(form.contentBlocks);
      const payload = isBlog
        ? {
            title: form.title.trim(),
            slug: normalizeOptionalText(form.slug),
            excerpt: form.excerpt.trim(),
            content: blocksToPlainText(cleanedBlocks) || form.excerpt.trim(),
            contentBlocks: cleanedBlocks,
            coverImage: normalizeOptionalUrl(form.image),
            coverCaption: normalizeOptionalText(form.coverCaption),
            category:
              normalizeOptionalText(form.category) ?? defaultBlogCategory,
            authorName:
              normalizeOptionalText(form.authorName) ?? "Shei IT Team",
            authorRole: normalizeOptionalText(form.authorRole),
            authorAvatar: normalizeOptionalUrl(form.authorAvatar),
            authorBio: normalizeOptionalText(form.authorBio),
            readTime: normalizeOptionalText(form.readTime),
            featured: form.featured,
            tags: form.selectedLabels,
            status: form.status,
            seo: {
              metaTitle: normalizeOptionalText(form.seo.metaTitle),
              metaDescription: normalizeOptionalText(form.seo.metaDescription),
              focusKeyword: normalizeOptionalText(form.seo.focusKeyword),
              slug: normalizeOptionalText(form.seo.slug) ?? form.slug,
              canonicalUrl: normalizeOptionalUrl(form.seo.canonicalUrl),
              ogTitle: normalizeOptionalText(form.seo.ogTitle),
              ogDescription: normalizeOptionalText(form.seo.ogDescription),
              ogImage: normalizeOptionalUrl(form.seo.ogImage),
              robotsIndex: form.seo.robotsIndex,
              robotsFollow: form.seo.robotsFollow,
            },
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
            eyebrow: normalizeOptionalText(form.eyebrow),
            type: normalizeOptionalText(form.type),
            liveUrl: normalizeOptionalUrl(form.liveUrl),
            clientRepositoryUrl: normalizeOptionalUrl(form.clientRepositoryUrl),
            serverRepositoryUrl: normalizeOptionalUrl(form.serverRepositoryUrl),
            overview: normalizeOptionalDetailText(form.overview),
            primaryOutcome: normalizeOptionalText(form.primaryOutcome),
            delivery: normalizeOptionalText(form.delivery),
            purpose: normalizeOptionalDetailText(form.purpose),
            features: cleanFeatures(form.features),
            accessRoles: cleanDetailCards(form.accessRoles),
            architectureSteps: cleanArchitectureSteps(form.architectureSteps),
            integrationCards: cleanDetailCards(form.integrationCards),
            techStack: cleanTechStack(form.techStack),
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
        title: editing
          ? `${title.slice(0, -1)} updated`
          : `${title.slice(0, -1)} created`,
        description: editing
          ? "Your changes are now saved successfully."
          : "The new item has been created successfully.",
        tone: "success",
      });

      closeModal();
      await loadItems();
    } catch {
      showToast({
        title: `${title.slice(0, -1)} not saved`,
        description:
          "We could not save these changes right now. Please review the form and try again.",
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
    } catch {
      showToast({
        title: "Delete failed",
        description:
          "We could not remove this item right now. Please try again in a moment.",
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
            Review existing {title.toLowerCase()}, edit them in place, or add
            new ones without leaving the page.
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
            <p className="text-[13px] text-[color:var(--muted-foreground)]">
              {label}
            </p>
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
              const labels = isBlog
                ? Array.from(
                    new Set([
                      item.category ?? defaultBlogCategory,
                      ...(item.tags ?? []),
                    ]),
                  )
                : (item.categories ?? []);
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
                          {item.featured ? (
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
                            <>
                              Published{" "}
                              {new Date(item.publishedAt).toLocaleDateString()}
                            </>
                          ) : (
                            <>
                              Draft saved{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </>
                          )
                        ) : item.metric || item.metricLabel ? (
                          <>
                            {item.metric || "Metric"}{" "}
                            {item.metricLabel ? `/ ${item.metricLabel}` : ""}
                          </>
                        ) : (
                          <>
                            Created{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {item.status === "published" ? (
                          <a
                            href={
                              isBlog
                                ? `/blog/${item.slug}`
                                : `/portfolio/${item.slug}`
                            }
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
              Add your first {title.slice(0, -1).toLowerCase()} to start
              populating the live frontend.
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
        title={
          editing ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`
        }
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
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
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
                  setForm((current) => ({
                    ...current,
                    slug: event.target.value,
                  }))
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
                setForm((current) => ({
                  ...current,
                  image: event.target.value,
                }))
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
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Category
                  </span>
                  <select
                    className="admin-input w-full"
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                  >
                    {blogCategoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Author
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.authorName}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        authorName: event.target.value,
                      }))
                    }
                    placeholder="Shei IT Team"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Author role
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.authorRole}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        authorRole: event.target.value,
                      }))
                    }
                    placeholder="Principal Architect"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Read time
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.readTime}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        readTime: event.target.value,
                      }))
                    }
                    placeholder="5 min read"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Author avatar URL
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.authorAvatar}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        authorAvatar: event.target.value,
                      }))
                    }
                    placeholder="https://... (falls back to initials)"
                  />
                </label>
                <label className="space-y-2 lg:col-span-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Cover image caption
                  </span>
                  <input
                    className="admin-input w-full"
                    value={form.coverCaption}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        coverCaption: event.target.value,
                      }))
                    }
                    placeholder="Caption shown under the hero image"
                  />
                </label>
                <label className="space-y-2 lg:col-span-2">
                  <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                    Author bio
                  </span>
                  <textarea
                    className="admin-input min-h-20 w-full"
                    value={form.authorBio}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        authorBio: event.target.value,
                      }))
                    }
                    placeholder="Short author bio for the bottom byline card"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                  Excerpt
                </span>
                <textarea
                  className="admin-input min-h-24 w-full"
                  value={form.excerpt}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      excerpt: event.target.value,
                    }))
                  }
                  placeholder="Short summary for cards and previews"
                />
              </label>

              <BlogBlocksEditor
                blocks={form.contentBlocks}
                onChange={(blocks) =>
                  setForm((current) => ({ ...current, contentBlocks: blocks }))
                }
              />

              <SeoEditor seo={form.seo} updateSeo={updateSeo} />
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
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
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
                      setForm((current) => ({
                        ...current,
                        metric: event.target.value,
                      }))
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
                    Project record
                  </h3>
                  <p className="mt-1 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
                    One project record powers cards, the portfolio page, and the
                    full case-study page.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Detail eyebrow
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.eyebrow}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          eyebrow: event.target.value,
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
                      value={form.type}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          type: event.target.value,
                        }))
                      }
                      placeholder="Full-stack marketplace frontend"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Live URL
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.liveUrl}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          liveUrl: event.target.value,
                        }))
                      }
                      placeholder="https://..."
                    />
                  </label>
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
                        setForm((current) => ({
                          ...current,
                          overview: event.target.value,
                        }))
                      }
                      placeholder="What the project is..."
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Purpose
                    </span>
                    <textarea
                      className="admin-input min-h-32 w-full"
                      value={form.purpose}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          purpose: event.target.value,
                        }))
                      }
                      placeholder="Why it was built..."
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Primary outcome
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.primaryOutcome}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          primaryOutcome: event.target.value,
                        }))
                      }
                      placeholder="Faster bookings, more qualified leads, cleaner operations"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                      Delivery
                    </span>
                    <input
                      className="admin-input w-full"
                      value={form.delivery}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          delivery: event.target.value,
                        }))
                      }
                      placeholder="Responsive product experience"
                    />
                  </label>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-[14px] font-semibold text-[color:var(--foreground)]">
                        Key features
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            features: [
                              ...current.features,
                              { title: "", icon: "dashboard", items: [""] },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] px-3 py-2 text-[12px] font-semibold text-[color:var(--foreground)]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add group
                      </button>
                    </div>
                    {form.features.map((feature, featureIndex) => (
                      <div
                        key={`feature-${featureIndex}`}
                        className="space-y-3 rounded-[0.9rem] border border-[color:var(--stat-border)] p-4"
                      >
                        <div className="grid gap-3 lg:grid-cols-[1fr_160px_auto]">
                          <input
                            className="admin-input w-full"
                            value={feature.title}
                            onChange={(event) =>
                              updateFeature(featureIndex, {
                                title: event.target.value,
                              })
                            }
                            placeholder="Product Scope"
                          />
                          <select
                            className="admin-input w-full"
                            value={feature.icon}
                            onChange={(event) =>
                              updateFeature(featureIndex, {
                                icon: event.target.value,
                              })
                            }
                          >
                            <option value="dashboard">Dashboard</option>
                            <option value="public">Public</option>
                            <option value="users">Users</option>
                            <option value="auth">Auth</option>
                            <option value="payment">Payment</option>
                            <option value="notification">Notification</option>
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((current) => ({
                                ...current,
                                features: current.features.filter(
                                  (_item, index) => index !== featureIndex,
                                ),
                              }))
                            }
                            className="inline-flex h-[50px] items-center justify-center rounded-full border border-rose-500/30 px-4 text-rose-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {feature.items.map((item, itemIndex) => (
                            <div
                              key={`feature-item-${featureIndex}-${itemIndex}`}
                              className="grid gap-2 lg:grid-cols-[1fr_auto]"
                            >
                              <input
                                className="admin-input w-full"
                                value={item}
                                onChange={(event) =>
                                  updateFeatureItem(
                                    featureIndex,
                                    itemIndex,
                                    event.target.value,
                                  )
                                }
                                placeholder="Important product capability"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  updateFeature(featureIndex, {
                                    items: feature.items.filter(
                                      (_entry, index) => index !== itemIndex,
                                    ),
                                  })
                                }
                                className="rounded-full border border-[color:var(--stat-border)] px-4 text-[12px] font-semibold text-[color:var(--muted-foreground)]"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              updateFeature(featureIndex, {
                                items: [...feature.items, ""],
                              })
                            }
                            className="text-[12px] font-semibold text-[color:var(--primary)]"
                          >
                            Add checklist item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {[
                    {
                      title: "Access model",
                      items: form.accessRoles,
                      key: "accessRoles" as const,
                      addLabel: "Add role",
                      placeholder: "Visitors",
                    },
                    {
                      title: "Integration behavior",
                      items: form.integrationCards,
                      key: "integrationCards" as const,
                      addLabel: "Add integration",
                      placeholder: "Workflow behavior",
                    },
                  ].map((section) => (
                    <div key={section.key} className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-[14px] font-semibold text-[color:var(--foreground)]">
                          {section.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              [section.key]: [
                                ...current[section.key],
                                { title: "", description: "" },
                              ],
                            }))
                          }
                          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] px-3 py-2 text-[12px] font-semibold text-[color:var(--foreground)]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {section.addLabel}
                        </button>
                      </div>
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={`${section.key}-${itemIndex}`}
                          className="grid gap-3 rounded-[0.9rem] border border-[color:var(--stat-border)] p-4 lg:grid-cols-[220px_1fr_auto]"
                        >
                          <input
                            className="admin-input w-full"
                            value={item.title}
                            onChange={(event) =>
                              updateDetailCard(section.key, itemIndex, {
                                title: event.target.value,
                              })
                            }
                            placeholder={section.placeholder}
                          />
                          <textarea
                            className="admin-input min-h-24 w-full"
                            value={item.description}
                            onChange={(event) =>
                              updateDetailCard(section.key, itemIndex, {
                                description: event.target.value,
                              })
                            }
                            placeholder="Describe this card"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setForm((current) => ({
                                ...current,
                                [section.key]: current[section.key].filter(
                                  (_entry, index) => index !== itemIndex,
                                ),
                              }))
                            }
                            className="inline-flex h-[50px] items-center justify-center rounded-full border border-rose-500/30 px-4 text-rose-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-[14px] font-semibold text-[color:var(--foreground)]">
                        Architecture flow
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            architectureSteps: [
                              ...current.architectureSteps,
                              {
                                number: String(
                                  current.architectureSteps.length + 1,
                                ).padStart(2, "0"),
                                title: "",
                                description: "",
                              },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] px-3 py-2 text-[12px] font-semibold text-[color:var(--foreground)]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add step
                      </button>
                    </div>
                    {form.architectureSteps.map((step, stepIndex) => (
                      <div
                        key={`step-${stepIndex}`}
                        className="grid gap-3 rounded-[0.9rem] border border-[color:var(--stat-border)] p-4 lg:grid-cols-[90px_210px_1fr_auto]"
                      >
                        <input
                          className="admin-input w-full"
                          value={step.number}
                          onChange={(event) =>
                            updateArchitectureStep(stepIndex, {
                              number: event.target.value,
                            })
                          }
                          placeholder="01"
                        />
                        <input
                          className="admin-input w-full"
                          value={step.title}
                          onChange={(event) =>
                            updateArchitectureStep(stepIndex, {
                              title: event.target.value,
                            })
                          }
                          placeholder="Discovery"
                        />
                        <textarea
                          className="admin-input min-h-24 w-full"
                          value={step.description}
                          onChange={(event) =>
                            updateArchitectureStep(stepIndex, {
                              description: event.target.value,
                            })
                          }
                          placeholder="Describe the system step"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              architectureSteps:
                                current.architectureSteps.filter(
                                  (_item, index) => index !== stepIndex,
                                ),
                            }))
                          }
                          className="inline-flex h-[50px] items-center justify-center rounded-full border border-rose-500/30 px-4 text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-[14px] font-semibold text-[color:var(--foreground)]">
                        Tech stack
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            techStack: [
                              ...current.techStack,
                              { title: "", tools: [""] },
                            ],
                          }))
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] px-3 py-2 text-[12px] font-semibold text-[color:var(--foreground)]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add group
                      </button>
                    </div>
                    {form.techStack.map((group, groupIndex) => (
                      <div
                        key={`stack-${groupIndex}`}
                        className="space-y-3 rounded-[0.9rem] border border-[color:var(--stat-border)] p-4"
                      >
                        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                          <input
                            className="admin-input w-full"
                            value={group.title}
                            onChange={(event) =>
                              updateTechStack(groupIndex, {
                                title: event.target.value,
                              })
                            }
                            placeholder="Frontend"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setForm((current) => ({
                                ...current,
                                techStack: current.techStack.filter(
                                  (_item, index) => index !== groupIndex,
                                ),
                              }))
                            }
                            className="inline-flex h-[50px] items-center justify-center rounded-full border border-rose-500/30 px-4 text-rose-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {group.tools.map((tool, toolIndex) => (
                            <div
                              key={`tool-${groupIndex}-${toolIndex}`}
                              className="grid gap-2 lg:grid-cols-[1fr_auto]"
                            >
                              <input
                                className="admin-input w-full"
                                value={tool}
                                onChange={(event) =>
                                  updateTechTool(
                                    groupIndex,
                                    toolIndex,
                                    event.target.value,
                                  )
                                }
                                placeholder="Next.js"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  updateTechStack(groupIndex, {
                                    tools: group.tools.filter(
                                      (_entry, index) => index !== toolIndex,
                                    ),
                                  })
                                }
                                className="rounded-full border border-[color:var(--stat-border)] px-4 text-[12px] font-semibold text-[color:var(--muted-foreground)]"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              updateTechStack(groupIndex, {
                                tools: [...group.tools, ""],
                              })
                            }
                            className="text-[12px] font-semibold text-[color:var(--primary)]"
                          >
                            Add technology
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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

            <label className="space-y-2">
              <span className="text-[13px] font-semibold text-[color:var(--foreground)]">
                Featured
              </span>
              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    featured: !current.featured,
                  }))
                }
                className={cn(
                  "admin-input flex h-[50px] items-center justify-between",
                  form.featured ? "text-[color:var(--primary)]" : "",
                )}
              >
                <span>
                  {form.featured
                    ? "Featured on"
                    : isBlog
                      ? "Feature in blog"
                      : "Feature on homepage"}
                </span>
                <span
                  className={cn(
                    "h-6 w-11 rounded-full border p-1 transition",
                    form.featured
                      ? "border-[color:var(--primary)] bg-[color:var(--primary)]"
                      : "border-[color:var(--stat-border)] bg-[color:var(--button-secondary-icon)]",
                  )}
                >
                  <span
                    className={cn(
                      "block h-4 w-4 rounded-full transition",
                      form.featured
                        ? "translate-x-5 bg-white"
                        : "translate-x-0 bg-[color:var(--muted-foreground)]",
                    )}
                  />
                </span>
              </button>
            </label>

            <div className="flex items-end">
              <a
                href={
                  form.slug
                    ? `/${isBlog ? "blog" : "portfolio"}/${form.slug}`
                    : "#"
                }
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
        title={
          editing
            ? `Review ${title.slice(0, -1)} update`
            : `Review new ${title.slice(0, -1).toLowerCase()}`
        }
        description={
          editing
            ? "Please confirm that you want to save these changes before we update this item."
            : "Please confirm that you want to create this item before it is added to the system."
        }
        confirmLabel={
          editing
            ? `Save ${title.slice(0, -1)} changes`
            : `Create ${title.slice(0, -1)}`
        }
      />
    </div>
  );
}
