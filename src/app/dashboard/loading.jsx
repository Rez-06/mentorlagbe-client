export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-10 w-72" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-24" />)}
      </div>
    </div>
  );
}