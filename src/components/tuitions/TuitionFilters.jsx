"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import { SUBJECTS, CLASS_LEVELS, MODES } from "@/lib/constants";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "fee-low", label: "Fee: low to high" },
  { value: "fee-high", label: "Fee: high to low" },
];
const toOptions = (arr) => arr.map((v) => ({ value: v, label: v }));

function Select({ label, name, value, onChange, options, all = true }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-base-content/55">{label}</span>
      <select className="select w-full bg-base-100" value={value} onChange={(e) => onChange(name, e.target.value)}>
        {all && <option value="">All</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

export default function TuitionFilters({ initial }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState(initial);
  const first = useRef(true);

  const push = (v) => {
    const qs = new URLSearchParams();
    Object.entries(v).forEach(([k, val]) => {
      if (val && !(k === "sort" && val === "newest")) qs.set(k, val);
    });
    startTransition(() => router.replace(`/tuitions${qs.toString() ? `?${qs}` : ""}`, { scroll: false }));
  };

  const update = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (name !== "search") push(next);
  };

  // debounce the search box
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => push(values), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.search]);

  const clear = () => {
    const empty = { search: "", subject: "", classLevel: "", mode: "", sort: "newest" };
    setValues(empty);
    push(empty);
  };

  const dirty = values.search || values.subject || values.classLevel || values.mode || values.sort !== "newest";

  return (
    <div className="mb-10 rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-5">
      <div className="relative">
        <PiMagnifyingGlassBold className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/45" />
        <input
          value={values.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Search by title or subject..."
          className="input w-full bg-base-100 pl-11"
        />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Subject" name="subject" value={values.subject} onChange={update} options={toOptions(SUBJECTS)} />
        <Select label="Class level" name="classLevel" value={values.classLevel} onChange={update} options={toOptions(CLASS_LEVELS)} />
        <Select label="Mode" name="mode" value={values.mode} onChange={update} options={toOptions(MODES)} />
        <Select label="Sort by" name="sort" value={values.sort} onChange={update} options={sortOptions} all={false} />
      </div>
      <div className="mt-4 flex h-6 items-center justify-between">
        {pending ? <span className="loading loading-dots loading-sm text-accent" /> : <span />}
        {dirty && (
          <button onClick={clear} className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline">
            <PiXBold /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}