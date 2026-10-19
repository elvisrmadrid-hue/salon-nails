import type { ReactNode } from "react";
import { business } from "@/data/business";
import { groupedHours } from "@/lib/hours";
import { fullAddress, mapsSearchUrl, whatsappUrl } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function ContactInfo() {
  const { mapsQuery } = business.address;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[2rem] bg-ink p-8 text-white">
        <h3 className="font-display text-2xl font-semibold">¿Prefieres escribirnos?</h3>
        <p className="mt-2 text-white/80">Respondemos tus dudas y agendamos tu cita directamente por WhatsApp.</p>
        <ButtonLink href={whatsappUrl()} variant="whatsapp" size="lg" className="mt-6 w-full sm:w-auto">
          <WhatsAppIcon /> Escribir por WhatsApp
        </ButtonLink>
      </div>

      <div className="rounded-[2rem] border border-nude-200 bg-cream p-8">
        <ul className="space-y-5">
          <Item icon={<PhoneIcon />} label="Teléfono">
            <a href={`tel:${business.phone.tel}`} className="link-underline">
              {business.phone.display}
            </a>
          </Item>
          <Item icon={<MailIcon />} label="Correo">
            <a href={`mailto:${business.email}`} className="link-underline break-all">
              {business.email}
            </a>
          </Item>
          <Item icon={<MapPinIcon />} label="Dirección">
            <address className="not-italic">{fullAddress}</address>
          </Item>
          <Item icon={<ClockIcon />} label="Horario">
            <dl className="space-y-1">
              {groupedHours().map((g) => (
                <div key={g.days} className="flex flex-wrap justify-between gap-x-4">
                  <dt>{g.days}</dt>
                  <dd className={g.hours === "Cerrado" ? "text-ink-soft" : "font-medium"}>{g.hours}</dd>
                </div>
              ))}
            </dl>
          </Item>
        </ul>
        <div className="mt-7 border-t border-nude-200 pt-6">
          <p className="mb-3 text-sm font-medium text-ink">Síguenos</p>
          <SocialLinks className="text-ink" />
        </div>
      </div>

      {mapsQuery ? (
        <iframe
          title={`Mapa de ubicación de ${business.name}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full rounded-[2rem] border-0"
        />
      ) : (
        <a
          href={mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-[2rem] border border-dashed border-nude-300 bg-white p-6 transition hover:border-blush-500"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-700 transition group-hover:scale-110">
            <MapPinIcon />
          </span>
          <span>
            <span className="block font-medium text-ink">Cómo llegar</span>
            <span className="text-sm text-ink-soft">Abrir la ubicación en Google Maps</span>
          </span>
        </a>
      )}
    </div>
  );
}

function Item({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-700">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-ink-soft">{label}</p>
        <div className="mt-0.5 text-ink">{children}</div>
      </div>
    </li>
  );
}
