"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiCheckCircleDuotone, PiWarningCircleDuotone } from "react-icons/pi";
import Container from "@/components/ui/Container";
import PageLoader from "@/components/ui/PageLoader";
import RoleGuard from "@/components/guards/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate } from "@/lib/format";

function Inner() {
  const { setUser } = useAuth();
  const [state, setState] = useState({ status: "loading" });
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) return setState({ status: "error", message: "No payment session was found." });

    apiFetch("/api/payments/verify", { method: "POST", body: { sessionId } })
      .then(({ payment }) => {
        setUser((u) => ({ ...u, plan: "pro" }));
        setState({ status: "done", payment });
      })
      .catch((err) => setState({ status: "error", message: err.message }));
  }, [setUser]);

  if (state.status === "loading") return <PageLoader />;

  if (state.status === "error") {
    return (
      <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <PiWarningCircleDuotone className="mx-auto h-16 w-16 text-error" />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">We could not confirm your payment</h1>
          <p className="mt-3 max-w-md text-base-content/65">{state.message}</p>
          <Link href="/pricing" className="btn btn-primary mt-8">Back to Pricing</Link>
        </div>
      </Container>
    );
  }

  const p = state.payment;
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16">
      <div className="w-full max-w-md rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-8 text-center">
        <PiCheckCircleDuotone className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">You are now Pro!</h1>
        <p className="mt-2 text-sm text-base-content/65">Thank you. Your account has been upgraded.</p>

        <dl className="mt-6 space-y-3 rounded-xl bg-base-100 p-5 text-left text-sm">
          {[["Plan", p.planName], ["Amount paid", `$${p.amount} ${p.currency.toUpperCase()}`], ["Date", formatDate(p.paidAt)], ["Transaction", p.transactionId]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-base-content/55">{k}</dt>
              <dd className="max-w-[12rem] truncate font-medium" title={v}>{v}</dd>
            </div>
          ))}
        </dl>

        <Link href="/dashboard" className="btn btn-primary mt-7 w-full">Go to Dashboard</Link>
      </div>
    </Container>
  );
}

export default function PaymentSuccessPage() {
  return (
    <RoleGuard>
      <Inner />
    </RoleGuard>
  );
}