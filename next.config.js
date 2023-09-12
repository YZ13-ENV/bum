/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true,
  compress: true,
  // optimizeFonts: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'], 
    domains: [
      'cdn.darkmaterial.space',
    ]
  },
  experimental: {
    // swcMinify: true,
    // workerThreads: 4,
    // turbo: true,
  }
}
