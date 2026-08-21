# drjeanobeid — cardiology practice site

Strategy and delivery repository for **Dr. Jean Obeid**, cardiologist, practising at
**Geitaoui** and **Karantina** hospitals in Beirut.

**No application code has been written yet.** This repo holds the plan, the content
inventory, the asset pipeline, and the remaining open questions.

## The one-line strategy

Turn a worried person into a contact action — call, WhatsApp, or appointment request — in
under 60 seconds on a phone, and make Dr. Obeid the obvious answer when someone searches
his name or a condition he treats.

The 3D heart is the signature of the site, not its strategy. His face, his credentials, and
a one-tap path to his secretary are what bring patients. If the build starts optimising for
the heart, it is optimising for the wrong thing.

## Decisions locked

| Decision | Answer | Consequence |
| --- | --- | --- |
| Client | Dr. Jean Obeid, cardiologist | Confirmed |
| Locations | Geitaoui + Karantina hospitals, no private clinic | Two location pages, two GBP listings, practitioner-inside-hospital setup |
| Languages | **EN + FR + AR, all three at launch** | Timeline 9 → 11 weeks; RTL from the first component |
| Source language | Draft in **English** | Full medical review in EN, then translate |
| Review model | **Review substance once, then translate** | 14 medical pages fully reviewed, not 42 |
| Interventional? | **No** — clinical and diagnostic only | Angiography/angioplasty pages dropped |
| Booking | Phone + WhatsApp, secretary books manually | **No booking engine.** Sticky bar + lightweight request form |
| Phone | **One secretary, one number for both hospitals** | Sticky bar is unambiguous everywhere; distinct hours differentiate the two GBP listings |
| Root locale | **English at root**, `/fr` and `/ar` | `x-default` points at the root |
| Teleconsultation | **Yes** — diaspora and remote patients | Page stays; GDPR clearly applies |
| Editorial voice | **Tuned per locale**, substance identical | Transcreation, not translation. Review model preserved |
| Heart asset | Higgsfield dead → **licensed/purchased anatomical model** | AI-generation risk removed entirely |
| CMS | **No retainer → MDX only** | No Sanity. Articles front-loaded, not dripped |
| Advertising rules | **Write conservatively, don't ask** | Strictest reading: no superlatives, testimonials, comparisons, pricing |
| Existing site | Domain owned, no real site | **No redirect work** |
| Photography | Existing professional photos | Assess coverage, top-up shoot if gaps |

## Documents

| Doc | What it covers |
| --- | --- |
| [`docs/01-strategy.md`](docs/01-strategy.md) | Goals, KPIs, directory positioning, the two-location problem, conversion layer, design system |
| [`docs/02-content-inventory.md`](docs/02-content-inventory.md) | Sitemap, page templates, the translation and review workflow, editorial rules |
| [`docs/03-heart-asset.md`](docs/03-heart-asset.md) | Model sourcing, licensing, Blender pipeline, acceptance criteria |
| [`docs/04-technical-architecture.md`](docs/04-technical-architecture.md) | Stack, perf budgets, multi-location schema, GBP, compliance |
| [`docs/05-delivery-plan.md`](docs/05-delivery-plan.md) | Eleven weeks, gates, review windows, handover |
| [`docs/06-diligence.md`](docs/06-diligence.md) | Resolved decisions and remaining open questions |
| [`docs/07-verification.md`](docs/07-verification.md) | Desk research against public sources — what checked out, what did not |

## Confidence tagging

Claims carry an explicit confidence tag. Preserve them when editing — they are the
difference between a decision we can act on and one we still need to verify.

- **[Certain]** — verified against a primary source, cited inline.
- **[Decided]** — a client decision, recorded. Not a fact about the world, but binding.
- **[Likely]** — standard practice applied to this case; safe to plan around.
- **[Guessing]** — unverified. Must be confirmed before work depends on it. Every
  `[Guessing]` item also appears in [`docs/06-diligence.md`](docs/06-diligence.md).

## Status

Pre-discovery, but most of the scope is now settled. The next action is the Week 1
interview and closing the short list of remaining questions in `docs/06-diligence.md` —
principally **whether he is interventional** — public sources contradict what we were told —
plus the domain name, the department-level detail at each hospital, and the session hours.

See [`docs/07-verification.md`](docs/07-verification.md) for what independent checking
confirmed and what it overturned. Two premises changed: the branded-search play needs
qualifying because a former Lebanese foreign minister shares his name, and he has no
directory profiles to convert, so they have to be created rather than aligned.
