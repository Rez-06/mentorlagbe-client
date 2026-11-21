export default function StatCard({ icon: Icon, label, value, hint, tone = "bg-accent text-accent-content" }) {
  return (
    <div className="flex items-center gap-4 rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-5">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tone}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-base-content/60">{label}</p>
        <p className="truncate text-2xl font-semibold capitalize">{value}</p>
        {hint && <p className="text-xs text-base-content/50">{hint}</p>}
      </div>
    </div>
  );
}