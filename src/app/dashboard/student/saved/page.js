"use client";

import Link from "next/link";
import TuitionCard from "@/components/ui/TuitionCard";
import { useBookmarks } from "@/components/providers/BookmarksProvider";
import { useFetch } from "@/lib/useFetch";

export default function SavedTuitionsPage() {
  const { data, loading, error } = useFetch("/api/bookmarks");
  const { ids, loaded, limit } = useBookmarks();
  // hide a card instantly when the student un-saves it
  const list = (data?.tuitions || []).filter((t) => !loaded || ids.includes(String(t._id)));

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Saved Tuitions</h1>
      <p className="mt-2 text-base-content/65">
        Tuitions you bookmarked for later.{" "}
        {limit && <span>Free plan: {ids.length} of {limit} saved. <Link href="/pricing" className="font-semibold text-secondary hover:underline">Go Pro for unlimited</Link></span>}
      </p>

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-80" />)}
          </div>
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : list.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center">
            <p className="text-lg font-semibold">Nothing saved yet</p>
            <p className="mt-1 text-sm text-base-content/65">Tap the bookmark on any tuition card to keep it here.</p>
            <Link href="/tuitions" className="btn btn-primary mt-5">Browse Tuitions</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((t) => <TuitionCard key={t._id} tuition={t} />)}
          </div>
        )}
      </div>
    </div>
  );
}