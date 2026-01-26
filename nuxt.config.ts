// @ts-nocheck
// @ts-expect-error
// @ts-ignore
import { defineNuxtConfig } from 'nuxt/config'
// https://nuxt.com/docs/api/configuration/nuxt-config
import config, { mergeConfig } from './uno.config.ts'
// import { mergeConfig } from './uno.config.ts'
import { presetUno } from 'unocss'
import presetIcons from './uno.config.ts'
import presetAnimations from './uno.config.ts'
import transformerDirectives from './uno.config.ts'
import { customIconCollection } from "./uno.config.ts"
import UnoCSS from '@unocss/vite' 
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {     
    plugins: [
      UnoCSS({
        configFile: './uno.config.ts',
        config: mergeConfig({
          presets: [presetUno(), presetIcons(), presetAnimations()],
        }),
      }),
    ],
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
  ],
    modules: [
    '@unocss/nuxt',
  ],
  unocss: {
    injectReset: true,
    configFile: './uno.config.ts',
    uno: {
      configFile: './uno.config.ts',
    },
    presets: [
      presetUno(),
      presetIcons({
        collections: {
          ...customIconCollection,
        },
        scale: 1.2,
        warn: true,
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
      }),
      presetAnimations(),
    ],
    transformers: [transformerDirectives()],
    rules: [
      ['m-1', { margin: '8px' }],
      [/^m-(\d+)$/, ([, d]: [string, string]) => ({ margin: `${Number(d) / 4}rem` })],
      [/^p-(\d+)$/, ([, d]: [string, string]) => ({ padding: `${Number(d) / 4}rem` })],
      ['custom-rule', { color: 'red' }],
    ],
    shortcuts: {
      'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
      'btn-green': 'text-white bg-green-500 hover:bg-green-700',
    },
    theme: {
      colors: {
        primary: '#ff0000',
        secondary: '#00ff00',
        accent: '#0000ff',
      },
    },
    variants: [
      // hover:
      (matcher: string) => {
        // the matcher callback receives the variant string
        // and needs to return an array of strings to match
        // if no match, return empty array
        if (!matcher.startsWith('hover:'))
          return matcher
        return {
          // slice `hover:` prefix and passed to the next variants and rules
          matcher: matcher.slice(6),
          selector: (s: string) => `${s}:hover`,
        }
      },
    ],
    safelist: [
      'text-red',
      'bg-green',
      ...Array.from({ length: 10 }, (_, i) => `w-${i + 1}`),
    ],
    blocklist: [/^p-\d+$/],
    preflights: [
      {
        getCSS: ({ theme }: { theme: any }) => `
          body {
            background-color: ${theme.colors.gray[100]};
          }
        `,
      },
    ],
    layers: {
      components: -1,
      default: 1,
      utilities: 2,
    },
    configDeps: [
      'uno.config.ts',
      'app.config.ts',
    ],
    keyframes: {
      'spin': '{to {transform: rotate(360deg)}}',
    },
    animations: {
      'spin': 'spin 1s linear infinite',
    },
      
  }
})


// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: true }
// })