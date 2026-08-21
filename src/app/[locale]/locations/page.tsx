import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Link } from '@/i18n/navigation';
import { site } from '@/lib/site';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <Section title={t('locations')}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {site.locations.map((l) => (
          <li key={l.slug}>
            <Link
              href={`/locations/${l.slug}`}
              className="block rounded-lg border border-ink-800/10 p-5 hover:border-arterial-600"
            >
              <span className="font-serif text-lg">{l.name}</span>
              <span className="mt-1 block text-sm text-ink-600">
                {l.street}, {l.district}, {l.city}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
