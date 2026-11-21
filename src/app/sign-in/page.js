"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/components/providers/AuthProvider";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function SignInPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const r = new URLSearchParams(window.location.search).get("redirect");
      router.replace(r && r.startsWith("/") && !r.startsWith("//") ? r : "/dashboard");
    }
  }, [loading, user, router]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!emailOk(form.email)) err.email = "Enter a valid email address";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    setErrors(err);
    if (Object.keys(err).length) return;

    setBusy(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your tuitions and applications.">
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="input w-full bg-base-100" />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Password</label>
          <input name="password" type="password" autoComplete="current-password" value={form.password} onChange={onChange} placeholder="••••••" className="input w-full bg-base-100" />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
        </div>
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-base-content/65">
        New to MentorLagbe?{" "}
        <Link href="/sign-up" className="font-semibold text-secondary underline-offset-4 hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}