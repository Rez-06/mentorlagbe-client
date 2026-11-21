import RoleGuard from "@/components/guards/RoleGuard";

export default function TutorLayout({ children }) {
  return <RoleGuard roles={["tutor"]}>{children}</RoleGuard>;
}