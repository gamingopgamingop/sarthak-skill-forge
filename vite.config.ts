import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Optional: install with `npm install -D vite-plugin-imagemin`
// import viteImagemin from "vite-plugin-imagemin";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Uncomment if you install vite-plugin-imagemin
    // viteImagemin({
    //   gifsicle: { optimizationLevel: 7, interlaced: false },
    //   optipng: { optimizationLevel: 7 },
    //   mozjpeg: { quality: 80, progressive: true },
    //   svgo: {
    //     plugins: [
    //       { name: "removeViewBox", active: false },
    //       { name: "removeEmptyAttrs", active: true },
    //     ],
    //   },
    // }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Show warning if a chunk exceeds 2MB
    chunkSizeWarningLimit: 2000,

    rollupOptions: {
      output: {
        // Split vendor bundles manually for caching & performance
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@tanstack")) return "vendor-query";
            if (
              id.includes("framer-motion") ||
              id.includes("lucide-react")
            )
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

        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name))
            return `assets/images/[name]-[hash].${ext}`;
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name))
            return `assets/fonts/[name]-[hash].${ext}`;
          return `assets/[name]-[hash].${ext}`;
        },

        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
      },
    },

    sourcemap: mode === "development",
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
    ],
  },
}));
