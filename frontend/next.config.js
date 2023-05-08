/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: `https`,
        hostname: `figma-alpha-api.s3.us-west-2.amazonaws.com`,
        port: ``,
        pathname: `/images/**`,
      },
      {
        protocol: `https`,
        hostname: `**`,
      },
    ],
  },
};

module.exports = nextConfig;
