import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import { listSlugs } from '@/lib/content';

const STATIC = [
  '',
  '/about',
  '/conditions',
  '/procedures',
  '/locations',
  '/patient-information',
  '/teleconsultation',
  '/contact',
  '/articles',
  '/faq',
  '/privacy',
  '/legal',
];

function url(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${site.url}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC) {
      entries.push({ url: url(locale, path) });
    }
    for (const l of site.locations) {
      entries.push({ url: url(locale, `/locations/${l.slug}`) });
    }
    for (const collection of ['conditions', 'procedures'] as const) {
      for (const slug of await listSlugs(locale, collection)) {
        entries.push({ url: url(locale, `/${collection}/${slug}`) });
      }
    }
  }

  return entries;
}
