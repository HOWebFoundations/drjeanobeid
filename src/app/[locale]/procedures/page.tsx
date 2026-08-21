import { setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Link } from '@/i18n/navigation';
import { listDocs } from '@/lib/content';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProcedureIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const docs = await listDocs(locale as Locale, 'procedures');

  return (
    <Section title="Tests and procedures">
      <ul className="grid gap-3 sm:grid-cols-2">
        {docs.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/procedures/${d.slug}`}
              className="block rounded-lg border border-ink-800/10 bg-surface-100 p-4 hover:border-arterial-600"
            >
              <span className="font-medium">{d.frontmatter.title}</span>
              <span className="mt-1 block text-sm text-ink-600">
                {d.frontmatter.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
