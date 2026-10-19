import type { StaticImageData } from "next/image";
import manicura from "@/assets/images/servicio-manicura.jpg";
import pedicura from "@/assets/images/servicio-pedicura.jpg";
import acrilicas from "@/assets/images/servicio-acrilicas.jpg";
import gel from "@/assets/images/servicio-gel.jpg";
import semipermanente from "@/assets/images/servicio-semipermanente.jpg";
import disenos from "@/assets/images/servicio-disenos.jpg";

export type Service = {
  /** Identificador único (se usa en el formulario de reservas). */
  id: string;
  name: string;
  description: string;
  /** Precio de EJEMPLO en la moneda configurada en business.ts. */
  price: number;
  /** Muestra "Desde" antes del precio. */
  priceFrom?: boolean;
  duration: string;
  image: StaticImageData;
  imageAlt: string;
  popular?: boolean;
};

// ⚠️ Precios y duraciones de EJEMPLO: edítalos con los valores reales del salón.
export const services: Service[] = [
  {
    id: "manicura",
    name: "Manicura clásica",
    description:
      "Limado, cuidado de cutículas, exfoliación, hidratación y esmaltado tradicional para unas manos impecables.",
    price: 20,
    duration: "45 min",
    image: manicura,
    imageAlt: "Manos con manicura en tono nude sobre una manta suave",
  },
  {
    id: "pedicura",
    name: "Pedicura spa",
    description:
      "Baño relajante, exfoliación, cuidado de durezas, masaje hidratante y esmaltado a tu elección.",
    price: 30,
    duration: "60 min",
    image: pedicura,
    imageAlt: "Pies en un baño de pedicura decorado con flores",
    popular: true,
  },
  {
    id: "acrilicas",
    name: "Uñas acrílicas",
    description:
      "Extensiones resistentes con la forma y el largo que prefieras: almendra, coffin, stiletto o cuadrada.",
    price: 45,
    priceFrom: true,
    duration: "90 min",
    image: acrilicas,
    imageAlt: "Uñas acrílicas largas en rosa sobre fondo rosa",
    popular: true,
  },
  {
    id: "gel",
    name: "Uñas en gel",
    description:
      "Acabado natural y brillante con mayor flexibilidad. Ideal para fortalecer y alargar tus uñas.",
    price: 35,
    priceFrom: true,
    duration: "75 min",
    image: gel,
    imageAlt: "Uñas en gel con forma almendra en rosa brillante",
  },
  {
    id: "semipermanente",
    name: "Esmaltado semipermanente",
    description:
      "Color intenso y brillo duradero de hasta tres semanas, sin descascarillado y con secado inmediato.",
    price: 25,
    duration: "45 min",
    image: semipermanente,
    imageAlt: "Esmaltado semipermanente en malva, blanco y glitter plateado",
    popular: true,
  },
  {
    id: "disenos",
    name: "Diseños personalizados",
    description:
      "Nail art a mano alzada, francesa, cromados, pedrería y efectos especiales. Tráenos tu inspiración.",
    price: 10,
    priceFrom: true,
    duration: "Según diseño",
    image: disenos,
    imageAlt: "Uñas con diseño de árboles invernales en azul y blanco",
  },
];
