import { ReactNode } from "react";

import { AdminAuthProvider } from "@/components/admin/admin-auth-provider";
import { AdminFeedbackProvider } from "@/components/admin/admin-feedback-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminFeedbackProvider>{children}</AdminFeedbackProvider>
    </AdminAuthProvider>
  );
}
