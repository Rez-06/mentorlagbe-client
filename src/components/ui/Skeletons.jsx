export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[var(--radius-box)] border border-base-content/10">
          <div className="skeleton aspect-[16/10] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-3 w-1/2" />
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton mt-4 h-8 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}