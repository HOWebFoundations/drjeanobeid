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

But they are thinner than assumed. [Certain] Vezeeta lists only around **11 cardiologists in
Beirut and roughly 19–21 in all of Lebanon** — they dominate through domain authority, not
depth or quality of content. That is exactly the weakness the long-tail condition and test
pages exist to exploit. Cannot beat them on head terms; can comprehensively out-answer them
on everything else.

The play is three-part:

1. **Own the *qualified* branded query.** Not the bare name — see the namesake problem
   below. Target "Dr Jean Obeid cardiologist", "Dr Jean Obeid Geitaoui", "Docteur Jean Obeid
   cardiologue", "دكتور جان عبيد طبيب قلب", across the common misspellings
   (Obeid / Obaid / Oubeid / Abeid). Still winnable, still the highest-intent traffic, but a
   narrower target than originally scoped.
2. **Win the long-tail condition and procedure questions** the directories do not answer.
   Directory profiles are listings; they do not explain what an echocardiogram involves or
   when chest pain warrants a cardiologist.
3. **Create the directory profiles, then turn them into feeders.** Verification found
   [Certain] **no Vezeeta or DRAPP profile for him at all** — his only real public presence
   is LinkedIn and the Geitaoui staff listing. So this is a build task, not an alignment
   task: create the profiles, populate them with the canonical NAP, link them back. Larger
   than planned, and it has to happen before launch so the entity signals are consistent
   from day one.

### The namesake problem

[Certain] **"Jean Obeid" was a prominent Lebanese politician** — MP, Minister of Education,
and Foreign Minister of Lebanon 2003–2004, a presidential candidate in 2008 and 2014, who
died in February 2021. He has a Wikipedia article and extensive obituary coverage. There is
also **Dr Mounir Obeid**, a heart surgeon at AUBMC.

We will not outrank a former foreign minister's Wikipedia entry on the bare name, and
planning to is how the branded-search budget gets wasted. Three consequences:

- **Use a distinguishing name form everywhere.** "Dr Jean Obeid, Cardiologist" — never bare
  "Jean Obeid" — in the site title, schema `name`, both GBP listings, and every directory.
  One directory lists him as **Jean Habib Obeid**; if he is willing to publish under a middle
  name or initial, that disambiguates strongly and costs nothing.
- [Decided] **the domain is `drjeanobeid.com`** — carries the "dr" disambiguator and the
  full first name people actually search. Matches the repository name.
- **Entity markup moves from hygiene to core strategy.** `Physician` schema, both GBP
  listings and the `sameAs` graph are the mechanism by which Google separates him from the
  politician. This is now one of the highest-leverage technical items on the project.

Full detail and sources in `07-verification.md`.

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

**It means two different patient populations.** [Decided] confirmed — a private francophone
university hospital and a governmental hospital draw genuinely different patients in income,
language and referral route. This is the strongest justification for the three-language
launch: French and Arabic are not just diaspora and local-search plays, they map onto two
real halves of his actual practice.

The editorial consequence is significant and is handled in `02-content-inventory.md`: the
locales are **tuned, not merely translated**. Tone, reading level, examples and emphasis
adapt to the audience. Medical substance does not — that stays identical across all three
and is reviewed once. Keeping that boundary sharp is what preserves the eleven-week
timeline.

### Interventional practice is the differentiator

[Decided] he is interventional. This is a stronger position than the earlier read assumed.

A general cardiologist competes with every other name on Vezeeta's short list. A cardiologist
who performs coronary angiography and angioplasty answers a different, higher-intent
question — and the procedure queries behind it are commercially weighted, poorly served by
the directories, and directly connected to the coronary artery disease page.

The coronary artery disease page, the angiography page and the angioplasty page should be
built as a deliberate cluster with strong internal linking. That cluster is the highest-value
real estate on the site.

Constraint: under the conservative advertising stance, no outcome claims, no success rates,
no case volumes, no comparisons. Describe the procedure and who it is for — nothing about
how well he does it.

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

[Decided] **no photography inside either hospital** — the hospitals' agreement covers the
locations and the map listings, not filming on their premises.

What the site needs, in priority order: a warm eye-contact portrait for the home hero
region, and one usable frame for the OG image. A working-at-the-equipment shot would help
but is only possible from existing files or off site. The two location pages are told apart
by their session hours, department and access notes rather than interior photos — which is
what a patient trying to find the room needs anyway.
No stock photography of anonymous doctors — it actively damages trust on a personal
practice site.

## 3. Languages

[Decided] **EN, FR and AR all launch together, English at the root.**

Routing is `/` for English, `/fr` and `/ar` for the others, with `x-default` pointing at the
root. English is already the drafting language and the neutral default for diaspora and
international traffic; hreflang resolves the right locale for everyone else regardless of
which one sits at the root.

This is the right call given two hospitals with likely different patient mixes, but be
clear about the cost: it roughly triples copy volume and translation work, and it is the
single largest reason the timeline moves from nine weeks to eleven. The build cost of the
third language is small; the *content* cost is not.

The mitigation is the review model — see `02-content-inventory.md`. We draft and fully
review in English, then translate. That keeps his review load at 16 medical pages rather
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

[Decided] **one secretary, one number for both hospitals.** This is the best case: the
Call button is unambiguous on every page, there is one WhatsApp thread, and the form's
location field is a preference she reads rather than a routing decision the site has to
make. No location-aware bar, no chooser, no phone-tree logic.

One knock-on effect, in `04-technical-architecture.md`: two Google Business Profile
listings sharing a phone number are harder to keep distinct, so **session hours become the
primary differentiator** between them and must be accurate.

### The form

| Field | Notes |
| --- | --- |
| Name | Required |
| Phone | Required |
| Preferred location | Required — Geitaoui, Karantina, or teleconsultation |
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
