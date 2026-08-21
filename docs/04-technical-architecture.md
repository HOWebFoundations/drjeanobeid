# 04 — Technical architecture

## Stack

| Layer | Choice | Note |
| --- | --- | --- |
| Framework | Next.js App Router, TypeScript | |
| Styling | Tailwind | |
| Hosting | Vercel | |
| i18n | `next-intl` | EN at root, `/fr`, `/ar`. RTL, hreflang |
| Content | **MDX only** | [Decided] no retainer, so no CMS |
| 3D | React Three Fiber + drei | Desktop only, dynamic import |
| Forms | Route handler → Resend + Supabase | |
| Analytics | GA4, Search Console, Vercel Speed Insights | |

### On the CMS

[Decided] no content retainer, so **no Sanity.** A CMS nobody writes into is pure overhead:
a second system to maintain, a second place for content to drift out of sync across three
locales, and a migration cost with no offsetting benefit. MDX, handed over clean.

Build it so a later Sanity migration is a contained job rather than a rewrite — keep content
strictly separated from presentation, one file per page per locale, frontmatter carrying all
the structured fields (byline, review date, schema inputs). That costs a little discipline
now and preserves the option at no ongoing cost.

## Internationalisation

[Decided] **English at the root**, French and Arabic under prefixes:

```
/                  EN   (x-default)
/fr/...            FR
/ar/...            AR   (dir="rtl")
```

`next-intl` with the default locale unprefixed. The bare domain serves English rather than
redirecting, which keeps the branded-search landing experience clean — someone searching
"Dr Jean Obeid" lands on a real page, not a 302.

Two things this makes non-obvious and worth getting right: the root route still needs an
explicit `hreflang` set including a self-reference and `x-default`, and the `dir` attribute
has to be set per-locale at the layout level rather than assumed from a default.

The things that are cheap now and expensive later:

- **RTL from the first component.** Logical properties (`margin-inline-start`, not
  `margin-left`), direction-aware icons, mirrored layout primitives. Retrofitting RTL into
  a finished Latin-only design system is a rebuild, not a patch.
- **Font pairing chosen as a set** — Latin serif, Latin sans, and the Arabic face selected
  together so the three locales feel like one site.
- **One URL per locale**, hreflang and canonicals across all three.
- **Per-locale schema and metadata**, not translated-once-and-shared.

[Decided] no existing site, so **no redirect map and no URL inventory** — one of the few
places the three-language decision buys back time.

## Performance budgets

Budgets, not aspirations. A build that exceeds them does not ship.

| Metric | Budget |
| --- | --- |
| LCP | < 2.5 s on throttled 4G |
| INP | < 200 ms |
| CLS | < 0.1 |
| Initial JavaScript | < 200 KB gzipped |

Supporting decisions: AVIF/WebP through `next/image`; self-hosted fonts with size-adjusted
fallbacks (three scripts, so subset aggressively); the heart's poster image is the LCP
element.

### Measured, 2026-08-21 — the JS budget is already tight

The scaffold's home page ships **187 KB gzipped initial JS against the 200 KB budget**, with
no 3D library, no analytics, no map embed and almost no content. Roughly 13 KB of headroom
for three things that will each cost more than that.

This is a finding, not a footnote. Options, in the order I would take them:

1. **Map** — do not embed Google Maps. A static map image linking out to directions costs a
   few KB instead of several hundred, and patients tap through to their own maps app anyway.
2. **Analytics** — GA4 is the heaviest of the three. Consider Vercel Analytics alone, or
   load GA4 after interaction rather than on load.
3. **3D viewer** — already behind a dynamic import and desktop-gated, so it does not count
   against the mobile initial bundle. Keep it that way; the moment it is statically imported
   anywhere the budget is gone.

Re-measure with `npm run analyze` before each of these lands.

## SEO, local, and the two-location problem

### Structured data

