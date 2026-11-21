"use client";

import Container from "@/components/ui/Container";
import RoleGuard from "@/components/guards/RoleGuard";
import RoleBadge from "@/components/ui/RoleBadge";
import { useAuth } from "@/components/providers/AuthProvider";

function Inner() {
  const { user } = useAuth();
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Hello, {user.name}</h1>
      <p className="mt-3 text-base-content/65">{user.email}</p>
      <div className="mt-4"><RoleBadge role={user.role} /></div>
    </Container>
  );
}

export default function DashboardPage() {
  return (
    <RoleGuard>
      <Inner />
    </RoleGuard>
  );
}