//noinspection SpellCheckingInspection
// @ts-nocheck
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
import {createReadableStream,getRequest,setResponse} from '@sveltejs/kit/node';
import {	Server,	VERSION,	error,	fail,	invalid,	isActionFailure,	isHttpError,	isRedirect,	isValidationError,	json,	normalizeUrl,	redirect,	text} from '@sveltejs/kit';
import { installPolyfills } from '@sveltejs/kit/node/polyfills';
/** Resolve current directory for cross-platform support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = await getAdapter();     

installPolyfills();

type MaybePromise<T> = T | Promise<T>;
/**
 * Full Prerendered interface (for reference / augmentation)
 */
interface PrerenderedResult {
  pages: Map<
    string,
    {
      /** The location of the .html file relative to the output directory */
      file: string;
    }
  >;

  assets: Map<
    string,
    {
      /** The MIME type of the asset */
      type: string;
    }
  >;

  redirects: Map<
    string,
    {
      status: number;
      location: string;
    }
  >;

  /**
   * An array of prerendered paths (no trailing slashes,
   * regardless of trailingSlash config)
   */
  paths: string[];
}

interface Logger {
  (msg: string): void;
  success(msg: string): void;
  error(msg: string): void;
  warn(msg: string): void;
  minor(msg: string): void;
  info(msg: string): void;
}
interface PrerenderHttpErrorHandler {
  (details: { 
status: number;
path: string;
referrer: string | null;
referenceType: 'linked' | 'fetched';
message: string;
}): void;
}
type PrerenderMap = Map<string, PrerenderOption>;

interface PrerenderMissingIdHandler {
  (details: { path: string; id: string; referrers: string[]; message: string }): void;
}

type PrerenderMissingIdHandlerValue =
	| 'fail'
	| 'warn'
	| 'ignore'
	| PrerenderMissingIdHandler;

type TrailingSlash = 'never' | 'always' | 'ignore';
type IsAny<T> = 0 extends 1 & T ? true : false;

interface RequestOptions {
  getClientAddress(): string;
  platform?: App.Platform;
}

type PrerenderOption = boolean | 'auto';



type PrerenderUnseenRoutesHandlerValue =
	| 'fail'
	| 'warn'
	| 'ignore'
	| PrerenderUnseenRoutesHandler;

interface PrerenderUnseenRoutesHandler {
(details: { routes: string[]; message: string }): void;
}

interface Prerendered {}
pages: Map<
string,
{
	/** The location of the .html file relative to the output directory */
	file: string;
}
>;


interface RouteSegment {
  content: string;
  dynamic: boolean;
  rest: boolean;
  trailingSlash: TrailingSlash;
}

type PrerenderHttpErrorHandlerValue =
	| 'fail'
	| 'warn'
	| 'ignore'
	| PrerenderHttpErrorHandler;

interface PrerenderEntryGeneratorMismatchHandler {
  (details: { generatedFromId: string; entry: string; matchedId: string; message: string }): void;
}

type PrerenderEntryGeneratorMismatchHandlerValue =
	| 'fail'
	| 'warn'
	| 'ignore'
	| PrerenderEntryGeneratorMismatchHandler;


type HttpMethod =
	| 'GET'
	| 'HEAD'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'OPTIONS';
I
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
	},
    prerender: {
      entries: ['*'],

      /**
       * Called after prerendering finishes
       */
      onComplete(prerendered: Prerendered) {
        const result = prerendered as unknown as PrerenderedResult;

        // ---- PAGES ----
        for (const [path, { file }] of result.pages) {
          console.log(`PAGE: ${path} → ${file}`);
        }

        // ---- ASSETS ----
        for (const [path, { type }] of result.assets) {
          console.log(`ASSET: ${path} (${type})`);
        }

        // ---- REDIRECTS ----
        for (const [path, redirect] of result.redirects) {
          console.log(
            `REDIRECT: ${path} → ${redirect.location} (${redirect.status})`
          );
        }

        // ---- PATHS (useful for sitemap) ----
        writeFileSync(
          'build/prerendered-paths.json',
          JSON.stringify(result.paths, null, 2)
        );


    }
  }
};
// function getRequest({
// 	request,
// 	base,
// 	bodySizeLimit
// }: {
// 	request: import('http').IncomingMessage;
// 	base: string;
// 	bodySizeLimit?: number;
// }): Promise<Request>;
// // Use getRequest to turn Node req into a Web-standard Request
// async function handleNodeRequest(
//   nodeReq: import('http').IncomingMessage,
//   basePath: string
// ): Promise<Request> {
//   return getRequest({
//     request: nodeReq,
//     base: basePath,
//     bodySizeLimit: undefined, // optional limit
//   });
// }

// // Use createReadableStream to stream a file as a ReadableStream
// function streamFile(filePath: string): ReadableStream {
//   return createReadableStream(filePath);
// }

// // Use setResponse to pipe a Web Response back to Node res
// async function sendNodeResponse(
//   nodeRes: import('http').ServerResponse,
//   webResponse: Response
// ): Promise<void> {
//   await setResponse(nodeRes, webResponse);
// }

export default config;
