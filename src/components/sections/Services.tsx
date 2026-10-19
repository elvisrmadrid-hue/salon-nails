import { business } from "@/data/business";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExampleBadge } from "@/components/ui/ExampleBadge";
import { ServiceCard } from "@/components/sections/ServiceCard";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-white py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          id="servicios-title"
          eyebrow="Servicios"
          title="Cuidado y estilo para tus manos y pies"
          description="Elige el servicio que buscas y reserva en un minuto. Si no sabes cuál es el ideal para ti, te asesoramos."
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-ink-soft">
          Los precios pueden variar según el largo, la forma y el diseño.
          {business.demoMode && <ExampleBadge>Precios de ejemplo</ExampleBadge>}
        </p>
      </div>
    </section>
  );
}
