import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174
  },
  // Base path for GitHub Pages - update this to your repository name
  base: process.env.NODE_ENV === 'production' ? '/anniversary-app/' : '/',
});



