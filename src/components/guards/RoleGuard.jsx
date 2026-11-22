"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import PageLoader from "@/components/ui/PageLoader";

// Waits for the saved login to be restored BEFORE deciding anything,
// so reloading a private page never bounces you to sign-in.
export default function RoleGuard({ roles, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const allowed = user && (!roles || roles.includes(user.role));

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    else if (!allowed) router.replace("/dashboard");
  }, [loading, user, allowed, pathname, router]);

  if (loading || !allowed) return <PageLoader />;
  return children;
}