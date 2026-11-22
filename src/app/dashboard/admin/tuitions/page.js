"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiCheckBold, PiXBold, PiCaretLeftBold, PiCaretRightBold, PiArrowUpRightBold } from "react-icons/pi";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate, formatTaka } from "@/lib/format";

const tabs = ["all", "pending", "approved", "rejected"];

export default function AdminTuitionsPage() {
  const [tab, setTab] = useState("pending");
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState(null);

  const qs = new URLSearchParams({ page: String(page), limit: "10" });
  if (tab !== "all") qs.set("status", tab);

  const { data, loading, error, reload } = useFetch(`/api/admin/tuitions?${qs}`);
  const tuitions = data?.tuitions || [];
  const counts = data?.counts;

  const review = async (t, approvalStatus) => {
    setBusyId(t._id);
    try {
      await apiFetch(`/api/admin/tuitions/${t._id}/status`, { method: "PATCH", body: { approvalStatus } });
      toast.success(approvalStatus === "approved" ? "Tuition approved and now public" : "Tuition rejected");
      await reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Tuition Approval</h1>
      <p className="mt-2 text-base-content/65">Only approved and active tuitions appear on the public Browse page.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPage(1); }}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t ? "border-base-content bg-base-content text-base-100" : "border-base-content/20 hover:bg-base-200"
            }`}
          >
            {t} {counts && <span className="opacity-60">({counts[t]})</span>}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="skeleton h-80 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : tuitions.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center text-base-content/65">
            Nothing here. All caught up!
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-[var(--radius-box)] border border-base-content/15">
              <table className="table">
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-wider">
                    <th>Tuition</th><th>Tutor</th><th>Fee</th><th>Mode</th><th>Posted</th><th>Status</th><th className="text-right">Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {tuitions.map((t) => (
                    <tr key={t._id} className="hover:bg-base-200/60">
                      <td className="min-w-56">
                        <p className="font-semibold">{t.title}</p>
                        <p className="text-xs text-base-content/55">{t.subject} · {t.classLevel}{!t.isActive && " · closed"}</p>
                      </td>
                      <td>
                        <p>{t.tutorName}</p>
                        <p className="text-xs text-base-content/55">{t.tutorEmail}</p>
                      </td>
                      <td>{formatTaka(t.monthlyFee)}</td>
                      <td>{t.mode}</td>
                      <td className="whitespace-nowrap">{formatDate(t.createdAt)}</td>
                      <td><StatusBadge status={t.approvalStatus} /></td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {t.approvalStatus === "approved" && (
                            <Link href={`/tuitions/${t._id}`} className="btn btn-ghost btn-sm" aria-label="View public page"><PiArrowUpRightBold /></Link>
                          )}
                          <button disabled={busyId === t._id || t.approvalStatus === "approved"} onClick={() => review(t, "approved")} className="btn btn-success btn-sm gap-1">
                            <PiCheckBold /> Approve
                          </button>
                          <button disabled={busyId === t._id || t.approvalStatus === "rejected"} onClick={() => review(t, "rejected")} className="btn btn-outline btn-error btn-sm gap-1">
                            <PiXBold /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <p className="text-base-content/60">{data.total} tuitions · page {data.page} of {data.pages}</p>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn btn-outline btn-sm gap-1"><PiCaretLeftBold /> Prev</button>
                <button disabled={page >= data.pages} onClick={() => setPage(page + 1)} className="btn btn-outline btn-sm gap-1">Next <PiCaretRightBold /></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}