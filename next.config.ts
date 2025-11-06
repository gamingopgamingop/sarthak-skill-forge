import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  
  compiler: {
    runAfterProductionCompile: async ({ distDir, projectDir }) => {
      // Your custom code here
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
