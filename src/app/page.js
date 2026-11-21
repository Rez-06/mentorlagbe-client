import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
//import PricingSection from "@/components/home/PricingSection";
import SubjectsStats from "@/components/home/SubjectsStats";
import Testimonials from "@/components/home/Testimonials";
import { fetchPublic } from "@/lib/api";

export default async function Home() {
  const { data } = await fetchPublic("/api/tuitions/latest?limit=6");

  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedTuitions tuitions={data?.tuitions || []} />
      {/* <PricingSection /> */}
      <SubjectsStats />
      <Testimonials />
    </>
  );
}