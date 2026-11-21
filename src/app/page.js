import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedTuitions from "@/components/home/FeaturedTuitions";
//import PricingSection from "@/components/home/PricingSection";
import SubjectsStats from "@/components/home/SubjectsStats";
import Testimonials from "@/components/home/Testimonials";
import { sampleTuitions } from "@/lib/sampleData";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedTuitions tuitions={sampleTuitions} />
      {/* <PricingSection /> */}
      <SubjectsStats />
      <Testimonials />
    </>
  );
}