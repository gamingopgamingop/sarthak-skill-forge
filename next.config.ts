import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true,

  },
}

export default nextConfig
