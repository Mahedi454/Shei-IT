import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesManager } from "@/components/admin/services-manager";

export default function AdminServicesPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <ServicesManager />
      </AdminShell>
    </AdminGuard>
  );
}
