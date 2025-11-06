import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
