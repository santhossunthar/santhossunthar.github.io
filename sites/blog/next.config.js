/** @type {import('next').NextConfig} */

const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // basePath: '',
  // assetPrefix: '',
  // Mobile performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
  // Compress static assets
  compress: true
}

module.exports = nextConfig
