// @ts-nocheck
// @ts-ignore

import { nitro } from 'nitro/vite'
import fs from "fs";
import svgr from 'vite-plugin-svgr'
import { createFilter } from '@rollup/pluginutils'
import stylus from 'stylus'
import type {CSSModulesConfig,  Drafts,  Features,  NonStandard,  PseudoClasses,  Targets,} from 'lightningcss'
// import { defineConfig } from "vite";
/// <reference types="vitest" />
import marko from "@marko/vite";
import type { GetManualChunk } from 'rollup';
import type { OutputAsset } from "rollup";
import { defineConfig, type UserConfig, type Plugin, type ConfigEnv , loadEnv, createLogger} from "vite";
// import type { Plugin} from "vite";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import pug from '@vituum/vite-plugin-pug'
import vike from "vike/plugin";
import rsc from '@vitejs/plugin-rsc'
import { vercelPreset } from "@vercel/react-router/vite"; // Add this
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import path, { resolve, dirname, join } from "node:path";
import tsConfigPaths from 'vite-tsconfig-paths'
import { componentTagger } from "lovable-tagger";
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
// import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// import { reactStart } from '@tanstack/react-start'
// import { vitePlugin as remix } from "@remix-run/dev";
import react from '@vitejs/plugin-react-swc'
import preact from '@preact/preset-vite'
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcssVite from '@vituum/vite-plugin-tailwindcss'
import reactOxc from '@vitejs/plugin-react-oxc'
import mdx from '@mdx-js/rollup'

import viteImageminVheemstra from "@vheemstra/vite-plugin-imagemin";
import viteImageminOriginal from "vite-plugin-imagemin";
// import { viteTanstackStart } from '@tanstack/react-start/plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import imageminOptipng from "imagemin-optipng";
// import { tanstackStart } from '@tanstack/start-vite-plugin';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { TanstackStart }from '@tanstack/start-vite-plugin';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
// import { TanStackStartVitePlugin } from '@tanstack/start-vite-plugin'
// import TanStackStartVitePlugin from "@tanstack/start-vite-plugin";
// import { tanstackStart } from '@tanstack/start-vite-plugin'
import { reactRouter } from "@react-router/dev/vite";
// import tsconfigPaths from "vite-tsconfig-paths";
import solid from 'vite-plugin-solid'
// import { qwikVite } from '@builder.io/qwik/optimizer';
import pkg from "./package.json";
import { qwikVite } from "@builder.io/qwik/optimizer";
import angular from '@analogjs/vite-plugin-angular';
import analog from '@analogjs/platform';
import electron from 'vite-plugin-electron/simple'
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import posthtml from '@vituum/vite-plugin-posthtml'
// import liquid from 'liquid-express'
// import liquidMiddleware from 'liquid-express-middleware'
import liquidNode from 'liquid-node'
// import liquidNodeMiddleware from 'liquid-node-middleware'
// import { installGlobals } from 'vituum/globals'
// import vituum , { setupGlobals as installGlobals } from 'vituum'
// import vituum from 'vituum/globals'
import vituum from 'vituum'

// import { installGlobals } from 'vituum/dist/globals.js'
import pages from 'vituum/plugins/pages.js'
// import redirects from 'vituum/plugins/redirects.js'
// import sitemap from 'vituum/plugins/sitemap.js'
// import robots from 'vituum/plugins/robots.js'
// import manifest from 'vituum/plugins/manifest.js'
// import prerender from 'vituum/plugins/prerender.js'
// import prerenderMiddleware from 'vituum/plugins/prerender-middleware.js'
// import prerenderNode from 'vituum/plugins/prerender-node.js'
// import prerenderNodeMiddleware from 'vituum/plugins/prerender-node-middleware.js'
import imports from 'vituum/plugins/imports.js'
// import vituumTailwind from "@vituum/vite-plugin-tailwindcss";
// import postcss from '@vituum/vite-plugin-postcss'
import juice from '@vituum/vite-plugin-juice'
// import { optimize } from '@vituum/vite-plugin-optimize'
import send from '@vituum/vite-plugin-send'
import concat from '@vituum/vite-plugin-concat'
import twig from '@vituum/vite-plugin-twig'
import latte from '@vituum/vite-plugin-latte'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import handlebars from '@vituum/vite-plugin-handlebars'
// import { dirname } from "node:path";
// import redirects from "vituum/src/plugins/redirects.js"
import vitummliquid  from '@vituum/vite-plugin-liquid'
// import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import postcss from '@vituum/vite-plugin-postcss'

// installGlobals();
import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from '@remix-run/dev';
import UnoCSS from 'unocss/vite';
import { defineConfig as defineViteConfig, type ViteDevServer } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
// import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
// import { join } from 'path';
// import viteTsConfigPaths from 'vite-tsconfig-paths'

