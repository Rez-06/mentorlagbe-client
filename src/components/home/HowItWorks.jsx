import { UserPlus, Search, Send, Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    text: "Sign up as a Student to learn, or as a Tutor to teach. It takes under a minute.",
  },
  {
    icon: Search,
    title: "Search or Post",
    text: "Students filter by subject, class and mode. Tutors post batches with a banner and fee.",
  },
  {
    icon: Send,
    title: "Apply & Connect",
    text: "Students apply in one click. Tutors review applicants and accept the best fit.",
  },
  {
    icon: Rocket,
    title: "Start Learning",
    text: "Begin your sessions online or at home, and upgrade to Pro for extra perks.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From sign-up to first class in 4 simple steps"
          subtitle="Whether you are looking for a tutor or hoping to become one, MentorLagbe keeps it simple."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="relative flex h-full flex-col rounded-[var(--radius-box)] border border-base-300 bg-base-200/60 p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="absolute right-6 top-5 text-5xl font-bold text-base-content/10">
                0{i + 1}
              </span>
              <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-neutral text-accent">
                <Icon size={24} />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}