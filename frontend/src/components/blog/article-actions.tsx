"use client";

import { useState } from "react";
import { Bookmark, Check, Share2, ThumbsDown, ThumbsUp } from "lucide-react";

/** Share + bookmark controls shown in the article byline. */
export function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // fall through to clipboard on cancel/failure
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share article"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] text-[color:var(--foreground)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
      >
        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      </button>
      <button
        type="button"
        onClick={() => setSaved((value) => !value)}
        aria-label="Bookmark article"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
          saved
            ? "border-[color:var(--primary)] bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]"
            : "border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      </button>
    </div>
  );
}

/** "Was this article helpful?" feedback control. */
export function HelpfulActions() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] font-semibold text-[color:var(--muted-foreground)]">
        {vote ? "Thanks for the feedback!" : "Was this article helpful?"}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVote("up")}
          aria-label="Helpful"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
            vote === "up"
              ? "border-[color:var(--primary)] bg-[color:var(--button-secondary-icon)] text-[color:var(--primary)]"
              : "border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] text-[color:var(--foreground)] hover:border-[color:var(--primary)]"
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setVote("down")}
          aria-label="Not helpful"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
            vote === "down"
              ? "border-rose-400 bg-rose-400/10 text-rose-500"
              : "border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] text-[color:var(--foreground)] hover:border-rose-400"
          }`}
        >
          <ThumbsDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
