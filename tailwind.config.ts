import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        savanna: {
          50: "#fbf7ef",
          100: "#f4ead0",
          200: "#e8d39c",
          300: "#dab866",
          400: "#cfa241",
          500: "#b88629",
          600: "#9a6921",
          700: "#7b521f",
          800: "#5f4020",
          900: "#4a321d",
          950: "#2a1c0e"
        },
        acacia: {
          50: "#f3f8f3",
          100: "#e0eee0",
          200: "#bfdcc2",
          300: "#92c197",
          400: "#5fa067",
          500: "#3f8147",
          600: "#2d6635",
          700: "#24522c",
          800: "#1f4225",
          900: "#1a371f",
          950: "#0d1f11"
        },
        sunset: {
          500: "#e0683b",
          600: "#c64f24"
        },
        ivory: "#fbf8f1"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Segoe UI", "Roboto", "Arial"],
        display: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0,0,0,0.15)",
        cta: "0 12px 28px -8px rgba(224,104,59,0.55)"
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(120deg, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.25) 60%, rgba(10,10,10,0.55) 100%)"
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.5s ease-out both"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
