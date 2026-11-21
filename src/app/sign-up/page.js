"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PiStudentDuotone, PiChalkboardTeacherDuotone } from "react-icons/pi";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/components/providers/AuthProvider";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);
const roles = [
  { value: "student", label: "Student", hint: "I want to learn", icon: PiStudentDuotone },
  { value: "tutor", label: "Tutor", hint: "I want to teach", icon: PiChalkboardTeacherDuotone },
];

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = "Please enter your full name";
    if (!emailOk(form.email)) err.email = "Enter a valid email address";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    setErrors(err);
    if (Object.keys(err).length) return;

    setBusy(true);
    try {
      await register({ ...form, name: form.name.trim() });
      toast.success("Account created. Welcome to MentorLagbe!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Join as a student or a tutor. You can start for free.">
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Full name</label>
          <input name="name" autoComplete="name" value={form.name} onChange={onChange} placeholder="Your full name" className="input w-full bg-base-100" />
          {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="input w-full bg-base-100" />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Password</label>
          <input name="password" type="password" autoComplete="new-password" value={form.password} onChange={onChange} placeholder="At least 6 characters" className="input w-full bg-base-100" />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">I am a</label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map(({ value, label, hint, icon: Icon }) => (
              <button
                type="button"
                key={value}
                onClick={() => setForm((f) => ({ ...f, role: value }))}
                className={`flex items-center gap-3 rounded-xl border-2 p-3 text-left transition ${
                  form.role === value ? "border-base-content bg-base-100" : "border-base-content/15 hover:border-base-content/40"
                }`}
              >
                <Icon className="h-8 w-8 text-secondary" />
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-base-content/55">{hint}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-base-content/65">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-secondary underline-offset-4 hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}