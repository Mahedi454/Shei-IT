"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[image:var(--hero-surface)] bg-no-repeat">
      <div className="mx-auto flex min-h-screen w-11/12 max-w-[960px] items-center justify-center py-12">
        <div className="w-full rounded-[1.5rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-8 py-12 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
            Something Interrupted
          </p>
          <h1 className="mt-4 text-[2.2rem] font-semibold tracking-[-0.05em] text-[color:var(--foreground)]">
            We could not finish loading this page
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            Nothing is wrong on your side. Please try the page again, or head back to a
            safe section and continue browsing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-5 py-3 text-[14px] font-semibold text-[color:var(--talk-fg)]"
            >
              <RefreshCw className="h-4 w-4" />
              Try this page again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stat-border)] px-5 py-3 text-[14px] font-semibold text-[color:var(--foreground)]"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
