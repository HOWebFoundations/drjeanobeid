import { defineRouting } from 'next-intl/routing';
import { LOCALES, DEFAULT_LOCALE } from './locales';

export { directionOf, localizedPath, type Locale } from './locales';

/**
 * English sits at the root, French and Arabic under prefixes.
 *   /        EN  (x-default)
 *   /fr/...  FR
 *   /ar/...  AR  (dir="rtl")
 *
 * See docs/04-technical-architecture.md. The bare domain serves English rather
 * than redirecting, so a branded search lands on a real page and not a 302.
 *
 * The URL is the ONLY source of truth for language: no Accept-Language
 * sniffing, no locale cookie. With detection on, a visitor whose browser is set
 * to French who clicks "EN" lands on `/`, gets detected as French, and is
 * bounced straight back to `/fr` — they can never reach English. Search
 * visitors arrive at the right locale through hreflang anyway.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
});
