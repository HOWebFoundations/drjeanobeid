import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/JsonLd';
import { medicalClinicSchema } from '@/lib/schema';
import { site, locationBySlug, type SiteLocation } from '@/lib/site';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    site.locations.map((l) => ({ locale, slug: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locationBySlug(slug);
  return loc ? { title: loc.name } : {};
}

/**
 * Opens the patient's own maps app with the hospital as the destination.
 * Zero JavaScript, zero API key. An embedded Google Map would cost several
 * hundred KB against a budget that is already at 94% (docs/04).
 */
function directionsUrl(loc: SiteLocation): string {
  if (loc.geo.lat !== 0) {
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.geo.lat},${loc.geo.lng}`;
  }
  const q = [loc.name, loc.street, loc.district, loc.city, 'Lebanon'].join(', ');
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
}

/**
 * Optional pre-rendered map image at public/maps/{slug}.webp. A static file is
 * a few KB; drop one in and it appears. No photography inside the hospitals is
 * permitted, so the map and access notes are what make the two pages distinct.
 */
function staticMap(slug: string): string | null {
  const rel = `/maps/${slug}.webp`;
  return fs.existsSync(path.join(process.cwd(), 'public', rel)) ? rel : null;
}

/**
 * The two locations share a phone number, so SESSION HOURS are the main thing
 * distinguishing these pages and the two Google Business Profile listings.
 * They must be accurate, not approximate.
 */
export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('location');

  const loc = locationBySlug(slug);
  if (!loc) notFound();

  const map = staticMap(loc.slug);
  const address = [loc.department, loc.street, loc.district, loc.city].filter(Boolean).join(', ');

  return (
    <Container className="py-10">
      <h1 className="font-serif text-3xl font-semibold">{loc.name}</h1>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-medium text-ink-600">{t('address')}</dt>
            <dd className="mt-1">{address}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-ink-600">{t('appointments')}</dt>
            <dd className="mt-1">
              {site.contact.phone ? (
                <a href={`tel:${site.contact.phone}`} className="underline">
                  {site.contact.phone}
                </a>
              ) : (
                <span className="italic text-ink-600">{t('pending')}</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-ink-600">{t('hours')}</dt>
            <dd className="mt-1">
              {loc.hours.length > 0 ? (
                <ul>
                  {loc.hours.map((h) => (
                    <li key={h.day}>
                      {h.day}: {h.opens}–{h.closes}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="italic text-ink-600">{t('pending')}</span>
              )}
            </dd>
          </div>

          <a
            href={directionsUrl(loc)}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center rounded-lg bg-ink-900 px-5 text-sm font-medium text-surface-50 hover:bg-ink-800"
          >
            {t('directions')}
          </a>
        </dl>

        {map && (
          <a href={directionsUrl(loc)} target="_blank" rel="noopener noreferrer">
            <Image
              src={map}
              alt={t('mapAlt', { name: loc.name })}
              width={640}
              height={480}
              className="rounded-lg border border-ink-800/10"
            />
          </a>
        )}
      </div>

      <JsonLd data={{ '@context': 'https://schema.org', ...medicalClinicSchema(loc) }} />
    </Container>
  );
}
