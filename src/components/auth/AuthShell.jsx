import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import { PiSealCheckDuotone, PiBookOpenTextDuotone, PiChalkboardTeacherDuotone } from "react-icons/pi";

const points = [
  { icon: PiSealCheckDuotone, text: "Every tutor is approved before going live" },
  { icon: PiBookOpenTextDuotone, text: "Search by subject, class level and budget" },
  { icon: PiChalkboardTeacherDuotone, text: "Tutors manage batches and applicants in one place" },
];

export default function AuthShell({ title, subtitle, children }) {
  return (
    <Container className="py-10 lg:py-16">
      <div className="grid overflow-hidden rounded-[var(--radius-box)] border border-base-content/15 lg:grid-cols-2">
        <div className="nav-surface hidden flex-col justify-between p-10 text-white lg:flex">
          <div className="relative z-10">
            <Logo stacked />
          </div>
          <ul className="relative z-10 space-y-5">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 text-white/85">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-base-200/50 p-6 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-base-content/65">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </Container>
  );
}