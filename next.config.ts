/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
      unoptimized: true,
  },
  basePath: '/alijifi-portfolio.github.io',
  assetPrefix: '/alijifi-portfolio.github.io/',
  trailingSlash: true,
}

module.exports = nextConfig