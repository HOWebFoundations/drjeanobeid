import { setRequestLocale, getTranslations } from 'next-intl/server';
import { HeartHero } from '@/components/heart/HeartHero';
import { Section } from '@/components/ui/Section';
import { Link } from '@/i18n/navigation';
import { site } from '@/lib/site';
import { listDocs } from '@/lib/content';
import type { Locale } from '@/i18n/routing';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const [conditions, procedures] = await Promise.all([
    listDocs(locale as Locale, 'conditions'),
    listDocs(locale as Locale, 'procedures'),
  ]);

  return (
    <>
      <HeartHero />

      <Section title={t('conditions')}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/conditions/${c.slug}`}
                className="block rounded-lg border border-ink-800/10 bg-surface-100 p-4 hover:border-arterial-600"
              >
                <span className="font-medium">{c.frontmatter.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t('procedures')}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/procedures/${p.slug}`}
                className="block rounded-lg border border-ink-800/10 bg-surface-100 p-4 hover:border-arterial-600"
              >
                <span className="font-medium">{p.frontmatter.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

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
                  {l.district}, {l.city}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
