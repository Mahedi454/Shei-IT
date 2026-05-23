"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = isAdminRoute ? "auto" : "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, [isAdminRoute]);

  return children;
}
