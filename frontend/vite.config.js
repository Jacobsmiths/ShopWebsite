import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8000/",
        changeOrigin: true,
      },
      "/images": {
        target: "http://localhost:8000/public",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "/var/www/html",
    emptyOutDir: true,
  },
});
