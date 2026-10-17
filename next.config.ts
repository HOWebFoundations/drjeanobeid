import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Budget: AVIF/WebP only. See docs/04-technical-architecture.md
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
