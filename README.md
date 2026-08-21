# drjeanobeid.com — cardiology practice site

Strategy and delivery repository. **No application code has been written yet.** This repo
currently holds the plan, the content inventory, the asset pipeline, and the open questions
that gate the build.

## The one-line strategy

Turn a worried person into a contact action — call, WhatsApp, or appointment request — in
under 60 seconds on a phone, and make the doctor the obvious answer when someone searches
his name or a condition he treats.

The 3D heart is the signature of the site, not its strategy. His face, his credentials, and
a one-tap path to his secretary are what bring patients. If the build starts optimizing for
the heart, it is optimizing for the wrong thing.

## Documents

| Doc | What it covers |
| --- | --- |
| [`docs/01-strategy.md`](docs/01-strategy.md) | Goals, KPIs, positioning against the directories, languages, conversion layer, design system |
| [`docs/02-content-inventory.md`](docs/02-content-inventory.md) | Sitemap, per-page briefs, editorial and medical-review rules |
| [`docs/03-heart-asset.md`](docs/03-heart-asset.md) | One GLB, two outputs — production pipeline and acceptance criteria |
| [`docs/04-technical-architecture.md`](docs/04-technical-architecture.md) | Stack, performance budgets, SEO and structured data, compliance and privacy |
| [`docs/05-delivery-plan.md`](docs/05-delivery-plan.md) | Nine-week plan, gates, review windows, post-launch retainer |
| [`docs/06-diligence.md`](docs/06-diligence.md) | Open questions blocking the build, and the risk register |

## Confidence tagging

Claims in these documents carry an explicit confidence tag. Preserve the tags when editing —
they are the difference between a decision we can act on and one we need to verify.

- **[Certain]** — verified against a primary source, cited inline.
- **[Likely]** — standard practice applied to this case; safe to plan around, cheap to be wrong about.
- **[Guessing]** — unverified. Must be confirmed before any work depends on it. Every
  `[Guessing]` item also appears in [`docs/06-diligence.md`](docs/06-diligence.md).

## Working assumption

The client is Dr. Jean Obeid and drobeid.com is being rebuilt. **This is not yet confirmed**
(see Diligence). If it turns out to be a different cardiologist, only the content inventory
and the redirect steps change — the architecture, conversion layer, and asset pipeline hold.

## Status

Pre-discovery. Nothing is committed to production, no assets have been generated, no
Higgsfield credits have been spent. The next action is the Week 1 discovery interview and
closing the open questions in `docs/06-diligence.md`.
