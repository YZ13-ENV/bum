/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.darkmaterial.space',
      'localhost',
      'darkmaterial.space',
      'firebasestorage.googleapis.com',
      'storage.googleapis.com'
    ]
  }
};

module.exports = nextConfig;
