/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/perplexica',
  images: {
    remotePatterns: [
      {
        hostname: 's2.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
