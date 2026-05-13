"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { SiteFooter } from "./site-footer";

export function RootShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
      {!isAdmin ? <SiteFooter /> : null}
    </div>
  );
}
