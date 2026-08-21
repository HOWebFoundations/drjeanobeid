import { useTranslations } from 'next-intl';
import { site } from '@/lib/site';

/**
 * Appears on every medical page. Duty of care, and a liability shield.
 * 140 verified 2026-08-21 against the Lebanese Red Cross.
 *
 * Deliberately NOT arterial red — that colour means "act here, book with us".
 * An emergency notice that looks like a call-to-action is a design failure.
 */
export function EmergencyNotice() {
  const t = useTranslations('emergency');

  return (
    <aside
      role="note"
      className="my-8 rounded-lg border-s-4 border-alert-700 bg-alert-50 p-4 text-sm"
    >
      <p className="font-semibold text-alert-700">{t('heading')}</p>
      <p className="mt-1 text-ink-800">
        {t.rich('body', {
          number: () => (
            <a href={`tel:${site.emergency.redCross}`} className="font-semibold underline">
              {site.emergency.redCross}
            </a>
          ),
        })}
      </p>
    </aside>
  );
}
