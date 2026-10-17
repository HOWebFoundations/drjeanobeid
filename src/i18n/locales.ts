/**
 * Locale constants and helpers with NO library imports, so client components
 * can use them without pulling i18n runtime code into the browser bundle.
 */
export const LOCALES = ['en', 'fr', 'ar'] as const;
export const DEFAULT_LOCALE = 'en';
export type Locale = (typeof LOCALES)[number];

/** Locales that render right-to-left. Drives `dir` at the layout level. */
export const RTL_LOCALES: readonly Locale[] = ['ar'];

export function directionOf(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
}

/** `/conditions` in `fr` → `/fr/conditions`; in `en` → `/conditions`. */
export function localizedPath(locale: string, href: string): string {
  const path = href.startsWith('/') ? href : `/${href}`;
  if (locale === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** `/fr/conditions` → `/conditions`; `/fr` → `/`; `/conditions` → `/conditions`. */
export function unlocalizedPath(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
