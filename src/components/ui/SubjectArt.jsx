import {
  PiMathOperationsDuotone, PiAtomDuotone, PiFlaskDuotone, PiDnaDuotone, PiBookOpenTextDuotone,
  PiGlobeHemisphereEastDuotone, PiCodeDuotone, PiDesktopDuotone, PiCalculatorDuotone,
  PiPenNibDuotone, PiGraduationCapDuotone,
} from "react-icons/pi";

const map = {
  Mathematics: { icon: PiMathOperationsDuotone, tone: "bg-secondary text-secondary-content" },
  Physics: { icon: PiAtomDuotone, tone: "bg-neutral text-accent" },
  Chemistry: { icon: PiFlaskDuotone, tone: "bg-accent text-accent-content" },
  Biology: { icon: PiDnaDuotone, tone: "bg-success text-success-content" },
  English: { icon: PiBookOpenTextDuotone, tone: "bg-accent text-accent-content" },
  IELTS: { icon: PiGlobeHemisphereEastDuotone, tone: "bg-secondary text-secondary-content" },
  Programming: { icon: PiCodeDuotone, tone: "bg-neutral text-accent" },
  ICT: { icon: PiDesktopDuotone, tone: "bg-secondary text-secondary-content" },
  Accounting: { icon: PiCalculatorDuotone, tone: "bg-accent text-accent-content" },
  Bangla: { icon: PiPenNibDuotone, tone: "bg-neutral text-accent" },
};
const fallback = { icon: PiGraduationCapDuotone, tone: "bg-neutral text-accent" };

// Used whenever a tuition has no uploaded banner image.
export default function SubjectArt({ subject, className = "" }) {
  const { icon: Icon, tone } = map[subject] || fallback;
  return (
    <div className={`relative grid place-items-center overflow-hidden ${tone} ${className}`}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      />
      <Icon className="relative h-16 w-16" />
      <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.18em] opacity-80">
        {subject}
      </span>
    </div>
  );
}