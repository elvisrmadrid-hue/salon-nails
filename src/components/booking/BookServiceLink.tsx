"use client";

import { buttonClasses } from "@/components/ui/Button";

/** Evento que preselecciona un servicio en el formulario de reservas. */
export const SELECT_SERVICE_EVENT = "salon:select-service";

export function BookServiceLink({ serviceId, serviceName }: { serviceId: string; serviceName: string }) {
  return (
    <a
      href="#reservar"
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }))}
      aria-label={`Reservar ${serviceName}`}
      className={buttonClasses("secondary", "md", "shrink-0")}
    >
      Reservar
    </a>
  );
}
