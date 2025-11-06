import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  compiler: {
    removeConsole: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
    styledComponents: true,
    reactRemoveProperties: true,
    // reactRemoveProperties: { properties: ['^data-custom$'] },
    relay: {
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
    {
    "compilerOptions": {
        "experimentalDecorators": true
  }
}
  },
}

export default nextConfig