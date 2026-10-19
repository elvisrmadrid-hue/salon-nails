import Image from "next/image";
import heroImage from "@/assets/images/hero.jpg";
import { hero, valueProps } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { CalendarIcon, ShieldIcon } from "@/components/ui/Icons";
import { HighlightIconView } from "@/components/ui/HighlightIcon";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush-200/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-nude-200/70 blur-3xl" />

      <div className="container relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="animate-fade-up">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-5 text-balance font-display text-5xl font-medium leading-[1.05] text-ink sm:text-6xl xl:text-7xl"
          >
            {hero.titleStart} <em className="font-normal italic text-blush-700">{hero.titleAccent}</em> {hero.titleEnd}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{hero.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#reservar" size="lg">
              <CalendarIcon /> Reservar una cita
            </ButtonLink>
            <ButtonLink href="#servicios" variant="secondary" size="lg">
              Ver servicios
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-arch border border-gold-400/70" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-arch shadow-soft">
            <Image
              src={heroImage}
              alt="Manos con manicura en tono nude rosado sobre una manta suave"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-0 flex max-w-[17rem] items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur sm:-left-10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-700">
              <ShieldIcon />
            </span>
            <p className="text-sm leading-snug">
              <strong className="block font-medium text-ink">{hero.badgeTitle}</strong>
              <span className="text-ink-soft">{hero.badgeText}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container relative mt-24 lg:mt-28">
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-nude-200 bg-nude-200 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="flex gap-4 bg-cream p-6 lg:p-7"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-400/60 text-gold-700">
                <HighlightIconView icon={item.icon} />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
