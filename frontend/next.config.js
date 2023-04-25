/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: `https`,
        hostname: `figma-alpha-api.s3.us-west-2.amazonaws.com`,
        port: ``,
        pathname: `/images/**`,
      },
    ],
  },
};

module.exports = nextConfig;
