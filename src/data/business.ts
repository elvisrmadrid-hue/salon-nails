/**
 * Datos del negocio.
 *
 * ⚠️ TODO lo que hay en este archivo son DATOS DE EJEMPLO.
 * Reemplázalos por la información real del salón y luego cambia
 * `demoMode` a `false` para ocultar los avisos de "datos de ejemplo".
 */

export type DayHours = {
  /** 0 = domingo, 1 = lunes, ... 6 = sábado (igual que Date.getDay()). */
  day: number;
  label: string;
  /** Formato 24 h "HH:MM". `null` = cerrado. */
  hours: { open: string; close: string } | null;
};

export const business = {
  /** Muestra avisos de "datos de ejemplo" en el sitio. Cámbialo a false al publicar. */
  demoMode: true,

  name: "Rosé Nail Studio",
  tagline: "El arte de cuidar tus manos",
  description:
    "Salón de uñas especializado en manicura, pedicura, uñas acrílicas, gel y diseños personalizados. Atención personalizada, higiene rigurosa y productos de calidad.",

  /** Idioma y moneda para mostrar precios. */
  locale: "es-US",
  currency: "USD",

  phone: {
    display: "+1 (555) 123-4567",
    /** Formato internacional sin espacios para el enlace tel: */
    tel: "+15551234567",
  },

  whatsapp: {
    /** Número internacional SOLO con dígitos (código de país + número), sin "+" ni espacios. */
    number: "50769248148",
    defaultMessage: "¡Hola! Me gustaría recibir información sobre sus servicios.",
  },

  email: "hola@ejemplo.com",

  address: {
    street: "Av. de las Flores 123, Local 4",
    city: "Tu Ciudad",
    region: "Tu Estado",
    postalCode: "00000",
    country: "MX",
    /**
     * Texto o coordenadas para mostrar el mapa de Google embebido
     * (ej. "Rosé Nail Studio, Av. de las Flores 123, Tu Ciudad" o "19.4326,-99.1332").
     * Si está vacío se muestra una tarjeta con la dirección y un enlace a Google Maps.
     */
    mapsQuery: "",
  },

  hours: [
    { day: 1, label: "Lunes", hours: { open: "09:00", close: "19:00" } },
    { day: 2, label: "Martes", hours: { open: "09:00", close: "19:00" } },
    { day: 3, label: "Miércoles", hours: { open: "09:00", close: "19:00" } },
    { day: 4, label: "Jueves", hours: { open: "09:00", close: "19:00" } },
    { day: 5, label: "Viernes", hours: { open: "09:00", close: "20:00" } },
    { day: 6, label: "Sábado", hours: { open: "09:00", close: "15:00" } },
    { day: 0, label: "Domingo", hours: null },
  ] as DayHours[],

  booking: {
    /** Intervalo entre horarios disponibles en el formulario (minutos). */
    slotMinutes: 30,
    /** Última cita posible: X minutos antes del cierre. */
    lastSlotBeforeCloseMinutes: 60,
    /** Con cuántos días de anticipación máxima se puede pedir cita. */
    maxDaysAhead: 60,
  },

  socials: [
    { name: "Instagram", url: "https://www.instagram.com/", handle: "@tu_salon" },
    { name: "Facebook", url: "https://www.facebook.com/", handle: "Tu Salón" },
    { name: "TikTok", url: "https://www.tiktok.com/", handle: "@tu_salon" },
  ] as const,
};

export type SocialName = (typeof business.socials)[number]["name"];

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#reservar", label: "Contacto" },
];
