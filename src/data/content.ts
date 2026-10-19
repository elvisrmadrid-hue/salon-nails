/**
 * Textos de la página. Edítalos libremente para adaptarlos a la voz del salón.
 */

export type HighlightIcon = "heart" | "shield" | "sparkle" | "brush";

export const hero = {
  eyebrow: "Nail studio · Manicura & pedicura",
  titleStart: "Uñas impecables,",
  titleAccent: "hechas con arte",
  titleEnd: "y cuidado",
  description:
    "Manicuras, pedicuras y diseños a tu medida en un espacio tranquilo, limpio y pensado para que te relajes mientras te consentimos.",
  badgeTitle: "Higiene rigurosa",
  badgeText: "Instrumental esterilizado en cada cita",
};

export const valueProps: { icon: HighlightIcon; title: string; text: string }[] = [
  { icon: "heart", title: "Atención personalizada", text: "Te escuchamos y te asesoramos según tus uñas y tu estilo." },
  { icon: "shield", title: "Higiene rigurosa", text: "Instrumental esterilizado y limas de un solo uso." },
  { icon: "sparkle", title: "Productos de calidad", text: "Marcas profesionales para un acabado duradero." },
  { icon: "brush", title: "Diseños a tu medida", text: "Desde un nude elegante hasta nail art a mano alzada." },
];

export const about = {
  eyebrow: "Sobre nosotros",
  title: "Un espacio creado para consentirte",
  paragraphs: [
    "Somos un estudio de uñas que cree que los pequeños detalles marcan la diferencia. Cada cita es un momento para desconectar, cuidarte y salir con una sonrisa.",
    "Nuestra filosofía es sencilla: técnica cuidadosa, productos de calidad y una atención cercana, sin prisas. Te asesoramos para elegir la forma, el largo y el acabado que mejor van contigo.",
  ],
  commitments: [
    "Instrumental esterilizado y materiales desechables en cada servicio.",
    "Superficies y estaciones de trabajo desinfectadas entre clientes.",
    "Productos profesionales y respeto por la salud de tu uña natural.",
    "Citas puntuales y tiempo dedicado solo a ti.",
  ],
};

export const galleryCta = {
  title: "¿Tienes un diseño en mente?",
  text: "Envíanos tu foto de inspiración por WhatsApp y te asesoramos sobre la técnica, el tiempo y el precio.",
  whatsappMessage: "¡Hola! Tengo un diseño de uñas en mente y me gustaría recibir asesoría.",
};
