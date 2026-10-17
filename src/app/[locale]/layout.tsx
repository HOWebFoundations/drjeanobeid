import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Source_Serif_4, Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';

import { routing, directionOf, localizedPath, type Locale } from '@/i18n/routing';
import { site, allowIndexing } from '@/lib/site';
import { physicianSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyContactBar } from '@/components/layout/StickyContactBar';
import { ConsentAnalytics } from '@/components/ConsentAnalytics';
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
    robots: allowIndexing ? undefined : { index: false, follow: false },
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
  const tc = await getTranslations('consent');
  const consentLabels = {
    label: tc('label'),
    body: tc('body'),
    more: tc('more'),
    accept: tc('accept'),
    decline: tc('decline'),
    privacyHref: localizedPath(locale, '/privacy'),
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${heading.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        {/*
          No NextIntlClientProvider, deliberately. Nothing translates in the
          browser: strings are translated on the server and passed down as
          props, and links resolve their locale prefix on the server
          (src/components/LocaleLink.tsx). The provider would ship the ICU
          message formatter (~14 KB gzipped) to every page for nothing.
        */}
        <>
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
          <ConsentAnalytics labels={consentLabels} />
        </>
        <JsonLd data={physicianSchema(locale as Locale)} />
      </body>
    </html>
  );
}
