// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import viteImagemin from "vite-plugin-imagemin";

// The minifiers you want to use:
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminWebp from 'imagemin-webp'



// Optional: install with `npm install -D vite-plugin-imagemin`

export default defineConfig(async ({ mode }) => {
  // Try to load optional plugins only if installed (keeps CI/dev resilient on low disk)
  let crittersPlugin: any = null;
  let compressionPlugin: any = null;
  let viteImagemin: any = null;
  try {
    const mod = await import('vite-plugin-critters');
    crittersPlugin = mod.default?.({
      preload: 'swap',
      pruneSource: true,
      reduceInlineStyles: true,
    });
  } catch {}
  try {
    const mod = await import('vite-plugin-compression');
    const compression = mod.default;
    compressionPlugin = [
      compression({ algorithm: 'brotliCompress', ext: '.br' }),
      compression({ algorithm: 'gzip', ext: '.gz' }),
    ];
  } catch {}
  try {
    const mod = await import('vite-plugin-imagemin');
    viteImagemin = mod.default?.({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { progressive: true, quality: 78 },
      optipng: { optimizationLevel: 7 },
      svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
      // webp/avif will be auto-enabled if imagemin-webp/avif are present
      webp: { quality: 78 },
      avif: { quality: 50 },
    });
  } catch {}

  return ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Optionally inline critical CSS when plugin is available
    crittersPlugin,
    // Optionally precompress assets
    ...(compressionPlugin ?? []),
    // Optionally compress images during build
    viteImagemin,
    // Uncomment after installing vite-plugin-imagemin
    
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80, progressive: true },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: true },
        ],
      },
    })
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force a single React instance in both dev and build
    dedupe: ["react", "react-dom"],
  },

  build: {
    // Slightly relaxed to 2000 KB for larger chunks
    chunkSizeWarningLimit: 2000,

    rollupOptions: {
      output: {
        // Dynamic vendor chunk splitting for flexible optimization
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@tanstack")) return "vendor-query";
            if (id.includes("framer-motion") || id.includes("lucide-react"))
              return "vendor-animation";
            if (
              id.includes("@radix-ui") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("class-variance-authority")
            )
              return "vendor-ui";
            return "vendor";
          }
        },

        // Optimized asset naming conventions
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },

        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    // Use terser to remove console/debugger in production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
      format: { comments: false },
    },

    // Enable source maps only during development
    sourcemap: mode === "development",
  },

  // Pre-bundle frequently used dependencies for faster dev startup
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-router",
      "@tanstack/react-router-devtools",
      "@tanstack/react-table",
      "@tanstack/react-form",
      "@tanstack/form-core",
      "@tanstack/react-virtual",
      "@tanstack/react-store",
      "@tanstack/react-ranger",
      "wouter",
      "@reach/router",
      "universal-router",
      "router5",
      "page",
      "navigo",
      "hookrouter",
      "navi",
      "@tanstack/react-query",
      "@tanstack/react-query-devtools",
      "@clerk/clerk-react",
      // Scrolling/virtualization libraries
      "react-custom-scrollbars-2",
      "simplebar-react",
      "simplebar",
      "react-perfect-scrollbar",
      "react-scrollbars-custom",
      "react-scroll",
      "react-scroll-parallax",
      "locomotive-scroll",
      "react-locomotive-scroll",
      "react-infinite-scroll-component",
      "react-window",
      "react-virtualized",
      "@tanstack/react-virtual",
      "react-headroom",
      "aos",
      "react-helmet-async",
      "react-scroll-parallax",
      "aos",
    ],
    // Ensure a single React instance
    dedupe: ["react", "react-dom"]
  },

  // Cleaner log output for Vercel/CLI
  logLevel: "info",
  });
});
