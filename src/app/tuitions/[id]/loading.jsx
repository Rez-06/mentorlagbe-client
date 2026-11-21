import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-5">
          <div className="skeleton aspect-[16/8] w-full" />
          <div className="skeleton h-4 w-40" />
          <div className="skeleton h-10 w-3/4" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-24" />)}
          </div>
          <div className="skeleton h-32 w-full" />
        </div>
        <div className="skeleton h-56 w-full" />
      </div>
    </Container>
  );
}