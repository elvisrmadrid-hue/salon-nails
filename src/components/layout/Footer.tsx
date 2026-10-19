import { business, navLinks } from "@/data/business";
import { Logo } from "@/components/layout/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { fullAddress } from "@/lib/links";
import { groupedHours } from "@/lib/hours";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm leading-relaxed">{business.description}</p>
          <SocialLinks onDark className="mt-6 text-white" />
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-display text-xl text-white">Explora</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-blush-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-xl text-white">Horario</h2>
          <dl className="mt-4 space-y-2.5">
            {groupedHours().map((g) => (
              <div key={g.days}>
                <dt className="text-sm text-white/60">{g.days}</dt>
                <dd>{g.hours}</dd>
              </div>
            ))}
          </dl>
          <address className="mt-6 not-italic leading-relaxed">{fullAddress}</address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
          </p>
          <p>
            Fotografías de muestra:{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
