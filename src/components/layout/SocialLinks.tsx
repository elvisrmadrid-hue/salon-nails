import { business, type SocialName } from "@/data/business";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/Icons";

const icons: Record<SocialName, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
};

export function SocialLinks({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const border = onDark ? "border-white/25" : "border-ink/15";
  return (
    <ul className={`flex gap-3 ${className}`}>
      {business.socials.map((social) => {
        const Icon = icons[social.name];
        return (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} (${social.handle}), se abre en una pestaña nueva`}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${border} transition duration-300 hover:-translate-y-0.5 hover:border-blush-500 hover:bg-blush-500 hover:text-white`}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
