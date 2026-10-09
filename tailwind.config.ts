import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mts: {
          dark: "#08131E",
          navy: "#0B1D2C",
          surface: "#102A3C",
          card: "#163449",
          teal: {
            DEFAULT: "#0D6E63",
            light: "#149586",
            dark: "#084C44",
            glow: "#2DD4BF",
          },
          burgundy: {
            DEFAULT: "#7B182B",
            light: "#9A1F36",
            dark: "#5A101E",
          },
          gold: {
            DEFAULT: "#D4AF37",
            light: "#F3C952",
            dark: "#AA8C2C",
          },
          accent: "#00E5FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -5px rgba(13, 110, 99, 0.4)',
        'glow-gold': '0 0 20px -5px rgba(212, 175, 55, 0.35)',
        'glow-accent': '0 0 25px -5px rgba(0, 229, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
