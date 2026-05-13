import { ReactNode } from "react";

import { AdminAuthProvider } from "@/components/admin/admin-auth-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
