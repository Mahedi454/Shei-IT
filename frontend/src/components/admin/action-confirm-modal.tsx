"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

import { AdminModal } from "./admin-modal";

type ActionConfirmModalProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  description: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
};

export function ActionConfirmModal({
  cancelLabel = "Go back",
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
      widthClassName="max-w-lg"
    >
      <div className="space-y-5">
        <div className="flex gap-3 rounded-[1rem] border border-amber-500/20 bg-amber-500/10 p-4 text-[14px] text-amber-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>Please review this action once more before continuing.</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full border border-[color:var(--stat-border)] px-5 py-3 text-[14px] font-semibold text-[color:var(--foreground)] disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)] disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isLoading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
