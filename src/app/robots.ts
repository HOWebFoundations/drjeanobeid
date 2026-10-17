import type { MetadataRoute } from 'next';
import { site, allowIndexing } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    // Crawling stays allowed before launch so crawlers can SEE the noindex.
    // The sitemap is only advertised once the site is meant to be indexed.
    ...(allowIndexing && { sitemap: `${site.url}/sitemap.xml` }),
  };
}