// const env = process.env.NODE_ENV || 'development';
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const logger = createLogger()
const loggerWarn = logger.warn

const lottiePath = path.resolve('node_modules/lottie-web/build/player/lottie.js');

if (fs.existsSync(lottiePath)) {
  let content = fs.readFileSync(lottiePath, 'utf8');
  
  // Convert direct eval(...) to indirect (0, eval)(...)
  // This satisfies Rolldown and Vite's security/optimization checks
  const fixedContent = content.replace(
    /eval\('\[function _expression_function\(\){' \+ val \+ ';scoped_bm_rt=\$bm_rt}\]'\)/g,
    "(0, eval)('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')"
  );

  fs.writeFileSync(lottiePath, fixedContent);
  console.log('✅ Fixed direct eval in lottie-web');
}

logger.warn = (msg, options) => {
  // Ignore empty CSS files warning
  if (msg.includes('vite:css') && msg.includes(' is empty')) return
  loggerWarn(msg, options)
}
// --- SELF-FIXING LOGIC START ---
try {
  const fsRouterPath = path.resolve(
    "node_modules/vinxi/lib/fs-router.js"
  );

  if (fs.existsSync(fsRouterPath)) {
    const content = fs.readFileSync(fsRouterPath, "utf8");

    // Only patch if default export is missing
    if (!content.includes("export default")) {
      fs.writeFileSync(
        fsRouterPath,
        `${content}\n\nexport default function fileRoutes() { return []; }\n`
      );
      console.log("✅ Patched vinxi fs-router default export");
    }
  }
} catch (e) {
  console.warn("⚠️ Could not auto-fix vinxi fs-router:", e.message);
}
/* --- VINXI SELF-FIX END --- */

// --- SELF-FIXING LOGIC START ---
try {
  const vinxiPkgPath = path.resolve('node_modules/vinxi/package.json');
  if (fs.existsSync(vinxiPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(vinxiPkgPath, 'utf8'));
    
    // Check if the fix is needed
    if (pkg.exports["./routes"] && !pkg.exports["./routes"].import) {
      pkg.exports["./routes"] = {
        "import": "./lib/fs-router.js",
        "types": "./types/routes.d.ts"
      };
      fs.writeFileSync(vinxiPkgPath, JSON.stringify(pkg, null, 2));
      console.log('✅ Vinxi package.json fixed inside vite.config.ts');
    }
  }
} catch (e) {
  console.warn('⚠️ Could not auto-fix vinxi:', e.message);
}
// --- SELF-FIXING LOGIC END ---

// Get detailed git info with fallbacks
const getGitInfo = () => {
  try {
    return {
      commitHash: execSync('git rev-parse --short HEAD').toString().trim(),
      branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
      commitTime: execSync('git log -1 --format=%cd').toString().trim(),
      author: execSync('git log -1 --format=%an').toString().trim(),
      email: execSync('git log -1 --format=%ae').toString().trim(),
      remoteUrl: execSync('git config --get remote.origin.url').toString().trim(),
      repoName: execSync('git config --get remote.origin.url')
        .toString()
        .trim()
        .replace(/^.*github.com[:/]/, '')
        .replace(/\.git$/, ''),
    };
  } catch {
    return {
      commitHash: 'no-git-info',
      branch: 'unknown',
      commitTime: 'unknown',
      author: 'unknown',
      email: 'unknown',
      remoteUrl: 'unknown',
      repoName: 'unknown',
    };
  }
};
const isRSC = true
const isSSR = true
const htmlInputs = Object.fromEntries(
  [
    'index.liquid.html',
    'index.twig.html',
    'index.njk.html',
    'index.hbs.html',
    'index.pug.html',
  ]
    .filter(f => fs.existsSync(path.resolve(__dirname, f)))
    .map(f => [f, path.resolve(__dirname, f)])
);

