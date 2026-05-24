import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  CreditCard,
  Database,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  PanelsTopLeft,
  ShieldCheck,
  Users,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { API_BASE_URL, type ApiResponse } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type JsonRecord = Record<string, unknown>;

type DetailFeature = {
  title: string;
  icon?: string;
  items: string[];
};

type DetailRole = {
  title: string;
  description: string;
};

type DetailFlowStep = {
  number: string;
  title: string;
  description: string;
};

type DetailStackGroup = {
  title: string;
  tools: string[];
};

type DetailCard = {
  title: string;
  description: string;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  categories: string[];
  metric?: string | null;
  metricLabel?: string | null;
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
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const fallbackFeatures: DetailFeature[] = [
  {
    title: "Public Experience",
    icon: "public",
    items: [
      "Responsive marketing and discovery pages.",
      "Clear project information architecture.",
      "Mobile-friendly browsing experience.",
    ],
  },
  {
    title: "Dashboard Experience",
    icon: "dashboard",
    items: [
      "Role-aware screens for product workflows.",
      "Reusable UI sections for scalable content.",
      "Consistent light and dark theme support.",
    ],
  },
];

const fallbackRoles: DetailRole[] = [
  {
    title: "Visitors",
    description: "Explore the product, understand the value, and move toward action.",
  },
  {
    title: "Users",
    description: "Complete the main product workflows through focused, responsive screens.",
  },
  {
    title: "Admins",
    description: "Manage the project content and operational data from protected tools.",
  },
];

const fallbackFlow: DetailFlowStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Users enter through the public experience and understand the product offer.",
  },
  {
    number: "02",
    title: "Interaction",
    description: "Primary workflows guide users through the product actions that matter.",
  },
  {
    number: "03",
    title: "Management",
    description: "Admins keep the published content and project metadata up to date.",
  },
];

const fallbackStack: DetailStackGroup[] = [
  { title: "Frontend", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", tools: ["API Integration", "Database", "Admin Tools"] },
  { title: "Experience", tools: ["Responsive UI", "Theme System", "Reusable Components"] },
];

const iconMap = {
  auth: LockKeyhole,
  dashboard: PanelsTopLeft,
  notification: Bell,
  payment: CreditCard,
  public: MonitorSmartphone,
  users: Users,
};

async function getProject(slug: string) {
  const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Project could not be loaded.");
  }

  const payload = (await response.json()) as ApiResponse<Project>;
  return payload.data;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function readFeatureList(value: unknown): DetailFeature[] {
  if (!Array.isArray(value)) {
    return fallbackFeatures;
  }

  const parsed = value
    .map((item) => {
      const record = asRecord(item);
      return {
        title: typeof record.title === "string" ? record.title : "",
        icon: typeof record.icon === "string" ? record.icon : undefined,
        items: asStringArray(record.items),
      };
    })
    .filter((item) => item.title && item.items.length);

  return parsed.length ? parsed : fallbackFeatures;
}

function getProjectFeatures(project: Project) {
  return readFeatureList(project.features);
}

function readRoles(value: unknown): DetailRole[] {
  if (!Array.isArray(value)) {
    return fallbackRoles;
  }

  const parsed = value
    .map((item) => {
      const record = asRecord(item);
      return {
        title: typeof record.title === "string" ? record.title : "",
        description: typeof record.description === "string" ? record.description : "",
      };
    })
    .filter((item) => item.title && item.description);

  return parsed.length ? parsed : fallbackRoles;
}

function readFlow(value: unknown): DetailFlowStep[] {
  if (!Array.isArray(value)) {
    return fallbackFlow;
  }

  const parsed = value
    .map((item, index) => {
      const record = asRecord(item);
      return {
        number:
          typeof record.number === "string"
            ? record.number
            : String(index + 1).padStart(2, "0"),
        title: typeof record.title === "string" ? record.title : "",
        description: typeof record.description === "string" ? record.description : "",
      };
    })
    .filter((item) => item.title && item.description);

  return parsed.length ? parsed : fallbackFlow;
}

function readStack(value: unknown): DetailStackGroup[] {
  if (!Array.isArray(value)) {
    return fallbackStack;
  }

  const parsed = value
    .map((item) => {
      const record = asRecord(item);
      return {
        title: typeof record.title === "string" ? record.title : "",
        tools: asStringArray(record.tools),
      };
    })
    .filter((item) => item.title && item.tools.length);

  return parsed.length ? parsed : fallbackStack;
}

function readCards(value: unknown): DetailCard[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const record = asRecord(item);
      return {
        title: typeof record.title === "string" ? record.title : "",
        description: typeof record.description === "string" ? record.description : "",
      };
    })
    .filter((item) => item.title && item.description);
}

