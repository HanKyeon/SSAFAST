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
  async rewrites() {
    return [
      {
        source: `/:path*`,
        destination: `https://www.figma.com/:path*`,
      },
      {
        source: `/:path*`,
        destination: `https://www.ssafast.com/:path*`,
      },
      {
        source: `/:path*`,
        destination: `http://localhost:3000/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
