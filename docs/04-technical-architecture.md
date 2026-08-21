# 04 — Technical architecture

## Stack

| Layer | Choice | Note |
| --- | --- | --- |
| Framework | Next.js App Router, TypeScript | |
| Styling | Tailwind | |
| Hosting | Vercel | |
| i18n | `next-intl` | Locales, RTL, hreflang |
| Content | MDX for v1 | Sanity from day one **only if a content retainer is signed** |
| 3D | React Three Fiber + drei | Desktop only, dynamic import |
| Forms | Route handler → Resend + Supabase | |
| Analytics | GA4, Search Console, Vercel Speed Insights | |

### On the CMS

A CMS nobody writes into is pure overhead — a second system to maintain, a second place for
content to drift out of sync, and a migration cost with no offsetting benefit. MDX is
correct for v1. Sanity becomes correct the moment someone is contractually obliged to
publish two articles a month.

## Performance budgets

These are budgets, not aspirations. A build that exceeds them does not ship.

| Metric | Budget |
| --- | --- |
| LCP | < 2.5 s on throttled 4G |
| INP | < 200 ms |
| CLS | < 0.1 |
| Initial JavaScript | < 200 KB gzipped |

Supporting decisions:
- AVIF/WebP through `next/image`
- Self-hosted fonts with size-adjusted fallbacks
- The heart's poster image is the LCP element (see `03-heart-asset.md`)

## SEO, local, and AI visibility

### Structured data

| Schema | Where |
| --- | --- |
| `Physician` + `MedicalClinic` | Site-wide. NAP, hours, geo, `sameAs` links to the directory profiles |
| `MedicalCondition` | Each condition page |
| `MedicalProcedure` | Each test/procedure page |
| `FAQPage` | Any page with an FAQ block |
| `BreadcrumbList` | All pages |

The `sameAs` links to Vezeeta and DRAPP profiles are how we tell search engines the
directory listings and this site are the same entity — which is what converts directory
authority into branded-query dominance.

### Local

- Google Business Profile claimed and fully built out
- A **compliance-checked** review request process (gated on the advertising rules — see
  Diligence; testimonials may be restricted)

### Internationalization

One URL per locale, with hreflang and canonicals. XML sitemap. A **301 map from every
current drobeid.com URL** — inventory these in Week 1, before anything is redesigned.

### AI answer engines

- Answer-first opening paragraphs
- FAQ blocks
- Clean server-rendered HTML
- **No medical text trapped inside the 3D canvas**
- Identical entity facts across the site, GBP, and directories

## Compliance and privacy

### Medical advertising

[Guessing] the Lebanese Order of Physicians restricts promotional medical advertising —
plausibly including superlatives, comparisons, testimonials, and pricing promotions.

**Get the doctor to confirm the current rules before a word of copy is written.** He will
know them, and he carries the professional consequence of getting them wrong. This is a
blocking question, not a nice-to-have.

### Data

- **No health data collected through forms** (this is why the symptom field is a dropdown)
- Privacy policy
- Cookie consent layer — [Likely] GDPR applies because we target diaspora in France
- Medical disclaimer
- Written consent for any photo showing a patient

## Post-launch measurement

- Events on every call, WhatsApp, and form action — the KPI in `01-strategy.md` is
  unmeasurable without these, so they ship with the launch, not after
- One-page monthly report
- Quarterly technical audit
