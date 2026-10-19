import { NextResponse } from "next/server";
import { business } from "@/data/business";
import { getServiceName, validateBooking, type BookingResponse } from "@/lib/booking";
import { addDays } from "@/lib/hours";

export const dynamic = "force-dynamic";

const reply = (body: BookingResponse, status: number) => NextResponse.json(body, { status });

/**
 * Recibe una solicitud de cita, la valida y la reenvía al webhook configurado
 * en RESERVAS_WEBHOOK_URL. Sin webhook NO se guarda ni se envía nada: se
 * responde "not_configured" para que la web ofrezca enviarla por WhatsApp.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ status: "invalid" }, 400);
  }
  if (typeof body !== "object" || body === null) return reply({ status: "invalid" }, 400);

  const input = body as Record<string, unknown>;
  // Campo trampa anti-spam: las personas no lo ven; los bots suelen rellenarlo.
  if (typeof input.website === "string" && input.website !== "") return reply({ status: "invalid" }, 400);

  const { data, errors } = validateBooking(input, { earliest: addDays(new Date(), -1) });
  if (!data) return reply({ status: "invalid", errors }, 422);

  const webhookUrl = process.env.RESERVAS_WEBHOOK_URL;
  if (!webhookUrl) return reply({ status: "not_configured" }, 503);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "solicitud_de_cita",
        negocio: business.name,
        nombre: data.name,
        telefono: data.phone,
        servicioId: data.serviceId,
        servicio: getServiceName(data.serviceId),
        fecha: data.date,
        hora: data.time,
        comentarios: data.notes,
        recibidaEn: new Date().toISOString(),
      }),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error(`[reservas] El webhook respondió ${res.status}`);
      return reply({ status: "error" }, 502);
    }
    return reply({ status: "sent" }, 200);
  } catch (error) {
    console.error("[reservas] No se pudo contactar con el webhook:", error);
    return reply({ status: "error" }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
