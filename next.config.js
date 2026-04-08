/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // Avoid flaky PackFileCacheStrategy ENOENT / missing chunk errors after Node upgrades or cache churn.
    if (dev) config.cache = false
    return config
  },
}

module.exports = nextConfig
