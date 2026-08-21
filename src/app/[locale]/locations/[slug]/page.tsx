import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/JsonLd';
import { medicalClinicSchema } from '@/lib/schema';
import { site, locationBySlug } from '@/lib/site';
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
 * The two locations share a phone number, so SESSION HOURS are the only thing
 * distinguishing these pages — and the two Google Business Profile listings.
 * They must be accurate, not approximate (docs/04-technical-architecture.md).
 */
export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const loc = locationBySlug(slug);
  if (!loc) notFound();

  return (
    <Container className="py-10">
      <h1 className="font-serif text-3xl font-semibold">{loc.name}</h1>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-ink-600">Address</dt>
          <dd className="mt-1">
            {[loc.department, loc.street, loc.district, loc.city]
              .filter(Boolean)
              .join(', ')}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-ink-600">Appointments</dt>
          <dd className="mt-1">
            <a href={`tel:${site.contact.phone}`} className="underline">
              {site.contact.phone || 'TODO — diligence 13'}
            </a>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-ink-600">Session hours</dt>
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
              <span className="text-ink-400">TODO — diligence 19</span>
            )}
          </dd>
        </div>
      </dl>

      <JsonLd data={{ '@context': 'https://schema.org', ...medicalClinicSchema(loc) }} />
    </Container>
  );
}
