"use client";

import Link from "next/link";
import { PiUsersThreeDuotone, PiChalkboardTeacherDuotone, PiBooksDuotone, PiCurrencyDollarDuotone } from "react-icons/pi";
import StatCard from "@/components/dashboard/StatCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFetch } from "@/lib/useFetch";

function Bars({ title, rows }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6">
      <p className="font-semibold">{title}</p>
      <div className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{r.label}</span>
              <span className="font-semibold">{r.value}</span>
            </div>
            <div className="h-2.5 rounded bg-base-300">
              <div className={`h-full rounded ${r.tone}`} style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { user } = useAuth();
  const { data: s, loading, error } = useFetch("/api/admin/stats");
  const v = (x) => (loading ? "…" : x);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-base-content/65">Platform health at a glance.</p>

      {error && <p className="mt-6 rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PiUsersThreeDuotone} label="Total users" value={v(s?.totalUsers)} tone="bg-secondary text-secondary-content" />
        <StatCard icon={PiChalkboardTeacherDuotone} label="Total tutors" value={v(s?.totalTutors)} />
        <StatCard icon={PiBooksDuotone} label="Pending / Approved" value={v(s && `${s.tuitions.pending} / ${s.tuitions.approved}`)} hint="Tuition listings" tone="bg-neutral text-accent" />
        <StatCard icon={PiCurrencyDollarDuotone} label="Stripe revenue" value={v(s && `$${s.revenue}`)} hint={s ? `${s.payments} payments` : ""} tone="bg-success text-success-content" />
      </div>

      {s && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Bars
            title="Tuition moderation"
            rows={[
              { label: "Approved", value: s.tuitions.approved, tone: "bg-success" },
              { label: "Pending", value: s.tuitions.pending, tone: "bg-warning" },
              { label: "Rejected", value: s.tuitions.rejected, tone: "bg-error" },
            ]}
          />
          <Bars
            title="Users by role"
            rows={[
              { label: "Students", value: s.totalStudents, tone: "bg-secondary" },
              { label: "Tutors", value: s.totalTutors, tone: "bg-accent" },
              { label: "Admins", value: s.totalAdmins, tone: "bg-base-content" },
            ]}
          />
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/dashboard/admin/users" className="btn btn-primary">Manage users</Link>
        <Link href="/dashboard/profile" className="btn btn-outline">Update profile</Link>
      </div>
    </div>
  );
}