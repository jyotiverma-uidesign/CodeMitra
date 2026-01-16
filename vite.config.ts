import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  base: "/jyotiverma-uidesign/", // GitHub Pages repo name
  build: {
    outDir: "dist",       // default, ensures build goes to dist
    assetsDir: "assets",  // ✅ forces JS/CSS/fonts into 'assets' folder
  },
});
