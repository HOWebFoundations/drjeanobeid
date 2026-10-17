import NextLink from 'next/link';
import { getLocale } from 'next-intl/server';
import { localizedPath } from '@/i18n/routing';

/**
 * Locale-aware link that resolves the prefix ON THE SERVER and renders a plain
 * next/link.
 *
 * next-intl's own Link calls a client hook that needs NextIntlClientProvider,
 * and that provider ships the ICU message formatter (~14 KB gzipped) to every
 * page whether or not anything is translated in the browser. Nothing on this
 * site translates in the browser, so the provider is gone and links are
 * resolved here instead.
 */
export async function LocaleLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <NextLink href={localizedPath(locale, href)} className={className}>
      {children}
    </NextLink>
  );
}
