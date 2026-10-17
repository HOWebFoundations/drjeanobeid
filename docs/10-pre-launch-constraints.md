# 10 — Pre-launch constraints

Things that can stop the launch, cause real harm, or quietly cost money later. Ordered by
how likely they are to actually bite, not by how technical they sound.

**The through-line: most of the serious risk here is not ours, it is his.** His medical
licence, his name, his patients' data. That changes how several of these should be handled —
we do not get to make the call and tell him afterwards.

---

## A · Can stop the launch

### A1 · Hospital permission — ✅ CLEARED, one follow-up

Agreed with both hospitals (2026-10-17):

| Permission | Status |
| --- | --- |
| Naming both hospitals on the site — copy, location pages, `MedicalClinic` schema | ✅ Agreed |
| Google Business Profile listing pinned at each hospital's address | ✅ Agreed |
| Photography on hospital premises | ❌ **Not permitted** |

**Follow-up: the agreement is verbal from both.** That is normal and fine for Geitaoui. For
the **governmental hospital at Karantina**, get a one-line written confirmation before
launch — an email from the administration is enough. Staff change, and the site and its map
pin will outlast whoever said yes. Not urgent; it should simply exist by Week 11. He asks,
not us.

**What "no photography" changes:**

- No interior or equipment shots at either hospital. The location pages carry the map, session
  hours, department, parking and access notes instead — which is what a patient finding the
  room needs anyway.
- The working-at-the-equipment shot moves off site, or drops. A good portrait plus clear
  credentials does the trust work without it.
- **It may affect GBP verification — see D1.**

### A2 · Domain control 🔴

`drjeanobeid.com` is "owned" — by whom, at which registrar, on whose credit card, expiring
when? If it was registered by a relative, a former agency, or a hospital IT person, that is a
hostage situation discovered at launch rather than a fact.

**Action:** get registrar login, or a documented transfer, before Week 4. Confirm the expiry
date and set auto-renew.

### A3 · DNS is live infrastructure

If the domain carries his email — or ever will — DNS is not a sandbox. Adding Resend's SPF,
DKIM and DMARC records alongside existing mail records is where a careless edit silently
breaks his inbox.

**Action:** export the current zone file before touching anything. Add records, never
replace. Test mail flow after each change.

### A4 · Nothing goes live without written medical sign-off

Stated in `02-content-inventory.md` as a principle. Make it a mechanical gate: a page without
a recorded review date and his approval does not deploy. If a page changes after review, it
needs re-review — including after transcreation, which is what the substance-drift check in
`02` exists for.

---

## B · Legal and regulatory — his exposure, not ours

### B1 · Order of Physicians advertising rules 🔴 still unverified

We adopted the strictest reading and did not ask him, per his instruction. That is a sound
default, but **it is a guess we made on his behalf about rules that govern his licence.**
Independent checking (`07-verification.md` §6) could not retrieve the governing article from
a primary source.

**Action:** before launch, he confirms in writing — even one line in an email — that he has
reviewed the site against the Order's current rules and is satisfied. This protects him, and
it protects HOWF from being the party that decided.

### B2 · The byline makes him personally attributable

"Medically reviewed by Dr Jean Obeid" on every clinical page is deliberate — it is what gives
the content standing with search engines. It also means every clinical claim on the site is
publicly attributed to a named, licensed physician.

**Make sure he has understood this rather than merely agreed to it.** It is the single
question in the interview script most likely to get a reflexive yes.

### B3 · The interventional pages are the highest-risk copy on the site

No success rates, no case volumes, no comparative outcomes. This is already in the editorial
rules and in the Session 2 script. The risk is drift: a well-meaning draft that says "a
routine procedure with excellent results" has made an outcome claim.

**Action:** treat those two pages as a separate review pass, not part of the batch.

### B4 · Cross-border teleconsultation 🔴 unresolved

Whether he may lawfully consult a patient resident in France, Germany or the Gulf is governed
by *both* Lebanese rules and the destination country's. [Guessing] this is frequently
restricted to second opinions rather than primary care.

The page is currently written around **second opinions and report review**, which is
defensible almost everywhere. Do not widen it to "consultations" without an answer.

---

## C · Data protection

### C1 · The appointment form probably touches special-category data — ✅ BUILT

We removed the free-text symptom field, which was the right call. But the remaining payload
is still **name + phone + reason for visit**, and "second opinion" or "a test my doctor asked
for" attached to a named individual reveals that a specific person is seeking cardiology
care. Under GDPR Article 9 that is arguably health data, and the same reasoning applies
whether it sits in Supabase or an inbox.

Mitigations, cheapest first:

- **Do not persist `reason` in Supabase.** Relay it by email to the clinic and store only
  name, phone, timestamp and outcome in the log. The conversion metric does not need the
  reason; the secretary does, and she gets it in the email.
- **Host the Supabase project in an EU region** if any diaspora traffic is targeted.
- **Set a retention period** — 90 days is generous for follow-up tracking — and actually
  enforce it with a scheduled delete, not a policy document.
- **Row-level security on by default.** A misconfigured Supabase table is the most common way
  small sites leak personal data.

### C2 · The WhatsApp notification sends patient data to Meta — ✅ BUILT

