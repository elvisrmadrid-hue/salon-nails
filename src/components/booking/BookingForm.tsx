"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { business } from "@/data/business";
import { services } from "@/data/services";
import {
  buildBookingMessage,
  emptyBooking,
  getServiceName,
  validateBooking,
  type BookingErrors,
  type BookingField,
  type BookingRequest,
  type BookingResponse,
} from "@/lib/booking";
import { addDays, formatDateLong, formatTime, getTimeSlots, toISODate, toMinutes } from "@/lib/hours";
import { whatsappUrl } from "@/lib/links";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckIcon, InfoIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { SELECT_SERVICE_EVENT } from "@/components/booking/BookServiceLink";

type Status = "idle" | "submitting" | "sent" | "not_configured" | "error";

const FIELD_ORDER: BookingField[] = ["name", "phone", "serviceId", "date", "time", "notes"];
const isService = (id: string | null): id is string => !!id && services.some((s) => s.id === id);
const closedDays = business.hours.filter((d) => !d.hours).map((d) => d.label.toLowerCase());
const dateHint = closedDays.length ? `Cerrado: ${closedDays.join(", ")}.` : undefined;

export function BookingForm() {
  const [values, setValues] = useState<BookingRequest>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState<BookingRequest | null>(null);
  // La fecha de hoy se calcula en el navegador (zona horaria del cliente).
  const [today, setToday] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setToday(toISODate(new Date()));

    // Permite enlaces como /?servicio=gel#reservar
    const fromUrl = new URLSearchParams(window.location.search).get("servicio");
    if (isService(fromUrl)) setValues((v) => ({ ...v, serviceId: fromUrl }));

    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!isService(id)) return;
      setValues((v) => ({ ...v, serviceId: id }));
      setErrors((er) => ({ ...er, serviceId: undefined }));
      setStatus((s) => (s === "sent" ? "idle" : s));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "not_configured" || status === "error") statusRef.current?.focus();
  }, [status]);

  const validate = (data: BookingRequest) => validateBooking(data, { earliest: new Date(), now: new Date() });

  const availableSlots = useMemo(() => {
    const slots = getTimeSlots(values.date);
    if (values.date !== today) return slots;
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return slots.filter((t) => toMinutes(t) > nowMinutes);
  }, [values.date, today]);

  const update = (field: BookingField, value: string) => {
    const next = { ...values, [field]: value };
    if (field === "date" && !getTimeSlots(value).includes(next.time)) next.time = "";
    setValues(next);
    if (status !== "submitting") setStatus("idle");

    const result = validate(next).errors;
    setErrors((prev) => {
      const updated = { ...prev };
      // Campos con error visible: se re-validan mientras se escribe.
      if (prev[field]) updated[field] = result[field];
      // La fecha se valida al momento para avisar si el salón está cerrado.
      if (field === "date") {
        updated.date = value ? result.date : undefined;
        updated.time = undefined;
      }
      return updated;
    });
  };

  const blur = (field: BookingField) => {
    const message = validate(values).errors[field];
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const { data, errors: found } = validate(values);
    setErrors(found);
    if (!data) {
      const first = FIELD_ORDER.find((f) => found[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setSubmitted(data);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypotRef.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => null)) as BookingResponse | null;

      if (json?.status === "sent") {
        setStatus("sent");
        setValues(emptyBooking);
        setErrors({});
      } else if (json?.status === "not_configured") {
        setStatus("not_configured");
      } else if (json?.status === "invalid" && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" && submitted) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="py-6 text-center outline-none">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush-700 text-white">
          <CheckIcon width={30} height={30} strokeWidth={2} />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-ink">¡Solicitud enviada!</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          Gracias, {submitted.name}. Recibimos tu solicitud de <strong className="text-ink">{getServiceName(submitted.serviceId)}</strong>{" "}
          para el {formatDateLong(submitted.date)} a las {formatTime(submitted.time)}.
        </p>
        <p className="mx-auto mt-4 max-w-md rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink">
          <strong>Tu cita aún no está confirmada.</strong> Te contactaremos al {submitted.phone} para confirmarla según la
          disponibilidad.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
          Hacer otra solicitud
        </Button>
      </div>
    );
  }

  const describedBy = (field: BookingField, hint?: boolean) =>
    errors[field] ? `${field}-error` : hint ? `${field}-hint` : undefined;

  const maxDate = today ? toISODate(addDays(new Date(), business.booking.maxDaysAhead)) : undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h3 id="form-title" className="font-display text-3xl font-semibold text-ink">
        Solicita tu cita
      </h3>
      <p className="mt-2 text-sm text-ink-soft">
        Los campos marcados con <span className="text-blush-700">*</span> son obligatorios.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nombre" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className="field-input"
            placeholder="Tu nombre"
          />
        </Field>

        <Field id="phone" label="Teléfono / WhatsApp" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={25}
            required
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className="field-input"
            placeholder="Ej.: 555 123 4567"
          />
        </Field>

        <Field id="serviceId" label="Servicio" required error={errors.serviceId} className="sm:col-span-2">
          <select
            id="serviceId"
            name="serviceId"
            required
            value={values.serviceId}
            onChange={(e) => update("serviceId", e.target.value)}
            onBlur={() => blur("serviceId")}
            aria-invalid={!!errors.serviceId}
            aria-describedby={describedBy("serviceId")}
            className="field-input"
          >
            <option value="" disabled>
              Elige un servicio
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.duration}
              </option>
            ))}
          </select>
        </Field>

        <Field id="date" label="Fecha preferida" required error={errors.date} hint={dateHint}>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={today || undefined}
            max={maxDate}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            onBlur={() => blur("date")}
            aria-invalid={!!errors.date}
            aria-describedby={describedBy("date", !!dateHint)}
            className="field-input"
          />
        </Field>

        <Field id="time" label="Hora preferida" required error={errors.time}>
          <select
            id="time"
            name="time"
            required
            disabled={!values.date || !!errors.date || availableSlots.length === 0}
            value={values.time}
            onChange={(e) => update("time", e.target.value)}
            onBlur={() => blur("time")}
            aria-invalid={!!errors.time}
            aria-describedby={describedBy("time")}
            className="field-input disabled:cursor-not-allowed disabled:bg-nude-100"
          >
            <option value="" disabled>
              {!values.date ? "Primero elige una fecha" : availableSlots.length ? "Elige una hora" : "Sin horarios disponibles"}
            </option>
            {availableSlots.map((t) => (
              <option key={t} value={t}>
                {formatTime(t)}
              </option>
            ))}
          </select>
        </Field>

        <Field id="notes" label="Comentarios (opcional)" error={errors.notes} className="sm:col-span-2">
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={500}
            value={values.notes}
            onChange={(e) => update("notes", e.target.value)}
            onBlur={() => blur("notes")}
            aria-invalid={!!errors.notes}
            aria-describedby={describedBy("notes")}
            className="field-input resize-y"
            placeholder="Cuéntanos qué diseño te gustaría, el largo, si tienes alergias…"
          />
        </Field>

        {/* Campo trampa anti-spam: oculto para las personas. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">No completar este campo</label>
          <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "not_configured" && submitted && (
          <Notice tone="info" title="Tu solicitud aún no se ha enviado">
            <p>
              La reserva en línea todavía no está activada en este sitio, así que tus datos no se han guardado. Para
              completar tu solicitud, envíala por WhatsApp: el mensaje ya incluye todos tus datos.
            </p>
            <ButtonLink href={whatsappUrl(buildBookingMessage(submitted))} variant="whatsapp" className="mt-4">
              <WhatsAppIcon /> Enviar solicitud por WhatsApp
            </ButtonLink>
            {process.env.NODE_ENV === "development" && (
              <p className="mt-4 border-t border-gold-400/40 pt-3 text-xs">
                <strong>Nota para el administrador (solo visible en desarrollo):</strong> define la variable{" "}
                <code>RESERVAS_WEBHOOK_URL</code> en <code>.env.local</code> para recibir las solicitudes. Consulta el
                README.
              </p>
            )}
          </Notice>
        )}
        {status === "error" && submitted && (
          <Notice tone="error" title="No pudimos enviar tu solicitud">
            <p>Inténtalo de nuevo en unos minutos o envíanos tu solicitud por WhatsApp.</p>
            <ButtonLink href={whatsappUrl(buildBookingMessage(submitted))} variant="whatsapp" className="mt-4">
              <WhatsAppIcon /> Enviar por WhatsApp
            </ButtonLink>
          </Notice>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="shrink-0 whitespace-nowrap">
          {status === "submitting" ? "Enviando…" : "Solicitar cita"}
        </Button>
        <p className="text-xs leading-relaxed text-ink-soft">
          Enviar el formulario es una solicitud: tu cita queda confirmada cuando te contactemos.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  id: BookingField;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-blush-700" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-soft">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function Notice({ tone, title, children }: { tone: "info" | "error"; title: string; children: ReactNode }) {
  const styles = tone === "info" ? "border-gold-400/70 bg-gold-300/15" : "border-red-300 bg-red-50";
  return (
    <div className={`mt-8 rounded-2xl border p-5 text-sm leading-relaxed text-ink ${styles}`}>
      <p className="flex items-center gap-2 font-semibold">
        <InfoIcon className={tone === "info" ? "text-gold-700" : "text-red-700"} /> {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
