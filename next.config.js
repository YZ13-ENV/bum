/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'darkmaterial.space',
      'firebasestorage.googleapis.com',
      'storage.googleapis.com'
    ]
  }
};

module.exports = nextConfig;
