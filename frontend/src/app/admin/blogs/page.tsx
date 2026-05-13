import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminBlogsPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <ResourceManager resource="blogs" title="Blogs" />
      </AdminShell>
    </AdminGuard>
  );
}
