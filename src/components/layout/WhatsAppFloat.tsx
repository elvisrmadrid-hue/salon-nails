import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/links";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      className="group fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4c] text-white shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#186640] sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30 [animation-duration:3s] motion-reduce:hidden" aria-hidden="true" />
      <WhatsAppIcon width={28} height={28} className="relative" />
    </a>
  );
}
