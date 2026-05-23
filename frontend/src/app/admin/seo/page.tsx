import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { SeoManager } from "@/components/admin/seo-manager";

export default function AdminSeoPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <SeoManager />
      </AdminShell>
    </AdminGuard>
  );
}
