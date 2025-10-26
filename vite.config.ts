// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImageminVheemstra from "@vheemstra/vite-plugin-imagemin";
import viteImageminOriginal from "vite-plugin-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminWebp from "imagemin-webp";
export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // First plugin: @vheemstra/vite-plugin-imagemin
    viteImageminVheemstra({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { progressive: true, quality: 75 },
      optipng: { optimizationLevel: 7 },
      webp: { quality: 80 },
    }),

    // Second plugin: vite-plugin-imagemin
    viteImageminOriginal({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: imageminMozjpeg({ quality: 80, progressive: true }),
      webp: imageminWebp({ quality: 80 }),
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: true },
        ],
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom"],
  },

  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name))
            return `assets/images/[name]-[hash].${ext}`;
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: { drop_console: mode === "production", drop_debugger: mode === "production" },
      format: { comments: false },
    },
    sourcemap: mode === "development",
  },
}));
