const tone = {
  pending: "bg-warning/25 text-base-content",
  approved: "bg-success/15 text-success",
  accepted: "bg-success/15 text-success",
  rejected: "bg-error/15 text-error",
  active: "bg-success/15 text-success",
  closed: "bg-base-300 text-base-content/70",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold capitalize ${tone[status] || tone.closed}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}