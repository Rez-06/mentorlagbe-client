import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingPlans from "@/components/home/PricingPlans";
import { PiShieldCheckDuotone, PiCreditCardDuotone, PiLockKeyDuotone } from "react-icons/pi";

export const metadata = { title: "Pricing | MentorLagbe" };

const faqs = [
  ["Is it a monthly subscription?", "No. Pro is a one-time upgrade. Pay once and your account stays Pro."],
  ["What happens right after I pay?", "Your plan switches to Pro instantly and your payment appears in your receipt."],
  ["Is my card information safe?", "Payments are handled by Stripe. MentorLagbe never sees or stores your card details."],
];

export default function PricingPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans for students and tutors"
          subtitle="Start free. Upgrade to Pro when you want priority booking or unlimited tuition posts."
        />
        <PricingPlans />

        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-dashed border-base-content/25 p-4 text-center font-mono text-xs text-base-content/65">
          DEMO MODE: pay with test card <b>4242 4242 4242 4242</b>, any future date, any CVC.
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[[PiShieldCheckDuotone, "Secure checkout"], [PiCreditCardDuotone, "Powered by Stripe"], [PiLockKeyDuotone, "No card stored by us"]].map(([Icon, label]) => (
            <div key={label} className="flex items-center justify-center gap-3 text-sm font-medium">
              <Icon className="h-7 w-7 text-secondary" /> {label}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-base-content/15 bg-base-200/60 p-5">
              <summary className="cursor-pointer list-none font-semibold">{q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-base-content/70">{a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}