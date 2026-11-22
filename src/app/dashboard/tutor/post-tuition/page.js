"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import TuitionForm from "@/components/tuitions/TuitionForm";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";

export default function PostTuitionPage() {
  const router = useRouter();
  const { data, loading } = useFetch("/api/tutor/tuitions");
  const posted = data?.tuitions.length ?? 0;
  const limit = data?.limit ?? null; // null = Pro plan (unlimited)
  const blocked = limit !== null && posted >= limit;

  const create = async (values) => {
    await apiFetch("/api/tutor/tuitions", { method: "POST", body: values });
    toast.success("Submitted! An admin will review your tuition soon.");
    router.push("/dashboard/tutor");
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-semibold tracking-tight">Post a Tuition</h1>
      <p className="mt-2 text-base-content/65">New posts are reviewed by an admin before they appear on the public page.</p>

      <div className="mt-8">
        {loading ? (
          <div className="skeleton h-96 w-full" />
        ) : blocked ? (
          <div className="rounded-[var(--radius-box)] border border-accent bg-accent/10 p-10 text-center">
            <PiCrownSimpleDuotone className="mx-auto h-12 w-12 text-accent" />
            <h2 className="mt-4 text-xl font-semibold">You have reached the Free plan limit</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-base-content/70">
              Free tutors can post {limit} tuitions. Upgrade to Pro for unlimited posts and a verified badge.
            </p>
            <Link href="/pricing" className="btn btn-primary mt-6">View Pro plan</Link>
          </div>
        ) : (
          <>
            {limit !== null && (
              <p className="mb-5 rounded-xl border border-base-content/15 bg-base-200/60 px-4 py-3 text-sm">
                Free plan: <b>{posted} of {limit}</b> tuition posts used.{" "}
                <Link href="/pricing" className="font-semibold text-secondary hover:underline">Go Pro for unlimited</Link>
              </p>
            )}
            <TuitionForm submitLabel="Submit for review" onSubmit={create} />
          </>
        )}
      </div>
    </div>
  );
}