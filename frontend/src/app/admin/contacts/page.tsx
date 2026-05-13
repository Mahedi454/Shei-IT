import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContactsManager } from "@/components/admin/contacts-manager";

export default function AdminContactsPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <ContactsManager />
      </AdminShell>
    </AdminGuard>
  );
}
