import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  },
  // Vercel serves the site from the root. GitHub Pages serves it under /<repo-name>/.
  base: process.env.VERCEL ? '/' : process.env.NODE_ENV === 'production' ? '/anniversary-app/' : '/',
});



