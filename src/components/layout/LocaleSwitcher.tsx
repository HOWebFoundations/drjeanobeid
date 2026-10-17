'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, localizedPath, unlocalizedPath, type Locale } from '@/i18n/locales';

const labels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'ع',
};

const names: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};

/**
 * Switches language by swapping the URL prefix on the current page. The URL is
 * the only source of truth for language (see src/i18n/routing.ts), so these are
 * plain links: no cookie, no client i18n runtime.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  const base = unlocalizedPath(usePathname() ?? '/');

  return (
    <nav aria-label="Language" className="flex items-center gap-1">
      {LOCALES.map((l) => (
        <NextLink
          key={l}
          href={localizedPath(l, base)}
          hrefLang={l}
          lang={l}
          aria-label={names[l]}
          aria-current={l === current ? 'true' : undefined}
          className={`tap-target inline-flex items-center justify-center rounded px-2 text-sm ${
            l === current ? 'font-semibold text-ink-950' : 'text-ink-600'
          }`}
        >
          {labels[l]}
        </NextLink>
      ))}
    </nav>
  );
}
