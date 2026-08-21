# 07 — Independent verification

Desk research run against public sources to close Diligence items without spending the
doctor's time. Dated 2026-08-21. Everything here is from public web sources, not from the
client, and is tagged accordingly.

> **Tooling note.** The Ahrefs connector is authenticated but the account's plan does not
> include API access — every endpoint, including the free domain-rating one, returns
> `Insufficient plan`. Semrush is connected but unauthorised and cannot be authorised from a
> non-interactive session. **The Week 1 keyword map therefore has no volume data behind it
> yet.** Either upgrade the Ahrefs plan to one with API units, authorise Semrush via
> claude.ai connector settings, or pull the numbers manually from the Ahrefs/Semrush web UI.

---

## 1. Emergency number — CONFIRMED

[Certain] **140 is correct** for the Lebanese Red Cross ambulance service. Toll-free,
nationwide, 24/7, from landline or mobile. Confirmed against the Lebanese Red Cross's own
site and corroborated by UNHCR Lebanon's emergency guidance.

Other Lebanese emergency numbers, worth having in the copy deck: Civil Defence **125**,
Fire **175**, Police **112**.

**Diligence item 27 closed.** The emergency notice can be written as specified.

## 2. Hospital identities — LIKELY RESOLVED, needs his confirmation

| | Geitaoui | Karantina |
| --- | --- | --- |
| Name in use | Hôpital Libanais Geitaoui – CHU | Governmental Hospital of Beirut Quarantine |
| MOPH register | Listed as "Jeatawi Hospital" | Listed as "Governmental Hospital Of Beirut Quarantine" |
| Also known as | Lebanese Hospital Geitaoui | Beirut Governmental University Hospital – Karantina; Karentina Hospital |
| District | Achrafieh, Geitaoui Street | Karantina – Moudawar |
| Main line | +961 1 590000 | 01-442105 / 442108 / 442110 |
| Ownership | Private, university hospital | Public |

**The naming inconsistency is itself a finding.** Each hospital appears under three or four
different names across the Ministry of Public Health register, its own site, and the
directories. Since NAP consistency is what makes the two GBP listings work, **we must pick
one canonical form per hospital and use it everywhere** — site, schema, both GBP listings,
every directory. Recommend using the MOPH-registered name as the canonical form, since that
is the authoritative Lebanese register, with the common name as an `alternateName` in schema.

[Guessing] still unresolved: which department, floor or suite he sits in at each. That is
the detail that keeps the GBP pins out of the hospitals' own listings, and only he can
supply it. **Diligence items 18 and 19 remain open.**

## 3. He may be interventional after all — CONTRADICTION → **RESOLVED: he is**

> **Update.** The client has confirmed **he is interventional**. The public sources were
> right and the earlier answer was wrong. Angiography and angioplasty pages are back in the
> content inventory. The remaining precision — diagnostic angiography only, or PCI and
> stenting too, and in which cath lab — is a Session 2 interview question.
> The analysis below is kept as the record of how it surfaced.

You told me **not interventional, clinical and diagnostic only**, and I dropped the
angiography and angioplasty pages on that basis.

Public sources disagree:

- His **LinkedIn headline reads "interventional cardiologist at Lebanese Hospital."**
  Supporting detail on that profile — Assistant Professor of Cardiology at the Lebanese
  University Faculty of Medical Sciences, syndicate member since 2009, practises in Beirut
  hospitals and a private clinic — matches the Geitaoui listing closely enough that [Likely]
  it is the same person.
- **Hôpital Libanais Geitaoui's own doctor directory** lists him simply as "Jean Obeid MD,
  Cardiology", with no subspecialty either way. It neither confirms nor refutes.

**This needs resolving before any content is written**, and it is not a small distinction:

- If he is interventional, we are dropping two of his highest-intent, highest-value service
  pages, and the site understates his practice.
- If he is not, his own LinkedIn misrepresents him, which is worth him knowing regardless —
  and under the conservative advertising stance, an inaccurate public claim of scope is
  exactly the kind of thing that draws attention.

Possible reconciliation: he trained and previously practised interventionally but no longer
does, and LinkedIn is stale. That is common and would make both sources true at different
times. **Ask him directly.** Until answered, the content inventory stays non-interventional
as instructed, and this is now the top open item.

## 4. The branded-search premise is weaker than assumed — IMPORTANT

Strategy point 1 was "own the branded query completely." That needs qualifying.

[Certain] **"Jean Obeid" is the name of a prominent Lebanese politician** — lawyer,
journalist, MP for Chouf and Tripoli, Minister of State, Minister of Education, and
**Foreign Minister of Lebanon 2003–2004**. He ran for president in 2008 and 2014, won a
parliamentary seat in 2018, and died of COVID-19 in February 2021. He has an English
Wikipedia article and extensive news coverage including obituaries.

That is a permanent, high-authority entity occupying the bare name. We will not outrank
Wikipedia and a former foreign minister's obituary coverage on "Jean Obeid", and we should
not plan to.

[Certain] there is also **Dr Mounir Obeid**, a heart surgeon at AUBMC — so there is name
collision inside cardiology in Beirut as well.

### What this changes

Not the strategy's direction, but its targets. Rewrite the branded-query goal as
**qualified** branded search:

| Target these | Not these |
| --- | --- |
| "Dr Jean Obeid cardiologist" | "Jean Obeid" |
| "Dr Jean Obeid Geitaoui" | "Obeid Beirut" |
| "Docteur Jean Obeid cardiologue" | |
| "دكتور جان عبيد طبيب قلب" | |
| "Jean Obeid heart doctor Beirut" | |

