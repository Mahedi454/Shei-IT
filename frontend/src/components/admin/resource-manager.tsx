"use client";

import { FormEvent, useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

import { useAdminAuth } from "./admin-auth-provider";

type ResourceType = "blogs" | "projects";

type ResourceItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  description?: string;
  coverImage?: string;
  image?: string;
  tags?: string[];
  categories?: string[];
  metric?: string;
  metricLabel?: string;
  featured?: boolean;
  status: "draft" | "published";
};

type ResourceManagerProps = {
  resource: ResourceType;
  title: string;
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  description: "",
  image: "",
  labels: "",
  metric: "",
  metricLabel: "",
  featured: false,
  status: "draft",
};

export function ResourceManager({ resource, title }: ResourceManagerProps) {
  const { getToken } = useAdminAuth();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const isBlog = resource === "blogs";

  const loadItems = async () => {
    setLoading(true);
    const token = await getToken();
    const data = await apiRequest<ResourceItem[]>(`/${resource}/admin/all`, { token });
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems().catch((error) => setMessage(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const resetForm = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const startEdit = (item: ResourceItem) => {
    setEditing(item);
    setForm({
      title: item.title ?? "",
      slug: item.slug ?? "",
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      description: item.description ?? "",
      image: item.coverImage ?? item.image ?? "",
      labels: (item.tags ?? item.categories ?? []).join(", "),
      metric: item.metric ?? "",
      metricLabel: item.metricLabel ?? "",
      featured: Boolean(item.featured),
      status: item.status ?? "draft",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      const token = await getToken();
      const payload = isBlog
        ? {
            title: form.title,
            slug: form.slug || undefined,
            excerpt: form.excerpt,
            content: form.content,
            coverImage: form.image,
            tags: form.labels.split(",").map((item) => item.trim()).filter(Boolean),
            status: form.status,
          }
        : {
            title: form.title,
            slug: form.slug || undefined,
            description: form.description,
            image: form.image,
            categories: form.labels.split(",").map((item) => item.trim()).filter(Boolean),
            metric: form.metric,
            metricLabel: form.metricLabel,
            featured: form.featured,
            status: form.status,
          };

      await apiRequest(
        editing ? `/${resource}/admin/${editing._id}` : `/${resource}/admin`,
        {
          method: editing ? "PATCH" : "POST",
          token,
          body: JSON.stringify(payload),
        },
      );

      setMessage(`${title} saved successfully.`);
      resetForm();
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) {
      return;
    }

    try {
      const token = await getToken();
      await apiRequest(`/${resource}/admin/${id}`, { method: "DELETE", token });
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[2rem] font-semibold text-[color:var(--foreground)]">
            {title}
          </h1>
          <p className="text-[14px] text-[color:var(--muted-foreground)]">
            Create, update, publish, and delete {title.toLowerCase()}.
          </p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="rounded-xl border border-[color:var(--stat-border)] px-4 py-2 text-[14px] text-[color:var(--foreground)]"
        >
          New
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
        <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="admin-input" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        {isBlog ? (
          <>
            <input className="admin-input lg:col-span-2" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <textarea className="admin-input min-h-40 lg:col-span-2" placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </>
        ) : (
          <textarea className="admin-input min-h-28 lg:col-span-2" placeholder="Project description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        )}
        <input className="admin-input lg:col-span-2" placeholder={isBlog ? "Cover image URL" : "Project image URL"} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input className="admin-input" placeholder={isBlog ? "Tags: SEO, Web" : "Categories: Website, SEO"} value={form.labels} onChange={(e) => setForm({ ...form, labels: e.target.value })} />
        <select className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {!isBlog ? (
          <>
            <input className="admin-input" placeholder="Metric" value={form.metric} onChange={(e) => setForm({ ...form, metric: e.target.value })} />
            <input className="admin-input" placeholder="Metric label" value={form.metricLabel} onChange={(e) => setForm({ ...form, metricLabel: e.target.value })} />
            <label className="flex items-center gap-2 text-[14px] text-[color:var(--foreground)]">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured project
            </label>
          </>
        ) : null}
        <button className="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-[15px] font-semibold text-white lg:col-span-2">
          {editing ? "Update" : "Create"} {title.slice(0, -1)}
        </button>
      </form>

      {message ? <p className="mt-4 text-[14px] text-[color:var(--muted-foreground)]">{message}</p> : null}

      <div className="mt-8 overflow-hidden rounded-xl border border-[color:var(--stat-border)]">
        {loading ? (
          <p className="p-4 text-[color:var(--muted-foreground)]">Loading...</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="flex flex-col gap-3 border-b border-[color:var(--stat-border)] p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[color:var(--foreground)]">{item.title}</p>
                <p className="text-[13px] text-[color:var(--muted-foreground)]">{item.status} / {item.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(item)} className="rounded-lg border border-[color:var(--stat-border)] px-3 py-2 text-[13px]">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="rounded-lg border border-red-500/30 px-3 py-2 text-[13px] text-red-500">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
