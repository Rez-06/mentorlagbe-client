import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
//import PricingSection from "@/components/home/PricingSection";
import SubjectsStats from "@/components/home/SubjectsStats";
import Testimonials from "@/components/home/Testimonials";
import Container from "@/components/ui/Container";
import { CardGridSkeleton } from "@/components/ui/Skeletons";
import { fetchPublic } from "@/lib/api";

// Only this part waits for the API, so the rest of the page (and the
// #how-it-works anchor) is on screen immediately.
async function Featured() {
  const { data } = await fetchPublic("/api/tuitions/latest?limit=6");
  return <FeaturedTuitions tuitions={data?.tuitions || []} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Suspense
        fallback={
          <section className="py-20">
            <Container>
              <CardGridSkeleton count={6} />
            </Container>
          </section>
        }
      >
        <Featured />
      </Suspense>
      {/* <PricingSection /> */}
      <SubjectsStats />
      <Testimonials />
    </>
  );
}