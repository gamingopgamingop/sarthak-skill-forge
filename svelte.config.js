import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex';
import path from 'path';
import { fileURLToPath } from 'url';
import adapter from '@sveltejs/adapter-auto'

/** Resolve current directory for cross-platform support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
  // ------------------------------------------------------------
  // 🧩 Preprocessors
  // ------------------------------------------------------------
  preprocess: [
    vitePreprocess({
      script: true,
      style: true,
      markup: true,
      postcss: {
        plugins: [autoprefixer()],
      },
      
      scss: {
        includePaths: ['src/styles', 'src/lib'],
      }
    }),
    // mdsvex(),

    // 📝 Markdown support → .md files become Svelte pages
    mdsvex({
      extensions: ['.md'],
      layout: {
        blog: 'src/lib/layouts/BlogLayout.svelte'
      }
    })
  ],

  // ------------------------------------------------------------
  // 📁 Extensions
  // ------------------------------------------------------------
  extensions: ['.svelte', '.md' , '.svx'],

  // ------------------------------------------------------------
  // 🔍 Svelte Inspect Tool (optional)
  // ------------------------------------------------------------
  inspector: {
    toggleKeyCombo: 'meta-shift',
    holdMode: true
  },

  // ------------------------------------------------------------
  // 📦 Alias Support
  // ------------------------------------------------------------
  kit: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },

    // For adapters (node, vercel, cloudflare, static)
    // adapter: undefined, // add your adapter
    adapter : adapter()
  }
};

export default config;
