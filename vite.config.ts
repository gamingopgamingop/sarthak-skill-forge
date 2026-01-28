// @ts-nocheck
import { nitro } from 'nitro/vite'
import fs from "fs";
// import { defineConfig } from "vite";
/// <reference types="vitest" />
import marko from "@marko/vite";
import type { GetManualChunk } from 'rollup';
import type { OutputAsset } from "rollup";
import { defineConfig, type UserConfig, type Plugin, type ConfigEnv } from "vite";
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
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// import { reactStart } from '@tanstack/react-start'
// import { vitePlugin as remix } from "@remix-run/dev";
import react from '@vitejs/plugin-react-swc'
import preact from '@preact/preset-vite'
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcssVite from '@vituum/vite-plugin-tailwindcss'

import viteImageminVheemstra from "@vheemstra/vite-plugin-imagemin";
import viteImageminOriginal from "vite-plugin-imagemin";
// import { viteTanstackStart } from '@tanstack/react-start/plugin/vite'
import { fileURLToPath, URL } from 'node:url'
import { svelte } from '@sveltejs/vite-plugin-svelte'

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
import { dirname } from "node:path";
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
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import viteTsConfigPaths from 'vite-tsconfig-paths'

// const env = process.env.NODE_ENV || 'development';
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

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



if (duplicateDeps.length > 0) {
  throw new Error(msg);
}
// const isTest = import.meta.env.MODE === 'test';
// (removed unused isTest)
// const isProd = mode === "production";
// const isDev = mode === "development";
export default defineConfig(({ mode }: ConfigEnv) => ({
  // (removed unused mode)
    build: {
    minify: mode === "production",
  },
  // server: {
  //   open: mode === "development",
  // },
  define: {
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
  },
  root: "./src",
  publicDir: "./public",
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
        rsc({
      // `entries` option is only a shorthand for specifying each `rollupOptions.input` below
      // > entries: { rsc, ssr, client },
      //
      // by default, the plugin setup request handler based on `default export` of `rsc` environment `rollupOptions.input.index`.
      // This can be disabled when setting up own server handler e.g. `@cloudflare/vite-plugin`.
      // > serverHandler: false
    }),
      viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),



    // vike(),
    handlebars(),
    pug({
        root: './src'
    }),
    nitro(),
    nunjucks(),
    latte(),
    twig(),
    concat(),
    send(),
    juice(),
    reactRouter({
      presets: [vercelPreset()],
      ssr: mode === "production", // Use the preset
    }),
    // optimize(),
    postcss(),
    tailwindcss(),
    imports(),
    vike({ prerender: true }),
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
    react(),
    analog(),
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),
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
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),





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
      // '*': path.resolve(__dirname, 'src'),


      // '@': fileURLToPath(new URL('./src', import.meta.url))

    },
    dedupe: ["react", "react-dom"],
  },

  build: {
        // ssr: isProd,
    // ssr: true,
    ssr: { target: "webworker", noExternal: mode === "production" },

    // minify: [true, "terser"],
    minify: mode === "production" ? "terser" : false,

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
    emptyOutDir: false, // Avoid server & client deleting files from each other.
    // assetsInlineLimit: 0, // This is currently a work around for loading the favicon since datauri does not work.
    // rollupOptions: {
    //   output: {
        // Output ESM for the server build also.
        // Remove when https://github.com/vitejs/vite/issues/2152 is resolved.
    //     format: "es",
    //   },
    // },


    chunkSizeWarningLimit: 3000,
    // ssr: true,
    // outDir: 'dist',
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), 'bcrypt'],
        input: isProd
          ? './src/server.ts'      // SSR entry
          : './index.html',        // dev
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
          if (typeof id === "string" && id.includes("node_modules")) return "vendor";
          if (id.includes('react')) return 'vendor-react';
          if (id.includes('angular') || id.includes('rxjs')) return 'vendor-angular';
          if (id.includes('vue')) return 'vendor-vue';
          if (id.includes('svelte')) return 'vendor-svelte';
          if (id.includes('lit')) return 'vendor-lit';
          if (id.includes('preact')) return 'vendor-preact';
          if (id.includes('marko')) return 'vendor-marko';
          if (id.includes('solid')) return 'vendor-solid';
          if (id.includes('alpinejs')) return 'vendor-alpinejs';
          if (id.includes('motia')) return 'vendor-motia';
          if (id.includes('bcrypt')) return 'vendor-bcrypt';
          if (id.includes('express')) return 'vendor-express';
          if (id.includes('mongoose')) return 'vendor-mongoose';
          if (id.includes('node:') || id.includes('node_modules')) return 'vendor-node';
          if (id.includes('node:')) return 'vendor-node';
          if (id.includes('node_modules')) return 'vendor-node_modules';
          if (id.includes('server')) return 'server';
          if (id.includes('index')) return 'index';
          if (id.includes('browser')) return 'browser';
          if(id.includes('src')) return 'src';
          if(id.includes('public')) return 'public';
          if(id.includes('assets')) return 'assets';
          if(id.includes('styles')) return 'styles';
          if(id.includes('components')) return 'components';
          // return 'index', id , id.split('/').pop()?.split('.')[0];

// To (just return undefined if no match):
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
  define: {
    'import.meta.vitest': mode !== 'production',
  },
  ssr: {
    target: "webworker",
    noExternal: mode === "production",
    // noExternal: mode === "production" ? undefined : ['@solidjs/start', '@solidjs/router', '@solidjs/meta'],
    // noExternal: mode === "production" ? undefined : ['@solidjs/start', '@solidjs/router', '@solidjs/meta', 'solid-js', 'solid-js/web', 'solid-js/store', 'solid-js/universal', 'solid-js/h', 'solid-js/jsx', 'solid-js/jsx-runtime', 'solid-js/web', 'solid-js/store', 'solid-js/universal', 'solid-js/h', 'solid-js/jsx', 'solid-js/jsx-runtime'],
  },
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

      __GIT_COMMIT_HASH__: defineConst(gitInfo.commitHash),
      __GIT_BRANCH_NAME__: defineConst(gitInfo.branch),
      __GIT_COMMIT_TIME__: defineConst(gitInfo.commitTime),
      __GIT_AUTHOR_NAME__: defineConst(gitInfo.author),
      __GIT_AUTHOR_EMAIL__: defineConst(gitInfo.email),
      __GIT_REMOTE_URL__: defineConst(gitInfo.remoteUrl),
      __GIT_REPOSITORY_NAME__: defineConst(gitInfo.repoName),

      __PKG_NAME__: defineConst(pkg.name),
      __PKG_DESCRIPTION__: defineConst(pkg.description),
      __PKG_LICENSE__: defineConst(pkg.license),
      __PKG_DEPENDENCIES__: defineConst(pkg.dependencies),
      __PKG_DEV_DEPENDENCIES__: defineConst(pkg.devDependencies),
      __PKG_PEER_DEPENDENCIES__: defineConst(pkg.peerDependencies),
      __PKG_OPTIONAL_DEPENDENCIES__: defineConst(pkg.optionalDependencies),
    },

    /* ------------------------------ Build ---------------------------------- */
    build: {
      target: 'esnext',
    },

    /* ------------------------------ Plugins -------------------------------- */
    plugins: [
      nodePolyfills({
        include: ['path', 'buffer', 'process'],
      }),

      !isTest && remixCloudflareDevProxy(),

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
