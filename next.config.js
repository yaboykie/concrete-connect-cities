
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add trailing slash to URLs to match old behavior if needed
  trailingSlash: true,
}

module.exports = nextConfig
