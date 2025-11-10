import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsConfigPaths from 'vite-tsconfig-paths'
import { componentTagger } from "lovable-tagger";
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// import { reactStart } from '@tanstack/react-start'

import viteImageminVheemstra from "@vheemstra/vite-plugin-imagemin";
import viteImageminOriginal from "vite-plugin-imagemin";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import imageminMozjpeg from "imagemin-mozjpeg";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import imageminOptipng from "imagemin-optipng";
// import { tanstackStart } from '@tanstack/start-vite-plugin';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tanstack from '@tanstack/start-vite-plugin';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),
    // reactStart(),
    vue(),
    vueDevTools(),



    mode === "development" && componentTagger(),

    // ======= First plugin: @vheemstra/vite-plugin-imagemin =======
    viteImageminVheemstra({
      plugins: {
        gifsicle: imageminGifsicle({ optimizationLevel: 3 }),
        mozjpeg: imageminMozjpeg({ progressive: true, quality: 75 }),
        optipng: imageminOptipng({ optimizationLevel: 7 }),
        webp: imageminWebp({ quality: 80 }),
      },
    }),

    // ======= Second plugin: vite-plugin-imagemin =======
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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // '@': fileURLToPath(new URL('./src', import.meta.url))

    },
    dedupe: ["react", "react-dom"],
  },

  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
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
