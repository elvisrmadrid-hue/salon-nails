import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/links";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";

// Fuentes incluidas en el proyecto (Google Fonts, licencia OFL) para que la
// compilación no dependa de descargarlas: Cormorant Garamond y Jost.
const display = localFont({
  src: [
    { path: "../assets/fonts/cormorant-garamond-normal.woff2", weight: "400 600", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const sans = localFont({
  src: "../assets/fonts/jost.woff2",
  weight: "300 700",
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const title = `${business.name} | Manicura, pedicura y diseño de uñas`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${business.name}` },
  description: business.description,
  keywords: [
    "salón de uñas",
    "manicura",
    "pedicura",
    "uñas acrílicas",
    "uñas en gel",
    "esmaltado semipermanente",
    "nail art",
    business.address.city,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: business.name,
    title,
    description: business.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `Manicura en ${business.name}` }],
  },
  twitter: { card: "summary_large_image", title, description: business.description, images: ["/og-image.jpg"] },
  // En modo demostración no se indexa el sitio, para no publicar datos de ejemplo en buscadores.
  robots: business.demoMode ? { index: false, follow: false } : { index: true, follow: true },
  themeColor: "#fdf9f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        {/* Marca que hay JavaScript para activar las animaciones de entrada. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#contenido"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
      </body>
    </html>
  );
}
