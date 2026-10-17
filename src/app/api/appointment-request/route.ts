import { NextResponse } from 'next/server';

/**
 * Appointment requests.
 *
 * Data minimisation, per docs/10-pre-launch-constraints.md section C:
 *   - The REASON for the visit goes to the clinic by email and is never stored.
 *     A name next to "second opinion" reveals that a named person is seeking
 *     cardiology care, which is arguably health data under GDPR Article 9.
 *   - The Supabase log keeps name, phone, timestamp and status only. That is
 *     enough for follow-up tracking and real conversion numbers.
 *   - The WhatsApp alert is a pre-approved template with NO parameters, so it
 *     cannot carry patient data. It tells the secretary to check her email.
 *
 * Fields are a closed set. If a free-text symptom field ever appears in the
 * payload it is ignored.
 *
 * If email delivery is not configured, the endpoint returns 503 rather than
 * pretending to succeed. A form that says "sent" while nobody receives the
 * request is worse than no form at all. The client falls back to call and
 * WhatsApp.
 */

const LOCATIONS = new Set(['geitaoui', 'karantina', 'teleconsultation']);
const TIMES = new Set(['morning', 'afternoon', 'specific']);
const REASONS = new Set(['first', 'follow-up', 'second-opinion', 'test', 'other']);

const LABELS: Record<string, string> = {
  geitaoui: 'Hôpital Libanais Geitaoui',
  karantina: 'Karantina',
  teleconsultation: 'Teleconsultation',
  morning: 'Morning',
  afternoon: 'Afternoon',
  specific: 'A specific day (call to arrange)',
  first: 'First consultation',
  'follow-up': 'Follow-up',
  'second-opinion': 'Second opinion',
  test: 'A test their doctor asked for',
  other: 'Something else',
};

const TIMEOUT_MS = 8000;

interface Payload {
  name: string;
  phone: string;
  location: string;
  time: string;
  reason: string;
}

function validate(body: unknown): Payload | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(b.name);
  const phone = str(b.phone);
  const location = str(b.location);
  const time = str(b.time);
  const reason = str(b.reason);

  if (!name || name.length > 120) return null;
  if (!phone || phone.length > 40 || !/^[+\d\s()-]{6,}$/.test(phone)) return null;
  if (!LOCATIONS.has(location) || !TIMES.has(time) || !REASONS.has(reason)) return null;

  return { name, phone, location, time, reason };
}

async function sendEmail(p: Payload): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CLINIC_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!key || !to || !from) throw new Error('not_configured');

  const text = [
    'New appointment request from drjeanobeid.com',
    '',
    `Name: ${p.name}`,
    `Phone: ${p.phone}`,
    `Location: ${LABELS[p.location]}`,
    `Preferred time: ${LABELS[p.time]}`,
    `Reason: ${LABELS[p.reason]}`,
    '',
    'Please call the patient back. This request is not stored with its reason;',
    'this email is the only copy of it.',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from, to, subject: `Appointment request: ${p.name}`, text }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return res.ok;
}

/** Logs name, phone and status only. Never the reason. */
async function logRequest(p: Payload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  const res = await fetch(`${url}/rest/v1/appointment_requests`, {
    method: 'POST',
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      prefer: 'return=minimal',
    },
    body: JSON.stringify({ name: p.name, phone: p.phone, status: 'new' }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) console.error('[appointment-request] log failed', res.status);
}

/** Template with no parameters: structurally unable to carry patient data. */
async function notifyWhatsApp(): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_NOTIFY_TO;
  const template = process.env.WHATSAPP_TEMPLATE;
  if (!token || !phoneId || !to || !template) return;

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: { name: template, language: { code: 'en' } },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) console.error('[appointment-request] whatsapp failed', res.status);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill. Bots get a quiet success.
  if (typeof body === 'object' && body !== null && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const payload = validate(body);
  if (!payload) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  // Email is the delivery path. If it fails, the request has not been received,
  // and the patient must be told so they can call instead.
  try {
    const sent = await sendEmail(payload);
    if (!sent) return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  } catch (err) {
    const notConfigured = err instanceof Error && err.message === 'not_configured';
    if (!notConfigured) console.error('[appointment-request] email error', err);
    return NextResponse.json(
      { error: notConfigured ? 'not_configured' : 'delivery_failed' },
      { status: notConfigured ? 503 : 502 },
    );
  }

  // Log and alert are secondary. The email already reached the clinic, so a
  // failure here must not turn into an error for the patient.
  await Promise.allSettled([logRequest(payload), notifyWhatsApp()]);

  return NextResponse.json({ ok: true });
}
