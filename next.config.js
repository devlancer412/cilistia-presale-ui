/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/presale',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
