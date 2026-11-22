"use client";

import { PiBookmarkSimpleDuotone, PiBookmarkSimpleFill } from "react-icons/pi";
import { useBookmarks } from "@/components/providers/BookmarksProvider";

export default function BookmarkButton({ tuitionId, className = "" }) {
  const { ids, enabled, toggle } = useBookmarks();
  if (!enabled) return null;
  const saved = ids.includes(String(tuitionId));

  return (
    <button
      onClick={() => toggle(String(tuitionId))}
      aria-label={saved ? "Remove from saved" : "Save tuition"}
      title={saved ? "Remove from saved" : "Save for later"}
      className={`grid h-9 w-9 place-items-center rounded-lg bg-base-100 text-base-content shadow transition hover:scale-105 ${className}`}
    >
      {saved ? <PiBookmarkSimpleFill size={18} className="text-secondary" /> : <PiBookmarkSimpleDuotone size={18} />}
    </button>
  );
}