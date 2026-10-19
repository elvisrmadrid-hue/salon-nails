export type Testimonial = {
  id: string;
  name: string;
  service: string;
  quote: string;
  /** De 1 a 5. */
  rating: number;
  /** true = opinión ficticia de ejemplo (se muestra con una etiqueta). */
  isExample: boolean;
};

// ⚠️ OPINIONES DE EJEMPLO. Reemplázalas por opiniones reales de clientes
// (con su permiso) y marca `isExample: false`.
export const testimonials: Testimonial[] = [
  {
    id: "ejemplo-1",
    name: "Cliente de ejemplo 1",
    service: "Uñas acrílicas",
    quote:
      "Aquí irá la opinión de un cliente real. Por ejemplo: el diseño quedó exactamente como lo imaginaba y me duró perfecto varias semanas.",
    rating: 5,
    isExample: true,
  },
  {
    id: "ejemplo-2",
    name: "Cliente de ejemplo 2",
    service: "Pedicura spa",
    quote:
      "Aquí irá la opinión de un cliente real. Por ejemplo: un ambiente tranquilo, todo muy limpio y una atención súper cuidadosa.",
    rating: 5,
    isExample: true,
  },
  {
    id: "ejemplo-3",
    name: "Cliente de ejemplo 3",
    service: "Esmaltado semipermanente",
    quote:
      "Aquí irá la opinión de un cliente real. Por ejemplo: puntuales, amables y con muchísimos colores para elegir.",
    rating: 5,
    isExample: true,
  },
];
