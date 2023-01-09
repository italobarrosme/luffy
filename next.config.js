/** @type {import('next').NextConfig} */

const basePath = '/'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  publicRuntimeConfig: {
    basePath,
    staticFolder: '/static',
  },
}

module.exports = nextConfig
