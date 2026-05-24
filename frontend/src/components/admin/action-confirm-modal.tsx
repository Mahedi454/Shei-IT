"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import { AdminModal } from "@/components/admin/admin-modal";

type ActionConfirmModalProps = {
  confirmLabel?: string;
  description: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
};

export function ActionConfirmModal({
  confirmLabel = "Confirm",
  description,
  isLoading = false,
  onClose,
  onConfirm,
  open,
  title,
}: ActionConfirmModalProps) {
  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      widthClassName="max-w-xl"
    >
      <div className="rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]">
            <AlertCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[14px] font-semibold text-[color:var(--foreground)]">
              Please review before continuing
            </p>
            <p className="mt-1 text-[13px] leading-6 text-[color:var(--muted-foreground)]">
              This action will update the live website configuration.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 py-3 text-[13px] font-bold text-[color:var(--foreground)] disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-[13px] font-bold text-white disabled:opacity-60"
        >
          <CheckCircle2 className="h-4 w-4" />
          {isLoading ? "Saving..." : confirmLabel}
        </button>
      </div>
    </AdminModal>
  );
}
