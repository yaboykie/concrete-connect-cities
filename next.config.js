
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
  // Ensure we're using the correct output directory
  distDir: 'dist',
}

module.exports = nextConfig
