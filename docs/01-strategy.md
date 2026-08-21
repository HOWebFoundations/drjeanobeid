# 01 — Strategy

## 1. What "best" means here

The site has one job: **turn a worried person into a contact action (call, WhatsApp,
appointment request) in under 60 seconds on a phone.** Second job: make the doctor the
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
| Rankings for condition and procedure queries | In the chosen launch languages, tracked separately per locale. |

Vanity metrics we explicitly do not optimize for: total sessions, time on page, bounce rate.

## 2. Positioning and the directory problem

Lebanese cardiologist search is dominated by **Vezeeta** and **DRAPP**. [Likely] this site
will not displace them on head terms like "cardiologist Beirut" within months, and planning
as if it will is how the SEO budget gets wasted.

The play is three-part:

1. **Own the branded query completely** — the name in every spelling and transliteration
   (Latin, Arabic, French, common misspellings). This is winnable immediately and it is
   where the highest-intent traffic already is.
2. **Win the long-tail condition and procedure questions** the directories do not answer.
   Directory profiles are listings; they do not explain what an echocardiogram involves or
   when chest pain warrants a cardiologist.
3. **Turn the directory profiles into feeders.** Identical name, address, and phone across
   every profile, each linking back to the site. We do not fight the directories, we
   convert their traffic.

### Trust content does the heavy lifting

- Training timeline
- Hospital affiliations
- Procedures performed
- Society memberships
- Publications
- Languages spoken
- Real photography (see below)
- A 45–60 second intro video

### YMYL requirements

This is Your-Money-Your-Life content. Non-negotiable on every medical page:

- Author byline with credentials
- A "medically reviewed by" line with a date
- Cited sources

### Photography

Budget a **half-day professional photoshoot**: portrait, clinic, at the equipment.
[Likely] this is the second most valuable asset on the site after the copy — well ahead of
the heart. Stock photography of anonymous doctors actively damages trust on a personal
practice site.

## 3. Languages

Architect for **EN, FR and AR from day one.** It is cheap now and painful to retrofit
(routing, RTL layout, font pairing, hreflang, schema per locale). Launch with two, add the
third within 60 days.

[Guessing] the default launch pair is **EN + AR** — English for Beirut professionals and the
diaspora, Arabic for the largest local search pool. **Confirm against his actual patient mix
before committing.** If a large share of his practice is Francophone, FR displaces one of
them, and the keyword research in Week 1 changes accordingly.

## 4. Conversion layer

This is the part that earns the fee. It is deliberately boring.

### Sticky bottom bar (mobile)

Three actions, always visible, never collapsed: **Call**, **WhatsApp**, **Request
Appointment**. 44px minimum touch targets. The WhatsApp link carries a prefilled message so
the patient does not have to compose one.

### The form

| Field | Notes |
| --- | --- |
| Name | Required |
| Phone | Required |
| Preferred time | Required, coarse (morning / afternoon / specific day) |
| Reason | Dropdown, fixed options |

**No free-text symptom field.** A free-text box invites patients to type health information
into a web form, which turns a marketing site into a health-data processor. The dropdown
gives the secretary what she needs to triage without collecting anything sensitive.

### Where submissions go

Clinic email (Resend) + a WhatsApp notification, and logged in Supabase so follow-up can be
tracked and so the conversion numbers are real rather than inferred from analytics.

### What we deliberately do not build

**No real-time booking engine** unless the secretary will actually honor it. A booking
system that produces appointments nobody confirms is worse than a phone number. If the
clinic already takes bookings through a directory, **link to it rather than rebuild it.**

This is the single most likely place for scope creep. It is called out in the risk register.

### Emergency notice

On every medical page: chest pain or shortness of breath means **call the Red Cross on 140**
([Likely] the correct emergency number — **verify before launch**) rather than book online.
This is both a duty of care and a liability shield.

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

A **simplified line mark derived from the 3D asset** becomes the favicon, OG image, and
brand motif — so the heart does more than decorate the hero and the asset investment pays
back across the whole identity.

### Standards

- WCAG 2.2 AA
- RTL-ready layout from the first component, not retrofitted
- 44px touch targets
- `prefers-reduced-motion` respected (the heart is the primary case)
