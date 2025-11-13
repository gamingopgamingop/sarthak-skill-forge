import type { NextConfig } from 'next'
const { withBlitz } = require("@blitzjs/next")

const nextConfig: NextConfig = {
    experimental: {
    typedRoutes: true,
  },

  cacheComponents: true,
  
  compiler: {
    runAfterProductionCompile: async ({ distDir, projectDir }) => {
    },
    removeConsole: true,
    // removeConsole: { exclude: ['error'] }, // optional
    styledComponents: true,
    reactRemoveProperties: true,
    // reactRemoveProperties: { properties: ['^data-custom$'] }, // optional
    relay: {
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },

}


export default nextConfig
