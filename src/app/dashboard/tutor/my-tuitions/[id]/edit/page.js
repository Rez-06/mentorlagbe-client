"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PiArrowLeftBold } from "react-icons/pi";
import TuitionForm from "@/components/tuitions/TuitionForm";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";

export default function EditTuitionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useFetch(`/api/tutor/tuitions/${id}`);

  const save = async (values) => {
    await apiFetch(`/api/tutor/tuitions/${id}`, { method: "PUT", body: values });
    toast.success("Tuition updated");
    router.push("/dashboard/tutor/my-tuitions");
  };

  return (
    <div className="max-w-5xl">
      <Link href="/dashboard/tutor/my-tuitions" className="mb-4 inline-flex items-center gap-2 text-sm font-medium hover:text-secondary">
        <PiArrowLeftBold /> Back to My Tuitions
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">Edit Tuition</h1>

      <div className="mt-8">
        {loading ? (
          <div className="skeleton h-96 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : (
          <>
            {data.approvalStatus === "rejected" && (
              <p className="mb-5 rounded-xl bg-warning/20 px-4 py-3 text-sm">
                This tuition was rejected. Saving your changes will send it back for review.
              </p>
            )}
            <TuitionForm
              initial={{ ...data, monthlyFee: String(data.monthlyFee), daysPerWeek: String(data.daysPerWeek) }}
              submitLabel="Save changes"
              onSubmit={save}
            />
          </>
        )}
      </div>
    </div>
  );
}