"use client";

import { useEffect, useState } from "react";
import { PiMagnifyingGlassBold, PiCaretLeftBold, PiCaretRightBold, PiCurrencyDollarDuotone, PiReceiptDuotone, PiChalkboardTeacherDuotone, PiStudentDuotone } from "react-icons/pi";
import StatCard from "@/components/dashboard/StatCard";
import RoleBadge from "@/components/ui/RoleBadge";
import { useFetch } from "@/lib/useFetch";
import { formatDate } from "@/lib/format";

export default function AdminTransactionsPage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const qs = new URLSearchParams({ page: String(page), limit: "10" });
  if (query) qs.set("search", query);
  if (role) qs.set("role", role);

  const { data, loading, error } = useFetch(`/api/admin/payments?${qs}`);
  const s = data?.summary;
  const payments = data?.payments || [];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Transactions</h1>
      <p className="mt-2 text-base-content/65">Every Pro plan payment received through Stripe.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={PiCurrencyDollarDuotone} label="Total revenue" value={s ? `$${s.revenue}` : "…"} tone="bg-success text-success-content" />
        <StatCard icon={PiReceiptDuotone} label="Payments" value={s ? s.count : "…"} />
        <StatCard icon={PiChalkboardTeacherDuotone} label="Tutor Pro" value={s ? `$${s.tutor.amount}` : "…"} hint={s ? `${s.tutor.count} payments` : ""} tone="bg-secondary text-secondary-content" />
        <StatCard icon={PiStudentDuotone} label="Student Pro" value={s ? `$${s.student.amount}` : "…"} hint={s ? `${s.student.count} payments` : ""} tone="bg-neutral text-accent" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="relative min-w-64 flex-1">
          <PiMagnifyingGlassBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/45" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email or transaction ID..." className="input w-full bg-base-100 pl-11" />
        </div>
        <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="select w-44 bg-base-100">
          <option value="">All roles</option>
          <option value="student">Students</option>
          <option value="tutor">Tutors</option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="skeleton h-80 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : payments.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center text-base-content/65">No transactions found.</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-[var(--radius-box)] border border-base-content/15">
              <table className="table">
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-wider">
                    <th>User</th><th>Role</th><th>Plan</th><th>Amount</th><th>Transaction ID</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p._id} className="hover:bg-base-200/60">
                      <td className="min-w-48">
                        <p className="font-semibold">{p.userName}</p>
                        <p className="text-xs text-base-content/55">{p.userEmail}</p>
                      </td>
                      <td><RoleBadge role={p.userRole} /></td>
                      <td>{p.planName}</td>
                      <td className="font-semibold">${p.amount}</td>
                      <td className="max-w-44 truncate font-mono text-xs" title={p.transactionId}>{p.transactionId}</td>
                      <td className="whitespace-nowrap">{formatDate(p.paidAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <p className="text-base-content/60">{data.total} transactions · page {data.page} of {data.pages}</p>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn btn-outline btn-sm gap-1"><PiCaretLeftBold /> Prev</button>
                <button disabled={page >= data.pages} onClick={() => setPage(page + 1)} className="btn btn-outline btn-sm gap-1">Next <PiCaretRightBold /></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}