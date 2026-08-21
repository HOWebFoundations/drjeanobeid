import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Source_Serif_4, Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';

import { routing, directionOf, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { physicianSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyContactBar } from '@/components/layout/StickyContactBar';
import '../globals.css';

// Self-hosted at build time, with size-adjusted fallbacks (docs/04).
const heading = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  // One URL per locale, with hreflang and a self-referencing canonical.
  // The root (EN) still needs both — easy to miss with an unprefixed default.
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      l === routing.defaultLocale ? site.url : `${site.url}/${l}`,
    ]),
  );

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('titleDefault'),
      template: `%s · ${site.practitioner.nameQualified}`,
    },
    description: t('description'),
    alternates: {
      canonical:
        locale === routing.defaultLocale ? site.url : `${site.url}/${locale}`,
      languages: { ...languages, 'x-default': site.url },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = directionOf(locale as Locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${heading.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-surface-50"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <StickyContactBar />
        </NextIntlClientProvider>
        <JsonLd data={physicianSchema(locale as Locale)} />
      </body>
    </html>
  );
}
