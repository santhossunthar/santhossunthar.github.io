/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  //basePath: '',
  //assetPrefix: '',
  // Mobile performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
  // Compress static assets
  compress: true
}

module.exports = nextConfig