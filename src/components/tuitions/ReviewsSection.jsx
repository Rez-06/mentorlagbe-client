"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiStarFill, PiInfoDuotone } from "react-icons/pi";
import UserAvatar from "@/components/ui/UserAvatar";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate } from "@/lib/format";

function Stars({ value, size = 18 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <PiStarFill key={n} size={size} className={n <= Math.round(value) ? "text-accent" : "text-base-300"} />
      ))}
    </span>
  );
}

export default function ReviewsSection({ tuitionId, initialReviews = [], initialAvg = 0, initialCount = 0 }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(initialReviews);
  const [avg, setAvg] = useState(initialAvg);
  const [count, setCount] = useState(initialCount);
  const [elig, setElig] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user?.role !== "student") {
      setElig(null);
      return;
    }
    apiFetch(`/api/reviews/eligibility/${tuitionId}`).then(setElig).catch(() => setElig(null));
  }, [user, tuitionId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please choose a star rating");
    if (comment.trim().length < 5) return toast.error("Please write a few words of feedback");

    setBusy(true);
    try {
      const res = await apiFetch("/api/reviews", { method: "POST", body: { tuitionId, rating, comment } });
      setReviews((r) => [res.review, ...r]);
      setAvg(res.avgRating);
      setCount(res.reviewCount);
      setElig({ eligible: false, reviewed: true, accepted: true });
      toast.success("Thanks for your review!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {count > 0 && (
          <div className="flex items-center gap-2">
            <Stars value={avg} />
            <span className="font-semibold">{avg}</span>
            <span className="text-sm text-base-content/55">({count} {count === 1 ? "review" : "reviews"})</span>
          </div>
        )}
      </div>

      {elig?.eligible && (
        <form onSubmit={submit} className="mt-5 rounded-[var(--radius-box)] border border-accent/60 bg-accent/10 p-5">
          <p className="font-semibold">Share your experience</p>
          <div className="mt-3 flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} aria-label={`${n} stars`}>
                <PiStarFill size={30} className={n <= (hover || rating) ? "text-accent" : "text-base-300"} />
              </button>
            ))}
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} maxLength={500} placeholder="What did you like? How did it help you?" className="textarea mt-3 w-full bg-base-100" />
          <button disabled={busy} className="btn btn-primary mt-3">
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Submit review"}
          </button>
        </form>
      )}

      {elig && !elig.eligible && !elig.reviewed && (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-base-200/60 p-4 text-sm text-base-content/70">
          <PiInfoDuotone className="mt-0.5 h-5 w-5 shrink-0" />
          You can review this tuition once the tutor accepts your application.
        </p>
      )}
      {elig?.reviewed && <p className="mt-5 text-sm text-success">You have reviewed this tuition. Thank you!</p>}

      {reviews.length === 0 ? (
        <p className="mt-5 text-sm text-base-content/60">No reviews yet.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {reviews.map((r) => (
            <li key={r.studentId} className="flex gap-4 rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-5">
              <UserAvatar user={{ name: r.studentName, image: r.studentImage }} />
              <div>
                <div className="flex flex-wrap items-center gap-x-3">
                  <p className="font-semibold">{r.studentName}</p>
                  <Stars value={r.rating} size={14} />
                  <span className="text-xs text-base-content/50">{formatDate(r.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-base-content/75">{r.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}