// Read package.json with detailed dependency info
const getPackageJson = () => {
  try {
    const pkgPath = join(__dirname, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

    return {
      name: pkg.name,
      description: pkg.description,
      license: pkg.license,
      dependencies: pkg.dependencies || {},
      devDependencies: pkg.devDependencies || {},
      peerDependencies: pkg.peerDependencies || {},
      optionalDependencies: pkg.optionalDependencies || {},
    };
  } catch {
    return {
      name: 'bolt.diy',
      description: 'A DIY LLM interface',
      license: 'MIT',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      optionalDependencies: {},
    };
  }
};
const filter = createFilter(/\.svg\?react$/)

const getRscInput = () => {
  const defaultEntry = './src/framework/entry.rsc.tsx';
  // If in production, we force a string to satisfy the 'path.basename' call in the plugin
  return typeof defaultEntry === 'string' ? defaultEntry : String(defaultEntry);
};
const getVituumInput = () => {
  const envInput = process.env.VITE_INPUT;
  if (envInput && typeof envInput === 'string' && envInput.trim().length > 0) {
    return [envInput.trim()]; // Return as ARRAY
  }
  
  // Return array of patterns as fallback
  return ['src/pages/**/*.html'];
};
const input = getVituumInput();


const pkg = getPackageJson();
const gitInfo = getGitInfo();
// At the very top of vite.config.ts
const isProd = process.env.NODE_ENV === 'production';

const duplicateDeps = Object.keys(pkg.dependencies).filter((dep) =>
  Object.keys(pkg.devDependencies).includes(dep)
);

let msg = `
  Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
  Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
`;
const defineConst = (value: unknown) =>
  JSON.stringify(value ?? 'unknown');

const isCloudflare = process.env.TARGET_ENV === 'cloudflare'
const isVercel = process.env.VERCEL === '1'


if (duplicateDeps.length > 0) {
  throw new Error(msg);
}
// const isTest = import.meta.env.MODE === 'test';
// (removed unused isTest)
// const isProd = mode === "production";
// const isDev = mode === "development";
export default defineConfig(({ command, mode, isSsrBuild, isPreview}: ConfigEnv) => ({
    env: loadEnv(mode, process.cwd(), ''),
    assetsInclude: ['**/*.gltf'],
    esbuild: {
      jsxInject: `import React from 'react'`,
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },




  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  //   build: {
  //   minify: mode === "production",
  // },
  // server: {
  //   open: mode === "development",
  // },
  define: {
      'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE),

     __APP_ENV__: JSON.stringify(env.APP_ENV),
    __APP_VERSION__: defineConst(pkg.version),
    __APP_NAME__: defineConst(pkg.name),
    __APP_DESCRIPTION__: defineConst(pkg.description),
    __APP_LICENSE__: defineConst(pkg.license),
    __GIT_COMMIT_HASH__: defineConst(gitInfo.commitHash),
    __GIT_BRANCH__: defineConst(gitInfo.branch),
    __GIT_TAG__: defineConst(gitInfo.tag),
    __GIT_COMMIT_DATE__: defineConst(gitInfo.commitDate),
    __GIT_COMMIT_MESSAGE__: defineConst(gitInfo.commitMessage),
    __GIT_COMMIT_AUTHOR__: defineConst(gitInfo.commitAuthor),
    __GIT_COMMIT_EMAIL__: defineConst(gitInfo.commitEmail),
    __GIT_REMOTE_URL__: defineConst(gitInfo.remoteUrl),
    __GIT_REMOTE_NAME__: defineConst(gitInfo.remoteName),
    __GIT_REMOTE_BRANCH__: defineConst(gitInfo.remoteBranch),
    __GIT_REMOTE_COMMIT_HASH__: defineConst(gitInfo.remoteCommitHash),
    __GIT_REMOTE_TAG__: defineConst(gitInfo.remoteTag),
    __TARGET_ENV__: defineConst(process.env.TARGET_ENV),
    __IS_RSC__: defineConst(isRSC),
    __IS_SSR__: defineConst(isSSR),
        __API_URL__: 'window.__backend_api_url',
    __APP_VERSION__: JSON.stringify('v1.0.0'),

    // __IS_CLIENT__: defineConst(isClient),
    // __IS_WORKER__: defineConst(isWorker),
    __IS_CLOUDFLARE__: defineConst(isCloudflare),
    __IS_VERCEL__: defineConst(isVercel),
    // __IS_NODE__: defineConst(isNode),
    // __IS_WEB__: defineConst(isWeb),
    // __IS_BROWSER__: defineConst(isBrowser),
    'process.env.NODE_ENV': JSON.stringify('production')

  },
  root: "./",
  publicDir: "/public",
  cacheDir: "./node_modules/.vite",
  envDir: "./",
  envPrefix: "VITE_",
  appType: "mpa",
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  // (removed unused mode)
  normalizePath: true,
  base: "/",
  server: {
          port: env.APP_PORT ? Number(env.APP_PORT) : 5173,

        open: mode === "development",
        // (removed unused mode)
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },

    host: "::",
    port: 8080,
  },
  // (removed unused mode)
  plugins: [
    tailwindcss(),
    react(),



    {
  ...svgr(),
  load(id) {
    if (!filter(id)) return
    return this.load(id)
  }
},

{
    name: "my-plugin",
    resolveId() {
      if (this.meta.rolldownVersion) {
        // logic for rolldown-vite
        console.log("Running under rolldown-vite");
      } else {
        // logic for rollup-vite
        console.log("Running under rollup-vite");
      }
    }
  },
  {
    name: 'txt-loader',
    load(id) {
      if (id.endsWith('.txt')) {
        const content = fs.readFileSync(id, 'utf-8');
        return {
          code: `export default ${JSON.stringify(content)}`,
          moduleType: 'js',
        };
      }
    },
  },

  {
    name: 'log-config',
    configResolved(config) {
      console.log('options', config.optimizeDeps, config.oxc);
    },
  },

  //   process.env.TARGET_ENV === 'cloudflare' && cloudflare({
  //   viteEnvironment: { name: "worker" },
  // }),
    {
      name: 'rsc-path-fix',
      enforce: 'pre',
      resolveId(source) {
        // Ensure all inputs to path functions are strings
        return typeof source === 'string' ? source : undefined;
      },
    },
    { enforce: 'pre', ...mdx() },
      isRSC &&  rsc({ serverHandler: false, reactServerComponents: true,
      // `entries` option is only a shorthand for specifying each `rollupOptions.input` below
      // > entries: { rsc, ssr, client },
      //
      // by default, the plugin setup request handler based on `default export` of `rsc` environment `rollupOptions.input.index`.
      // This can be disabled when setting up own server handler e.g. `@cloudflare/vite-plugin`.
      // > serverHandler: false
    }),
      // isSSR && ssr({
      //   serverHandler: false,
      //   reactServerComponents: true,
      // }),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
      root: './src',
      configNames: ['tsconfig.json'],
      loose: true,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json' , 'mdx'],
      ignoreConfigErrors: true
    }),
      !isRSC && qwik(),




    // vike(),
    handlebars(),
    pug({
        root: './src'
    }),
    nitro({dev: mode === 'development'}),
    nunjucks(),
    latte(),
    twig(),
    concat(),
    send(),
    juice(),
    tanstackStart(),
    reactRouter({
      routeFileIgnorePattern: [/^\+/, 
      /\+config\.(js|ts)$/, 
      /\+Page\.(tsx|jsx)$/,/\.config\./,     
    /^_/, /\.test\./, /\+config/, /\.svelte$/, /\.vue$/, /\.qwik/],
      routeFileIgnorePrefix: "-",
      presets: [vercelPreset()],
      ssr: mode === "production", // Use the preset
    }),
        reactOxc({ include: /\.(mdx|js|jsx|ts|tsx)$/ , jsxImportSource: '@emotion/react', tsDecorators: true , plugins: [['@swc/plugin-styled-components', {}]], devTarget: 'es2022', parserConfig(id) {
    if (id.endsWith('.res')) return { syntax: 'ecmascript', jsx: true }
    if (id.endsWith('.ts')) return { syntax: 'typescript', tsx: false }
  },reactRefreshHost: 'http://localhost:3000',  useAtYourOwnRisk_mutateSwcOptions(options) {
    options.jsc.parser.decorators = true
    options.jsc.transform.decoratorVersion = '2022-03'
  },disableOxcRecommendation: true
}),

    // optimize(),
    postcss(),
    // tailwindcss(),
    imports(),
    // vike({routeFileIgnorePattern: [/\/?\+config\.(js|ts|jsx|tsx)$/]}
    // vi
    vike(),
    // vike({ ssr: { noExternal: true } }),
    // vituum({ input: getVituumInput() }),
// vituum({
//   input: getVituumInput()
// }),
//     pages({
//       root: './src',
//       dir: mode === "development" ? "src/pages": "src/pages",
//       extensions: ['html', 'pug', 'njk', 'twig', 'hbs', 'liquid']
//     }),

    // redirects(),
    // sitemap(),
    // robots(),
    // manifest(),
    // prerender(),
    // prerenderMiddleware(),
    // prerenderNode(),
    // prerenderNodeMiddleware(),
    posthtml(),
    // liquid(),
    // liquidMiddleware(),
    liquidNode(),
    // liquidNodeMiddleware(),
    // react(),
    analog(),
    tailwindcss(),
    tsConfigPaths(),
    viteReact({ include: /\.(mdx|js|jsx|ts|tsx)$/ , exclude: [/\/pdf\//, /\.solid\.tsx$/, /\/node_modules\//], jsxImportSource: '@emotion/react' , jsxRuntime: 'classic',  
      babel: {
    presets: [],
    // Your plugins run before any built-in transform (eg: Fast Refresh)
    plugins: [],
    // Use .babelrc files
    babelrc: true,
    // Use babel.config.js files
    configFile: true,
   parserOpts: {
      plugins: ['decorators-legacy'],
    },

  }, reactRefreshHost: 'http://localhost:3000'
}),
    // reactStart(),
    vue({ include: [/\.vue$/] }),
    vueDevTools(),
    devtools(), 
    solidPlugin(),
    // TanStackStartVitePlugin(),
    // reactRouter(), 
    tsConfigPaths(),
    svelte({ include: [/\.svelte$/] }),
    solid(),
    preact(),
    angular({ include: [/\.html$/] }),
    marko(),
    tailwindcssVite(),
    vitummliquid(),
    // viteTanstackStart(),
    // postcss(),

 
    dts({
      insertTypesEntry: true,
      tsConfigPath: resolve(__dirname, 'tsconfig.json'),
      entryPoints: ['src/main.ts'],
    }),
    //     {
    //   apply: "build",
    //   name: "worker-condition",
    //   config(config: UserConfig) {
    //     if (config.build?.ssr && config.ssr?.target === "webworker") {
    //       return {
    //         resolve: {
    //           conditions: ["worker", ...(config.resolve?.conditions || [])],
    //         },
    //       };
    //     }
    //   },
    // },
    
 
    command === 'build' &&
      qwikVite({
        csr: true,
      }),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
    // cloudflare({
    //   viteEnvironment: { name: "worker" },
    // }),
    redwood(),


    //     ...(isCloudflare && !isVercel ? [
    //   cloudflare({ viteEnvironment: { name: 'worker' } }),
    //   remixCloudflareDevProxy(),
    // ] : []),
  // ======= First plugin: @vheemstra/vite-plugin-imagemin =======

    // ======= Second plugin: vite-plugin-imagemin =======



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
    // {
//   name: "fix-vike-rollup-input",
//   enforce: "post",
//   config(config) {
//     if (config.build?.rollupOptions?.input) {
//       config.build.rollupOptions.input = "index.html";
//     }
//   }
// }

  ].filter(Boolean) as Plugin[],
    css: {          
      lightningcss: false,
      postcss: "./postcss.config.cjs",
      devSourcemap: false,
      transformer: "postcss",
      lightningcss: {
      targets: [{targets: browserslistToTargets(browserslist('>= 0.25%, not dead'))},{ chrome: 95, safari: 15 },{customSelectors: true}], 
    },
    postcss: {
      plugins: [
        require('cssnano')({
          preset: ['default', { discardComments: { removeAll: true } }],
        }),
      ],
    },


    //   targets: {
    //     chrome: 100,
    //     firefox: 100,
    //   },

    //   drafts: {
    //     nesting: true,
    //   },

    //   nonStandard: {
    //     deepSelectorCombinator: true,
    //   },

    //   pseudoClasses: {
    //     hover: true,
    //   },

    //   unusedSymbols: ['--unused-var'],

    //   cssModules: {
    //     dashedIdents: true,
    //   },
    // },
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
      styl: {
        define: {
          $specialColor: new stylus.nodes.RGBA(51, 197, 255, 1),
        },
      },
      scss: {
        importers: [
          // ...
        ],
        additionalData: `$injectedColor: orange;`,

      },
    },
  },
  logLevel: 'error',


  environments: {
    // `rsc` environment loads modules with `react-server` condition.
    // this environment is responsible for:
    // - RSC stream serialization (React VDOM -> RSC stream)
    // - server functions handling
    rsc: {
      build: {
        rollupOptions: {
          // input: {
          //   index: './src/framework/entry.rsc.tsx',
          // },
        },
      },
    },

    // `ssr` environment loads modules without `react-server` condition.
    // this environment is responsible for:
    // - RSC stream deserialization (RSC stream -> React VDOM)
    // - traditional SSR (React VDOM -> HTML string/stream)
    // ssr: {
    //   build: {
    //     rollupOptions: {
    //       input: {
    //         index: './src/framework/entry.ssr.tsx',
    //       },
    //     },
    //   },
    // },
    
    // client environment is used for hydration and client-side rendering
    // this environment is responsible for:
    // - RSC stream deserialization (RSC stream -> React VDOM)
    // - traditional CSR (React VDOM -> Browser DOM tree mount/hydration)
    // - refetch and re-render RSC
    // - calling server functions
    // client: {
    //   build: {
    //     rollupOptions: {
    //       input: {
    //         index: './src/framework/entry.browser.tsx',
    //       },
    //     },
    //   },
    // },
  },


  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "vinxi/routes": "vinxi",
      fs: 'unenv/runtime/node/fs/index',
      path: 'unenv/runtime/node/path/index',

      // '*': path.resolve(__dirname, 'src'),


      // '@': fileURLToPath(new URL('./src', import.meta.url))

    },
    dedupe: ["react", "react-dom"],
  },

  build: {
        // cssMinify: "lightningcss",

          target: 'esnext',

        // ssr: isProd,
    // ssr: true,
    // ssr: isProd ? { target: "webworker", noExternal: mode === "production" } : false,

    // minify: [true, "terser"],
    // cssMinify: "esbuild",
    // minify: mode === "production" ? "terser" : false,

    // input: {
    //   // index: path.resolve(__dirname, 'index.html'),
    // },
    outDir: "dist", // Server and client builds should output assets to the same folder.
    // emptyOutDir: false, // Avoid server / client deleting files from each other.
    assetsInlineLimit: 0, // This is currently a work around for loading the favicon since datauri does not work.
    // sourcemap: [true, mode === "development", mode === "test", mode === "production"], // Generate sourcemaps for all builds.
    sourcemap: mode === "development",
    // sourcemap: true,
    // ssr: true, // Crucial for Vercel + React Router
    emptyOutDir: true, // Avoid server & client deleting files from each other.
    // assetsInlineLimit: 0, // This is currently a work around for loading the favicon since datauri does not work.
    // rollupOptions: {
        // Output ESM for the server build also.
        // Remove when https://github.com/vitejs/vite/issues/2152 is resolved.
    //     format: "es",
    //     entryFileNames: "[name].js",
    //     chunkFileNames: "[name].js",
    //     assetFileNames: "[name].[ext]",
    //     manualChunks: undefined,
    //   },
    // },


    chunkSizeWarningLimit: 5000,
    // ssr: true,
    // outDir: 'dist',
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), 'bcrypt', 'mongoose', 'express', 'node:path', 'node:fs', 'node:http', 'node:https', 'node:net', 'node:crypto', 'node:stream', 'node:util', 'node:zlib', 'node:events', 'node:buffer', 'node:assert', 'node:process', 'node:querystring', 'node:url', 'node:dns', 'node:net', 'node:tls', 'node:http2', 'node:https', 'node:stream', 'node:util', 'node:zlib', 'node:events', 'node:buffer', 'node:assert', 'node:process', 'node:querystring', 'node:url', 'node:dns', 'node:net', 'node:tls', 'node:http2', 'vinxi/routes'],
      // input: isProd ? './src/server.ts' : './index.html',
      input: 'src/server.ts',
      onwarn(warning, warn) {
        if (
          warning.code === "EVAL" &&
          warning.loc?.file?.includes("lottie-web")
        ) {
          return; // ✅ ignore lottie eval warning
        }
        warn(warning);
      },
      onwarn(warning, warn) {
        // Skip the eval warning for Lottie
        if (warning.code === 'EVAL' && warning.id?.includes('lottie-web')) {
          return;
        }
        warn(warning);
      },


      // input: isProd ? './src/server.ts' : './index.html',
                 // dev
       // input: {
        //   index: './src/framework/entry.browser.tsx',
        // },

      // externals: [...Object.keys(dependencies), 'bcrypt'],
      // input: {
      //   // main: path.resolve(__dirname, 'src/index.html'),
      //   server: path.resolve(__dirname, 'src/server.ts'),
        // 'index.liquid.html': path.resolve(__dirname, 'index.liquid.html'),
        // 'index.twig.html': path.resolve(__dirname, 'index.twig.html'),
        // 'index.njk.html': path.resolve(__dirname, 'index.njk.html'),
        // 'index.hbs.html': path.resolve(__dirname, 'index.hbs.html'),
        // 'index.pug.html': path.resolve(__dirname, 'index.pug.html'),
        // 'index.ejs.html': path.resolve(__dirname, 'index.ejs.html'),
        // 'index.haml.html': path.resolve(__dirname, 'index.haml.html'),
        // 'index.jade.html': path.resolve(__dirname, 'index.jade.html'),
        // 'index.swig.html': path.resolve(__dirname, 'index.swig.html'),
        // ...htmlInputs,
 
        // 'index.html': path.resolve(__dirname, 'index.html'),
      // },
      output: {
        format: "es",
        manualChunks(id : Parameters<GetManualChunk>[0] | string  | unknown) {
          const moduleId = typeof id === "string" ? id : String(id);
          if (!id || typeof id !== 'string') return;
          if (id.includes('node_modules')) return 'vendor';
          if (typeof id === "string" && id.includes("node_modules")) return "vendor";
          if (moduleId.includes('react')) return 'vendor-react';
          if (moduleId.includes('angular') || moduleId.includes('rxjs')) return 'vendor-angular';
          if (moduleId.includes('vue')) return 'vendor-vue';
          if (moduleId.includes('svelte')) return 'vendor-svelte';
          if (moduleId.includes('lit')) return 'vendor-lit';
          if (moduleId.includes('preact')) return 'vendor-preact';
          if (moduleId.includes('marko')) return 'vendor-marko';
          if (moduleId.includes('solid')) return 'vendor-solid';
          if (moduleId.includes('alpinejs')) return 'vendor-alpinejs';
          if (moduleId.includes('motia')) return 'vendor-motia';
          if (moduleId.includes('bcrypt')) return 'vendor-bcrypt';
          if (moduleId.includes('express')) return 'vendor-express';
          if (moduleId.includes('mongoose')) return 'vendor-mongoose';
          if (moduleId.includes('node:') || moduleId.includes('node_modules')) return 'vendor-node';
          if (moduleId.includes('node:')) return 'vendor-node';
          if (moduleId.includes('node_modules')) return 'vendor-node_modules';
          if (moduleId.includes('server')) return 'server';
          if (moduleId.includes('index')) return 'index';
          if (moduleId.includes('browser')) return 'browser';
          if(moduleId.includes('src')) return 'src';
          if(moduleId.includes('public')) return 'public';
          if(moduleId.includes('assets')) return 'assets';
          if(moduleId.includes('styles')) return 'styles';
          if(moduleId.includes('components')) return 'components';
          if(moduleId.includes('pages')) return 'pages';
          if (/\/react(?:-dom)?/.test(id)) {
            return 'vendor-react';
          }
          return moduleId.split('/').pop()?.split('.')[0] || 'index' || moduleId || undefined;
          // return 'index', id , id.split('/').pop()?.split('.')[0];

// To (just return undefined if no match):
          // return undefined;
// Or simply remove this line entirely since the function should return undefined if no match
        },
        // assetFileNames: (assetInfo : OutputAsset ) => {
        //   const ext = assetInfo.name.split(".").pop();
        //   if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
        //     return `assets/images/[name]-[hash].${ext}`;
        //   }
        //   return `assets/[name]-[hash].${ext}`;
        // },
      },
    },
    terserOptions: {
      compress: { drop_console: mode === "production", drop_debugger: mode === "production" },
      format: { comments: false },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  // define: {
  //   'import.meta.vitest': mode !== 'production',
  // },
  // ssr: {
  //   target: "webworker",
  //   noExternal: mode === "production",
  //   // noExternal: mode === "production" ? undefined : ['@solidjs/start', '@solidjs/router', '@solidjs/meta'],
  //   // noExternal: mode === "production" ? undefined : ['@solidjs/start', '@solidjs/router', '@solidjs/meta', 'solid-js', 'solid-js/web', 'solid-js/store', 'solid-js/universal', 'solid-js/h', 'solid-js/jsx', 'solid-js/jsx-runtime', 'solid-js/web', 'solid-js/store', 'solid-js/universal', 'solid-js/h', 'solid-js/jsx', 'solid-js/jsx-runtime'],
  // },
}));

