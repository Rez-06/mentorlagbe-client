import { PiStarFill, PiQuotesFill } from "react-icons/pi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import UserAvatar from "@/components/ui/UserAvatar";

const reviews = [
  { name: "Rafi Chowdhury", role: "HSC Student", text: "I found a Physics tutor in one evening. The filters made it easy to match my budget and schedule." },
  { name: "Imran Hossain", role: "Physics Tutor", text: "Posting my batch took five minutes, and the application manager keeps every student request in one place." },
  { name: "Mim Akter", role: "IELTS Student", text: "Seeing approved tutors only gave my parents confidence. I reached Band 7.5 in two months." },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by students and tutors"
          subtitle="Real feedback from people learning and teaching on MentorLagbe."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="flex h-full flex-col rounded-[var(--radius-box)] border border-base-content/15 bg-base-200/60 p-7">
              <PiQuotesFill className="h-8 w-8 text-accent" />
              <div className="mt-3 flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <PiStarFill key={i} />
                ))}
              </div>
              <blockquote className="mt-4 leading-relaxed text-base-content/80">{r.text}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <UserAvatar user={{ name: r.name }} />
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-base-content/55">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}