"use client";

import Link from "next/link";
import { PiCrownSimpleDuotone, PiIdentificationBadgeDuotone, PiCalendarCheckDuotone } from "react-icons/pi";
import StatCard from "./StatCard";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Welcome({ subtitle, actions = [] }) {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-base-content/65">{subtitle}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={PiIdentificationBadgeDuotone} label="Account role" value={user.role} tone="bg-secondary text-secondary-content" />
        <StatCard
          icon={PiCrownSimpleDuotone}
          label="Current plan"
          value={user.plan}
          hint={user.plan === "free" ? "Upgrade anytime from Pricing" : "Thanks for going Pro"}
        />
        <StatCard
          icon={PiCalendarCheckDuotone}
          label="Member since"
          value={new Date(user.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
          tone="bg-neutral text-accent"
        />
      </div>

      {actions.length > 0 && (
        <div className="mt-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-base-content/55">Quick actions</p>
          <div className="flex flex-wrap gap-3">
            {actions.map((a) => (
              <Link key={a.href} href={a.href} className="btn btn-outline">{a.label}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}