Relaying a patient's name and phone number through WhatsApp makes Meta a processor of that
data. Convenient for the secretary, and a real question if GDPR applies.

**Action:** decide deliberately. The defensible version is a WhatsApp notification that says
only *"a new appointment request has arrived, check email"* — carrying no patient data at
all. That keeps the speed and removes the problem.

### C3 · Consent must gate the scripts, not just display a banner — ✅ BUILT

The common implementation error: load GA4, then show a cookie banner. Under GDPR the
non-essential scripts must not fire until consent is given.

**Action:** build it consent-first from the start. Retrofitting this is painful and it is the
kind of thing that gets noticed.

### C4 · Photography copyright is not the same as possessing the files

He has professional photographs — but the photographer usually owns the copyright unless it
was assigned in writing. Having the JPEGs is not a licence to publish them on a commercial
site.

**Action:** ask who took them and on what terms. If unclear, a short top-up shoot with a
clean licence may be cheaper than chasing a release. Any identifiable patient needs separate
written consent regardless.

> **Built (2026-10-17):** C1–C3 are implemented in `src/app/api/appointment-request/route.ts`,
> `supabase/migrations/0001_appointment_requests.sql` and `src/components/ConsentAnalytics.tsx`.
> Also fixed: with no email configured, the form used to report success while dropping the
> request. It now fails visibly and offers call and WhatsApp instead. Verified in Chromium.

---

## D · Will hurt within months

### D1 · Start Google Business Profile verification early — not in launch week

Two practitioner listings, inside two hospitals, sharing one phone number. Verification is
likely to need a video call or postal verification, may be rejected on first attempt, and can
take weeks. Distinct session hours and department-level addresses are what make the two
listings legitimate rather than duplicates.

**Action:** both hospitals have agreed to the listings, so **start as soon as the
questionnaire comes back.** Verification needs the department or floor and the session hours
for each hospital (questionnaire sections B and C) — those facts, not the site, are what it
waits on.

**Watch for a conflict with the no-photography rule.** [Likely] Google's video verification
asks you to film the signage, the room and the workspace to prove the business is really
there. That video is never published, but it is still filming inside the hospital. Two ways
through:

1. He asks whether a private verification video falls under the no-photography rule. It
   reasonably might not, since nothing is published — but ask, don't assume.
2. If it is not allowed, ask Google for **postcard or phone verification** instead, where
   offered. A postcard sent to a hospital address has to find its way through the mail room
   to him, so tell the department secretary to expect it.

Raise this before starting, not when Google asks for the video.

### D2 · The namesake problem compounds if the entity signals launch late

A former Foreign Minister of the same name owns the bare-name search results. The `Physician`
schema, both GBP listings and the `sameAs` graph are how Google separates the two. Launching
the site without them means Google forms its first impression of the entity with nothing to
disambiguate it — and first impressions in a knowledge graph are sticky.

**Action:** schema, GBP and the Vezeeta/DRAPP profiles go live *with* the site, not after.

### D3 · The form is worse than nothing if nobody answers it

A patient who submits a request and hears nothing is more damaged than one who never found
the site. This is not a technical risk — it is the secretary's workload.

**Action:** agree a response-time commitment before launch, decide who covers her leave, and
monitor it. If she cannot commit to one, remove the form and lead with call and WhatsApp only.
That would be a *better* site, not a lesser one.

### D4 · Performance budget — ✅ HEADROOM RECOVERED

Was 187 KB of 200. Now **177 KB** on the home page, with the consent banner added, after
removing next-intl's client runtime. A directions link replaces any map embed, and analytics
load only after consent. Details and the rules for keeping it that way are in
`04-technical-architecture.md`.

### D5 · Arabic quality is a trust risk, not a translation line item

A clumsy Arabic cardiology page costs more credibility than having no Arabic page. Source the
medical translator in Week 1; it is the hardest supplier here to find late.

---

## E · Get right at build time, cheap now and expensive later

| Constraint | Why now |
| --- | --- |
| **Heart model licence** | Verify commercial web use before purchase; avoid share-alike. Keep the licence file in the repo next to the asset |
| **Account ownership** | Vercel, Supabase, Resend, GBP, analytics — in *his* name with HOWF granted access, not the reverse. With no retainer, anything in HOWF's name becomes lock-in he did not ask for |
| **Who pays for renewals** | Domain, hosting, Supabase. Agree at handover or it lapses in month 14 |
| **WCAG 2.2 AA is claimed, so it must be tested** | Especially RTL focus order and the sticky contact bar. A claim you have not tested is a liability, not a feature |
| **RTL QA with real Arabic** | Not lorem ipsum. Bugs only surface with real content |
| **Canonical hospital names** | Pick one form per hospital, use it in every surface. Already centralised in `src/lib/site.ts` — keep it that way |

---

## The short version

If you only chase four things before anything else:

1. ~~Ask both hospitals for permission to use their names~~ — ✅ **agreed.** Still confirm
   whether it extends to GBP listings at their addresses and to photography on site.
2. **Establish who actually controls `drjeanobeid.com`.**
3. **Start GBP verification** — longest lead time, doesn't need the site. Gated on the
   question above.
4. **Get his written confirmation on the advertising rules**, so the compliance judgement is
   his rather than ours.
