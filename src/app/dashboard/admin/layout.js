import RoleGuard from "@/components/guards/RoleGuard";

export default function AdminLayout({ children }) {
  return <RoleGuard roles={["admin"]}>{children}</RoleGuard>;
}