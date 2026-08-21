import { useFormatter, useTranslations } from 'next-intl';
import { site } from '@/lib/site';

/**
 * YMYL requirement (docs/01-strategy.md section 2). Every medical page carries
 * an author byline with credentials, a "medically reviewed by" line with a
 * date, and cited sources. Without these the content has no standing with
 * search engines and no accountability with patients.
 */
export function MedicalByline({
  reviewedAt,
  sources = [],
}: {
  reviewedAt: string; // ISO date
  sources?: { label: string; url: string }[];
}) {
  const t = useTranslations('byline');
  const format = useFormatter();

  return (
    <div className="mt-10 border-t border-ink-800/10 pt-6 text-sm text-ink-600">
      <p>
        {t('reviewedBy', { name: site.practitioner.nameQualified })}{' '}
        <time dateTime={reviewedAt}>
          {format.dateTime(new Date(reviewedAt), { dateStyle: 'long' })}
        </time>
      </p>

      {sources.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer font-medium text-ink-800">
            {t('sources')}
          </summary>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="nofollow noopener" className="underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
