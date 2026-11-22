"use client";

import Link from "next/link";
import { PiFileTextDuotone, PiCheckCircleDuotone, PiHourglassMediumDuotone, PiCrownSimpleDuotone } from "react-icons/pi";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFetch } from "@/lib/useFetch";
import { formatDate } from "@/lib/format";

export default function StudentOverview() {
  const { user } = useAuth();
  const { data, loading } = useFetch("/api/applications/my");
  const apps = data?.applications || [];
  const count = (s) => apps.filter((a) => a.status === s).length;
  const val = (n) => (loading ? "…" : n);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-base-content/65">Here is where your tuition applications stand.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PiFileTextDuotone} label="Total applied" value={val(apps.length)} tone="bg-secondary text-secondary-content" />
        <StatCard icon={PiCheckCircleDuotone} label="Accepted" value={val(count("accepted"))} tone="bg-success text-success-content" />
        <StatCard icon={PiHourglassMediumDuotone} label="Pending" value={val(count("pending"))} />
        <StatCard
          icon={PiCrownSimpleDuotone}
          label="Current plan"
          value={user.plan}
          hint={user.plan === "free" ? "Upgrade from Pricing" : "Priority booking active"}
          tone="bg-neutral text-accent"
        />
      </div>

      <div className="mt-10 rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Recent applications</p>
          <Link href="/dashboard/student/my-applications" className="text-sm font-semibold text-secondary hover:underline">View all</Link>
        </div>
        {loading ? (
          <div className="skeleton mt-4 h-32 w-full" />
        ) : apps.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-base-content/65">You have not applied to any tuition yet.</p>
            <Link href="/tuitions" className="btn btn-primary mt-4">Browse Tuitions</Link>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-base-content/10">
            {apps.slice(0, 4).map((a) => (
              <li key={a._id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{a.tuitionTitle}</p>
                  <p className="text-xs text-base-content/55">{a.tutorName} · applied {formatDate(a.appliedAt)}</p>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}