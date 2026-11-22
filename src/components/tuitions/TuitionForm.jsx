/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { PiUploadSimpleBold } from "react-icons/pi";
import SubjectArt from "@/components/ui/SubjectArt";
import { apiFetch } from "@/lib/apiFetch";
import { SUBJECTS, CLASS_LEVELS, MODES } from "@/lib/constants";

const blank = {
  title: "", subject: "", classLevel: "", mode: "Online", location: "",
  monthlyFee: "", daysPerWeek: "3", description: "", bannerImage: "",
};

function Field({ label, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export default function TuitionForm({ initial, submitLabel = "Save", onSubmit }) {
  const [form, setForm] = useState({ ...blank, ...initial });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.bannerImage || "");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(f.type)) return toast.error("Please choose a PNG, JPG, WEBP or GIF image");
    if (f.size > 4 * 1024 * 1024) return toast.error("Image must be 4MB or smaller");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 5) e.title = "Title must be at least 5 characters";
    if (!form.subject) e.subject = "Choose a subject";
    if (!form.classLevel) e.classLevel = "Choose a class level";
    if (form.mode === "Offline" && form.location.trim().length < 2) e.location = "Enter the area for offline classes";
    const fee = Number(form.monthlyFee);
    if (!(fee >= 100 && fee <= 100000)) e.monthlyFee = "Fee must be between 100 and 100,000";
    if (form.description.trim().length < 20) e.description = "Description must be at least 20 characters";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return toast.error("Please fix the highlighted fields");

    setBusy(true);
    try {
      let bannerImage = form.bannerImage;
      if (file) {
        const fd = new FormData();
        fd.append("image", file);
        bannerImage = (await apiFetch("/api/upload", { method: "POST", body: fd })).url;
      }
      await onSubmit({ ...form, bannerImage, monthlyFee: Number(form.monthlyFee), daysPerWeek: Number(form.daysPerWeek) });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const box = "rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-6";

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className={`${box} space-y-5`}>
        <Field label="Title" error={errors.title}>
          <input name="title" value={form.title} onChange={set} placeholder="e.g. SSC Mathematics Crash Batch" className="input w-full bg-base-100" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Subject" error={errors.subject}>
            <select name="subject" value={form.subject} onChange={set} className="select w-full bg-base-100">
              <option value="">Select subject</option>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Class level" error={errors.classLevel}>
            <select name="classLevel" value={form.classLevel} onChange={set} className="select w-full bg-base-100">
              <option value="">Select class level</option>
              {CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Mode">
            <select name="mode" value={form.mode} onChange={set} className="select w-full bg-base-100">
              {MODES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Location" error={errors.location}>
            <input
              name="location"
              value={form.location}
              onChange={set}
              placeholder={form.mode === "Online" ? "Online (add a note, optional)" : "e.g. Dhanmondi, Dhaka"}
              className="input w-full bg-base-100"
            />
          </Field>
          <Field label="Monthly fee (৳)" error={errors.monthlyFee}>
            <input name="monthlyFee" type="number" min="100" value={form.monthlyFee} onChange={set} placeholder="3500" className="input w-full bg-base-100" />
          </Field>
          <Field label="Days per week">
            <select name="daysPerWeek" value={form.daysPerWeek} onChange={set} className="select w-full bg-base-100">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>{d} {d === 1 ? "day" : "days"}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Description" error={errors.description}>
          <textarea name="description" value={form.description} onChange={set} rows={6} maxLength={2000} placeholder="Describe the syllabus, teaching style and who this batch is for." className="textarea w-full bg-base-100" />
        </Field>
      </div>

      <div className="space-y-4">
        <div className={box}>
          <p className="mb-3 text-sm font-medium">Banner image</p>
          <div className="aspect-[16/10] overflow-hidden rounded-xl">
            {preview ? (
              <img src={preview} alt="Banner preview" className="h-full w-full object-cover" />
            ) : (
              <SubjectArt subject={form.subject || "Your subject"} className="h-full w-full" />
            )}
          </div>
          <label className="btn btn-outline btn-sm mt-4 w-full cursor-pointer gap-2">
            <PiUploadSimpleBold /> {preview ? "Change image" : "Upload image"}
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>
          <p className="mt-2 text-xs text-base-content/50">Optional. Without one we show a subject illustration.</p>
        </div>
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
        </button>
      </div>
    </form>
  );
}