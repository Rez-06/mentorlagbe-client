export default function PageLoader({ className = "min-h-[60vh]" }) {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-accent" />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-base-content/50">Loading</p>
      </div>
    </div>
  );
}