import { useTranslations } from 'next-intl';
import { LocaleLink as Link } from '@/components/LocaleLink';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="mt-16 border-t border-ink-800/10 bg-surface-100 py-10 text-sm">
      <Container className="grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-serif text-base font-semibold text-ink-950">
            {site.practitioner.nameQualified}
          </p>
          <p className="mt-1 text-ink-600">{t('tagline')}</p>
        </div>

        <div>
          <h2 className="font-medium text-ink-900">{t('locations')}</h2>
          <ul className="mt-2 space-y-1 text-ink-600">
            {site.locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="hover:text-arterial-600">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-medium text-ink-900">{t('legal')}</h2>
          <ul className="mt-2 space-y-1 text-ink-600">
            <li>
              <Link href="/privacy" className="hover:text-arterial-600">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/legal" className="hover:text-arterial-600">
                {t('disclaimer')}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
