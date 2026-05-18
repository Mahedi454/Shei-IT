"use client";

import { FileText, FolderKanban, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

import { useAdminAuth } from "./admin-auth-provider";
import { useAdminFeedback } from "./admin-feedback-provider";

type DashboardSummary = {
  counts: {
    blogs: number;
    publishedBlogs: number;
    projects: number;
    publishedProjects: number;
    contacts: number;
    newContacts: number;
  };
  recentContacts: Array<{
    id: string;
    name: string;
    email: string;
    service?: string | null;
    status: string;
  }>;
};

const statMeta = [
  {
    key: "blogs",
    label: "Blogs",
    icon: FileText,
    accent: "text-[color:var(--primary)]",
  },
  {
    key: "projects",
    label: "Projects",
    icon: FolderKanban,
    accent: "text-[color:var(--blue)]",
  },
  {
    key: "contacts",
    label: "Contacts",
    icon: Mail,
    accent: "text-[color:var(--orange)]",
  },
  {
    key: "newContacts",
    label: "New Leads",
    icon: Sparkles,
    accent: "text-[color:var(--mint)]",
  },
] as const;

export function DashboardOverview() {
  const { getToken } = useAdminAuth();
  const { showToast } = useAdminFeedback();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken();
        const data = await apiRequest<DashboardSummary>("/admin/summary", { token });
        setSummary(data);
      } catch (error) {
        showToast({
          title: "Dashboard load failed",
          description:
            error instanceof Error ? error.message : "Could not load admin summary.",
          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [getToken, showToast]);

  const counts = summary?.counts;

  return (
    <div>
      <div className="border-b border-[color:var(--stat-border)] pb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">
          Overview
        </p>
        <h1 className="mt-3 text-[2.5rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
          Admin Dashboard
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Track your content pipeline, live portfolio updates, and incoming leads from
          one place.
        </p>
      </div>

      <div className="grid gap-4 border-b border-[color:var(--stat-border)] py-8 sm:grid-cols-2 xl:grid-cols-4">
        {statMeta.map((item) => {
          const Icon = item.icon;
          const value = counts?.[item.key] ?? 0;

          return (
            <div
              key={item.key}
              className="rounded-[1.2rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium text-[color:var(--muted-foreground)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
                    {loading ? "—" : value}
                  </p>
                </div>
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 py-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-[color:var(--stat-border)] pb-4">
            <div>
              <h2 className="text-[1.6rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                Recent Contacts
              </h2>
              <p className="mt-1 text-[14px] text-[color:var(--muted-foreground)]">
                Latest inquiries coming in from the website.
              </p>
            </div>

            <Link
              href="/admin/contacts"
              className="rounded-full border border-[color:var(--stat-border)] px-4 py-2 text-[13px] font-semibold text-[color:var(--foreground)]"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[color:var(--stat-border)]">
            {summary?.recentContacts.length ? (
              summary.recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[16px] font-semibold text-[color:var(--foreground)]">
                      {contact.name}
                    </p>
                    <p className="mt-1 text-[14px] text-[color:var(--muted-foreground)]">
                      {contact.email}
                    </p>
                    <p className="mt-2 text-[13px] text-[color:var(--muted-foreground)]">
                      {contact.service || "General inquiry"}
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-[color:var(--button-secondary-icon)] px-3 py-1 text-[12px] font-semibold capitalize text-[color:var(--primary)]">
                    {contact.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-[14px] text-[color:var(--muted-foreground)]">
                {loading ? "Loading dashboard data..." : "No contact requests yet."}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[1.3rem] border border-[color:var(--stat-border)] bg-[linear-gradient(180deg,rgba(139,124,255,0.14),rgba(139,124,255,0.04))] p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
            Publishing Snapshot
          </p>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[color:var(--stat-border)] pb-4">
              <span className="text-[14px] text-[color:var(--muted-foreground)]">
                Draft blogs
              </span>
              <span className="text-[18px] font-semibold text-[color:var(--foreground)]">
                {loading || !counts ? "—" : counts.blogs - counts.publishedBlogs}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[color:var(--stat-border)] pb-4">
              <span className="text-[14px] text-[color:var(--muted-foreground)]">
                Draft projects
              </span>
              <span className="text-[18px] font-semibold text-[color:var(--foreground)]">
                {loading || !counts ? "—" : counts.projects - counts.publishedProjects}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[color:var(--muted-foreground)]">
                Published content
              </span>
              <span className="text-[18px] font-semibold text-[color:var(--foreground)]">
                {loading || !counts
                  ? "—"
                  : counts.publishedBlogs + counts.publishedProjects}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
