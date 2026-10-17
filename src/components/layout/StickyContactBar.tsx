import { useTranslations, useLocale } from 'next-intl';
import { LocaleLink as Link } from '@/components/LocaleLink';
import { site } from '@/lib/site';

/**
 * The conversion layer, and the single most important component on the site.
 *
 * One job: turn a worried person into a contact action in under 60 seconds on
 * a phone. Always visible on mobile, never collapsed, three actions, 44px
 * targets (docs/01-strategy.md section 4).
 *
 * One secretary and one number serve both hospitals, so "Call" is unambiguous
 * everywhere and needs no location-aware routing.
 */
export function StickyContactBar() {
  const t = useTranslations('contactBar');
  const locale = useLocale() as keyof typeof site.contact.whatsappPrefill;

  const prefill = encodeURIComponent(site.contact.whatsappPrefill[locale]);
  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${prefill}`;

  const item =
    'tap-target flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium';

  return (
    <nav
      aria-label={t('label')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-800/15 bg-surface-50/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch">
        <li className="flex flex-1">
          <a href={`tel:${site.contact.phone}`} className={`${item} text-ink-900`}>
            <span aria-hidden>☎</span>
            {t('call')}
          </a>
        </li>
        <li className="flex flex-1 border-x border-ink-800/10">
          <a href={waHref} className={`${item} text-ink-900`}>
            <span aria-hidden>✆</span>
            {t('whatsapp')}
          </a>
        </li>
        <li className="flex flex-1">
          <Link
            href="/contact"
            className={`${item} bg-arterial-600 text-surface-50`}
          >
            <span aria-hidden>✎</span>
            {t('request')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
