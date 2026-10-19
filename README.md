# Rosé Nail Studio — sitio web para salón de uñas

Página web de una sola página para un salón de uñas: inicio, servicios con precios, galería, sobre nosotros, opiniones, y reservas y contacto con WhatsApp.

> ⚠️ **Todos los datos del negocio son de ejemplo** (nombre, teléfono, dirección, precios, opiniones). Mientras `demoMode` esté en `true`, el sitio muestra un aviso de demostración y pide a los buscadores que **no** lo indexen.

## Tecnologías

| Paquete | Versión | Uso |
| --- | --- | --- |
| Next.js (App Router) | 13.5.11 | Framework |
| React | 18.2 | UI |
| TypeScript | 5.x | Tipado |
| Tailwind CSS | 3.4 | Estilos |
| sharp | 0.32 | Optimización de imágenes en producción |

No hay más dependencias: los iconos son SVG en línea y las fuentes (Cormorant Garamond y Jost, licencia OFL) están incluidas en `src/assets/fonts/` y se cargan con `next/font/local`. No se descargan al compilar porque Next 13.5 falla al bajar Google Fonts con Node 19 o superior.

**Requisito:** Node.js **16.14 a 22**. Se usa Next.js 13.5 porque es compatible con Node 16. El campo `engines` de `package.json` hace que Vercel compile con Node 22. Si actualizas a Node 20 o superior (recomendado), puedes migrar después a Next.js 14/15.

## Instalación y ejecución

```bash
npm install          # instala las dependencias
npm run dev          # modo desarrollo → http://localhost:3000
npm run build        # compila para producción
npm start            # sirve la versión compilada → http://localhost:3000
npm run lint         # revisa el código con ESLint
npm run typecheck    # revisa los tipos de TypeScript
```

