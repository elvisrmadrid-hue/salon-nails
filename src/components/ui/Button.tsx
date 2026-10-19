import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "light" | "whatsapp";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-blush-700 text-white shadow-soft hover:bg-blush-800 hover:-translate-y-0.5",
  secondary: "border border-ink/20 bg-white/60 text-ink backdrop-blur hover:border-blush-600 hover:text-blush-700 hover:-translate-y-0.5",
  light: "bg-white text-blush-800 hover:bg-blush-50 hover:-translate-y-0.5",
  whatsapp: "bg-[#1f7a4c] text-white hover:bg-[#186640] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = ""): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    extra,
  ].join(" ");
}

type CommonProps = { variant?: Variant; size?: Size };

export function ButtonLink({
  variant,
  size,
  className = "",
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = props.href?.startsWith("http");
  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export function Button({
  variant,
  size,
  className = "",
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
