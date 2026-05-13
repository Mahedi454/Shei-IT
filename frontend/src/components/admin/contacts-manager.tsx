"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

import { useAdminAuth } from "./admin-auth-provider";

type Contact = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt: string;
};

export function ContactsManager() {
  const { getToken } = useAdminAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    setLoading(true);
    const token = await getToken();
    const data = await apiRequest<Contact[]>("/contacts/admin/all", { token });
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts().catch((error) => setMessage(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: string, status: Contact["status"]) => {
    const token = await getToken();
    await apiRequest(`/contacts/admin/${id}`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ status }),
    });
    await loadContacts();
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact?")) {
      return;
    }
    const token = await getToken();
    await apiRequest(`/contacts/admin/${id}`, { method: "DELETE", token });
    await loadContacts();
  };

  return (
    <div>
      <h1 className="text-[2rem] font-semibold text-[color:var(--foreground)]">
        Contacts
      </h1>
      <p className="text-[14px] text-[color:var(--muted-foreground)]">
        View, track, archive, and delete contact requests.
      </p>

      {message ? <p className="mt-4 text-[14px] text-red-500">{message}</p> : null}

      <div className="mt-6 grid gap-4">
        {loading ? (
          <p className="text-[color:var(--muted-foreground)]">Loading...</p>
        ) : (
          contacts.map((contact) => (
            <article
              key={contact._id}
              className="rounded-xl border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[18px] font-semibold text-[color:var(--foreground)]">
                    {contact.name}
                  </p>
                  <p className="text-[14px] text-[color:var(--muted-foreground)]">
                    {contact.email} {contact.phone ? `/ ${contact.phone}` : ""}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                    {contact.message}
                  </p>
                  <p className="mt-3 text-[13px] text-[color:var(--muted-foreground)]">
                    {contact.service || "General"} / {contact.budget || "No budget"} /{" "}
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <select
                    value={contact.status}
                    onChange={(event) =>
                      updateStatus(contact._id, event.target.value as Contact["status"])
                    }
                    className="admin-input"
                  >
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="rounded-xl border border-red-500/30 px-3 py-2 text-[13px] text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
