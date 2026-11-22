const tone = {
  student: "bg-secondary text-secondary-content",
  tutor: "bg-accent text-accent-content",
  admin: "bg-white text-neutral ring-1 ring-black/20",
};

export default function RoleBadge({ role, className = "" }) {
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${tone[role] || tone.student} ${className}`}>
      {role}
    </span>
  );
}