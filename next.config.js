/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: { domains: ["tailwindui.com", "files.edgestore.dev"] },
};

module.exports = nextConfig;
