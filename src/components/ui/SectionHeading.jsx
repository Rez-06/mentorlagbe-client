export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-accent/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 leading-relaxed text-base-content/70">{subtitle}</p>
      )}
    </div>
  );
}