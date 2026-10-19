import { business } from "@/data/business";

export function whatsappUrl(message: string = business.whatsapp.defaultMessage): string {
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = [
  business.address.street,
  business.address.city,
  business.address.region,
  business.address.postalCode,
].filter(Boolean).join(", ");

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.address.mapsQuery || `${business.name}, ${fullAddress}`
)}`;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(business.locale, {
    style: "currency",
    currency: business.currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
