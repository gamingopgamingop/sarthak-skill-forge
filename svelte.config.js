import { vitePreprocess  as vitePreprocessSvelte } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex';
import path from 'path';
import { fileURLToPath } from 'url';
import adapter from '@sveltejs/adapter-auto'
import cloudflareAdapter   from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import netlifyadapter from '@sveltejs/adapter-netlify';
import nodeadapter from '@sveltejs/adapter-node';
import staticadapter from '@sveltejs/adapter-static';
import verceladapter from '@sveltejs/adapter-vercel';

/** Resolve current directory for cross-platform support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAdapter() {
  switch (process.env.DEPLOY_TARGET) {
    case 'cloudflare':
      return cloudflareAdapter({
        fallback: 'plaintext',
        routes: {
          include: ['/*'],
          exclude: ['<all>'],
          split: false
        }
      });

    case 'netlify':
      return netlifyadapter({
        edge: false,
        split: false
      });

    case 'vercel':
      return verceladapter({
        images: {
          sizes: [640, 828, 1200, 1920, 3840],
          formats: ['image/avif', 'image/webp'],
          minimumCacheTTL: 300,
          domains: ['example-app.vercel.app'],
          split: false

        }
      });

    case 'node':
      return nodeadapter({
        out: 'build',
        precompress: true,
        envPrefix: ''
        
      });

    case 'static':
      return staticadapter({
        pages: 'build',
        assets: 'build',
        precompress: false,
        strict: true,
                  split: false

      });

    default:
      return autoAdapter();
  }
}


/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
  	isr: {
		expiration: 60,
		bypassToken: crypto.randomUUID(),
		allowQuery: ['search']
	},

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
      vitePreprocessSvelte({
    /* plugin-specific options */
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
  vitePlugin: {
  inspector: {
    toggleKeyCombo: 'meta-shift',
    holdMode: true
  }
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
    adapter : getAdapter(),
    paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	}
};


export default config;
