import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Google Pixel inspired colors
        mint: {
          DEFAULT: "#34A853",
          light: "#4CAF50",
          dark: "#2E7D32",
        },
        coral: {
          DEFAULT: "#FF7D6B",
          light: "#FF9E8F",
          dark: "#F4511E",
        },
        neutral: {
          50: "#F8F9FA",
          100: "#F1F3F4",
          200: "#E8EAED",
          300: "#DADCE0",
          400: "#BDC1C6",
          500: "#9AA0A6",
          600: "#80868B",
          700: "#5F6368",
          800: "#3C4043",
          900: "#202124",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        display: ["Product Sans", "sans-serif"],
      },
      animation: {
        "progress-fill": "progress-fill 2s ease-in-out",
        "slide-up": "slide-up 0.5s ease-out",
        "confetti": "confetti 1s ease-out forwards",
      },
      keyframes: {
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "confetti": {
          "0%": { transform: "translateY(0) rotate(0)", opacity: "1" },
          "100%": { transform: "translateY(-100px) rotate(720deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;