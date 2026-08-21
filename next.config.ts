import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Budget: AVIF/WebP only. See docs/04-technical-architecture.md
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Keeps the 3D chunk out of the initial bundle.
    optimizePackageImports: ['@react-three/drei'],
  },
};

export default withNextIntl(nextConfig);
