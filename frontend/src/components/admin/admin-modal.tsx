"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

type AdminModalProps = {
  children: ReactNode;
  description?: string;
  onClose: () => void;
  open: boolean;
  title: string;
  widthClassName?: string;
};

export function AdminModal({
  children,
  description,
  onClose,
  open,
  title,
  widthClassName = "max-w-4xl",
}: AdminModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div
        className={`flex max-h-[calc(100vh-3rem)] w-full flex-col overflow-hidden rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--background)] shadow-[0_36px_120px_rgba(0,0,0,0.42)] ${widthClassName}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[color:var(--stat-border)] px-6 py-5">
          <div>
            <h2 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-[14px] text-[color:var(--muted-foreground)]">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[color:var(--stat-border)] p-2 text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
