import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { AnalyticsSettingsManager } from "@/components/admin/analytics-settings-manager";

export default function AdminAnalyticsSettingsPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <AnalyticsSettingsManager />
      </AdminShell>
    </AdminGuard>
  );
}
