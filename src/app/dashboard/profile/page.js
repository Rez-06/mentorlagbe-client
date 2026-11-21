"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { PiUploadSimpleBold } from "react-icons/pi";
import UserAvatar from "@/components/ui/UserAvatar";
import RoleBadge from "@/components/ui/RoleBadge";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiFetch } from "@/lib/apiFetch";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user.name || "", phone: user.phone || "", bio: user.bio || "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user.image || "");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(f.type)) return toast.error("Please choose a PNG, JPG, WEBP or GIF image");
    if (f.size > 4 * 1024 * 1024) return toast.error("Image must be 4MB or smaller");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name");

    setBusy(true);
    try {
      let image = user.image || "";
      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        const uploaded = await apiFetch("/api/upload", { method: "POST", body: fd });
        image = uploaded.url;
      }
      const updated = await apiFetch("/api/users/me", {
        method: "PATCH",
        body: { name: form.name.trim(), phone: form.phone, bio: form.bio, image },
      });
      setUser(updated);
      setFile(null);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-semibold tracking-tight">Update Profile</h1>
      <p className="mt-2 text-base-content/65">Keep your details fresh so tutors and students can trust you.</p>

      <form onSubmit={submit} className="mt-8 grid gap-6 md:grid-cols-[16rem_1fr]">
        <div className="flex flex-col items-center rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6 text-center">
          <UserAvatar user={{ name: form.name, image: preview }} size="h-28 w-28" className="text-3xl" />
          <p className="mt-4 font-semibold">{user.name}</p>
          <div className="mt-1"><RoleBadge role={user.role} /></div>
          <label className="btn btn-outline btn-sm mt-5 cursor-pointer gap-2">
            <PiUploadSimpleBold /> Upload photo
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>
          <p className="mt-2 text-xs text-base-content/50">PNG, JPG or WEBP, up to 4MB</p>
        </div>

        <div className="space-y-5 rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Full name</label>
            <input name="name" value={form.name} onChange={onChange} className="input w-full bg-base-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input value={user.email} disabled className="input w-full bg-base-300/50" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={onChange} placeholder="01XXXXXXXXX" className="input w-full bg-base-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Bio</label>
            <textarea name="bio" value={form.bio} onChange={onChange} rows={4} maxLength={500} placeholder="Tell people a little about yourself" className="textarea w-full bg-base-100" />
            <p className="mt-1 text-right text-xs text-base-content/50">{form.bio.length}/500</p>
          </div>
          <button disabled={busy} className="btn btn-primary">
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}