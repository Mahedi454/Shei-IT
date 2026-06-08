"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAdminAuth } from "./admin-auth-provider";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { error, user, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-4 text-center text-[color:var(--muted-foreground)]">
        {error || "Loading admin..."}
      </div>
    );
  }

  return children;
}
