import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/locales';
import { LocaleLink as Link } from '@/components/LocaleLink';
import { Container } from '@/components/ui/Container';
import { LocaleSwitcher } from './LocaleSwitcher';
import { site } from '@/lib/site';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;

  const links = [
    { href: '/about', label: t('about') },
    { href: '/conditions', label: t('conditions') },
    { href: '/procedures', label: t('procedures') },
    { href: '/locations', label: t('locations') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <header className="border-b border-ink-800/10 bg-surface-50">
      <Container className="flex items-center justify-between gap-4 py-4">
        {/* Always the qualified name — see docs/07-verification.md §4 */}
        <Link href="/" className="font-serif text-lg font-semibold text-ink-950">
          {site.practitioner.name}
          <span className="block text-xs font-normal text-ink-600">
            {t('specialty')}
          </span>
        </Link>

        <nav aria-label={t('primary')} className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-800 hover:text-arterial-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LocaleSwitcher current={locale} />
      </Container>
    </header>
  );
}
