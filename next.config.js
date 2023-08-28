/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: [
      'cdn.darkmaterial.space',
      'api.darkmaterial.space',
      'api.storage.darkmaterial.space',
    ]
  }
};

module.exports = nextConfig;
