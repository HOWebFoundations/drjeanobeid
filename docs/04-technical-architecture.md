# 04 — Technical architecture

## Stack

| Layer | Choice | Note |
| --- | --- | --- |
| Framework | Next.js App Router, TypeScript | |
| Styling | Tailwind | |
| Hosting | Vercel | |
| i18n | `next-intl` | EN at root, `/fr`, `/ar`. RTL, hreflang |
| Content | **MDX only** | [Decided] no retainer, so no CMS |
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

### Measured — initial JS per page

| Date | Home | Contact | Location | Note |
| --- | --- | --- | --- | --- |
| 2026-08-21 | 187 KB | — | — | First scaffold |
| 2026-10-17 | **177 KB** | 179 KB | 182 KB | Consent banner added; client i18n runtime removed |

Gzipped, measured against a production build. Budget: 200 KB.

About 155 KB of that is React and the Next.js runtime, which cannot be removed. Of the rest,
the biggest controllable item was **next-intl's client provider**: it ships the ICU message
formatter (~14 KB) to every page, and every next-intl `Link` needs that provider, even when
rendered from a server component. Nothing on this site translates in the browser, so:

- Strings are translated on the server and passed to client components as props.
- Links resolve their locale prefix on the server (`src/components/LocaleLink.tsx`) and render
  a plain `next/link`.
- `NextIntlClientProvider` is removed. **Do not add `useTranslations` to a client component**;
  doing so needs the provider back and costs the 14 KB again. Pass strings as props instead.

What the remaining ~23 KB can go on, and what it can't:

1. **Map:** a directions link opening the patient's own maps app is built. An optional
   static image at `public/maps/{slug}.webp` costs a few KB. Never embed Google Maps.
2. **Analytics:** GA4 loads only after consent, with `lazyOnload`, so it does not count
   against the initial bundle. Leaving `NEXT_PUBLIC_GA_ID` unset ships no analytics and no
   cookie banner at all.

Re-measure before each of these lands.

### Language comes from the URL only

`localeDetection: false` and `localeCookie: false` in `src/i18n/routing.ts`. `/` is English,
`/fr` French, `/ar` Arabic, with no Accept-Language sniffing and no cookie.

With detection on, a visitor whose browser is set to French could never reach the English
site: clicking "EN" lands on `/`, they're detected as French, and get redirected back to
`/fr`. The library's own links hide this by setting a cookie; removing them exposed it.
URL-only is also better for SEO (one URL, one language), sets no cookie, and keeps the root a
200 with no redirect for every visitor. Search visitors reach the right language via hreflang.

Verified in Chromium as a phone user with a French browser: `/` stays English, switching
EN → AR → EN works, links keep their prefix, no runtime errors.

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
- **The reason for the visit is emailed, never stored.** The Supabase log keeps name, phone,
  timestamp and status only (`supabase/migrations/0001_appointment_requests.sql`), with RLS on,
  no public policies, and a 90-day purge via `pg_cron`. EU region
- **The WhatsApp alert is a no-parameter template**, so it cannot carry patient data
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