And three concrete consequences:

1. **Use a consistently distinguishing name form everywhere** — "Dr Jean Obeid, Cardiologist"
   rather than bare "Jean Obeid", in the site title, schema `name`, GBP, and every directory.
   Consider whether he uses a middle initial; one directory lists him as **Jean Habib
   Obeid**, which would disambiguate strongly if he is willing to use it publicly.
2. **The repo name is the right instinct** — `drjeanobeid`. A domain carrying "dr" or
   "cardiology" disambiguates where a bare-name domain would compete with the politician.
   This should inform the answer to Diligence item 17.
3. **`Physician` schema, both GBP listings and `sameAs` links now matter more, not less.**
   They are the mechanism by which Google separates this entity from the politician. This
   moves entity markup from hygiene to core strategy.

## 5. He appears to have no directory profiles — PLAN CHANGE

I could find **no Vezeeta or DRAPP profile for him.** His only substantive public presence
appears to be LinkedIn and the Geitaoui staff listing. One low-quality directory
(indexoflebanon) lists a "Dr Jean Habib Obeid" in cardiology with a phone number and an
affiliation to **Haddad / Sœurs du Rosaire Hospital** — a third hospital neither of us has
mentioned. [Guessing] that is either stale, a different person, or an affiliation he did not
think to mention. Worth one question.

This inverts part of the plan. "Turn the directory profiles into feeders" assumed profiles
exist to align. **They mostly do not, so they have to be created**, which is a different and
slightly larger task: claim or create Vezeeta and DRAPP profiles, populate them with the
canonical NAP, and link them back.

Silver lining, and a genuine positive finding: **Vezeeta lists only around 11 cardiologists
in Beirut and roughly 19–21 in all of Lebanon.** That is a thin index. The directories
dominate head terms through domain authority, not through depth or quality of content —
which is precisely the weakness the long-tail condition and test pages are built to exploit.
The original read that they cannot be displaced on head terms holds; the read that they own
the space is too pessimistic.

## 6. Advertising rules — partially checked, stance unchanged

The Lebanese Code of Medical Ethics dates from 1946 and was last updated in 2012. It is
administered by the Lebanese Order of Physicians, whose stated mission includes enforcing
the ethics and dignity of medical practice and disciplining members accordingly. Lebanese
advertising law separately notes that professional bodies govern and in most cases prohibit
advertising that misrepresents professionals.

I could not retrieve the specific article text governing physician self-promotion from a
primary source in this pass. So the position is unchanged and still correct: [Decided]
**write to the strictest plausible reading** — no superlatives, comparisons, testimonials,
pricing promotions, or review solicitation. Nothing found suggests that stance is too
cautious, and the cost of it remains near zero.

---

## Revised open items

| Priority | Item |
| --- | --- |
| **Top** | **Is he interventional?** Public sources say yes, you said no. Resolve before copy |
| High | Department / floor / suite at each hospital, for the GBP pins |
| High | Session hours per hospital — the only differentiator between two listings sharing a phone |
| High | The domain. Prefer one containing "dr" or "cardiology" for entity disambiguation |
| High | Source the Arabic medical translator |
| Medium | Is he affiliated with Haddad / Sœurs du Rosaire Hospital as one directory claims? |
| Medium | Will he publish as "Jean Habib Obeid" or add a middle initial, to disambiguate? |
| Medium | Cross-border teleconsultation legality; teleconsultation fee presentation |
| Medium | Accepted insurers; existing photography; memberships and publications |
| Blocked | Keyword volumes — needs an Ahrefs plan with API access, or Semrush authorised |

## Sources

- [Lebanese Red Cross](https://www.redcross.org.lb/get-in-touch/) · [UNHCR Lebanon emergency guidance](https://help.unhcr.org/lebanon/en/emergency/)
- [MOPH register — Jeatawi Hospital](https://moph.gov.lb/en/HealthFacilities/view/3/188/81857/?facility_type=8) · [Hôpital Libanais Geitaoui](https://www.hopital-libanais.com/contact)
- [MOPH register — Governmental Hospital of Beirut Quarantine](https://www.moph.gov.lb/en/HealthFacilities/view/3/188/73032/governmental-hospital-of-beirut-quarantine/?facility_type=1)
- [Geitaoui staff listing — Jean Obeid MD](https://www.hopital-libanais.com/doctor-detail/jean-obeid-md) · [LinkedIn](https://www.linkedin.com/in/jean-obeid-6bba5a14a/)
- [Jean Obeid, politician — Wikipedia](https://en.wikipedia.org/wiki/Jean_Obeid)
- [Vezeeta — cardiologists in Beirut](https://www.vezeeta.com/en-lb/doctor/cardiology-and-vascular-disease/beirut) · [Vezeeta — cardiologists in Lebanon](https://www.vezeeta.com/en-lb/doctor/cardiology-and-vascular-disease/lebanon)
- [indexoflebanon — Dr Jean Habib Obeid](https://www.indexoflebanon.com/doctors-in-lebanon/beirut-lebanon-doctors-jean-habib-obeid.php)
- [Lebanese Order of Physicians](https://en.wikipedia.org/wiki/Lebanese_Order_of_Physicians) · [Advertising Law in Lebanon, Sader 2013](http://data.infopro.com.lb/file/Advertising%20Laws-Sader-2013.pdf)
