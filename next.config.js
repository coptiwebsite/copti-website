/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'sanity.config': false,
      'sanity/structure': false,
      '@sanity/vision': false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Content-Type', value: 'application/xml' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/webmail',
        destination: 'https://usnyc.aveshost.net/webmail',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
