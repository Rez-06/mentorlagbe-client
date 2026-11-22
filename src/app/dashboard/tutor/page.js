"use client";

import Link from "next/link";
import { PiBooksDuotone, PiSealCheckDuotone, PiUsersDuotone, PiCrownSimpleDuotone } from "react-icons/pi";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFetch } from "@/lib/useFetch";
import { formatDate } from "@/lib/format";

export default function TutorOverview() {
  const { user } = useAuth();
  const t = useFetch("/api/tutor/tuitions");
  const a = useFetch("/api/applications/tutor");

  const tuitions = t.data?.tuitions || [];
  const applicants = a.data?.applications || [];
  const loading = t.loading || a.loading;
  const val = (n) => (loading ? "…" : n);
  const live = tuitions.filter((x) => x.approvalStatus === "approved" && x.isActive).length;
  const limit = t.data?.limit;

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-base-content/65">A quick look at your tuitions and student interest.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PiBooksDuotone} label="Tuitions posted" value={val(tuitions.length)} hint={limit ? `${tuitions.length} of ${limit} free posts` : "Unlimited posts"} tone="bg-secondary text-secondary-content" />
        <StatCard icon={PiSealCheckDuotone} label="Active & approved" value={val(live)} tone="bg-success text-success-content" />
        <StatCard icon={PiUsersDuotone} label="Total applicants" value={val(applicants.length)} />
        <StatCard icon={PiCrownSimpleDuotone} label="Current plan" value={user.plan} hint={user.plan === "free" ? "Upgrade for unlimited posts" : "Verified tutor"} tone="bg-neutral text-accent" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Latest applicants</p>
            <Link href="/dashboard/tutor/applicants" className="text-sm font-semibold text-secondary hover:underline">Manage</Link>
          </div>
          {loading ? (
            <div className="skeleton mt-4 h-32 w-full" />
          ) : applicants.length === 0 ? (
            <p className="py-8 text-center text-sm text-base-content/60">No applicants yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-base-content/10">
              {applicants.slice(0, 4).map((x) => (
                <li key={x._id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{x.studentName}</p>
                    <p className="text-xs text-base-content/55">{x.tuitionTitle} · {formatDate(x.appliedAt)}</p>
                  </div>
                  <StatusBadge status={x.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6">
          <p className="font-semibold">Quick actions</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary">Post a tuition</Link>
            <Link href="/dashboard/tutor/my-tuitions" className="btn btn-outline">My tuitions</Link>
            <Link href="/dashboard/profile" className="btn btn-outline">Update profile</Link>
          </div>
          {user.plan === "free" && (
            <p className="mt-5 rounded-xl bg-accent/15 p-4 text-sm">
              Go Pro for unlimited posts and a verified badge. <Link href="/pricing" className="font-semibold text-secondary hover:underline">See pricing</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}