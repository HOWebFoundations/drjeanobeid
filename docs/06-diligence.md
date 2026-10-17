# 06 — Diligence

## Resolved

| # | Question | Answer |
| --- | --- | --- |
| 1 | Client identity | **Dr. Jean Obeid, cardiologist** |
| 2 | Practice locations | **Geitaoui and Karantina hospitals.** No private clinic |
| 3 | Higgsfield access | **Credits gone / cancelled** → licensed or purchased anatomical model instead |
| 4 | Interventional? | **Yes** — confirmed, correcting an earlier answer. Angiography and angioplasty pages restored. 16 medical pages |
| 5 | Appointment handling | **Phone and WhatsApp, secretary books manually** → no booking engine |
| 6 | Languages | **EN + FR + AR, all three at launch** |
| 7 | Source language | **English.** Full medical review in EN, then translate |
| 8 | Review model | **Review substance once, then translate** — 16 full reviews, not 48 |
| 9 | Advertising rules | **Write conservatively, don't ask.** Strictest reading; no review solicitation |
| 10 | Retainer | **No** → MDX only, no Sanity, articles front-loaded, real handover |
| 11 | Existing site | **Domain owned, no real site** → no redirect work |
| 12 | Photography | **Existing professional photos** → assess coverage. No shooting inside either hospital; any top-up is off site |
| 13 | Phone routing | **One secretary, one number for both hospitals** → simple sticky bar; hours differentiate the GBP listings |
| 14 | Root locale | **English at root**, `/fr` and `/ar`, `x-default` on the root |
| 15 | Teleconsultation | **Yes** — diaspora and remote patients. Page stays, GDPR confirmed |
| 16 | Patient mix | **Genuinely different between the two hospitals** → transcreation per locale, clinical substance fixed |
| 33 | Hospital permission | **Agreed verbally by both** (2026-10-17): locations on the site ✅, GBP listings at both addresses ✅, photography on premises ❌. One-line written confirmation from Karantina to be on file before launch |

## Closed by independent verification

See `07-verification.md` for sources.

| # | Item | Result |
| --- | --- | --- |
| 27 | Red Cross emergency number | [Certain] **140 confirmed.** Also Civil Defence 125, Fire 175, Police 112 |
| 18a | Hospital identities | Both located in the MOPH register. **Canonical name must be chosen per hospital** — each appears under three or four variants across MOPH, its own site, and directories |
| — | Directory audit | [Certain] **no Vezeeta or DRAPP profile exists.** They must be created, not aligned — see strategy doc |
| — | Competitive depth | [Certain] Vezeeta lists ~11 cardiologists in Beirut, ~19–21 in Lebanon. Thin index; they win on authority, not content |
| — | Branded search | [Certain] **a former Lebanese foreign minister shares his name.** Bare-name queries are unwinnable; target qualified branded queries instead |

## Still open

| # | Question | Blocks | Priority |
| --- | --- | --- | --- |
| 28 | **Exactly which interventional procedures, and where?** Diagnostic angiography only, or PCI and stenting too? Which cath lab, at which hospital? | The two procedure pages' accuracy and scope | **High — Session 2** |
| 29 | **Department, floor or suite** at each hospital | Keeps the two GBP pins out of the hospitals' own listings | High |
| 30 | Is he affiliated with **Haddad / Sœurs du Rosaire Hospital**, as one directory claims? | A possible third location, or a stale listing to correct | Medium |
| 31 | Will he publish as **"Jean Habib Obeid"** or with a middle initial? | Strong, free disambiguation from the politician | Medium |
| 32 | **Keyword volumes** — Ahrefs plan lacks API access | The Week 1 keyword map has no data behind it | **Semrush authorisation in progress.** Pull volumes once it lands |
| 17 | ~~What is the domain?~~ | **Closed: `drjeanobeid.com`** | ✅ |
| 18 | **Exact legal names and addresses** of both hospitals, including department/floor | Schema, both GBP listings, every directory profile. Must match character-for-character | High |
| 19 | **Session hours at each location** | With a shared phone number, hours are the only thing distinguishing the two GBP listings. Also the location pages' main differentiator | High |
| 20 | **Cross-border teleconsultation legality** — can he consult patients resident in the EU and Gulf, or second opinions only? | How the teleconsultation page describes the service. Write it as second-opinion/report-review until confirmed | High — before that page goes live |
| 21 | **How are teleconsultation fees handled?** Stated on-site, or quoted by the secretary? | Whether the page mentions cost at all. Default: omit, secretary quotes | Medium |
| 22 | **Who does the Arabic transcreation?** Needs a medical translator, not a general one | Weeks 8–9. Source this early — [Likely] the hardest supplier to find at short notice | High — source in Week 1 |
| 23 | **Accepted insurers** | Patient information page | Medium |
| 24 | **Send the existing photos** for coverage assessment | Whether a top-up shoot is needed, and design decisions depending on image availability | Medium |
| 25 | **Which locale leads for each hospital's audience?** Informs the transcreation brief | Weeks 8–9 audience brief | Medium — from Week 1 interview |
| 26 | Society memberships, publications, training timeline | About page | Comes from Week 1 interview |


