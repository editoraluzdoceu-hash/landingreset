import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // TTFB / LCP: menor HTML, melhor compressão
    target: "esnext",
    cssMinify: true,
    minify: "esbuild",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    // SingleFile já inlines — garantir inline crítico e remover sourcemaps
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Se um dia remover singlefile, chunking ajuda no cache
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    headers: {
      "X-Frame-Options": "ALLOWALL",
      // Dicas de performance no dev — em produção são via _headers
      "Cache-Control": "no-store",
    },
  },
  preview: {
    host: "0.0.0.0",
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  },
});
