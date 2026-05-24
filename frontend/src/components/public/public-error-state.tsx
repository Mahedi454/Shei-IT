"use client";

import { RefreshCw, ShieldAlert } from "lucide-react";

type PublicErrorStateProps = {
  actionLabel?: string;
  description: string;
  onRetry?: () => void;
  title: string;
};

export function PublicErrorState({
  actionLabel = "Try again",
  description,
  onRetry,
  title,
}: PublicErrorStateProps) {
  return (
    <div className="rounded-[1.2rem] border border-rose-500/15 bg-[linear-gradient(180deg,rgba(244,63,94,0.08),rgba(244,63,94,0.02))] px-5 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500/12 text-rose-300">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">{title}</h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[color:var(--muted-foreground)]">
              {description}
            </p>
          </div>
        </div>

        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] px-4 py-2 text-[13px] font-semibold text-[color:var(--foreground)]"
          >
            <RefreshCw className="h-4 w-4 text-[color:var(--primary)]" />
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
