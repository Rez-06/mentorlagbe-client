/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PiVideoCameraDuotone, PiMapPinDuotone } from "react-icons/pi";
import SubjectArt from "./SubjectArt";

export default function TuitionCard({ tuition }) {
  const { _id, href, title, subject, classLevel, mode, monthlyFee, tutorName, bannerImage } = tuition;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        {bannerImage ? (
          <img src={bannerImage} alt={title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <SubjectArt subject={subject} className="h-full w-full" />
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-base-100 px-2.5 py-1 text-xs font-semibold text-base-content shadow">
          {mode === "Online" ? <PiVideoCameraDuotone /> : <PiMapPinDuotone />}
          {mode}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-base-content/55">
          {subject} · {classLevel}
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-[3.25rem] text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-base-content/70">by {tutorName}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xl font-semibold">৳{Number(monthlyFee).toLocaleString("en-US")}</p>
            <p className="text-xs text-base-content/55">per month</p>
          </div>
          <Link href={href || `/tuitions/${_id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}