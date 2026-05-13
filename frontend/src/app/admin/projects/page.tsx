import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminProjectsPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <ResourceManager resource="projects" title="Projects" />
      </AdminShell>
    </AdminGuard>
  );
}
