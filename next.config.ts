import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,
    relay: {
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
}

export default nextConfig