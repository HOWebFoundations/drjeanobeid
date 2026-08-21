import { NextResponse } from 'next/server';

/**
 * Appointment requests: email the clinic, notify by WhatsApp, and log to
 * Supabase so follow-up can be tracked and the conversion numbers are real
 * rather than inferred from analytics (docs/01-strategy.md section 4).
 *
 * Fields are a CLOSED SET. If a free-text symptom field ever appears in the
 * payload, reject it — accepting it would make this endpoint a processor of
 * health data, which the whole form design exists to avoid.
 */

const LOCATIONS = new Set(['geitaoui', 'karantina', 'teleconsultation']);
const TIMES = new Set(['morning', 'afternoon', 'specific']);
const REASONS = new Set(['first', 'follow-up', 'second-opinion', 'test', 'other']);

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

  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
  const location = typeof b.location === 'string' ? b.location : '';
  const time = typeof b.time === 'string' ? b.time : '';
  const reason = typeof b.reason === 'string' ? b.reason : '';

  if (!name || name.length > 120) return null;
  if (!phone || phone.length > 40) return null;
  if (!LOCATIONS.has(location) || !TIMES.has(time) || !REASONS.has(reason)) return null;

  return { name, phone, location, time, reason };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const payload = validate(body);
  if (!payload) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  // TODO: Resend + Supabase + WhatsApp notification.
  // Deliberately unimplemented until the clinic's real phone number, email and
  // Supabase project exist (docs/06-diligence.md). Wiring these to placeholder
  // credentials would produce a form that silently drops patient requests,
  // which is worse than one that is visibly not yet live.
  console.info('[appointment-request]', payload);

  return NextResponse.json({ ok: true });
}
