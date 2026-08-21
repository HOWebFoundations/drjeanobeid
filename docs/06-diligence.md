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

## Still open

| # | Question | Blocks | Priority |
| --- | --- | --- | --- |
| 13 | **What is the domain?** He owns one — which is it, and is there any history worth checking? | DNS, hosting setup, launch. Also whether a better name-based domain is worth registering | High |
| 14 | **Phone routing across two locations.** One secretary and one number, or a number per hospital? | The mobile sticky bar, the contact page, both GBP listings, the form's location field | High — blocks contact page design |
| 15 | **Exact legal names and addresses** of both hospitals, including department/floor | Schema, both GBP listings, every directory profile. Must match character-for-character | High |
| 16 | **Session hours at each location** | Two GBP listings need distinct hours to be legitimate rather than duplicate | High |
| 17 | **Accepted insurers** | Patient information page | Medium |
| 18 | **Is the patient mix genuinely different between the two hospitals?** [Likely] yes — private francophone vs governmental | Tone and emphasis per locale; whether FR and AR are equal-weight or one leads | Medium — shapes copy, not architecture |
| 19 | **Send the existing photos** for coverage assessment | Whether a top-up shoot is needed, and design decisions that depend on image availability | Medium |
| 20 | Society memberships, publications, training timeline | About page | Comes from Week 1 interview |
| 21 | **Verify the Red Cross emergency number is 140** | Emergency notice on every medical page | Before launch |

## Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| **Doctor review time** — still the critical path, now across three locales | High | Slips launch week by week | Review substance once in EN only; progressive delivery from Week 5; five-day windows agreed up front; pre-annotated review requests |
| **Arabic translation quality** — clumsy medical Arabic costs more trust than no Arabic | Medium | Damages credibility with the audience the AR pages exist for | Human medical translator, never machine translation. RTL QA with real content in Week 9 |
| **Two GBP listings absorbed into the hospital entities** | Medium | Loses the local map presence entirely at both locations | Distinct hours per listing, department-level addresses, reachable phone per location. Depends on question 14 |
| **Hero performance** on uneven Lebanese mobile networks | Low now | Would lose the primary conversion path | Pre-rendered loop everywhere; interactive viewer desktop-only, post-load, dynamic import; budgets enforced as pass/fail |
| **Anatomical inaccuracy** | Low now | Credibility failure | Largely resolved: licensed medical-grade model, chosen by him from a shortlist before purchase |
| **Directories outrank us on head terms** | Near-certain | Only a problem if we promised otherwise | Do not promise head terms. Own branded queries and the 42 evergreen long-tail pages; convert directory profiles into feeders |
| **Site decays after handover** with no retainer | High over 12+ months | Gradual ranking and accuracy loss | Front-load durable content; honest handover note on what decays; analytics readable without us |
| **GDPR exposure** via diaspora targeting | [Likely] applies | Compliance | Cookie consent, privacy policy in all three locales, no health data in forms |

## Current state

Nothing has been generated. Nothing has been committed to production. No credits or licences
have been purchased. This repository contains the plan only.
