'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import type { FormLabels } from './appointment-form-labels';

/**
 * Deliberately minimal. There is NO free-text symptom field: a free-text box
 * invites patients to type health information into a web form, which turns a
 * marketing site into a health-data processor. See docs/01-strategy.md §4.
 *
 * If the request cannot be delivered for any reason, the patient is told plainly
 * and given the phone and WhatsApp routes. A silent failure on this form means a
 * worried person waiting for a call that never comes.
 *
 * Labels arrive as plain strings from the server. Translating here in the
 * browser would ship the ICU message formatter (~12 KB gzipped) for text that
 * never changes after render — real money against the 200 KB budget.
 */
type State = 'idle' | 'sending' | 'sent' | 'failed';


export function AppointmentForm({
  labels,
  locale,
}: {
  labels: FormLabels;
  locale: keyof typeof site.contact.whatsappPrefill;
}) {
  const t = (key: keyof FormLabels) => labels[key];
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/appointment-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      setState(res.ok ? 'sent' : 'failed');
    } catch {
      setState('failed');
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="max-w-md rounded-lg bg-surface-100 p-5">
        <p className="font-medium text-ink-950">{t('sentHeading')}</p>
        <p className="mt-1 text-sm text-ink-800">{t('sentBody')}</p>
      </div>
    );
  }

  const field =
    'mt-1 block w-full rounded-lg border border-ink-800/20 bg-surface-50 px-3 py-2.5';
  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappPrefill[locale])}`;

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      {/* Honeypot. Hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium">{t('name')}</span>
        <input name="name" required maxLength={120} autoComplete="name" className={field} />
      </label>

      <label className="block text-sm">
        <span className="font-medium">{t('phone')}</span>
        <input name="phone" type="tel" required maxLength={40} autoComplete="tel" className={field} />
      </label>

      <label className="block text-sm">
        <span className="font-medium">{t('location')}</span>
        <select name="location" required className={field}>
          {site.locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
          <option value="teleconsultation">{t('locationTeleconsultation')}</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="font-medium">{t('time')}</span>
        <select name="time" required className={field}>
          <option value="morning">{t('timeMorning')}</option>
          <option value="afternoon">{t('timeAfternoon')}</option>
          <option value="specific">{t('timeSpecific')}</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="font-medium">{t('reason')}</span>
        <select name="reason" required className={field}>
          <option value="first">{t('reasonFirst')}</option>
          <option value="follow-up">{t('reasonFollowUp')}</option>
          <option value="second-opinion">{t('reasonSecondOpinion')}</option>
          <option value="test">{t('reasonTest')}</option>
          <option value="other">{t('reasonOther')}</option>
        </select>
      </label>

      <p className="text-xs text-ink-600">{t('privacyNote')}</p>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="tap-target w-full rounded-lg bg-arterial-600 px-5 py-3 font-medium text-surface-50 disabled:opacity-60"
      >
        {state === 'sending' ? t('sending') : t('submit')}
      </button>

      {state === 'failed' && (
        <div role="alert" className="rounded-lg border-s-4 border-alert-700 bg-alert-50 p-4 text-sm">
          <p className="font-medium text-alert-700">{t('failedHeading')}</p>
          <p className="mt-1 text-ink-800">{t('failedBody')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={`tel:${site.contact.phone}`} className="tap-target inline-flex items-center rounded-lg bg-ink-900 px-4 text-surface-50">
              {t('failedCall')}
            </a>
            <a href={waHref} className="tap-target inline-flex items-center rounded-lg bg-ink-900 px-4 text-surface-50">
              {t('failedWhatsapp')}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
