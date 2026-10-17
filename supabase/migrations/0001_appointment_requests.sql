-- Appointment request log.
--
-- Deliberately minimal, per docs/10-pre-launch-constraints.md section C.
-- There is NO reason column and there must never be one: the reason for the
-- visit goes to the clinic by email only. Name + phone + timestamp + status is
-- enough to track follow-up and measure conversion.
--
-- Host this Supabase project in an EU region, since the teleconsultation page
-- targets diaspora patients and GDPR applies.

create table if not exists public.appointment_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) <= 120),
  phone       text not null check (char_length(phone) <= 40),
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'booked', 'no_answer', 'closed'))
);

-- Row-level security on, with NO policies. Only the service role, used
-- server-side by the API route, can read or write. A misconfigured public table
-- is the most common way small sites leak personal data.
alter table public.appointment_requests enable row level security;

-- Retention: 90 days, enforced by a scheduled delete rather than a policy
-- document. Requires the pg_cron extension (Database -> Extensions in Supabase).
create extension if not exists pg_cron;

select cron.schedule(
  'purge-appointment-requests',
  '17 3 * * *',
  $$delete from public.appointment_requests where created_at < now() - interval '90 days'$$
);
