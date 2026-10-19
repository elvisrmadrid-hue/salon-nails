import type { StaticImageData } from "next/image";
import cromado from "@/assets/images/galeria-cromado.jpg";
import azulDorado from "@/assets/images/galeria-azul-dorado.jpg";
import floral from "@/assets/images/galeria-floral.jpg";
import dorado from "@/assets/images/galeria-dorado.jpg";
import carey from "@/assets/images/galeria-carey.jpg";
import multicolor from "@/assets/images/galeria-multicolor.jpg";
import animalPrint from "@/assets/images/galeria-animal-print.jpg";
import love from "@/assets/images/galeria-love.jpg";
import nudeFlores from "@/assets/images/galeria-nude-flores.jpg";

export type GalleryItem = {
  src: StaticImageData;
  alt: string;
  title: string;
  style: string;
};

// Fotos de muestra (Unsplash). Sustitúyelas por fotos de los trabajos del salón.
export const gallery: GalleryItem[] = [
  { src: cromado, title: "Efecto cromado", style: "Stiletto · Espejo", alt: "Uñas stiletto con efecto cromado plateado y detalles en relieve" },
  { src: floral, title: "Flores delicadas", style: "Almendra · Pastel", alt: "Uñas color rosa pálido con pequeñas flores pintadas a mano" },
  { src: azulDorado, title: "Azul y oro", style: "Corta · Metalizado", alt: "Uñas en azul marino, dorado y blanco" },
  { src: love, title: "Mensaje de amor", style: "Almendra · Rojo", alt: "Uñas rojas con la palabra love escrita a mano" },
  { src: dorado, title: "Oro líquido", style: "Almendra · Metalizado", alt: "Mano con uñas almendra en dorado brillante" },
  { src: carey, title: "Carey y negro", style: "Corta · Brillo", alt: "Uñas con diseño de carey y negro" },
  { src: nudeFlores, title: "Nude natural", style: "Almendra · Nude", alt: "Mano con uñas nude sosteniendo flores" },
  { src: animalPrint, title: "Animal print", style: "Almendra · Mixto", alt: "Uñas con diseños de leopardo y hojas" },
  { src: multicolor, title: "Arcoíris", style: "Corta · Multicolor", alt: "Uñas con diseño multicolor en las puntas" },
];
