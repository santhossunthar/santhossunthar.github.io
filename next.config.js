/** @type {import('next').NextConfig} */

const env = process.env.NODE_ENV || 'development';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: env === 'production' ? '/santhossunthar' : '',
  assetPrefix: env === 'production' ? '/santhos/' : '',
  // Mobile performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
  // Compress static assets
  compress: true
}

module.exports = nextConfig