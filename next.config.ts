import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'pixelateuae.com' }], destination: 'https://www.pixelateuae.com/:path*', permanent: true }];
  },
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    return [
      { source: '/admin/:path*', headers: noindex },
      { source: '/api/:path*', headers: noindex },
      ...(process.env.VERCEL_ENV === 'preview' ? [{ source: '/:path*', headers: noindex }] : []),
    ];
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
};

export default nextConfig;
