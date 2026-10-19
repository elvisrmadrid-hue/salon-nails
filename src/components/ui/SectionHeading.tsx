type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, description, id, align = "center" }: Props) {
  const centered = align === "center";
  return (
    <div data-reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="mt-3 text-balance font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
