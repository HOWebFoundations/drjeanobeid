import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { AppointmentForm } from '@/components/AppointmentForm';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <Container className="py-10">
      <h1 className="font-serif text-3xl font-semibold">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-ink-800">{t('intro')}</p>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <AppointmentForm />

        <div className="text-sm">
          <ul className="space-y-4">
            {site.locations.map((l) => (
              <li key={l.slug}>
                <p className="font-serif text-base">{l.name}</p>
                <p className="text-ink-600">
                  {[l.department, l.street, l.district, l.city].filter(Boolean).join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
