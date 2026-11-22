"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate } from "@/lib/format";

const tabs = ["all", "pending", "accepted", "rejected"];

export default function ApplicantsPage() {
  const { data, loading, error, setData } = useFetch("/api/applications/tutor");
  const [tab, setTab] = useState("all");
  const [busyId, setBusyId] = useState(null);
  const apps = data?.applications || [];
  const shown = tab === "all" ? apps : apps.filter((a) => a.status === tab);

  const setStatus = async (a, status) => {
    setBusyId(a._id);
    try {
      await apiFetch(`/api/applications/${a._id}/status`, { method: "PATCH", body: { status } });
      setData((d) => ({ ...d, applications: d.applications.map((x) => (x._id === a._id ? { ...x, status } : x)) }));
      toast.success(`Application ${status}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Applicants</h1>
      <p className="mt-2 text-base-content/65">Students who applied to your tuitions. Accept or reject each request.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t ? "border-base-content bg-base-content text-base-100" : "border-base-content/20 hover:bg-base-200"
            }`}
          >
            {t} {t !== "all" && <span className="opacity-60">({apps.filter((a) => a.status === t).length})</span>}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="skeleton h-72 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : shown.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center text-base-content/65">
            No {tab === "all" ? "" : tab} applicants to show.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-box)] border border-base-content/15">
            <table className="table">
              <thead>
                <tr className="font-mono text-xs uppercase tracking-wider">
                  <th>Student</th><th>Phone</th><th>Tuition</th><th>Schedule</th><th>Note</th><th>Status</th><th className="text-right">Decision</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((a) => (
                  <tr key={a._id} className="hover:bg-base-200/60">
                    <td className="min-w-44">
                      <p className="font-semibold">{a.studentName}</p>
                      <p className="text-xs text-base-content/55">{a.studentEmail}</p>
                    </td>
                    <td className="whitespace-nowrap">{a.studentPhone}</td>
                    <td className="min-w-44">
                      <p>{a.tuitionTitle}</p>
                      <p className="text-xs text-base-content/55">{formatDate(a.appliedAt)}</p>
                    </td>
                    <td className="min-w-36">{a.preferredSchedule}</td>
                    <td className="max-w-56 text-sm text-base-content/70">{a.studentNote || "-"}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={busyId === a._id || a.status === "accepted"}
                          onClick={() => setStatus(a, "accepted")}
                          className="btn btn-success btn-sm gap-1"
                        >
                          <PiCheckBold /> Accept
                        </button>
                        <button
                          disabled={busyId === a._id || a.status === "rejected"}
                          onClick={() => setStatus(a, "rejected")}
                          className="btn btn-outline btn-error btn-sm gap-1"
                        >
                          <PiXBold /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}