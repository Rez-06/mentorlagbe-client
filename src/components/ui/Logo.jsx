import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Logo({ light = true }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-content">
        <GraduationCap size={20} />
      </span>
      <span className={light ? "text-white" : ""}>
        Mentor<span className="text-accent">Lagbe</span>
      </span>
    </Link>
  );
}