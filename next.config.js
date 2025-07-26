/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  images: {
    domains: [
      'utfs.io',
      'i.ibb.co',
      'encrypted-tbn0.gstatic.com',
      'www.google.com',
      'serpapi.com' // ✅ Add this line
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'serpapi.com', // ✅ Optional but good to add
      }
    ],
  },
};

module.exports = withPWA(nextConfig);
