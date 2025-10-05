
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Optional: Install with `npm install -D vite-plugin-imagemin`
// Uncomment the lines below after installing the package
// import viteImagemin from "vite-plugin-imagemin";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Uncomment after installing vite-plugin-imagemin
    // viteImagemin({
    //   gifsicle: { 
    //     optimizationLevel: 7,
    //     interlaced: false
    //   },
    //   optipng: { 
    //     optimizationLevel: 7 
    //   },
    //   mozjpeg: { 
    //     quality: 80,
    //     progressive: true
    //   },
    //   svgo: { 
    //     plugins: [
    //       { name: 'removeViewBox', active: false },
    //       { name: 'removeEmptyAttrs', active: true }
    //     ]
    //   }
    // })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Separate React and related libraries
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom'
          ],
          // UI libraries
          'vendor-ui': [
            '@radix-ui/react-toast',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge'
          ],
          // Animation libraries
          'vendor-animation': [
            'framer-motion',
            'lucide-react'
          ],
          // Query and state management
          'vendor-query': [
            '@tanstack/react-query'
          ]
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      }
    },
    // Source maps only for development
    sourcemap: mode === 'development'
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query'
    ]
  }
}));
