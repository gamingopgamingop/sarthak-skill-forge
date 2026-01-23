import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex';
import path from 'path';
import { fileURLToPath } from 'url';
import autoAdapter from '@sveltejs/adapter-auto'
import cloudflareAdapter   from '@sveltejs/adapter-cloudflare';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import nodeAdapter from '@sveltejs/adapter-node';
import staticAdapter from '@sveltejs/adapter-static';
import vercelAdapter from '@sveltejs/adapter-vercel';
import RolldownsvelteAdapter from '@siddharatha/adapter-node-rolldown';

/** Resolve current directory for cross-platform support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAdapter() {
  switch (process.env.DEPLOY_TARGET) {
    case 'cloudflare': {
      const { default: cloudflareAdapter } = await import(
        '@sveltejs/adapter-cloudflare'
      );
      return cloudflareAdapter({
        fallback: 'plaintext',
        routes: {
          include: ['/*'],
          exclude: ['<all>']
        }
      });
    }

    case 'netlify': {
      const { default: netlifyAdapter } = await import(
        '@/adapter-netlify'
      );
      return netlifyAdapter({
        edge: false,
        split: false
      });
    }

    case 'vercel': {
      const { default: vercelAdapter } = await import(
        '@sveltejs/adapter-vercel'

      );
      return vercelAdapter({
        images: {
          sizes: [640, 828, 1200, 1920, 3840],
          formats: ['image/avif', 'image/webp'],
          minimumCacheTTL: 300
        }
      });
    }

    case 'cloudflare-workers': {
      const { default: cloudflareAdapter } = await import(
        '@sveltejs/adapter-cloudflare'
      );
      return cloudflareAdapter({
        fallback: 'plaintext',
        routes: {
          include: ['/*'],
          exclude: ['<all>']
        }
      });
    }

    

    case 'rolldown': {
      const { default: RolldownsvelteAdapter } = await import(
        '@siddharatha/adapter-node-rolldown'
      );
      return RolldownsvelteAdapter({
        out: 'build',
        precompress: true,
        envPrefix: ''
      });
    }

    case 'node': {
      const { default: nodeAdapter } = await import(
        '@sveltejs/adapter-node'
      );
      return nodeAdapter({
        out: 'build',
        precompress: true,
        envPrefix: ''
      });
    }

    case 'static': {
      const { default: staticAdapter } = await import(
        '@sveltejs/adapter-static'
      );
      return staticAdapter({
        pages: 'build',
        assets: 'build',
        precompress: false,
        strict: true
      });
    }

    default: {
      const { default: autoAdapter } = await import(
        '@sveltejs/adapter-auto'
      );
      return autoAdapter();
    }
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
  // 🔧 Vite Plugin Configurations
  // ------------------------------------------------------------
  vitePlugin: {
  inspector: {
    toggleKeyCombo: 'meta-shift',
    holdMode: true,


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
