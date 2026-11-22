"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiMagnifyingGlassBold, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import UserAvatar from "@/components/ui/UserAvatar";
import RoleBadge from "@/components/ui/RoleBadge";
import { useAuth } from "@/components/providers/AuthProvider";
import { useFetch } from "@/lib/useFetch";
import { apiFetch } from "@/lib/apiFetch";
import { formatDate } from "@/lib/format";

export default function AdminUsersPage() {
  const { user: me } = useAuth();
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

  const { data, loading, error, setData } = useFetch(`/api/admin/users?${qs}`);
  const users = data?.users || [];

  const changeRole = async (u, newRole) => {
    try {
      const updated = await apiFetch(`/api/admin/users/${u._id}/role`, { method: "PATCH", body: { role: newRole } });
      setData((d) => ({ ...d, users: d.users.map((x) => (x._id === u._id ? updated : x)) }));
      toast.success(`${u.name} is now a ${newRole}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">User Management</h1>
      <p className="mt-2 text-base-content/65">Search every registered user and change their role.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="relative min-w-64 flex-1">
          <PiMagnifyingGlassBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/45" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="input w-full bg-base-100 pl-11" />
        </div>
        <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="select w-44 bg-base-100">
          <option value="">All roles</option>
          <option value="student">Students</option>
          <option value="tutor">Tutors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="skeleton h-80 w-full" />
        ) : error ? (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">{error}</p>
        ) : users.length === 0 ? (
          <div className="rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-12 text-center text-base-content/65">No users match your search.</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-[var(--radius-box)] border border-base-content/15">
              <table className="table">
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-wider">
                    <th>User</th><th>Role</th><th>Plan</th><th>Joined</th><th>Change role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-base-200/60">
                      <td className="min-w-56">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={u} />
                          <div>
                            <p className="font-semibold">{u.name}{u._id === me._id && <span className="ml-2 text-xs text-base-content/50">(you)</span>}</p>
                            <p className="text-xs text-base-content/55">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td><RoleBadge role={u.role} /></td>
                      <td className="capitalize">{u.plan}</td>
                      <td className="whitespace-nowrap">{formatDate(u.createdAt)}</td>
                      <td>
                        <select
                          value={u.role}
                          disabled={u._id === me._id}
                          onChange={(e) => changeRole(u, e.target.value)}
                          className="select select-sm w-32 bg-base-100"
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <p className="text-base-content/60">{data.total} users · page {data.page} of {data.pages}</p>
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