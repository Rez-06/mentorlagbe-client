"use client";

import Link from "next/link";
import { useState } from "react";
import { PiCheckBold, PiCrownSimpleDuotone } from "react-icons/pi";
import { PLANS } from "@/lib/plans";

function PlanCard({ plan, pro }) {
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
      <div className="mt-auto pt-8">
        {pro ? (
          <Link href="/pricing" className="btn btn-accent w-full">Subscribe with Stripe</Link>
        ) : (
          <Link href="/sign-up" className="btn btn-outline w-full">Get started free</Link>
        )}
      </div>
    </div>
  );
}

export default function PricingPlans() {
  const [audience, setAudience] = useState("student");
  const plans = PLANS[audience];

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
        <PlanCard plan={plans.free} />
        <PlanCard plan={plans.pro} pro />
      </div>
    </div>
  );
}