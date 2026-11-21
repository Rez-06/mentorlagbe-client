export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-base-content/60 ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
          {center && <span className="h-px w-8 bg-accent" />}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 leading-relaxed text-base-content/70">{subtitle}</p>
      )}
    </div>
  );
}