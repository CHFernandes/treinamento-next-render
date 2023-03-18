/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PRISMIC_ACCESS_TOKEN: process.env.PRISMIC_ACCESS_TOKEN,
    PRISMIC_ENDPOINT: process.env.PRISMIC_ENDPOINT,
  },
}

module.exports = nextConfig
