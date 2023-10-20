/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true,
  compress: true,
  images: {
    unoptimized: false,
    formats: ['image/webp'], 
    domains: [
      'cdn.darkmaterial.space',
    ]
  },
  experimental: {
    workerThreads: true,
    cpus: 4,
  }
}
