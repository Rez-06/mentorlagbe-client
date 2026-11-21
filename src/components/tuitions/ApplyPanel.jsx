"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { PiLockKeyDuotone, PiInfoDuotone } from "react-icons/pi";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ApplyPanel({ tuitionId, fee }) {
  const { user, loading } = useAuth();

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
            <p className="mb-4 flex items-start gap-2 rounded-xl bg-warning/15 p-3 text-sm">
              <PiInfoDuotone className="mt-0.5 h-5 w-5 shrink-0" />
              Only students can apply for tuitions. You are signed in as a {user.role}.
            </p>
            <button disabled className="btn btn-primary w-full">Apply Now</button>
          </>
        ) : (
          // The real application form replaces this button in Push 19
          <button onClick={() => toast("The application form arrives in the next update.")} className="btn btn-primary w-full">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}