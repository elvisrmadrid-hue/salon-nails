import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Paleta del salón: rosa pastel, nude, beige, blanco y dorado sutil.
        cream: "#fdf9f6",
        blush: {
          50: "#fdf6f5",
          100: "#fae9e8",
          200: "#f4d6d6",
          300: "#ebbcbe",
          400: "#dc9ca1",
          500: "#c97d85",
          600: "#ad6069",
          700: "#934d56",
          800: "#7a414a",
        },
        nude: {
          100: "#f5eee7",
          200: "#ebdfd2",
          300: "#dcc8b4",
          400: "#c7aa8e",
        },
        gold: {
          300: "#e3cf9f",
          400: "#cdb07a",
          500: "#b8955a",
          700: "#8a6a33",
        },
        ink: {
          DEFAULT: "#3a2e2d",
          soft: "#655553",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(122, 65, 74, 0.18)",
        card: "0 4px 24px -8px rgba(58, 46, 45, 0.12)",
      },
      borderRadius: {
        arch: "999px 999px 1.5rem 1.5rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
