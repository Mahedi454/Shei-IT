"use client";

import {
  Building2,
  CalendarDays,
  Mail,
  MessageSquareQuote,
  Phone,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AdminModal } from "@/components/admin/admin-modal";
import { ActionConfirmModal } from "@/components/admin/action-confirm-modal";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";

import { useAdminAuth } from "./admin-auth-provider";
import { useAdminFeedback } from "./admin-feedback-provider";

type Contact = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt: string;
};

const statusOptions = ["new", "replied", "archived"] as const;

export function ContactsManager() {
  const { getToken } = useAdminAuth();
  const { showToast } = useAdminFeedback();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | Contact["status"]>("all");
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [statusTarget, setStatusTarget] = useState<{
    contact: Contact;
    status: Contact["status"];
  } | null>(null);

  const loadContacts = async () => {
    setLoading(true);

    try {
      const token = await getToken();
      const data = await apiRequest<Contact[]>("/contacts/admin/all", { token });
      setContacts(data);
      setSelectedId((current) => current ?? data[0]?.id ?? null);
    } catch {
      showToast({
        title: "Contacts unavailable",
        description: "We could not load the inbox right now. Refresh or try again in a moment.",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = useMemo(
    () =>
      statusFilter === "all"
        ? contacts
        : contacts.filter((contact) => contact.status === statusFilter),
    [contacts, statusFilter],
  );

  const selectedContact =
    filteredContacts.find((contact) => contact.id === selectedId) ??
    filteredContacts[0] ??
    null;

  const counts = useMemo(
    () => ({
      all: contacts.length,
      new: contacts.filter((item) => item.status === "new").length,
      replied: contacts.filter((item) => item.status === "replied").length,
      archived: contacts.filter((item) => item.status === "archived").length,
    }),
    [contacts],
  );

  const updateStatus = async (id: string, status: Contact["status"]) => {
    try {
      const token = await getToken();
      await apiRequest(`/contacts/admin/${id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ status }),
      });

      showToast({
        title: "Contact updated",
        description: `The contact is now marked as ${status}.`,
        tone: "success",
      });

      setStatusTarget(null);
      await loadContacts();
    } catch {
      showToast({
        title: "Status update failed",
        description: "We could not update this status right now. Please try again in a moment.",
        tone: "error",
      });
    }
  };

  const deleteContact = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      const token = await getToken();
      await apiRequest(`/contacts/admin/${deleteTarget.id}`, {
        method: "DELETE",
        token,
      });

      showToast({
        title: "Contact deleted",
        description: "The inquiry has been removed successfully.",
        tone: "success",
      });

      setDeleteTarget(null);
      await loadContacts();
    } catch {
      showToast({
        title: "Delete failed",
        description: "We could not remove this inquiry right now. Please try again in a moment.",
        tone: "error",
      });
    }
  };

  return (
    <div>
      <div className="border-b border-[color:var(--stat-border)] pb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
          Lead Inbox
        </p>
        <h1 className="mt-3 text-[2.45rem] font-semibold tracking-[-0.06em] text-[color:var(--foreground)]">
          Contacts
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Review every inquiry, move it through your response workflow, and keep the
          live lead inbox clean.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-b border-[color:var(--stat-border)] py-6">
        {[
          ["all", "All", counts.all],
          ["new", "New", counts.new],
          ["replied", "Replied", counts.replied],
          ["archived", "Archived", counts.archived],
        ].map(([key, label, count]) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatusFilter(key as "all" | Contact["status"])}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px] font-semibold transition",
              statusFilter === key
                ? "border-transparent bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]"
                : "border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
            )}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <div className="grid gap-8 py-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)]">
        <div className="min-w-0 border border-[color:var(--stat-border)]">
          <div className="grid grid-cols-[minmax(0,1.2fr)_150px_120px] gap-4 border-b border-[color:var(--stat-border)] px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            <span>Contact</span>
            <span>Service</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-[color:var(--stat-border)]">
            {loading ? (
              <div className="px-5 py-8 text-[14px] text-[color:var(--muted-foreground)]">
                Loading contacts...
              </div>
            ) : filteredContacts.length ? (
              filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelectedId(contact.id)}
                  className={cn(
                    "grid w-full grid-cols-[minmax(0,1.2fr)_150px_120px] gap-4 px-5 py-5 text-left transition hover:bg-[color:var(--stat-bg)]",
                    selectedContact?.id === contact.id ? "bg-[color:var(--stat-bg)]" : "",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold text-[color:var(--foreground)]">
                      {contact.name}
                    </span>
                    <span className="mt-1 block truncate text-[13px] text-[color:var(--muted-foreground)]">
                      {contact.email}
                    </span>
                  </span>
                  <span className="truncate text-[13px] text-[color:var(--muted-foreground)]">
                    {contact.service || "General"}
                  </span>
                  <span className="truncate">
                    <span className="inline-flex rounded-full bg-[color:var(--button-secondary-icon)] px-3 py-1 text-[11px] font-semibold capitalize text-[color:var(--primary)]">
                      {contact.status}
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <div className="px-5 py-8 text-[14px] text-[color:var(--muted-foreground)]">
                No contacts found for this filter.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-6">
          {selectedContact ? (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-[color:var(--stat-border)] pb-5">
                <div>
                  <h2 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                    {selectedContact.name}
                  </h2>
                  <p className="mt-2 text-[14px] text-[color:var(--muted-foreground)]">
                    {selectedContact.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteTarget(selectedContact)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 py-5">
                <div className="flex items-center gap-3 text-[14px] text-[color:var(--muted-foreground)]">
                  <Mail className="h-4 w-4 text-[color:var(--primary)]" />
                  {selectedContact.email}
                </div>
                {selectedContact.phone ? (
                  <div className="flex items-center gap-3 text-[14px] text-[color:var(--muted-foreground)]">
                    <Phone className="h-4 w-4 text-[color:var(--primary)]" />
                    {selectedContact.phone}
                  </div>
                ) : null}
                {selectedContact.company ? (
                  <div className="flex items-center gap-3 text-[14px] text-[color:var(--muted-foreground)]">
                    <Building2 className="h-4 w-4 text-[color:var(--primary)]" />
                    {selectedContact.company}
                  </div>
                ) : null}
                <div className="flex items-center gap-3 text-[14px] text-[color:var(--muted-foreground)]">
                  <CalendarDays className="h-4 w-4 text-[color:var(--primary)]" />
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="space-y-3 border-t border-[color:var(--stat-border)] py-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                  Inquiry Details
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.service ? (
                    <span className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-3 py-1 text-[12px] font-medium text-[color:var(--primary)]">
                      {selectedContact.service}
                    </span>
                  ) : null}
                  {selectedContact.budget ? (
                    <span className="rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-3 py-1 text-[12px] font-medium text-[color:var(--foreground)]">
                      {selectedContact.budget}
                    </span>
                  ) : null}
                </div>
                <div className="rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-4">
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-[color:var(--foreground)]">
                    <MessageSquareQuote className="h-4 w-4 text-[color:var(--primary)]" />
                    Message
                  </div>
                  <p className="mt-3 text-[14px] leading-7 text-[color:var(--muted-foreground)]">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="border-t border-[color:var(--stat-border)] pt-5">
                <label className="block text-[13px] font-semibold text-[color:var(--foreground)]">
                  Update status
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusTarget({ contact: selectedContact, status })}
                      className={cn(
                        "rounded-full border px-4 py-2 text-[13px] font-semibold capitalize transition",
                        selectedContact.status === status
                          ? "border-transparent bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]"
                          : "border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-[14px] text-[color:var(--muted-foreground)]">
              Select a contact to view full details.
            </div>
          )}
        </div>
      </div>

      <AdminModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete contact?"
        description="This inquiry will be removed permanently."
        widthClassName="max-w-lg"
      >
        <div className="space-y-5">
          <p className="text-[14px] leading-7 text-[color:var(--muted-foreground)]">
            Delete the inquiry from{" "}
            <span className="font-semibold text-[color:var(--foreground)]">
              {deleteTarget?.name}
            </span>
            ?
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-full border border-[color:var(--stat-border)] px-5 py-3 text-[14px] font-semibold text-[color:var(--foreground)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={deleteContact}
              className="rounded-full bg-rose-500 px-5 py-3 text-[14px] font-semibold text-white"
            >
              Yes, delete it
            </button>
          </div>
        </div>
      </AdminModal>

      <ActionConfirmModal
        open={Boolean(statusTarget)}
        onClose={() => setStatusTarget(null)}
        onConfirm={() =>
          statusTarget ? updateStatus(statusTarget.contact.id, statusTarget.status) : undefined
        }
        title="Confirm status update"
        description={
          statusTarget
            ? `Please confirm that you want to mark ${statusTarget.contact.name} as ${statusTarget.status}.`
            : "Please confirm this status update."
        }
        confirmLabel={statusTarget ? `Mark as ${statusTarget.status}` : "Update status"}
      />
    </div>
  );
}
