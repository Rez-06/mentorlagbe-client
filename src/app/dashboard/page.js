"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import PageLoader from "@/components/ui/PageLoader";

export default function DashboardIndex() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace(`/dashboard/${user.role}`);
  }, [user, router]);

  return <PageLoader className="min-h-[40vh]" />;
}