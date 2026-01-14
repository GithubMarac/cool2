import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {}, 
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/cdn/**',
      },
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
        pathname: '/cdn/**',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default withNextIntl(nextConfig);
