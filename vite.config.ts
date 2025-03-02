import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use the public folder as the project root so index.html is served from here.
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: "./", // Use relative paths for assets
  build: {
    // Build output will be placed in a folder (dist) at the project root.
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      // Make sure the entry is your index.html in the public folder.
      input: "index.html",
    },
  },
});
