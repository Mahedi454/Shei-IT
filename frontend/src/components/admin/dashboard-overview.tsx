"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

import { useAdminAuth } from "./admin-auth-provider";

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
    _id: string;
    name: string;
    email: string;
    status: string;
  }>;
};

export function DashboardOverview() {
  const { getToken } = useAdminAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const token = await getToken();
      const data = await apiRequest<DashboardSummary>("/admin/summary", { token });
      setSummary(data);
    };

    load().catch((err) => setError(err.message));
  }, [getToken]);

  const counts = summary?.counts;

  return (
    <div>
      <h1 className="text-[2rem] font-semibold text-[color:var(--foreground)]">
        Dashboard
      </h1>
      <p className="text-[14px] text-[color:var(--muted-foreground)]">
        Quick view of content and incoming leads.
      </p>

      {error ? <p className="mt-4 text-[14px] text-red-500">{error}</p> : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Blogs", counts?.blogs ?? 0],
          ["Published Blogs", counts?.publishedBlogs ?? 0],
          ["Projects", counts?.projects ?? 0],
          ["Published Projects", counts?.publishedProjects ?? 0],
          ["Contacts", counts?.contacts ?? 0],
          ["New Contacts", counts?.newContacts ?? 0],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-xl border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-5"
          >
            <p className="text-[14px] text-[color:var(--muted-foreground)]">{label}</p>
            <p className="mt-2 text-[2rem] font-semibold text-[color:var(--foreground)]">
              {value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-5">
        <h2 className="text-[20px] font-semibold text-[color:var(--foreground)]">
          Recent Contacts
        </h2>
        <div className="mt-4 space-y-3">
          {summary?.recentContacts.length ? (
            summary.recentContacts.map((contact) => (
              <div key={contact._id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-[color:var(--foreground)]">{contact.name}</p>
                  <p className="text-[13px] text-[color:var(--muted-foreground)]">{contact.email}</p>
                </div>
                <span className="rounded-full bg-[color:var(--stat-bg)] px-3 py-1 text-[12px] text-[color:var(--primary)]">
                  {contact.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-[14px] text-[color:var(--muted-foreground)]">
              No contacts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