> El proyecto está dentro de OneDrive. Si OneDrive va lento sincronizando `node_modules` o `.next`, puedes mover el proyecto a una carpeta fuera de OneDrive (por ejemplo `C:\proyectos\`).

## Personalización

Todo el contenido editable está en `src/data/`:

| Archivo | Qué contiene |
| --- | --- |
| `src/data/business.ts` | Nombre, descripción, teléfono, **número de WhatsApp**, correo, dirección, mapa, horarios, redes sociales, moneda y **`demoMode`** |
| `src/data/services.ts` | Servicios: nombre, descripción, **precio**, duración, foto y si es "Más popular" |
| `src/data/gallery.ts` | Fotos de la galería y sus títulos |
| `src/data/testimonials.ts` | Opiniones de clientes (las de ejemplo llevan `isExample: true` y se muestran con la etiqueta "Ejemplo") |
| `src/data/content.ts` | Textos del inicio, ventajas, "Sobre nosotros" y llamada a la acción de la galería |

### Pasos para publicar con datos reales

1. Edita `src/data/business.ts` con los datos reales.
   - `whatsapp.number`: solo dígitos con código de país, sin `+` ni espacios. Ejemplo para México: `5215512345678`.
   - `address.mapsQuery`: escribe la dirección o las coordenadas para mostrar un mapa de Google. Si lo dejas vacío, se muestra un enlace "Cómo llegar".
   - `hours`: horario de cada día (`null` = cerrado). El formulario solo ofrece horas dentro del horario.
2. Cambia los precios en `src/data/services.ts`.
3. Sustituye las opiniones de ejemplo por opiniones reales (con permiso de los clientes) y pon `isExample: false`.
4. Cambia las fotos (consulta el apartado "Imágenes").
5. Pon **`demoMode: false`** en `business.ts`. Así desaparecen los avisos de demostración y el sitio se puede indexar.
6. Crea `.env.local` (a partir de `.env.example`) con `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com`.

### Imágenes

Las fotos están en `src/assets/images/`. Para cambiar una, reemplaza el archivo manteniendo el mismo nombre, o añade uno nuevo e impórtalo en el archivo de datos que corresponda. Next.js las convierte a AVIF/WebP y las redimensiona automáticamente. `public/og-image.jpg` (1200×630) es la imagen que se ve al compartir el enlace en redes.

Las fotos de muestra son de [Unsplash](https://unsplash.com) (licencia gratuita). Lo ideal es sustituirlas por fotos de trabajos reales del salón.

### Colores y tipografías

- Colores: `tailwind.config.ts` (`blush` = rosa, `nude`, `gold` = dorado, `cream`, `ink` = texto).
- Tipografías: `src/app/layout.tsx`.

## Reservas: cómo funcionan y qué falta configurar

El formulario valida los datos (nombre, teléfono, servicio, fecha y hora dentro del horario, sin días cerrados ni horas pasadas) y los envía a `POST /api/reservas`. El servidor los vuelve a validar.

**Sin configuración adicional, las solicitudes no se guardan en ningún sitio.** En ese caso el sitio no finge una confirmación: avisa al cliente de que la solicitud no se ha enviado y le ofrece un botón para mandarla por WhatsApp con todos los datos ya escritos.

Para recibir las solicitudes automáticamente, define un webhook en `.env.local` (o en las variables de entorno de tu hosting):

```bash
RESERVAS_WEBHOOK_URL=https://hook.tu-servicio.com/xxxx
```

Cada solicitud se envía como `POST` en JSON:

```json
{
  "tipo": "solicitud_de_cita",
  "negocio": "Rosé Nail Studio",
  "nombre": "Ana",
  "telefono": "+1 555 123 4567",
  "servicioId": "gel",
  "servicio": "Uñas en gel",
  "fecha": "2026-10-19",
  "hora": "10:00",
  "comentarios": "Diseño floral",
  "recibidaEn": "2026-10-18T22:17:44.905Z"
}
```

Opciones para el webhook:

- **Make, Zapier o n8n:** crea un escenario con un disparador "Webhook" y envía la solicitud a tu correo, a una hoja de Google Sheets, a Telegram, etc.
- **Google Apps Script:** publica un script como aplicación web que añada cada solicitud como fila de una hoja de cálculo.
- **Tu propio backend** o sistema de reservas.

Con el webhook configurado, el cliente ve "¡Solicitud enviada!", y el sitio le aclara que la cita queda confirmada cuando el salón le contacte. Si el webhook falla, se muestra un error y la opción de enviarla por WhatsApp.

> Nota: la API necesita un servidor Node (`npm start`, Vercel, Netlify, etc.). No funciona como sitio estático exportado.

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx           # HTML base, fuentes, metadatos SEO, cabecera y pie
│  ├─ page.tsx             # Página principal + datos estructurados (schema.org)
│  ├─ globals.css          # Estilos globales y animaciones
│  ├─ api/reservas/route.ts# Recibe, valida y reenvía las solicitudes de cita
│  ├─ sitemap.ts · robots.ts · icon.svg · not-found.tsx
├─ components/
│  ├─ layout/              # Header (menú móvil), Footer, Logo, SocialLinks, WhatsAppFloat
│  ├─ sections/            # Hero, Services, ServiceCard, Gallery, About, Testimonials, Booking
│  ├─ booking/             # BookingForm, ContactInfo, BookServiceLink
│  ├─ ui/                  # Button, SectionHeading, Icons, ExampleBadge…
│  └─ RevealObserver.tsx   # Animaciones de entrada al hacer scroll
├─ data/                   # ← contenido editable del negocio
├─ lib/                    # Horarios, validación de reservas, enlaces y formato de precios
└─ assets/images/          # Fotografías
```

## Accesibilidad, SEO y rendimiento

- HTML semántico (`header`, `nav`, `main`, `section`, `figure`, `address`), enlace "Saltar al contenido" y foco visible.
- Formulario con etiquetas, mensajes de error asociados (`aria-invalid`, `aria-describedby`), foco en el primer error y avisos con `aria-live`.
- Menú móvil y visor de la galería accesibles con teclado: Escape cierra y las flechas cambian de foto.
- Se respeta `prefers-reduced-motion`.
- Metadatos, Open Graph, sitemap, robots y datos estructurados `NailSalon`.
- Imágenes optimizadas con `next/image` (AVIF/WebP, tamaños adaptativos, desenfoque mientras cargan). Unos 99 KB de JavaScript inicial.
