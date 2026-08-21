'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { site } from '@/lib/site';

/**
 * Deliberately minimal. There is NO free-text symptom field: a free-text box
 * invites patients to type health information into a web form, which turns a
 * marketing site into a health-data processor. The dropdown gives the secretary
 * what she needs to triage without collecting anything sensitive.
 * See docs/01-strategy.md section 4.
 */
export function AppointmentForm() {
  const t = useTranslations('contact.form');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  const field =
    'mt-1 block w-full rounded-lg border border-ink-800/20 bg-surface-50 px-3 py-2.5';

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      <label className="block text-sm">
        <span className="font-medium">{t('name')}</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>

      <label className="block text-sm">
        <span className="font-medium">{t('phone')}</span>
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
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
        disabled={state === 'sending' || state === 'sent'}
        className="tap-target w-full rounded-lg bg-arterial-600 px-5 py-3 font-medium text-surface-50 disabled:opacity-60"
      >
        {t('submit')}
      </button>

      <p role="status" aria-live="polite" className="text-sm">
        {state === 'sent' && '✓'}
        {state === 'error' && '⚠'}
      </p>
    </form>
  );
}
