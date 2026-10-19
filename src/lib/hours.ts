import { business, type DayHours } from "@/data/business";

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Convierte "YYYY-MM-DD" en una fecha local (sin desfases de zona horaria). */
export function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);
  // Descarta fechas imposibles como 2026-02-31.
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function getDayHours(date: Date): DayHours | undefined {
  return business.hours.find((d) => d.day === date.getDay());
}

/** Horarios disponibles ("HH:MM") para una fecha "YYYY-MM-DD". Vacío si está cerrado. */
export function getTimeSlots(dateValue: string): string[] {
  const date = parseISODate(dateValue);
  if (!date) return [];
  const hours = getDayHours(date)?.hours;
  if (!hours) return [];

  const { slotMinutes, lastSlotBeforeCloseMinutes } = business.booking;
  const first = toMinutes(hours.open);
  const last = toMinutes(hours.close) - lastSlotBeforeCloseMinutes;
  const slots: string[] = [];
  for (let t = first; t <= last; t += slotMinutes) slots.push(fromMinutes(t));
  return slots;
}

/** "09:00" → "9:00" */
export function formatTime(time: string): string {
  return time.replace(/^0(\d)/, "$1");
}

export function formatDayHours(hours: DayHours["hours"]): string {
  return hours ? `${formatTime(hours.open)} – ${formatTime(hours.close)}` : "Cerrado";
}

/** Agrupa días consecutivos con el mismo horario: "Lunes a jueves · 9:00 – 19:00". */
export function groupedHours(): { days: string; hours: string }[] {
  const groups: { first: DayHours; last: DayHours; hours: string }[] = [];
  for (const day of business.hours) {
    const label = formatDayHours(day.hours);
    const current = groups[groups.length - 1];
    if (current && current.hours === label) current.last = day;
    else groups.push({ first: day, last: day, hours: label });
  }
  return groups.map(({ first, last, hours }) => ({
    days: first === last ? first.label : `${first.label} a ${last.label.toLowerCase()}`,
    hours,
  }));
}

export function formatDateLong(dateValue: string): string {
  const date = parseISODate(dateValue);
  if (!date) return dateValue;
  return new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date);
}
