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
| Review model | **Review substance once, then translate** | 16 medical pages fully reviewed, not 48 |
| Interventional? | **Yes** — confirmed, correcting an earlier answer | Angiography + angioplasty pages in. 16 medical pages, not 14 |
| Booking | Phone + WhatsApp, secretary books manually | **No booking engine.** Sticky bar + lightweight request form |
| Phone | **One secretary, one number for both hospitals** | Sticky bar is unambiguous everywhere; distinct hours differentiate the two GBP listings |
| Root locale | **English at root**, `/fr` and `/ar` | `x-default` points at the root |
| Teleconsultation | **Yes** — diaspora and remote patients | Page stays; GDPR clearly applies |
| Editorial voice | **Tuned per locale**, substance identical | Transcreation, not translation. Review model preserved |
| Heart asset | Higgsfield dead → **licensed/purchased anatomical model** | AI-generation risk removed entirely |
| Heart format | **Rotating video only** — no interactive 3D | Any model licence works; no 3D code |
| CMS | **No retainer → MDX only** | No Sanity. Articles front-loaded, not dripped |
| Advertising rules | **Write conservatively, don't ask** | Strictest reading: no superlatives, testimonials, comparisons, pricing |
| Existing site | Domain owned, no real site | **No redirect work** |
| Domain | **drjeanobeid.com** | Disambiguates from the politician of the same name |
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
| [`docs/08-discovery-interview.md`](docs/08-discovery-interview.md) | Scripts for the two 60-minute sessions with Dr. Obeid |
| [`docs/09-client-questionnaire.md`](docs/09-client-questionnaire.md) | Self-serve form for the facts that don't need a conversation |
| [`docs/10-pre-launch-constraints.md`](docs/10-pre-launch-constraints.md) | What can stop the launch or cause real harm — read before building further |
| [`docs/11-written-followup-template.md`](docs/11-written-followup-template.md) | The template he fills in after Session 2 for the five conditions not covered live |
| [`docs/12-heart-model-shortlist.md`](docs/12-heart-model-shortlist.md) | Licensed heart models to choose from for the rotating video |

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
The interview scripts in `08` and `09` are built to close the remaining open items in one
sitting. Keyword volumes stay blocked until Semrush is authorised.

See [`docs/07-verification.md`](docs/07-verification.md) for what independent checking
confirmed and what it overturned. Two premises changed: the branded-search play needs
qualifying because a former Lebanese foreign minister shares his name, and he has no
directory profiles to convert, so they have to be created rather than aligned.

---

## Design

**Key screens (phone):** https://claude.ai/artifact/VMX39Nq7GsiwDpkcsG5voJ — home, condition
(coronary artery disease), location (Geitaoui) and contact, built on the site's own tokens.
Private until shared from its Share menu. Bracketed text marks facts still to come from the
questionnaire and interviews.

## Hosting

**Live (pre-launch): https://drjeanobeid.vercel.app** — Vercel, team HOWF. The repository is
connected, so every push deploys automatically.

**Pre-launch, the site is deliberately invisible to search engines.** Every page sends
`noindex` until `ALLOW_INDEXING=true` is set in Vercel's environment variables. Set it only at
launch, when content is signed off and `drjeanobeid.com` points at Vercel — then redeploy.

## Running the site

```bash
npm install
cp .env.example .env.local   # fill in once the clinic's real details exist
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

### What is built

A working Next.js 16 scaffold — **structure and plumbing, not content**. It builds green
and prerenders 49 pages across the three locales.

| Area | State |
| --- | --- |
| Routing | EN at root, `/fr`, `/ar`. Language from the URL only — no detection, no cookie. Root serves 200 with no redirect, for every browser language |
| RTL | `dir="rtl"` on Arabic, set per locale at layout level. Logical CSS properties throughout |
| hreflang | All three locales plus `x-default`, with self-referencing canonicals |
| Design system | Tokens in `src/app/globals.css`. Arterial red reserved for the heart and primary actions |
| Entity facts | `src/lib/site.ts` — single source of truth for NAP. Import it; never duplicate it |
| Schema | `Physician` + two `MedicalClinic`, `MedicalCondition`, `MedicalProcedure`, `FAQPage`, `BreadcrumbList` |
| Heart hero | Rotating video loop with the poster as the first thing to paint. No interactive 3D, by decision |
| Content | MDX at `content/{locale}/{collection}/{slug}.mdx`, one worked example per collection |
| Forms | Closed-set validation, honeypot, no free-text field. Email via Resend; reason emailed, never stored; Supabase log of name/phone/status with 90-day purge; WhatsApp alert carries no patient data. **Fails visibly if unconfigured** |
| Consent | Analytics load only after consent; no banner at all if analytics are off. Accept and Decline weighted equally |
| Locations | Directions link to the patient's own maps app. Optional static map image. No embed |

### What is deliberately not built

- **Credentials.** Form delivery is implemented but needs the clinic's real email, a
  verified sending domain in Resend, and optionally Supabase and WhatsApp. Until then the
  form tells patients to call or WhatsApp, rather than pretending to send. See `.env.example`.
- **Content.** The two `.mdx` files are structural scaffolds carrying no medical claims.
  Real copy comes from the interviews in `docs/08` and needs Dr. Obeid's sign-off.

### Performance budget

**177 KB gzipped initial JS on the home page, against a 200 KB budget.** About 155 KB is React
and Next.js. The rules that keep it under budget are in `docs/04-technical-architecture.md`,
the main one being: **never call `useTranslations` in a client component** — pass translated
strings as props. Run `npm run analyze` before adding analytics or maps.
