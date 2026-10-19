import { business } from "@/data/business";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <path d="M11 13c0-4 2.2-9 5-9s5 5 5 9v13a3 3 0 01-3 3h-4a3 3 0 01-3-3V13z" fill="#ebbcbe" />
        <path d="M13 13.5c0-3 1.4-6.8 3-6.8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M10 18h12" stroke="#b8955a" strokeWidth="1.4" />
      </svg>
      <span className={`font-display text-2xl font-semibold leading-none tracking-wide ${light ? "text-white" : "text-ink"}`}>
        {business.name}
      </span>
    </span>
  );
}