function cleanProjectText(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~>#]/g, "")
    .replace(/^\s*[-+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isPlaceholderText(value: string | null | undefined) {
  if (!value) {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  return [
    "what the project is...",
    "why it was built...",
    "https://...",
  ].includes(normalized);
}

function getDescriptionSection(description: string, heading: string) {
  const pattern = new RegExp(
    `${heading}\\s*\\n+([\\s\\S]*?)(?=\\n\\s*(?:Project Description|Project Value|Project Scope)\\s*\\n|$)`,
    "i",
  );
  const match = description.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function getDescriptionBullets(description: string, heading: string) {
  return getDescriptionSection(description, heading)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("*") || line.startsWith("-"))
    .map((line) => cleanProjectText(line.replace(/^[-*]\s*/, "")))
    .filter(Boolean);
}

function getProjectOverview(project: Project) {
  if (!isPlaceholderText(project.overview)) {
    return cleanProjectText(project.overview ?? "");
  }

  const descriptionSection = getDescriptionSection(project.description, "Project Description");
  return cleanProjectText(descriptionSection || project.description);
}

function getProjectProblem(project: Project) {
  if (!isPlaceholderText(project.purpose)) {
    return cleanProjectText(project.purpose ?? "");
  }

  const valueSection = getDescriptionSection(project.description, "Project Value");
  return valueSection
    ? cleanProjectText(valueSection)
    : "This project was built to turn scattered user needs into a focused digital experience with clear flows, reusable content, and a maintainable admin-managed foundation.";
}

function getProjectOverviewCards(project: Project): DetailCard[] {
  return [
    { title: "Category", description: project.categories.join(", ") || "Digital product" },
    {
      title: "Primary Outcome",
      description:
        project.primaryOutcome || project.metricLabel || project.metric || "Published project",
    },
    { title: "Delivery", description: project.delivery || project.type || "Responsive experience" },
  ];
}

function getProjectIntegrations(project: Project): DetailCard[] {
  const cards = readCards(project.integrationCards);

  if (cards.length) {
    return cards;
  }

  return [
    {
      title: "Workflow behavior",
      description:
        "The frontend coordinates important user actions with backend-confirmed state and clear success or fallback screens.",
    },
    {
      title: "Why it is reliable",
      description:
        "The interface avoids treating client-side state as the final source of truth and keeps important status checks tied to the API.",
    },
  ];
}

function createExcerpt(value: string, maxLength = 260) {
  const text = cleanProjectText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getProjectSummary(project: Project) {
  return createExcerpt(getProjectOverview(project), 170);
}

function SectionShell({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[1.4rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 shadow-[var(--shadow-soft)] backdrop-blur md:p-7"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--stat-icon-bg)]">
          <Layers3 className="h-4 w-4 text-[color:var(--primary)]" />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[color:var(--primary)]">
            {label}
          </p>
          <h2 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)] md:text-[1.65rem]">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)]">
      {children}
    </span>
  );
}

function DetailPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1rem] bg-[color:var(--background-secondary)]/45 p-4 ring-1 ring-[color:var(--stat-border)]/70 dark:bg-white/[0.025] ${className}`}
    >
      {children}
    </div>
  );
}

function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[color:var(--stat-icon-bg)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)] ring-1 ring-[color:var(--stat-border)]/70">
      {children}
    </span>
  );
}

function responsiveGridClass(itemCount: number) {
  if (itemCount <= 1) {
    return "grid gap-4";
  }

  if (itemCount === 2) {
    return "grid gap-4 md:grid-cols-2";
  }

  return "grid gap-4 md:grid-cols-2 xl:grid-cols-3";
}

function HeroMockup({ project, summary }: { project: Project; summary: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)]">
      <div className="overflow-hidden rounded-[1rem] bg-[color:var(--card-solid)]">
        <div className="relative aspect-[16/9]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <p className="sr-only">{summary}</p>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await getProject(slug);
    return {
      title: `${project.title} | Shei IT Portfolio`,
      description: getProjectSummary(project),
    };
  } catch {
    return {
      title: "Project | Shei IT Portfolio",
    };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  const features = getProjectFeatures(project);
  const roles = readRoles(project.accessRoles);
  const flow = readFlow(project.architectureSteps);
  const stack = readStack(project.techStack);
  const overviewCards = getProjectOverviewCards(project);
  const integrations = getProjectIntegrations(project);
  const summary = getProjectSummary(project);
  const liveUrl = project.liveUrl?.trim();
  const nav = [
    ["overview", "Overview"],
    ["problem", "Problem / Purpose"],
    ["features", "Key Features"],
    ["roles", "Roles"],
    ["architecture", "Architecture"],
    ["payments", "Payments"],
    ["tech-stack", "Tech Stack"],
  ] as const;

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.1),transparent_20%),radial-gradient(circle_at_75%_35%,rgba(159,220,255,0.2),transparent_22%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(139,124,255,0.14),transparent_20%),radial-gradient(circle_at_75%_35%,rgba(93,174,255,0.12),transparent_22%)]" />
      <SiteHeader />

      <div className="relative mx-auto w-11/12 max-w-[1440px] pb-20 pt-8">
        <div className="mb-8 flex flex-nowrap gap-2 sm:flex-wrap sm:gap-3">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-4 py-2 text-[12px] font-bold text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center whitespace-nowrap rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-4 py-2 text-[12px] font-bold text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            All Projects
          </Link>
        </div>

        <section className="grid gap-8 pb-10 lg:grid-cols-[0.92fr_1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.42em] text-[color:var(--primary)]">
              {project.eyebrow || "Project Case Study"}
            </p>
            <h1 className="page-main-heading mt-4 max-w-3xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[color:var(--muted-foreground)]">
              {summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Pill>{project.type || "Digital product"}</Pill>
              {project.metric ? <Pill>{project.metric}</Pill> : null}
              {project.metricLabel ? <Pill>{project.metricLabel}</Pill> : null}
              {project.categories.slice(0, 3).map((category) => (
                <Pill key={category}>{category}</Pill>
              ))}
            </div>

            {liveUrl ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-[13px] font-black text-white shadow-[0_16px_36px_rgba(108,99,255,0.18)] transition hover:bg-[color:var(--primary-soft)]"
                >
                  Live Site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            ) : null}
          </div>

          <HeroMockup project={project} summary={summary} />
        </section>

        <div className="grid gap-7 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
              <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.32em] text-[color:var(--primary)]">
                Case Study
              </p>
              <div className="space-y-2">
                {nav.map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-2 rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-3 py-2.5 text-[12px] font-bold text-[color:var(--muted-foreground)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--foreground)]"
                  >
                    <span className="h-2 w-2 rounded-full border border-[color:var(--primary)]" />
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="space-y-6">
            <SectionShell id="overview" label="Overview" title="What the project is">
              <p className="text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                {getProjectOverview(project)}
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {overviewCards.map(({ description, title }) => (
                  <DetailPanel key={title}>
                    <p className="text-[13px] font-semibold text-[color:var(--foreground)]">{title}</p>
                    <p className="mt-2 text-[12px] leading-6 text-[color:var(--muted-foreground)]">
                      {description}
                    </p>
                  </DetailPanel>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="problem" label="Problem / Purpose" title="Why it was built">
              <p className="text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                {getProjectProblem(project)}
              </p>
            </SectionShell>

            <SectionShell id="features" label="Key Features" title="Important product capabilities">
              <div className={responsiveGridClass(features.length)}>
                {features.map((feature) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? MonitorSmartphone;

                  return (
                    <DetailPanel
                      key={feature.title}
                      className={
                        features.length <= 1
                          ? "grid gap-5 p-5 md:grid-cols-[220px_1fr] md:items-start"
                          : "p-5"
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--stat-icon-bg)] text-[color:var(--primary)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">
                          {feature.title}
                        </h3>
                      </div>
                      <ul
                        className={
                          features.length <= 1
                            ? "grid gap-3 sm:grid-cols-2"
                            : "mt-4 space-y-3"
                        }
                      >
                        {feature.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[12px] leading-6 text-[color:var(--muted-foreground)]"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--primary)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </DetailPanel>
                  );
                })}
              </div>
            </SectionShell>

            <SectionShell id="roles" label="Access Model" title="Role-scoped product experience">
              <div className={responsiveGridClass(roles.length)}>
                {roles.map((role) => (
                  <DetailPanel
                    key={role.title}
                    className={
                      roles.length <= 1
                        ? "flex items-start gap-4 p-5"
                        : "p-5"
                    }
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--stat-icon-bg)] text-[color:var(--primary)]">
                      <Users className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">
                        {role.title}
                      </h3>
                      <p className="mt-2 text-[12px] leading-6 text-[color:var(--muted-foreground)]">
                        {role.description}
                      </p>
                    </div>
                  </DetailPanel>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="architecture" label="Architecture / How It Works" title="Simple system flow">
              <div className="space-y-3">
                {flow.map((step) => (
                  <DetailPanel key={`${step.number}-${step.title}`} className="grid gap-3 sm:grid-cols-[46px_1fr]">
                    <span className="grid h-9 w-9 place-items-center rounded-[0.7rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-icon-bg)] text-[11px] font-black text-[color:var(--primary)]">
                      {step.number}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-[color:var(--foreground)]">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-6 text-[color:var(--muted-foreground)]">
                        {step.description}
                      </p>
                    </div>
                  </DetailPanel>
                ))}
              </div>
            </SectionShell>

            <SectionShell
              id="payments"
              label="Integration"
              title="Checkout and integration behavior"
            >
              <div className={responsiveGridClass(integrations.length)}>
                {integrations.map((integration, index) => {
                  const Icon = index === 1 ? ShieldCheck : CreditCard;

                  return (
                    <DetailPanel key={integration.title} className="p-5">
                      <Icon
                        className={
                          index === 1
                            ? "h-6 w-6 text-[color:var(--mint)]"
                            : "h-6 w-6 text-[color:var(--primary)]"
                        }
                      />
                      <h3 className="mt-4 text-[15px] font-semibold text-[color:var(--foreground)]">
                        {integration.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-7 text-[color:var(--muted-foreground)]">
                        {integration.description}
                      </p>
                    </DetailPanel>
                  );
                })}
              </div>
            </SectionShell>

            <SectionShell id="tech-stack" label="Tech Stack" title="Technology choices by responsibility">
              <div className="divide-y divide-[color:var(--stat-border)]">
                {stack.map((group) => (
                  <div
                    key={group.title}
                    className="grid gap-4 py-5 first:pt-0 last:pb-0 md:grid-cols-[180px_1fr] md:items-start"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-[color:var(--primary)]" />
                      <h3 className="text-[13px] font-semibold text-[color:var(--foreground)]">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.tools.map((tool) => (
                        <TechTag key={tool}>{tool}</TechTag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionShell>
          </div>
        </div>
      </div>
    </main>
  );
}
