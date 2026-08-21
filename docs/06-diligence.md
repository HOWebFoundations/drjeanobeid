# 06 — Diligence

## Resolved

| # | Question | Answer |
| --- | --- | --- |
| 1 | Client identity | **Dr. Jean Obeid, cardiologist** |
| 2 | Practice locations | **Geitaoui and Karantina hospitals.** No private clinic |
| 3 | Higgsfield access | **Credits gone / cancelled** → licensed or purchased anatomical model instead |
| 4 | Interventional? | **No** — clinical and diagnostic only. Angiography/angioplasty dropped |
| 5 | Appointment handling | **Phone and WhatsApp, secretary books manually** → no booking engine |
| 6 | Languages | **EN + FR + AR, all three at launch** |
| 7 | Source language | **English.** Full medical review in EN, then translate |
| 8 | Review model | **Review substance once, then translate** — 14 full reviews, not 42 |
| 9 | Advertising rules | **Write conservatively, don't ask.** Strictest reading; no review solicitation |
| 10 | Retainer | **No** → MDX only, no Sanity, articles front-loaded, real handover |
| 11 | Existing site | **Domain owned, no real site** → no redirect work |
| 12 | Photography | **Existing professional photos** → assess coverage, top-up shoot if gaps |
| 13 | Phone routing | **One secretary, one number for both hospitals** → simple sticky bar; hours differentiate the GBP listings |
| 14 | Root locale | **English at root**, `/fr` and `/ar`, `x-default` on the root |
| 15 | Teleconsultation | **Yes** — diaspora and remote patients. Page stays, GDPR confirmed |
| 16 | Patient mix | **Genuinely different between the two hospitals** → transcreation per locale, clinical substance fixed |

## Still open

| # | Question | Blocks | Priority |
| --- | --- | --- | --- |
| 17 | **What is the domain?** He owns one — which is it, and is there any history worth checking? | DNS, hosting setup, launch. Also whether a better name-based domain is worth registering | High |
| 18 | **Exact legal names and addresses** of both hospitals, including department/floor | Schema, both GBP listings, every directory profile. Must match character-for-character | High |
| 19 | **Session hours at each location** | With a shared phone number, hours are the only thing distinguishing the two GBP listings. Also the location pages' main differentiator | High |
| 20 | **Cross-border teleconsultation legality** — can he consult patients resident in the EU and Gulf, or second opinions only? | How the teleconsultation page describes the service. Write it as second-opinion/report-review until confirmed | High — before that page goes live |
| 21 | **How are teleconsultation fees handled?** Stated on-site, or quoted by the secretary? | Whether the page mentions cost at all. Default: omit, secretary quotes | Medium |
| 22 | **Who does the Arabic transcreation?** Needs a medical translator, not a general one | Weeks 8–9. Source this early — [Likely] the hardest supplier to find at short notice | High — source in Week 1 |
| 23 | **Accepted insurers** | Patient information page | Medium |
| 24 | **Send the existing photos** for coverage assessment | Whether a top-up shoot is needed, and design decisions depending on image availability | Medium |
| 25 | **Which locale leads for each hospital's audience?** Informs the transcreation brief | Weeks 8–9 audience brief | Medium — from Week 1 interview |
| 26 | Society memberships, publications, training timeline | About page | Comes from Week 1 interview |
| 27 | **Verify the Red Cross emergency number is 140** | Emergency notice on every medical page | Before launch |

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
| **Directories outrank us on head terms** | Near-certain | Only a problem if we promised otherwise | Do not promise head terms. Own branded queries and the 42 evergreen long-tail pages; convert directory profiles into feeders |
| **Site decays after handover** with no retainer | High over 12+ months | Gradual ranking and accuracy loss | Front-load durable content; honest handover note on what decays; analytics readable without us |
| **GDPR exposure** via diaspora targeting | [Likely] applies | Compliance | Cookie consent, privacy policy in all three locales, no health data in forms |

## Current state

Nothing has been generated. Nothing has been committed to production. No credits or licences
have been purchased. This repository contains the plan only.
