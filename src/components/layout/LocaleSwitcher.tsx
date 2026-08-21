'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const labels: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'ع',
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`tap-target rounded px-2 text-sm ${
            l === locale ? 'font-semibold text-ink-950' : 'text-ink-600'
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
