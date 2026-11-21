"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { PiWarningCircleDuotone } from "react-icons/pi";

export default function Error({ error, reset }) {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <PiWarningCircleDuotone className="mx-auto h-16 w-16 text-error" />
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-3 max-w-md text-base-content/65">{error?.message || "An unexpected error happened. Please try again."}</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-outline">Try again</button>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </Container>
  );
}