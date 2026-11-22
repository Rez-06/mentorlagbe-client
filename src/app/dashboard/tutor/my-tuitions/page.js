"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiPencilSimpleLineDuotone, PiTrashDuotone, PiPlusBold } from "react-icons/pi";
import StatusBadge from "@/components/ui/StatusBadge";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate, formatTaka } from "@/lib/format";

export default function MyTuitionsPage() {
  const { data, loading, error, setData } = useFetch("/api/tutor/tuitions");
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const tuitions = data?.tuitions || [];

  const toggle = async (t) => {
    try {
      await apiFetch(`/api/tutor/tuitions/${t._id}/toggle`, { method: "PATCH" });
      setData((d) => ({ ...d, tuitions: d.tuitions.map((x) => (x._id === t._id ? { ...x, isActive: !x.isActive } : x)) }));
      toast.success(t.isActive ? "Tuition closed" : "Tuition reopened");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await apiFetch(`/api/tutor/tuitions/${toDelete._id}`, { method: "DELETE" });
      setData((d) => ({ ...d, tuitions: d.tuitions.filter((x) => x._id !== toDelete._id) }));
      toast.success("Tuition deleted");
      setToDelete(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Tuitions</h1>
          <p className="mt-2 text-base-content/65">Edit, close or delete the batches you have posted.</p>
        </div>
        <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary gap-2"><PiPlusBold /> Post new</Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="skeleton h-72 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : tuitions.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center">
            <p className="text-lg font-semibold">You have not posted any tuitions yet</p>
            <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary mt-5">Post your first tuition</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-box)] border border-base-content/15">
            <table className="table">
              <thead>
                <tr className="font-mono text-xs uppercase tracking-wider">
                  <th>Tuition</th><th>Fee</th><th>Mode</th><th>Review</th><th>Active</th><th>Applicants</th><th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-base-200/60">
                    <td className="min-w-56">
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-xs text-base-content/55">{t.subject} · {t.classLevel} · {formatDate(t.createdAt)}</p>
                    </td>
                    <td>{formatTaka(t.monthlyFee)}</td>
                    <td>{t.mode}</td>
                    <td><StatusBadge status={t.approvalStatus} /></td>
                    <td>
                      <input type="checkbox" className="toggle toggle-success toggle-sm" checked={t.isActive} onChange={() => toggle(t)} aria-label="Toggle active" />
                    </td>
                    <td>{t.applicants}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/tutor/my-tuitions/${t._id}/edit`} className="btn btn-ghost btn-sm" aria-label="Edit"><PiPencilSimpleLineDuotone size={18} /></Link>
                        <button onClick={() => setToDelete(t)} className="btn btn-ghost btn-sm text-error" aria-label="Delete"><PiTrashDuotone size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this tuition?"
        message={`"${toDelete?.title}" and all its applications will be removed permanently.`}
        confirmLabel="Delete"
        danger
        busy={busy}
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}