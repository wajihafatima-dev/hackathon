/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Set the minimum cache time-to-live for images
      minimumCacheTTL: 10000, // 2 hour 46 minutes
  
      // Define remote patterns for image optimization
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          pathname: '**',
        },
      ],
    },
    async headers() {
      return [
        {
          // Set headers for all routes
          source: '/(.*)',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,DELETE,PATCH,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
        {
          // Set cache control headers for images
          source: '/images/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
    swcMinify: true, // Enable SWC minification for improved performance
    reactStrictMode: true, // Enable React Strict Mode for catching potential issues
  };
  
  module.exports = nextConfig;
  