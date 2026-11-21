import Link from "next/link";
import { PiArrowUpRightBold, PiStudentDuotone, PiChalkboardTeacherDuotone, PiBooksDuotone, PiStarFill } from "react-icons/pi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SubjectArt from "@/components/ui/SubjectArt";

const subjects = [
  ["Mathematics", "120+ tutors"],
  ["Physics", "85+ tutors"],
  ["Programming", "70+ tutors"],
  ["IELTS", "45+ tutors"],
  ["Chemistry", "60+ tutors"],
  ["English", "95+ tutors"],
];

const stats = [
  { icon: PiStudentDuotone, value: "2,400+", label: "Active students" },
  { icon: PiChalkboardTeacherDuotone, value: "350+", label: "Verified tutors" },
  { icon: PiBooksDuotone, value: "40+", label: "Subjects covered" },
  { icon: PiStarFill, value: "4.9/5", label: "Average rating" },
];

export default function SubjectsStats() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Top subjects"
          title="Popular subjects students search for"
          subtitle="Jump straight into the subject you need help with."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map(([name, count]) => (
            <Link
              key={name}
              href={`/tuitions?subject=${name}`}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <SubjectArt subject={name} className="h-36 w-full" />
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-base-content/60">{count}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-base-content/25 transition group-hover:bg-accent group-hover:text-accent-content">
                  <PiArrowUpRightBold />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 overflow-hidden rounded-[var(--radius-box)] bg-neutral text-neutral-content lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 border-white/10 p-8 text-center [&:not(:last-child)]:lg:border-r">
              <Icon className="h-8 w-8 text-accent" />
              <p className="text-3xl font-semibold">{value}</p>
              <p className="text-sm text-neutral-content/65">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}