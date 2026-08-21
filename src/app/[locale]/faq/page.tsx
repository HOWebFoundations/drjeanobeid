import { setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Content pending — drafted in English from the discovery interviews (docs/08). */
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section title="Frequently asked questions">
      <p className="max-w-prose text-ink-600">{'Content in preparation.'}</p>
    </Section>
  );
}
