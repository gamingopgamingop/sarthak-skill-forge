/// <reference types="vitest" />
import marko from "@marko/vite";
import type { GetManualChunk } from 'rollup';
import type { OutputAsset } from "rollup";
import type { UserConfig , Plugin} from "vite";

import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import path from "path";
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
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import { TanStackStartVitePlugin } from '@tanstack/start-vite-plugin'
import { tanstackStart } from '@tanstack/start-vite-plugin'
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import solid from 'vite-plugin-solid'
import { qwikVite } from '@builder.io/qwik/optimizer';
import pkg from "./package.json";
import { qwikVite } from "@builder.io/qwik/optimizer";
import angular from '@analogjs/vite-plugin-angular';
import analog from '@analogjs/platform';
import electron from 'vite-plugin-electron/simple'
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import posthtml from '@vituum/vite-plugin-posthtml'
import liquid from 'liquid-express'
import liquidMiddleware from 'liquid-express-middleware'
import liquidNode from 'liquid-node'
import liquidNodeMiddleware from 'liquid-node-middleware'
import { installGlobals } from 'vituum/globals'
// import vituum from 'vituum'
import vituum from 'vituum/globals'

import pages from 'vituum/plugins/pages.js'
import redirects from 'vituum/plugins/redirects.js'
import sitemap from 'vituum/plugins/sitemap.js'
import robots from 'vituum/plugins/robots.js'
import manifest from 'vituum/plugins/manifest.js'
import prerender from 'vituum/plugins/prerender.js'
import prerenderMiddleware from 'vituum/plugins/prerender-middleware.js'
import prerenderNode from 'vituum/plugins/prerender-node.js'
import prerenderNodeMiddleware from 'vituum/plugins/prerender-node-middleware.js'
import imports from 'vituum/plugins/imports.js'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import postcss from '@vituum/vite-plugin-postcss'
import juice from '@vituum/vite-plugin-juice'
import { optimize } from '@vituum/vite-plugin-optimize'
import send from '@vituum/vite-plugin-send'
import concat from '@vituum/vite-plugin-concat'
import twig from '@vituum/vite-plugin-twig'
import latte from '@vituum/vite-plugin-latte'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import handlebars from '@vituum/vite-plugin-handlebars'
import { dirname } from "node:path";

installGlobals();

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";
const __dirname = dirname(fileURLToPath(import.meta.url));


export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    handlebars(),
    nunjucks(),
    latte(),
    twig(),
    concat(),
    send(),
    juice(),
    optimize(),
    postcss(),
    tailwindcss(),
    imports(),
    vituum(),
    pages(),
    redirects(),
    sitemap(),
    robots(),
    manifest(),
    prerender(),
    prerenderMiddleware(),
    prerenderNode(),
    prerenderNodeMiddleware(),
    posthtml(),
    liquid(),
    liquidMiddleware(),
    liquidNode(),
    liquidNodeMiddleware(),
    react(),
    analog(),
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),
    // reactStart(),
    vue(),
    vueDevTools(),
    devtools(), solidPlugin(),
    TanStackStartVitePlugin(),
    reactRouter(), tsconfigPaths(),
    svelte(),
    solid(),
    preact(),
    angular(),
    marko(),
    {
      apply: "build",
      name: "worker-condition",
      // config(options : import('vite').UserConfig) {
      config(options : UserConfig, config : UserConfig) {

        if (options.build.ssr && options.ssr?.target === "webworker") {
          // Add the `worker` export condition to tell Marko to load worker compatible stream apis.
          // Remove when https://github.com/vitejs/vite/issues/6401 is resolved.
          options.resolve = {
            conditions: ["worker", ...(options.resolve?.conditions || [])],
          };
        }

        return [options, config];
      },
    }, 
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
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // '@': fileURLToPath(new URL('./src', import.meta.url))

    },
    dedupe: ["react", "react-dom"],
  },

  build: {
    minify: [true, "terser"],
    outDir: "dist", // Server and client builds should output assets to the same folder.
    // emptyOutDir: false, // Avoid server / client deleting files from each other.
    assetsInlineLimit: 0, // This is currently a work around for loading the favicon since datauri does not work.
    sourcemap: [true, mode === "development", mode === "test", mode === "production"], // Generate sourcemaps for all builds.
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
    ssr: true,
    // outDir: 'dist',
    rollupOptions: {
      
      external: [...Object.keys(dependencies), 'bcrypt'],
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        server: path.resolve(__dirname, 'src/server.ts'),
        'index.liquid.html': path.resolve(__dirname, 'index.liquid.html'),
        'index.twig.html': path.resolve(__dirname, 'index.twig.html'),
        'index.njk.html': path.resolve(__dirname, 'index.njk.html'),
        'index.hbs.html': path.resolve(__dirname, 'index.hbs.html'),
        'index.pug.html': path.resolve(__dirname, 'index.pug.html'),
        'index.ejs.html': path.resolve(__dirname, 'index.ejs.html'),
        'index.haml.html': path.resolve(__dirname, 'index.haml.html'),
        'index.jade.html': path.resolve(__dirname, 'index.jade.html'),
        'index.swig.html': path.resolve(__dirname, 'index.swig.html'),
        
      },
      output: {
        format: "es",
        manualChunks(id : Parameters<GetManualChunk>[0] | string  | unknown) {
          if (typeof id === "string" && id.includes("node_modules")) return "vendor";
        },
        assetFileNames: (assetInfo : OutputAsset ) => {
          const ext = assetInfo.name.split(".").pop();
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
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
    noExternal: isProd,
  }

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

/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */
    qwikOnlyConfig((config: UserConfig, env: { mode: string; command: string }): UserConfig => {
      return {
        plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: "." })],
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
      command === "build" && mode === "production"
    //     ? {
    //         All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         Anything marked as a dependency will not be bundled
    //         These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         If a dep-of-dep needs to be external, add it here
    //         For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,

    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
    },
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

