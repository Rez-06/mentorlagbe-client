import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingPlans from "./PricingPlans";

export default function PricingSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Upgrade when you are ready."
          subtitle="Pro plans unlock priority booking for students and unlimited posts for tutors."
        />
        <PricingPlans />
      </Container>
    </section>
  );
}