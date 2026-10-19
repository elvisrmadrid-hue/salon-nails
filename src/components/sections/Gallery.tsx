"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/data/gallery";
import { galleryCta } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/links";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length)),
    []
  );

  // Evita el scroll de la página mientras el visor está abierto.
  useEffect(() => {
    document.documentElement.style.overflow = index === null ? "" : "hidden";
  }, [index]);

  const current = index === null ? null : gallery[index];

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galería"
          title="Inspiración para tu próxima cita"
          description="Estilos, colores y acabados para todos los gustos: del minimalismo más elegante al nail art más atrevido."
        />

        <ul className="mt-14 columns-2 gap-4 md:columns-3 md:gap-6">
          {gallery.map((item, i) => (
            <li key={item.title} data-reveal className="mb-4 break-inside-avoid md:mb-6">
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Ampliar foto: ${item.title}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-nude-100"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  placeholder="blur"
                  sizes="(min-width: 1240px) 390px, (min-width: 768px) 31vw, 47vw"
                  className="h-auto w-full transition duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-3 text-left text-white transition duration-500 md:translate-y-2 md:p-5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                  <span className="block font-display text-lg leading-tight md:text-2xl">{item.title}</span>
                  <span className="hidden text-xs uppercase tracking-wider text-white/80 sm:block">{item.style}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-blush-100 px-6 py-10 text-center sm:px-10 md:flex-row md:text-left"
        >
          <div>
            <h3 className="font-display text-3xl font-semibold text-ink">{galleryCta.title}</h3>
            <p className="mt-2 max-w-xl text-ink-soft">{galleryCta.text}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="#reservar">Reservar cita</ButtonLink>
            <ButtonLink href={whatsappUrl(galleryCta.whatsappMessage)} variant="whatsapp" aria-label="Enviar mi inspiración por WhatsApp (se abre en una pestaña nueva)">
              <WhatsAppIcon /> Enviar mi inspiración
            </ButtonLink>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Visor de la galería"
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white"
      >
        <div
          className="flex h-full w-full items-center justify-center p-4 sm:p-10"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          {current && (
            <figure className="flex max-h-full flex-col items-center">
              <Image
                key={current.title}
                src={current.src}
                alt={current.alt}
                sizes="90vw"
                loading="eager"
                placeholder="blur"
                className="h-auto max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center">
                <span className="block font-display text-2xl">{current.title}</span>
                <span className="text-sm text-white/75">
                  {current.style} · {index! + 1} / {gallery.length}
                </span>
              </figcaption>
            </figure>
          )}
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Cerrar visor"
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25"
        >
          <CloseIcon width={24} height={24} />
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25 sm:left-6"
        >
          <ChevronLeftIcon width={26} height={26} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Foto siguiente"
          className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25 sm:right-6"
        >
          <ChevronRightIcon width={26} height={26} />
        </button>
      </dialog>
    </section>
  );
}