| Schema | Where |
| --- | --- |
| `Physician` | Site-wide, with **two `MedicalClinic` locations** |
| `MedicalClinic` × 2 | Geitaoui and Karantina — separate NAP, hours, geo on each location page |
| `MedicalCondition` | Each of the 9 condition pages |
| `MedicalProcedure` | Each of the 5 test pages |
| `FAQPage` | Any page with an FAQ block |
| `BreadcrumbList` | All pages |

`sameAs` links to the Vezeeta and DRAPP profiles tell search engines the directory listings
and this site are the same entity — which is how directory authority converts into
branded-query dominance.

### Google Business Profile — practitioner inside a hospital

Both locations sit inside hospitals that already have strong established listings. This is
the awkward case, and worth getting right rather than defaulting to the "claim your clinic"
flow.

What it needs:

- **A practitioner listing per location.** Google permits a public-facing practitioner to
  have their own listing at a hospital address, distinct from the hospital's. Two locations
  means two listings.
- **Distinct hours per listing** — this is what makes two practitioner listings legitimate
  rather than duplicates. His Geitaoui sessions and his Karantina sessions must be recorded
  separately and accurately.
- **One shared phone number across both listings.** [Decided] there is one secretary and
  one number. This is right for patients and slightly awkward for Google: a shared number is
  a weaker distinctness signal between two listings at two hospital addresses. It is not
  disqualifying, but it means **distinct session hours and department-level addresses carry
  the whole burden of differentiation**, so both must be accurate rather than approximate.
  Expect the listings to need more careful verification than usual, and do not be surprised
  by a manual review.
- **Suite / department / floor detail** in each address so the pin is not simply absorbed
  into the hospital entity.
- **No review solicitation campaign.** [Decided] under the conservative advertising stance,
  soliciting patient reviews is off the table. Spontaneous reviews are fine; we will not
  build a process to generate them.

### AI answer engines

Answer-first opening paragraphs; FAQ blocks; clean server-rendered HTML; **no medical text
trapped inside the 3D canvas**; identical entity facts across the site, both GBP listings
and every directory profile.

## Compliance and privacy

### Medical advertising

[Decided] **write to the strictest plausible reading of the Lebanese Order of Physicians
rules without asking.** No superlatives, no comparisons, no testimonials, no pricing
promotions, no review solicitation. The full rule set lives in `02-content-inventory.md`.

This is a defensible position: it costs almost nothing, because credentials and clear
patient education persuade better than superlatives anyway, and it removes a category of
regulatory risk that he — not us — would carry.

### Data

- **No health data collected through forms** (this is why the symptom field is a dropdown)
- Privacy policy, in all three locales
- Cookie consent layer — GDPR applies. [Decided] teleconsultation is confirmed and
  explicitly targets diaspora patients, so this is no longer a hedge
- Medical disclaimer
- Written consent for any photo showing a patient

### Teleconsultation — two unresolved questions

[Decided] he offers teleconsultation to diaspora and remote patients, which is good for the
site and raises two things the build should not get ahead of:

1. **Cross-border practice.** Whether consulting a patient physically resident in France,
   Germany or the Gulf is permissible under Lebanese rules and under the destination
   country's rules. [Guessing] this varies by country and is often restricted to second
   opinions rather than primary care. He or his professional body should confirm before the
   page describes the service concretely. Until then, write the page around **second
   opinions and report review** rather than diagnosis and treatment.
2. **Fees.** The conservative advertising stance rules out pricing *promotions*. Stating a
   consultation fee plainly is arguably not a promotion, but it sits close enough to the line
   that the safe default is to omit fees from the site and have the secretary quote them.

Neither blocks the build. Both should be settled before that page goes live.

## Post-launch measurement

- Events on every call, WhatsApp and form action, **segmented by location** — the KPI in
  `01-strategy.md` is unmeasurable without these, so they ship with launch, not after
- Search Console verified per locale
- [Decided] no retainer, so no monthly reporting commitment. **Set the analytics up so he
  or a future agency can read it without us** — clean event naming, a saved GA4 report, and
  a short written handover of what each number means.
