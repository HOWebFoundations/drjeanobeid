'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * Consent first, scripts second.
 *
 * The common mistake is loading analytics and then showing a banner. Under GDPR
 * (which applies: the teleconsultation page targets diaspora patients),
 * non-essential scripts must not run until the visitor has said yes. Here GA4
 * is not even requested until consent is recorded.
 *
 * If NEXT_PUBLIC_GA_ID is unset, there are no non-essential cookies and so no
 * banner at all. Shipping without analytics is a legitimate choice, and it also
 * frees the most JS budget (docs/04-technical-architecture.md).
 *
 * Accept and Decline carry equal visual weight. A greyed-out "decline" is the
 * dark pattern regulators look for first.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const COOKIE = 'dj_consent';
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

type Consent = 'granted' | 'denied' | null;

export interface ConsentLabels {
  label: string;
  body: string;
  more: string;
  accept: string;
  decline: string;
  /** Already localised by the server, e.g. /fr/privacy. */
  privacyHref: string;
}

function readConsent(): Consent {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`));
  return (match?.[1] as Consent) ?? null;
}

function writeConsent(value: 'granted' | 'denied') {
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax; Secure`;
}

export function ConsentAnalytics({ labels }: { labels: ConsentLabels }) {
  const t = (key: Exclude<keyof ConsentLabels, 'privacyHref'>) => labels[key];
  // `undefined` until mounted, so the server render and first client render match.
  const [consent, setConsent] = useState<Consent | undefined>(undefined);

  useEffect(() => {
    if (GA_ID) setConsent(readConsent());
  }, []);

  if (!GA_ID || consent === undefined) return null;

  if (consent === 'granted') {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </>
    );
  }

  if (consent === 'denied') return null;

  const choose = (value: 'granted' | 'denied') => {
    writeConsent(value);
    setConsent(value);
  };

  const button =
    'tap-target flex-1 rounded-lg border border-ink-800/20 px-4 text-sm font-medium text-ink-900 hover:bg-surface-100';

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('label')}
      // Sits above the sticky contact bar on mobile, never over it.
      className="fixed inset-x-3 bottom-20 z-50 rounded-xl border border-ink-800/15 bg-surface-50 p-4 shadow-lg md:bottom-4 md:start-auto md:end-4 md:max-w-sm"
    >
      <p className="text-sm text-ink-800">
        {t('body')}{' '}
        <a href={labels.privacyHref} className="underline">
          {t('more')}
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" className={button} onClick={() => choose('denied')}>
          {t('decline')}
        </button>
        <button type="button" className={button} onClick={() => choose('granted')}>
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
