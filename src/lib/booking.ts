import { business } from "@/data/business";
import { services } from "@/data/services";
import { addDays, formatDateLong, formatTime, getTimeSlots, parseISODate, toISODate, toMinutes } from "@/lib/hours";

export type BookingRequest = {
  name: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
};

export type BookingField = keyof BookingRequest;
export type BookingErrors = Partial<Record<BookingField, string>>;

/** Respuesta de /api/reservas */
export type BookingResponse =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "invalid"; errors?: BookingErrors }
  | { status: "error" };

export const emptyBooking: BookingRequest = { name: "", phone: "", serviceId: "", date: "", time: "", notes: "" };

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

type ValidateOptions = {
  /** Primer día permitido. En el servidor se da un día de margen por diferencias de zona horaria. */
  earliest: Date;
  /** Si se indica, rechaza horas ya pasadas cuando la fecha es hoy (solo en el navegador). */
  now?: Date;
};

/** Validación compartida por el formulario (navegador) y la API (servidor). */
export function validateBooking(
  input: Record<string, unknown>,
  { earliest, now }: ValidateOptions
): { data: BookingRequest | null; errors: BookingErrors } {
  const data: BookingRequest = {
    name: str(input.name),
    phone: str(input.phone),
    serviceId: str(input.serviceId),
    date: str(input.date),
    time: str(input.time),
    notes: str(input.notes),
  };
  const errors: BookingErrors = {};

  if (!data.name) errors.name = "Escribe tu nombre.";
  else if (data.name.length < 2 || data.name.length > 80) errors.name = "El nombre debe tener entre 2 y 80 caracteres.";

  const digits = data.phone.replace(/\D/g, "");
  if (!data.phone) errors.phone = "Escribe un teléfono de contacto.";
  else if (!/^[\d\s()+.-]+$/.test(data.phone) || digits.length < 7 || digits.length > 15)
    errors.phone = "Escribe un teléfono válido (solo números, de 7 a 15 dígitos).";

  if (!data.serviceId) errors.serviceId = "Elige un servicio.";
  else if (!services.some((s) => s.id === data.serviceId)) errors.serviceId = "Elige un servicio de la lista.";

  const date = parseISODate(data.date);
  const latest = addDays(earliest, business.booking.maxDaysAhead + 1);
  if (!data.date) errors.date = "Elige una fecha.";
  else if (!date) errors.date = "La fecha no es válida.";
  else if (toISODate(date) < toISODate(earliest)) errors.date = "Elige una fecha a partir de hoy.";
  else if (date > latest) errors.date = `Solo aceptamos solicitudes con hasta ${business.booking.maxDaysAhead} días de anticipación.`;
  else if (getTimeSlots(data.date).length === 0) errors.date = "Ese día el salón está cerrado. Elige otra fecha.";

  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : 0;
  const isToday = !!now && data.date === toISODate(now);
  if (!errors.date && isToday && getTimeSlots(data.date).every((t) => toMinutes(t) <= nowMinutes))
    errors.date = "Ya no quedan horarios disponibles hoy. Elige otra fecha.";

  if (!errors.date) {
    const slots = getTimeSlots(data.date);
    if (!data.time) errors.time = "Elige una hora.";
    else if (!slots.includes(data.time)) errors.time = "Elige una hora dentro del horario de atención.";
    else if (isToday && toMinutes(data.time) <= nowMinutes) errors.time = "Esa hora ya pasó. Elige una hora posterior.";
  }

  if (data.notes.length > 500) errors.notes = "Los comentarios pueden tener como máximo 500 caracteres.";

  return { data: Object.keys(errors).length === 0 ? data : null, errors };
}

export function getServiceName(serviceId: string): string {
  return services.find((s) => s.id === serviceId)?.name ?? serviceId;
}

/** Texto de la solicitud para enviarla por WhatsApp. */
export function buildBookingMessage(data: BookingRequest): string {
  const lines = [
    `¡Hola! Quisiera solicitar una cita en ${business.name}:`,
    "",
    `• Nombre: ${data.name}`,
    `• Teléfono: ${data.phone}`,
    `• Servicio: ${getServiceName(data.serviceId)}`,
    `• Fecha: ${formatDateLong(data.date)}`,
    `• Hora: ${formatTime(data.time)}`,
  ];
  if (data.notes) lines.push(`• Comentarios: ${data.notes}`);
  lines.push("", "Quedo pendiente de su confirmación. ¡Gracias!");
  return lines.join("\n");
}
