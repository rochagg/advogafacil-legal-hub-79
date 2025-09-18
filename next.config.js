/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Temporarily ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
