import RoleGuard from "@/components/guards/RoleGuard";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <RoleGuard>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}