# 06 — Diligence

## Open questions

Everything here blocks or reshapes work downstream. The Week 1 gate does not close until
the blocking items are answered.

| # | Question | Blocks | Status |
| --- | --- | --- | --- |
| 1 | **Confirm the client is Dr. Jean Obeid** and drobeid.com is the site being rebuilt | Everything (though only content inventory and redirects change if not) | Open |
| 2 | **Higgsfield access and balance** — confirm before planning around it. [Guessing] the credits being burned down ahead of the cancellation may already be gone, since that decision was taken in July | Heart pipeline Steps 1–2; may force the licensed-model fallback immediately | Open |
| 3 | Domain, DNS, hosting, and GBP access | Week 1, launch | Open |
| 4 | **Is he interventional?** | Whether angiography and angioplasty pages exist at all | Open |
| 5 | Which hospitals is he affiliated with? | About page, trust content, schema | Open |
| 6 | Which insurers does he accept? | Patient information page | Open |
| 7 | **How does the secretary actually handle appointments?** | Whether we build a form, link to a directory, or something else — and whether a booking engine is even coherent | Open |
| 8 | Photo consent process | Photoshoot | Open |
| 9 | **The Lebanese Order of Physicians advertising rules** — [Guessing] restrict superlatives, comparisons, testimonials, pricing promotions. He will know | All copy; the GBP review request process | Open — blocking |
| 10 | Retainer: yes or no? | Whether Sanity ships or MDX does; whether the engagement has recurring revenue | Open |
| 11 | **Language pair** — [Guessing] EN + AR. Confirm against his actual patient mix | i18n setup, keyword research, font pairing, launch scope | Open — blocking |
| 12 | Verify the Red Cross emergency number is **140** | Emergency notice on every medical page | Open |

## Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| **Hero performance** — a 3D or heavy hero stalls on Lebanese mobile networks and the patient goes back to Vezeeta | High if we ship real-time 3D by default | Loses the primary conversion path | Pre-rendered loop everywhere; interactive viewer desktop-only, post-load, dynamic import. Budgets enforced as pass/fail. See `03-heart-asset.md` |
| **Anatomical inaccuracy** — a generated mesh contains errors the cardiologist spots immediately | High for AI-generated geometry | Credibility failure with exactly the audience we need to convince | Explicit anatomy checklist in prompts; doctor review gate; hard stop after two failed rounds, then switch to a licensed or open model |
| **Content delay** — doctor review time is the critical path | High | Slips launch week by week | Five-day review windows agreed up front; progressive review from Week 5; batched, pre-annotated review requests |
| **Directories outrank us on head terms** for a long time | Near-certain | Only a problem if we promised otherwise | Do not promise head terms. Own branded queries and long-tail; convert directory profiles into feeders |
| **Scope creep into a booking engine** | Medium | Blows the timeline, and produces appointments the clinic may not honor | Answer question 7 first. Default position: link to the existing booking route rather than rebuild it |
| **Advertising-rules rework** — copy written before the rules are confirmed has to be rewritten | Medium | Wasted Weeks 2–3 copy effort | Question 9 is blocking. Write conservatively in the interim: no superlatives, comparisons, testimonials, or pricing |
| **GDPR exposure** via diaspora targeting | [Likely] applies | Compliance | Cookie consent layer, privacy policy, no health data in forms |

## Current state

Nothing has been generated. Nothing has been committed to production. No Higgsfield credits
have been spent. This repository contains the plan only.
