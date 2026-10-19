import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-40">
      <div className="container text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 font-display text-5xl font-medium text-ink">Página no encontrada</h1>
        <p className="mt-4 text-lg text-ink-soft">La página que buscas no existe o se ha movido.</p>
        <ButtonLink href="/" size="lg" className="mt-8">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