> **See also `10-pre-launch-constraints.md`**, which covers constraints this register did
> not reach: hospital permission to use their names, domain control, GBP verification lead
> time, photography copyright, and the Article 9 exposure in the appointment form.

## Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| **Doctor review time** — still the critical path, now across three locales | High | Slips launch week by week | Review substance once in EN only; progressive delivery from Week 5; five-day windows agreed up front; pre-annotated review requests |
| **Arabic translation quality** — clumsy medical Arabic costs more trust than no Arabic | Medium | Damages credibility with the audience the AR pages exist for | Human medical translator, never machine translation. RTL QA with real content in Week 9 |
| **Two GBP listings absorbed into the hospital entities** | Medium | Loses the local map presence entirely at both locations | Harder now: they share a phone number, so distinct session hours and department-level addresses carry the whole differentiation burden. Expect manual verification |
| **Transcreation overruns Weeks 8–9** — slower than translation, and the drift check can send pages back | Medium | Pushes launch past eleven weeks | Write the audience brief before any page goes out; fixed-clinical-content rule stated explicitly. Fallback: launch EN + FR, follow with AR in 2–3 weeks — never skip the drift check |
| **Clinical substance drifts during transcreation**, so the doctor's English sign-off no longer covers what is published | Medium | Liability, not just quality | The boundary table in `02-content-inventory.md`; a substance-drift check as a named step, done by a medical translator |
| **Cross-border teleconsultation restrictions** discovered late | Medium | The page has to be rewritten or pulled near launch | Write it as second-opinion and report-review until question 20 is answered |
| **Hero performance** on uneven Lebanese mobile networks | Low now | Would lose the primary conversion path | Pre-rendered loop everywhere; interactive viewer desktop-only, post-load, dynamic import; budgets enforced as pass/fail |
| **Anatomical inaccuracy** | Low now | Credibility failure | Largely resolved: licensed medical-grade model, chosen by him from a shortlist before purchase |
| **Directories outrank us on head terms** | Near-certain | Only a problem if we promised otherwise | Do not promise head terms. Own *qualified* branded queries and the 42 evergreen long-tail pages. Mitigated by verification: their index is thin, ~19–21 cardiologists nationally |
| **Namesake collision with a former foreign minister** | [Certain] present | Bare-name branded search is unwinnable; entity confusion in Google's knowledge graph | Distinguishing name form everywhere; a "dr"/"cardiology" domain; `Physician` schema and `sameAs` treated as core strategy, not hygiene |
| **Outcome claims creep into the interventional pages** | Medium | Regulatory exposure he carries personally, under the conservative stance | No success rates, case volumes, or comparative results. Describe the procedure and who it is for. Flagged in the Session 2 script and in the editorial rules |
| **No directory profiles to convert** | [Certain] | The feeder strategy has nothing to feed from at launch | Create Vezeeta and DRAPP profiles during the build, with canonical NAP, live before launch |
| **Site decays after handover** with no retainer | High over 12+ months | Gradual ranking and accuracy loss | Front-load durable content; honest handover note on what decays; analytics readable without us |
| **GDPR exposure** via diaspora targeting | [Likely] applies | Compliance | Cookie consent, privacy policy in all three locales, no health data in forms |
| **JS budget breached by analytics, maps or 3D** | High — 187 KB of 200 KB already used with none of them added | The mobile conversion path is the whole product; a slow hero loses the patient to Vezeeta | Static map image not an embed; GA4 deferred or dropped for Vercel Analytics; 3D stays dynamically imported and desktop-gated. Re-measure with `npm run analyze` before each lands |

## Current state

Nothing has been generated. Nothing has been committed to production. No credits or licences
have been purchased. This repository contains the plan only.
