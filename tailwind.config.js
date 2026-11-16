import type { Config } from "tailwindcss";

/**
 * Design tokens.
 * paper / sheet  backgrounds (blush page, white prints and letter paper)
 * ink            all text (plum)
 * tulip          the one strong colour; tulip-deep for buttons and links
 * stem           small accents only
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FDEFF2",
        sheet: "#FFFFFF",
        ink: {
          DEFAULT: "#3B1730",
          soft: "#6E4A61"
        },
        tulip: {
          soft: "#F8D3DD",
          DEFAULT: "#E8648C",
          deep: "#C23E6A"
        },
        stem: "#2F6B4F",
        /* Used by the edit panel only. */
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
        }
      },
      fontFamily: {
        display: ["'Young Serif'", "Georgia", "serif"],
        body: ["Figtree", "system-ui", "sans-serif"],
        hand: ["Caveat", "'Segoe Print'", "cursive"]
      },
      boxShadow: {
        print: "0 1px 1px rgba(59,23,48,.08), 0 8px 20px -8px rgba(59,23,48,.28)",
        lift: "0 2px 2px rgba(59,23,48,.08), 0 18px 34px -12px rgba(59,23,48,.38)"
      }
    }
  },
  plugins: []
} satisfies Config;
