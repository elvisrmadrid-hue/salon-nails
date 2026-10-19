import { business } from "@/data/business";
import { services } from "@/data/services";
import { fullAddress, siteUrl } from "@/lib/links";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Booking } from "@/components/sections/Booking";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Datos estructurados para buscadores (schema.org/NailSalon).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: business.name,
  description: business.description,
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  telephone: business.phone.tel,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  openingHoursSpecification: business.hours
    .filter((d) => d.hours)
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayNames[d.day]}`,
      opens: d.hours!.open,
      closes: d.hours!.close,
    })),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name, description: s.description },
    price: s.price,
    priceCurrency: business.currency,
  })),
  sameAs: business.socials.map((s) => s.url),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <Booking />
    </>
  );
}
