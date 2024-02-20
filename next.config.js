/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sarvusahitya.s3.ap-south-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
