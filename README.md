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
| Routing | EN at root, `/fr`, `/ar`. Verified: root serves 200 with no redirect |
| RTL | `dir="rtl"` on Arabic, set per locale at layout level. Logical CSS properties throughout |
| hreflang | All three locales plus `x-default`, with self-referencing canonicals |
| Design system | Tokens in `src/app/globals.css`. Arterial red reserved for the heart and primary actions |
| Entity facts | `src/lib/site.ts` — single source of truth for NAP. Import it; never duplicate it |
| Schema | `Physician` + two `MedicalClinic`, `MedicalCondition`, `MedicalProcedure`, `FAQPage`, `BreadcrumbList` |
| Heart hero | Poster-as-LCP video loop; interactive viewer behind a pointer + reduced-motion + idle gate |
| Content | MDX at `content/{locale}/{collection}/{slug}.mdx`, one worked example per collection |
| Forms | Closed-set validation, no free-text symptom field. Delivery deliberately unwired |

### What is deliberately not built

- **The 3D viewer.** `src/components/heart/HeartViewer.tsx` returns `null` and React Three
  Fiber is not installed. There is no GLB to render until the model is sourced in Week 1,
  and installing a 3D stack before there is geometry is weight with nothing behind it. The
  dynamic-import boundary around it is real and working.
- **Form delivery.** Resend, Supabase and the WhatsApp notification are stubbed. Wiring them
  to placeholder credentials would produce a form that silently drops patient requests —
  worse than one that is visibly not live yet.
- **Content.** The two `.mdx` files are structural scaffolds carrying no medical claims.
  Real copy comes from the interviews in `docs/08` and needs Dr. Obeid's sign-off.

### ⚠️ Performance budget is already tight

Measured on the home page: **187 KB gzipped initial JS against a 200 KB budget.**

That is with no 3D library, no analytics, no map embed, and almost no content. Those three
additions will breach it. Before any of them ships, run `npm run analyze` and decide what
comes out — the budget is pass/fail, not aspirational, because the whole mobile conversion
path depends on it.
