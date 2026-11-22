"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiLockKeyDuotone, PiInfoDuotone, PiCheckCircleDuotone } from "react-icons/pi";
import { useAuth } from "@/components/providers/AuthProvider";
import StatusBadge from "@/components/ui/StatusBadge";
import { apiFetch } from "@/lib/apiFetch";

export default function ApplyPanel({ tuitionId, fee }) {
  const { user, loading } = useAuth();
  const [status, setStatus] = useState(undefined); // undefined = checking, null = not applied, "pending" etc = applied
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ studentPhone: "", preferredSchedule: "", studentNote: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user || user.role !== "student") return;
    setForm((f) => ({ ...f, studentPhone: f.studentPhone || user.phone || "" }));
    apiFetch(`/api/applications/check/${tuitionId}`)
      .then((r) => setStatus(r.applied ? r.status : null))
      .catch(() => setStatus(null));
  }, [user, tuitionId]);

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!/^[0-9+\-\s]{7,20}$/.test(form.studentPhone.trim())) err.studentPhone = "Enter a valid phone number";
    if (form.preferredSchedule.trim().length < 3) err.preferredSchedule = "Tell the tutor when you are free";
    setErrors(err);
    if (Object.keys(err).length) return;

    setBusy(true);
    try {
      await apiFetch("/api/applications", { method: "POST", body: { tuitionId, ...form } });
      toast.success("Application sent! The tutor will review it soon.");
      setStatus("pending");
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
      if (error.status === 409) {
        setStatus("pending");
        setOpen(false);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6 lg:sticky lg:top-28">
      <p className="text-sm text-base-content/60">Monthly fee</p>
      <p className="text-4xl font-semibold tracking-tight">৳{Number(fee).toLocaleString("en-US")}</p>

      <div className="mt-6">
        {loading ? (
          <div className="skeleton h-12 w-full" />
        ) : !user ? (
          <>
            <p className="mb-4 flex items-start gap-2 text-sm text-base-content/70">
              <PiLockKeyDuotone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
              Sign in as a student to apply for this tuition.
            </p>
            <Link href={`/sign-in?redirect=/tuitions/${tuitionId}`} className="btn btn-primary w-full">Sign In to Apply</Link>
            <Link href="/sign-up" className="mt-3 block text-center text-sm font-medium text-secondary hover:underline">Create a student account</Link>
          </>
        ) : user.role !== "student" ? (
          <>
            <p className="mb-4 flex items-start gap-2 rounded-xl bg-warning/20 p-3 text-sm">
              <PiInfoDuotone className="mt-0.5 h-5 w-5 shrink-0" />
              Only students can apply for tuitions. You are signed in as a {user.role}.
            </p>
            <button disabled className="btn btn-primary w-full">Apply Now</button>
          </>
        ) : status === undefined ? (
          <div className="skeleton h-12 w-full" />
        ) : status ? (
          <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm">
            <p className="flex items-center gap-2 font-semibold"><PiCheckCircleDuotone className="h-5 w-5 text-success" /> You have applied</p>
            <div className="mt-2 flex items-center gap-2">Status: <StatusBadge status={status} /></div>
            <Link href="/dashboard/student/my-applications" className="mt-3 block font-semibold text-secondary hover:underline">Track in My Applications</Link>
          </div>
        ) : (
          <button onClick={() => setOpen(true)} className="btn btn-primary w-full">Apply Now</button>
        )}
      </div>

      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-semibold">Apply for this tuition</h3>
            <p className="mt-1 text-sm text-base-content/65">Share a few details so the tutor can get back to you.</p>
            <form onSubmit={submit} noValidate className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Phone number</label>
                <input name="studentPhone" value={form.studentPhone} onChange={set} placeholder="01XXXXXXXXX" className="input w-full bg-base-100" />
                {errors.studentPhone && <p className="mt-1 text-xs text-error">{errors.studentPhone}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Preferred schedule</label>
                <input name="preferredSchedule" value={form.preferredSchedule} onChange={set} placeholder="e.g. Sat, Mon, Wed evenings" className="input w-full bg-base-100" />
                {errors.preferredSchedule && <p className="mt-1 text-xs text-error">{errors.preferredSchedule}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Learning note <span className="text-base-content/50">(optional)</span></label>
                <textarea name="studentNote" value={form.studentNote} onChange={set} rows={3} maxLength={500} placeholder="What do you want to improve?" className="textarea w-full bg-base-100" />
              </div>
              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)} disabled={busy}>Cancel</button>
                <button className="btn btn-primary" disabled={busy}>
                  {busy ? <span className="loading loading-spinner loading-sm" /> : "Send application"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}