/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.akamai.steamstatic.com"],
  },
};

module.exports = nextConfig;
