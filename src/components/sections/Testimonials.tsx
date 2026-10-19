import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExampleBadge } from "@/components/ui/ExampleBadge";
import { StarIcon } from "@/components/ui/Icons";

export function Testimonials() {
  const hasExamples = testimonials.some((t) => t.isExample);

  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="bg-blush-50 py-24 lg:py-32">
      <div className="container">
        <SectionHeading id="opiniones-title" eyebrow="Opiniones" title="Lo que dicen quienes nos visitan" />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.id} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex gap-1 text-gold-500" aria-label={`${t.rating} de 5 estrellas`}>
                    {Array.from({ length: 5 }, (_, n) => (
                      <StarIcon key={n} width={18} height={18} className={n < t.rating ? "" : "text-nude-200"} />
                    ))}
                  </p>
                  {t.isExample && <ExampleBadge />}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-xl italic leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-nude-200 pt-5">
                  <span className="block font-medium text-ink">{t.name}</span>
                  <span className="text-sm text-ink-soft">{t.service}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {hasExamples && (
          <p className="mt-8 text-center text-sm text-ink-soft">
            Estas opiniones son de ejemplo y se sustituirán por opiniones reales de clientes.
          </p>
        )}
      </div>
    </section>
  );
}
