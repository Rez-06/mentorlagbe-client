import Link from "next/link";

const SPARK = "M0-12C1-4 4-1 12 0 4 1 1 4 0 12-1 4-4 1-12 0-4-1-1-4 0-12Z";

function Sparkle({ className }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={SPARK} />
    </svg>
  );
}

export default function Logo({ stacked = false, onLight = false, className = "" }) {
  return (
    <Link
      href="/"
      aria-label="MentorLagbe home"
      className={`relative inline-block ${className}`}
    >
      <Sparkle className="absolute -right-4 -top-2 h-3.5 w-3.5 text-accent" />
      <Sparkle className="absolute -left-4 bottom-0 h-2.5 w-2.5 text-secondary" />

      {stacked ? (
        <span
          className={`logo-script flex flex-col text-6xl font-bold ${onLight ? "on-light" : ""}`}
        >
          <span className="l-a">Mentor</span>
          <span className="l-b ml-8">Lagbe</span>
        </span>
      ) : (
        <span
          className={`logo-script text-[1.8rem] font-bold ${onLight ? "on-light" : ""}`}
        >
          <span className="l-a">Mentor</span>
          <span className="l-b">Lagbe</span>
        </span>
      )}
    </Link>
  );
}