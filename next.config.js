/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: [
      'api.darkmaterial.space',
      'api.storage.darkmaterial.space',
      'darkmaterial.space',
      'localhost',
      'firebasestorage.googleapis.com',
      'storage.googleapis.com'
    ]
  }
};

module.exports = nextConfig;
