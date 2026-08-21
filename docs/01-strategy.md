# 01 — Strategy

## 1. What "best" means here

The site has one job: **turn a worried person into a contact action (call, WhatsApp,
appointment request) in under 60 seconds on a phone.** Second job: make Dr. Obeid the
obvious answer when someone searches his name or a condition he treats.

Everything else — the heart, the animation, the design system — is subordinate to those two
jobs and gets cut if it threatens them.

### Who we are designing for

[Likely] the person doing the searching is often the adult child of the patient, not the
patient. Design for a 35-year-old on a phone at work, worried about a parent, on an uneven
mobile connection. Not for the doctor's peers, and not for a desktop reviewer.

### KPIs

| Metric | Why |
| --- | --- |
| Contact actions per 100 sessions | The only number that matters. Calls + WhatsApp opens + form submissions. |
| Time to first contact action | Proxy for whether the mobile path actually works. |
| Branded search volume | Whether the name is becoming the entity. |
| Rankings for condition and procedure queries | Tracked separately per locale — EN, FR and AR behave differently. |

Vanity metrics we explicitly do not optimise for: total sessions, time on page, bounce rate.

## 2. Positioning and the directory problem

Lebanese cardiologist search is dominated by **Vezeeta** and **DRAPP**. [Likely] this site
will not displace them on head terms like "cardiologist Beirut" within months, and planning
as if it will is how the SEO budget gets wasted.

The play is three-part:

1. **Own the branded query completely** — "Jean Obeid" in every spelling and
   transliteration: Latin, Arabic (جان عبيد), French, and the common misspellings
   (Obeid / Obaid / Oubeid / Abeid). This is winnable immediately and it is where the
   highest-intent traffic already is.
2. **Win the long-tail condition and procedure questions** the directories do not answer.
   Directory profiles are listings; they do not explain what an echocardiogram involves or
   when chest pain warrants a cardiologist.
3. **Turn the directory profiles into feeders.** Identical name, address, and phone across
   every profile, each linking back. We do not fight the directories, we convert their
   traffic.

### The two-location situation

He practises at **Geitaoui** and **Karantina** — two hospitals, no private clinic.
[Guessing] the formal names are Hôpital Libanais Geitaoui (CHU) in Achrafieh and the
Beirut governmental hospital at Karantina; confirm both exactly, because they go into
schema, GBP and every directory profile and must match character-for-character.

Two consequences:

**It complicates local SEO.** A practitioner inside a hospital competes for the same map
pin as the hospital itself, which already has a strong established listing. This is
workable — Google permits practitioner listings at a hospital address — but it needs
deliberate setup rather than the default "claim your clinic" flow. Details in
`04-technical-architecture.md`.

**It probably means two different patient populations.** [Likely] a private francophone
university hospital and a governmental hospital draw quite different patients in income,
language and referral route. If that holds, it is the strongest justification yet for the
three-language launch: French and Arabic are not just diaspora and local-search plays, they
map onto two real halves of his actual practice. **Confirm this in the Week 1 interview** —
it should shape tone, not just translation.

### Trust content does the heavy lifting

Training timeline, hospital affiliations, procedures performed, society memberships,
publications, languages spoken, real photography, and a 45–60 second intro video.

### YMYL requirements

This is Your-Money-Your-Life content. Non-negotiable on every medical page: an author
byline with credentials, a "medically reviewed by" line with a date, and cited sources.

### Photography

[Decided] he has existing professional photos. **Send them over and I will assess
coverage.** [Likely] there is a good portrait but nothing of the clinic settings or
equipment — that is the usual pattern — in which case a short top-up shoot fills the gaps
far more cheaply than a full half-day.

What the site needs, in priority order: a warm eye-contact portrait for the home hero
region, a working-at-the-equipment shot for credibility, an environment shot per location
so the two location pages are visually distinct, and one usable frame for the OG image.
No stock photography of anonymous doctors — it actively damages trust on a personal
practice site.

## 3. Languages

[Decided] **EN, FR and AR all launch together.**

This is the right call given two hospitals with likely different patient mixes, but be
clear about the cost: it roughly triples copy volume and translation work, and it is the
single largest reason the timeline moves from nine weeks to eleven. The build cost of the
third language is small; the *content* cost is not.

The mitigation is the review model — see `02-content-inventory.md`. We draft and fully
review in English, then translate. That keeps his review load at 14 medical pages rather
than 42.

Arabic gets specific attention: RTL layout from the first component rather than
retrofitted, an Arabic font pairing chosen alongside the Latin one, and **a human medical
translator, not machine translation.** [Likely] Arabic medical terminology is where
automated translation fails hardest and most visibly, and a clumsy Arabic page on a
cardiologist's site costs more trust than having no Arabic page at all.

## 4. Conversion layer

This is the part that earns the fee. It is deliberately boring.

### No booking engine

[Decided] the secretary takes bookings by phone and WhatsApp and books them manually.
So we do not build a booking engine. This is the single best scope decision in the project:
a booking system producing appointments nobody confirms is worse than a phone number.

### Sticky bottom bar (mobile)

Three actions, always visible, never collapsed: **Call**, **WhatsApp**, **Request
Appointment**. 44px minimum touch targets. The WhatsApp link carries a prefilled message so
the patient does not have to compose one.

**Open question — two locations, how many phone numbers?** If there is one secretary and
one number for both hospitals, the sticky bar is trivial. If each location has its own
number, "Call" becomes ambiguous and we need either a location-aware bar (the button
follows the page you are on, with a chooser on generic pages) or a single primary number
that routes. This needs answering before the contact page is designed — it is in Diligence.

### The form

| Field | Notes |
| --- | --- |
| Name | Required |
| Phone | Required |
| Preferred location | Required — Geitaoui or Karantina |
| Preferred time | Required, coarse (morning / afternoon / specific day) |
| Reason | Dropdown, fixed options |

**No free-text symptom field.** A free-text box invites patients to type health information
into a web form, turning a marketing site into a health-data processor. The dropdown gives
the secretary what she needs to triage without collecting anything sensitive.

### Where submissions go

Clinic email (Resend) + a WhatsApp notification, and logged in Supabase so follow-up can be
tracked and the conversion numbers are real rather than inferred from analytics.

### Emergency notice

On every medical page: chest pain or shortness of breath means **call the Red Cross on 140**
([Likely] correct — **verify before launch**) rather than book online. This is both a duty
of care and a liability shield.

## 5. Design system

**This is the doctor's brand, not HOWF's green and brass.**

| Element | Decision |
| --- | --- |
| Base | Deep navy or charcoal |
| Surfaces | Warm off-white |
| Accent | One arterial red, reserved for the heart and primary buttons only |
| Headings | Humanist serif |
| Body | Neutral sans |
| Arabic pairing | e.g. IBM Plex Sans Arabic |

Motion stays restrained everywhere except the heart. A single moving element reads as
craft; several read as a template.

A **simplified line mark derived from the heart asset** becomes the favicon, OG image and
brand motif — so the heart does more than decorate the hero and the asset investment pays
back across the whole identity.

### Standards

- WCAG 2.2 AA
- RTL-ready layout from the first component, not retrofitted
- 44px touch targets
- `prefers-reduced-motion` respected (the heart is the primary case)
