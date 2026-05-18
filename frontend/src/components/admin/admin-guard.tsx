"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAdminAuth } from "./admin-auth-provider";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)] text-[color:var(--muted-foreground)]">
        Loading admin...
      </div>
    );
  }

  return children;
}
