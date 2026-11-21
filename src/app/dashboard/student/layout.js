import RoleGuard from "@/components/guards/RoleGuard";

export default function StudentLayout({ children }) {
  return <RoleGuard roles={["student"]}>{children}</RoleGuard>;
}