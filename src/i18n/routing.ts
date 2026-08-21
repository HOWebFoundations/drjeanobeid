import { defineRouting } from 'next-intl/routing';

/**
 * English sits at the root, French and Arabic under prefixes.
 *   /        EN  (x-default)
 *   /fr/...  FR
 *   /ar/...  AR  (dir="rtl")
 *
 * See docs/04-technical-architecture.md. The bare domain serves English rather
 * than redirecting, so a branded search lands on a real page and not a 302.
 */
export const routing = defineRouting({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

/** Locales that render right-to-left. Drives `dir` at the layout level. */
export const rtlLocales: readonly Locale[] = ['ar'];

export function directionOf(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
