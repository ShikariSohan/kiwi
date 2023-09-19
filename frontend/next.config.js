/** @type {import('next').NextConfig} */

const withVideos = require('next-videos');

module.exports = withVideos();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
