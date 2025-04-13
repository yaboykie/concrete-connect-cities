
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add transpilePackages if needed for specific npm packages
  transpilePackages: [],
  // Use the default Next.js output directory
  distDir: '.next',
}

module.exports = nextConfig
