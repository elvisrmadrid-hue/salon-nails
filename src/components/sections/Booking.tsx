import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/booking/BookingForm";
import { ContactInfo } from "@/components/booking/ContactInfo";

export function Booking() {
  return (
    <section id="reservar" aria-labelledby="reservar-title" className="bg-white py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          id="reservar-title"
          eyebrow="Reservas y contacto"
          title="Reserva tu cita"
          description="Cuéntanos qué servicio quieres y cuándo te viene bien. Te contactaremos para confirmar la disponibilidad."
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div data-reveal className="relative rounded-[2rem] border border-nude-200 bg-cream p-6 shadow-card sm:p-10">
            <BookingForm />
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
