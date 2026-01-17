import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ Must match your repo name exactly
  build: {
    outDir: "dist",      // build output folder
    assetsDir: "assets", // JS/CSS/fonts
    chunkSizeWarningLimit: 1000, // increase warning limit to 1MB
    rollupOptions: {
      output: {
        // Split big libraries into separate chunks
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
});
