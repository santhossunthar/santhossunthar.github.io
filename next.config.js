/** @type {import('next').NextConfig} */

const env = process.env.NODE_ENV || 'development';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: env === 'production' ? '/santhossunthar.github.io' : '',
  assetPrefix: env === 'production' ? '/santhossunthar.github.io/' : '',
  // Mobile performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
  // Compress static assets
  compress: true
}

module.exports = nextConfig