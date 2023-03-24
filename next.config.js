/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/airdrop/og',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
