"use client";

import { useEffect, useState } from "react";
import { business, navLinks } from "@/data/business";
import { buttonClasses } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");

  // Fondo sólido al hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el enlace de la sección visible.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => s !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Menú móvil: bloquea el scroll y se cierra con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-[0_1px_0_rgba(58,46,45,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {business.demoMode && (
        <p className="bg-ink px-4 py-1.5 text-center text-xs text-white/90">
          Sitio de demostración: contacto, precios y opiniones son datos de ejemplo.
        </p>
      )}
      <div className="container flex h-16 items-center justify-between gap-6 lg:h-20">
        <a href="#inicio" onClick={close} aria-label={`${business.name}, ir al inicio`}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "location" : undefined}
                  className={`link-underline text-sm tracking-wide transition-colors hover:text-blush-700 ${
                    active === link.href ? "text-blush-700" : "text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#reservar" className={buttonClasses("primary", "md", "hidden sm:inline-flex")}>
            Reservar cita
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-blush-100 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-nude-200 bg-cream lg:hidden"
      >
        <ul className="container flex flex-col py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="block border-b border-nude-200 py-4 font-display text-2xl text-ink transition-colors hover:text-blush-700"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a href="#reservar" onClick={close} className={buttonClasses("primary", "lg", "w-full")}>
              Reservar una cita
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
