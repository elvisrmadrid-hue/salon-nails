import Image from "next/image";
import salonImage from "@/assets/images/nosotros-salon.jpg";
import polishImage from "@/assets/images/nosotros-esmaltes.jpg";
import { about } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="overflow-hidden bg-nude-100/60 py-24 lg:py-32">
      <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="relative mx-auto w-full max-w-md pb-16 pr-10 lg:max-w-none">
          <div aria-hidden="true" className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-gold-400/60" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src={salonImage}
              alt="Manicurista aplicando esmalte a una clienta en el salón"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-1/2 overflow-hidden rounded-[1.5rem] border-8 border-cream shadow-soft">
            <Image
              src={polishImage}
              alt="Estantería con esmaltes de colores"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <SectionHeading id="nosotros-title" eyebrow={about.eyebrow} title={about.title} align="left" />
          <div data-reveal className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 data-reveal className="mt-10 font-display text-2xl font-semibold text-ink">
            Nuestro compromiso con la higiene y la calidad
          </h3>
          <ul data-reveal className="mt-5 space-y-3">
            {about.commitments.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-700 text-white">
                  <CheckIcon width={14} height={14} strokeWidth={2.2} />
                </span>
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <ButtonLink href="#reservar" size="lg">
              Reserva tu momento
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
