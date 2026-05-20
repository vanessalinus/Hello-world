type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  const eyebrowClass = invert ? "text-teal-200" : "text-teal-700";
  const titleClass = invert ? "text-white" : "text-slate-950";
  const descriptionClass = invert ? "text-slate-300" : "text-slate-600";

  return (
    <div className={alignment}>
      <p
        className={`mb-3 text-sm font-semibold uppercase tracking-[0.22em] ${eyebrowClass}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-semibold tracking-tight md:text-4xl ${titleClass}`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-8 md:text-lg ${descriptionClass}`}>
        {description}
      </p>
    </div>
  );
}
