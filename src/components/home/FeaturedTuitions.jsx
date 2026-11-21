import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TuitionCard from "@/components/ui/TuitionCard";

export default function FeaturedTuitions({ tuitions = [] }) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured tuitions"
          title="Fresh batches from approved tutors"
          subtitle="Every listing is reviewed by our admins before it appears here."
        />
        {tuitions.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((t) => (
              <TuitionCard key={t._id} tuition={t} />
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/60">No tuitions yet. Check back soon.</p>
        )}
        <div className="mt-10 text-center">
          <Link href="/tuitions" className="btn btn-primary gap-2">
            Browse all tuitions <PiArrowRightBold />
          </Link>
        </div>
      </Container>
    </section>
  );
}