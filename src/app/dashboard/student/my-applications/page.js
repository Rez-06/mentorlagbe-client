"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import StatusBadge from "@/components/ui/StatusBadge";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate, formatTaka } from "@/lib/format";

export default function MyApplicationsPage() {
  const { data, loading, error, setData } = useFetch("/api/applications/my");
  const [toCancel, setToCancel] = useState(null);
  const [busy, setBusy] = useState(false);
  const apps = data?.applications || [];

  const cancel = async () => {
    setBusy(true);
    try {
      await apiFetch(`/api/applications/${toCancel._id}`, { method: "DELETE" });
      setData((d) => ({ ...d, applications: d.applications.filter((a) => a._id !== toCancel._id) }));
      toast.success("Application cancelled");
      setToCancel(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">My Applications</h1>
      <p className="mt-2 text-base-content/65">Track every tuition you have applied for. You can cancel while an application is pending.</p>

      <div className="mt-8">
        {loading ? (
          <div className="skeleton h-72 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : apps.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center">
            <p className="text-lg font-semibold">No applications yet</p>
            <p className="mt-1 text-sm text-base-content/65">Find a tuition you like and apply in one click.</p>
            <Link href="/tuitions" className="btn btn-primary mt-5">Browse Tuitions</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-box)] border border-base-content/15">
            <table className="table">
              <thead>
                <tr className="font-mono text-xs uppercase tracking-wider">
                  <th>Tuition</th><th>Tutor</th><th>Fee</th><th>Applied</th><th>Status</th><th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a._id} className="hover:bg-base-200/60">
                    <td className="min-w-52">
                      <Link href={`/tuitions/${a.tuitionId}`} className="font-semibold hover:text-secondary hover:underline">{a.tuitionTitle}</Link>
                      <p className="text-xs text-base-content/55">{a.subject}</p>
                    </td>
                    <td>
                      <p>{a.tutorName}</p>
                      <p className="text-xs text-base-content/55">{a.tutorEmail}</p>
                    </td>
                    <td>{formatTaka(a.monthlyFee)}</td>
                    <td className="whitespace-nowrap">{formatDate(a.appliedAt)}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td className="text-right">
                      {a.status === "pending" ? (
                        <button onClick={() => setToCancel(a)} className="btn btn-ghost btn-sm text-error">Cancel</button>
                      ) : (
                        <span className="text-xs text-base-content/40">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!toCancel}
        title="Cancel this application?"
        message={`Your application for "${toCancel?.tuitionTitle}" will be withdrawn.`}
        confirmLabel="Yes, cancel it"
        danger
        busy={busy}
        onConfirm={cancel}
        onCancel={() => setToCancel(null)}
      />
    </div>
  );
}