/** Etiqueta para contenido de ejemplo que debe reemplazarse por datos reales. */
export function ExampleBadge({ children = "Ejemplo" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-gold-500/70 bg-gold-300/20 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-gold-700">
      {children}
    </span>
  );
}
