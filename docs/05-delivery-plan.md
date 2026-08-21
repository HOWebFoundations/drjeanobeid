# 05 — Delivery plan

**Eleven weeks to launch.** Nine was the single-pair estimate; three languages at launch adds
roughly two weeks, almost entirely in copy, translation and review rather than build.

Every gate carries an agreed **five-business-day doctor review window**, agreed in writing
before Week 1 closes.

## Week 1 — Discovery

- **Send `09-client-questionnaire.md` three days before Session 1.** Facts collected in
  writing are interview minutes saved, and interview minutes are the scarcest resource here
- Doctor interview, Session 1 (`08-discovery-interview.md`)
- Access: domain, DNS, hosting, Google Business Profile (both locations), analytics
- Directory audit: Vezeeta, DRAPP, both hospital staff pages, any others
- Keyword map in **all three languages**
- Confirm exact legal names, addresses, hours and phone routing for Geitaoui and Karantina
- Collect and assess his existing professional photography
- Heart model shortlist sent for his pick
- **Source the Arabic medical translator now**, not in Week 8. [Likely] the hardest supplier
  in the project to find at short notice, and Weeks 8–9 depend entirely on having one
- Establish which locale leads for each hospital's audience — input to the transcreation brief

**Gate: scope signed, remaining Diligence questions closed.**

## Weeks 2–4 — Design and English copy

- Information architecture
- Doctor interview, Session 2 — the medicine
- **English copy drafts, all 16 medical pages.** Session 2 covers the first visit, four
  anchor conditions and both interventional procedures live; the remaining five conditions
  come from the written follow-up template
- Design system + four key screens: home, condition, location, contact
- Photography gap assessment → book a top-up shoot if needed
- Heart model purchased, Blender cleanup, doctor confirmation

An extra week versus the original plan, because English copy is now on the critical path for
two downstream translations rather than being drafted alongside them.

## Weeks 5–7 — Build and medical review

- All templates
- i18n scaffolding with all three locales and RTL
- Forms, schema (including two-location `MedicalClinic`), analytics
- Heart video integrated
- **Medical pages go to Dr. Obeid progressively, from Week 5** — not batched into one block
- Desktop 3D viewer built last, as the most cuttable item

## Weeks 8–9 — Transcreation

Not straight translation. The two hospitals serve different patient populations, so FR and
AR are tuned for their audiences within a fixed clinical frame — see the boundary table in
`02-content-inventory.md`.

- **Write the audience brief first**, before a single page goes out. Audience, reading level,
  emphasis per locale, and the explicit rule that clinical content is fixed. This brief is
  what protects the schedule; without it the substance-drift check becomes a rewrite.
- Approved English pages → FR and AR transcreation
- **Human medical translator for Arabic**, not machine translation
- Terminology **and substance-drift** check on both — has any clinical claim changed?
- FR spot-check by Dr. Obeid
- RTL layout QA with real Arabic content, not lorem ipsum — this is where RTL bugs surface

[Likely] this is the phase most at risk of overrunning, because transcreation is slower than
translation and the drift check can send pages back. The audience brief and a clear fixed-
content rule are the mitigations. If it slips, the honest fallback is to launch EN and FR and
follow with AR two to three weeks later — not to skip the drift check.

## Week 10 — QA

- Full content load across all three locales
- Accessibility pass
- Performance pass against the budgets in `04-technical-architecture.md`
- Cross-device QA on iPhone and the Android tablet
- Every locale checked on a real device, Arabic included
- Root-locale routing verified: bare domain serves EN without redirecting, `hreflang`
  self-references and `x-default` present, `dir` correct per locale

## Week 11 — Launch and handover

- DNS cut over
- Sitemap submitted, Search Console verified per locale
- **Both GBP listings** built out and pointed at the site, with distinct session hours and
  department-level addresses (they share a phone number, so hours do the differentiating —
  allow time for a possible manual verification)
- Directory profiles updated with matching NAP
- Monitoring on
- **Handover pack** — see below

---

## The critical path

[Likely] **the doctor's review time is where this slips.** Not the build, not the heart, not
the copy drafting — the waiting.

Mitigations now in place:

- **Review substance once, in English.** 16 full reviews instead of 48. This is the single
  biggest schedule saver in the plan.
- Five-business-day review windows per gate, agreed up front
- Medical pages sent progressively from Week 5, never as one Week-10 block
- Review requests batched and pre-annotated, so reviewing is marking rather than composing
- Heart model chosen from a shortlist at Week 1, so the asset review is a five-minute
  confirmation rather than an iteration loop

## Handover

[Decided] no retainer. So the project ends with a genuine handover, not a soft dependency:

- Repo access, deployment documented, environment variables listed
- **How to edit content**: MDX structure explained, one worked example per content type
- **How to read the analytics**: saved GA4 report, event naming, what each number means
- Both GBP listings transferred to his ownership
- Photography and heart asset source files, with licence terms recorded
- A short "what to do next" note: what would be worth doing in six months, and what will
  quietly decay if nobody touches it

The last item matters. Without a retainer, the honest thing is to tell him which parts of
the site are durable (the 42 evergreen medical pages, the schema, the GBP listings) and
which are not (anything dated, the articles section, directory NAP consistency if he changes
hospitals or numbers).