type PkgDep = Record<string, string>;
const { dependencies = {}, devDependencies = {} } = pkg as any as {
  dependencies: PkgDep;
  devDependencies: PkgDep;
  [key: string]: unknown;
};

function errorOnDuplicatesPkgDeps(
  devDependencies: PkgDep,
  dependencies: PkgDep,
) {
  const duplicateDeps = Object.keys(devDependencies).filter(
    (dep) => dependencies[dep],
  );

  const qwikPkg = Object.keys(dependencies).filter((v) => /qwik/i.test(v));

  if (qwikPkg.length) {
    throw new Error(`Move qwik packages ${qwikPkg.join(", ")} to devDependencies`);
  }

  if (duplicateDeps.length) {
    throw new Error(
      `Duplicate deps in dependencies & devDependencies: ${duplicateDeps.join(", ")}`
    );
  }
}

errorOnDuplicatesPkgDeps(devDependencies, dependencies);

export function qwikOnlyConfig(
  callback: (config: UserConfig, env: { mode: string; command: string }) => UserConfig
): UserConfig {
  return defineConfig((env: { mode: string; command: string | 'serve' | 'build' }) => callback({}, env));
}


/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */
   qwikOnlyConfig((config: UserConfig, env: { mode: string; command: string }): UserConfig => {
          // unused: env.mode, env.command

      return {
        plugins: [qwikCity(), qwikVite(), tsConfigPaths({ root: "." })],
        // This tells Vite which dependencies to pre-build in dev mode.
        optimizeDeps: {
          // Put problematic deps that break bundling here, mostly those with binaries.
          // For example ['better-sqlite3'] if you use that in server functions.
          exclude: [],
    },

    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    ssr:
      // command === "build" && mode === "production"
        env.command === "build" && env.mode === "production"

        ? {
    //         All dev dependencies should be bundled in the server build
            //         All deps of deps should be bundled in the server build
            //         All deps of deps of deps should be bundled in the server build
            //         All deps of deps of deps of deps should be bundled in the server build
            //         If you have dev deps that break bundling, add them to the exclude array
            //         If you have deps that break bundling, add them to the noExternal array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external array
            //         If you have deps that break bundling, add them to the external
            //         For example, if something uses `bcrypt` but you don't have it as a dep, you can write
            //         external: [...Object.keys(dependencies), 'bcrypt'],
            //         external: [...Object.keys(dependencies), 'bcrypt', Object.keys(dependencies)],
            // externals: [...Object.keys(dependencies), 'bcrypt'],
            external: [...Object.keys(pkg.dependencies), 'bcrypt'],
          }
        : undefined,

    // server: {
    //   headers: {
    //     // Don't cache the server response in dev mode
    //     "Cache-Control": "public, max-age=0",
    //   },
    //   // For example ['better-sqlite3'] if you use that in server functions.
    //   exclude: [],
    // },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

// *** utils ***

/**
 * Function to identify duplicate dependencies and throw an error
 * @param {Object} devDependencies - List of development dependencies
 * @param {Object} dependencies - List of production dependencies
 */
// function errorOnDuplicatesPkgDeps(
//   devDependencies: PkgDep,
//   dependencies: PkgDep,
// ) {
//   let msg = "";
  // Create an array 'duplicateDeps' by filtering devDependencies.
  // If a dependency also exists in dependencies, it is considered a duplicate.
//   const duplicateDeps = Object.keys(devDependencies).filter(
//     (dep) => dependencies[dep],
//   );

  // include any known qwik packages
//   const qwikPkg = Object.keys(dependencies).filter((value) =>
//     /qwik/i.test(value),
//   );

  // any errors for missing "qwik-city-plan"
  // [PLUGIN_ERROR]: Invalid module "@qwik-city-plan" is not a valid package
//   msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;

//   if (qwikPkg.length > 0) {
//     throw new Error(msg);
//   }

  // Format the error message with the duplicates list.
  // The `join` function is used to represent the elements of the 'duplicateDeps' array as a comma-separated string.
//   msg = `
//     Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
//     Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
//   `;

  // Throw an error with the constructed message.
//   if (duplicateDeps.length > 0) {
//     throw new Error(msg);
  

    
//   }
// }

export const remixConfig : defineViteConfig = defineConfig(({ mode }: { mode: string }): UserConfig => {
  const isProduction = mode === 'production';
  const isTest = mode === 'test';

  // errorOnDuplicatesPkgDeps(pkg.devDependencies, pkg.dependencies);
  return {
    /* --------------------------- Global Constants -------------------------- */
    define: {
      __APP_VERSION__: JSON.stringify((pkg as any).version || 'unknown'),
    'import.meta.vitest': mode !== 'production',

      __GIT_TAG_NAME__: defineConst(gitInfo.tagName),
      __GIT_COMMIT_HASH__: defineConst(gitInfo.commitHash),
      __GIT_BRANCH__: defineConst(gitInfo.branch),
      __GIT_COMMIT_DATE__: defineConst(gitInfo.commitTime),
      __GIT_COMMIT_AUTHOR__: defineConst(gitInfo.author),
      __GIT_COMMIT_EMAIL__: defineConst(gitInfo.email),
      __GIT_REMOTE_URL__: defineConst(gitInfo.remoteUrl),
      __GIT_REPOSITORY_NAME__: defineConst(gitInfo.repoName),
      __PKG_VERSION__: defineConst(pkg.version),
      __PKG_NAME__: defineConst(pkg.name),
      __PKG_DESCRIPTION__: defineConst(pkg.description),
      __PKG_LICENSE__: defineConst(pkg.license),
      __PKG_DEPENDENCIES__: defineConst(pkg.dependencies),
      __PKG_DEV_DEPENDENCIES__: defineConst(pkg.devDependencies),
      __PKG_PEER_DEPENDENCIES__: defineConst(pkg.peerDependencies),
      __PKG_OPTIONAL_DEPENDENCIES__: defineConst(pkg.optionalDependencies),
    },

    /* ------------------------------ Build ---------------------------------- */
    // build: {
    //   },

    /* ------------------------------ Plugins -------------------------------- */
    plugins: [
      nodePolyfills({
        include: ['path', 'buffer', 'process'],
        globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
      }),

      // !isTest && remixCloudflareDevProxy(),

      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
        },
      }),

      UnoCSS(),

      tsconfigPaths(),

      isProduction && optimizeCssModules({ apply: 'build' }),
    ].filter(Boolean),

    /* --------------------------- Environment Vars --------------------------- */
    envPrefix: [
      'VITE_',
      'OPENAI_LIKE_API_BASE_URL',
      'OLLAMA_API_BASE_URL',
      'LMSTUDIO_API_BASE_URL',
      'TOGETHER_API_BASE_URL',
    ],

    /* ------------------------------- CSS ----------------------------------- */
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});

export default {
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [{ name: 'vendor', test: /\/react(?:-dom)?/ }]
        },
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom", "@tanstack/router"],
          animation: ["gsap", "@react-spring/web"],
      },

      }
    }
  }
}
