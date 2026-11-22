"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiCheckBold, PiCrownSimpleDuotone } from "react-icons/pi";
import { PLANS } from "@/lib/plans";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiFetch } from "@/lib/apiFetch";

function ProButton({ audience, onSubscribe, busy }) {
  const { user, loading } = useAuth();
  const off = "btn btn-accent w-full";
  if (loading) return <button disabled className={off}>Loading...</button>;
  if (!user) return <Link href="/sign-in?redirect=/pricing" className={off}>Sign in to subscribe</Link>;
  if (user.role === "admin") return <button disabled className={off}>Admins cannot subscribe</button>;
  if (user.role !== audience) return <button disabled className={off}>For {audience}s only</button>;
  if (user.plan === "pro") return <button disabled className={off}>You are on Pro</button>;
  return (
    <button onClick={onSubscribe} disabled={busy} className={off}>
      {busy ? <span className="loading loading-spinner loading-sm" /> : "Subscribe with Stripe"}
    </button>
  );
}

function FreeButton({ audience }) {
  const { user } = useAuth();
  if (!user) return <Link href="/sign-up" className="btn btn-outline w-full">Get started free</Link>;
  if (user.role === audience && user.plan === "free") return <button disabled className="btn btn-outline w-full">Your current plan</button>;
  return <Link href="/dashboard" className="btn btn-outline w-full">Open dashboard</Link>;
}

function PlanCard({ plan, pro, children }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-[var(--radius-box)] border p-8 ${
        pro ? "border-accent bg-neutral text-neutral-content shadow-xl" : "border-base-content/15 bg-base-200/60"
      }`}
    >
      {pro && (
        <span className="absolute right-6 top-6 flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-content">
          <PiCrownSimpleDuotone /> Most popular
        </span>
      )}
      <p className="font-mono text-xs uppercase tracking-[0.16em] opacity-70">{plan.name}</p>
      <p className="mt-4 text-5xl font-semibold tracking-tight">
        ${plan.price}
        <span className="ml-2 text-sm font-normal opacity-60">{pro ? "one-time upgrade" : "forever"}</span>
      </p>
      <ul className="mt-7 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <PiCheckBold className={`mt-0.5 shrink-0 ${pro ? "text-accent" : "text-secondary"}`} />
            <span className="opacity-85">{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">{children}</div>
    </div>
  );
}

export default function PricingPlans() {
  const { user } = useAuth();
  const [audience, setAudience] = useState("student");
  const [busy, setBusy] = useState(false);
  const plans = PLANS[audience];

  useEffect(() => {
    if (user && (user.role === "student" || user.role === "tutor")) setAudience(user.role);
  }, [user]);

  const subscribe = async () => {
    setBusy(true);
    try {
      const { url } = await apiFetch("/api/payments/checkout", { method: "POST" });
      window.location.href = url;
    } catch (err) {
      toast.error(err.message);
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="mx-auto mb-10 flex w-fit rounded-xl border border-base-content/15 bg-base-200/60 p-1">
        {[["student", "For Students"], ["tutor", "For Tutors"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setAudience(key)}
            className={`rounded-lg px-6 py-2 text-sm font-semibold transition ${
              audience === key ? "bg-base-content text-base-100" : "text-base-content/60 hover:text-base-content"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <PlanCard plan={plans.free}>
          <FreeButton audience={audience} />
        </PlanCard>
        <PlanCard plan={plans.pro} pro>
          <ProButton audience={audience} onSubscribe={subscribe} busy={busy} />
        </PlanCard>
      </div>
    </div>
  );
}