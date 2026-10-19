import Image from "next/image";
import type { Service } from "@/data/services";
import { formatPrice } from "@/lib/links";
import { ClockIcon, StarIcon } from "@/components/ui/Icons";
import { BookServiceLink } from "@/components/booking/BookServiceLink";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-cream shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-soft ${
        service.popular ? "border-gold-400/70" : "border-nude-200"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        {service.popular && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-700 shadow-sm">
            <StarIcon width={12} height={12} /> Más popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl font-semibold text-ink">{service.name}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{service.description}</p>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-nude-200 pt-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-soft">{service.priceFrom ? "Desde" : "Precio"}</p>
            <p className="font-display text-3xl font-semibold leading-tight text-blush-700">{formatPrice(service.price)}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
              <ClockIcon width={15} height={15} /> {service.duration}
            </p>
          </div>
          <BookServiceLink serviceId={service.id} serviceName={service.name} />
        </div>
      </div>
    </article>
  );
}
