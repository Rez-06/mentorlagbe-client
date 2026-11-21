import Container from "@/components/ui/Container";
import { CardGridSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <Container className="py-12">
      <div className="mb-10 space-y-3">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-10 w-96 max-w-full" />
      </div>
      <div className="skeleton mb-10 h-44 w-full" />
      <CardGridSkeleton />
    </Container>
  );
}