import Link from "next/link";
import { PiXCircleDuotone } from "react-icons/pi";
import Container from "@/components/ui/Container";

export const metadata = { title: "Payment cancelled | MentorLagbe" };

export default function PaymentCancelPage() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <PiXCircleDuotone className="mx-auto h-16 w-16 text-warning" />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Payment cancelled</h1>
        <p className="mt-3 max-w-md text-base-content/65">No money was taken. You can upgrade whenever you are ready.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/pricing" className="btn btn-primary">Back to Pricing</Link>
          <Link href="/" className="btn btn-outline">Home</Link>
        </div>
      </div>
    </Container>
  );
}