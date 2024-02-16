/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["sarvusahitya.s3.ap-south-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
