import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="logo-script text-8xl font-bold">
          <span className="l-a">4</span>
          <span className="l-b" style={{ color: "var(--color-base-content)" }}>0</span>
          <span className="l-a">4</span>
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">This page took a day off</h1>
        <p className="mt-3 text-base-content/65">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to Home</Link>
      </div>
    </Container>
  );
}