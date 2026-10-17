import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Pre-launch: noindex everything until ALLOW_INDEXING=true (see src/lib/site.ts).
  async headers() {
    if (process.env.ALLOW_INDEXING === 'true') return [];
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
  images: {
    // Budget: AVIF/WebP only. See docs/04-technical-architecture.md
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
