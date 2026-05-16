import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardOverview } from "@/components/admin/dashboard-overview";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <DashboardOverview />
      </AdminShell>
    </AdminGuard>
  );
}
