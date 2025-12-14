import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0a0a0a",
          50: "#1a1a1a",
          100: "#2a2a2a",
          200: "#1a0a1a",
        },
        blush: {
          50: "#fff0f5",
          100: "#ffe0eb",
          200: "#ffc1d6",
          300: "#ff8fb3",
          400: "#ff5c8a",
          500: "#ff1493",
          600: "#e6007e",
          700: "#cc0069",
          800: "#b3005a",
          900: "#99004d"
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519"
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9f1239",
          900: "#831843",
          950: "#500724"
        }
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        editorial: ["'Cormorant Garamond'", "serif"],
        handwritten: ["'Caveat'", "cursive"]
      },
      backgroundImage: {
        "romance-gradient":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9), rgba(255,192,203,0.1)), radial-gradient(circle at 80% 0%, rgba(255,240,245,0.8), rgba(230,180,200,0.05))",
        "pastel-gradient":
          "linear-gradient(135deg, #fff5f8 0%, #ffeef2 25%, #ffe8ed 50%, #ffeef2 75%, #fff5f8 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;

