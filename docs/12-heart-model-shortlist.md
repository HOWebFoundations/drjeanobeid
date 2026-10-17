# 12 — Heart model shortlist

Research into licensed, anatomically accurate heart models. Dated 2026-10-17. Sources at the
end. **Prices and listing details change; re-check every listing before buying.**

---

## The finding that changes the plan

**No standard marketplace licence allows the interactive 3D viewer as designed.**

Output B in `03-heart-asset.md` sends the model file (a GLB) to the visitor's browser, where
anyone can save it. All three major marketplaces forbid exactly that:

| Marketplace | What the standard licence says |
| --- | --- |
| **TurboSquid** | Models "must be contained in proprietary formats so that they cannot be opened or imported". Browser 3D is allowed only via Unity, Unreal or Lumberyard; other WebGL use needs case-by-case approval |
| **CGTrader** | Buyer must "take all commercially reasonable measures to prevent the end user from gaining access to the Product" |
| **Sketchfab Store** | May not make the model available "in a way that allows third parties to use, download, extract or access" it |

A compressed GLB is an open, standard format that any 3D tool opens. It does not meet these
terms, and obfuscating it to try to would be gaming the licence, not complying with it.

**What every one of these licences does allow** is rendering the model into images and
video. Those are "Creations" or "Incorporated Products". So Output A, the pre-rendered loop,
works with any model below. Output B does not, unless the model is openly licensed or the
licence is specially negotiated.

## Recommendation: keep the hotspots, drop the real-time 3D

The strategy already says the hotspots are the *only* reason for Output B — without them the
3D viewer is decoration. The hotspots don't need real-time 3D:

- **Hotspots on the pre-rendered asset.** Real `<button>` elements positioned over the poster
  frame, linking to the condition pages (coronaries → CAD, aorta → hypertension, and so on).
- **Optional drag-to-rotate, using images.** A 90-frame WebP sequence from the Blender
  turntable, scrubbed by dragging. It feels like rotating the heart, but it is a stack of
  images, which every licence allows. This was already an optional item in `03`.

Compared with a real-time viewer this is:

| | Real-time 3D (old Output B) | Hotspots on rendered frames |
| --- | --- | --- |
| Licence | Open or negotiated licence only | Any model on this list |
| JavaScript | React Three Fiber + drei + loader | A few KB |
| Works on phones | Desktop only, by design | Everywhere |
| Keyboard access | Needs a separate overlay | Native buttons, accessible by default |
| Anatomy | Any angle, including unreviewed ones | Only angles he has signed off |

What is lost: free orbiting at any angle and zoom. For a patient-facing cardiology site, that
loss is small.

This changes a decision HOWF made in the original plan, so it is **a recommendation, not a
change**. `03-heart-asset.md` now records the licence constraint and points here; Output B
stays as specified until HOWF decides.

---

## The routes

### Route A — Z-Anatomy (open licence) · free

| | |
| --- | --- |
| Licence | **CC BY-SA 4.0**, derived from BodyParts3D (CC BY-SA 2.1 Japan) |
| Commercial use | Yes |
| Browser 3D viewer | **Allowed** — the only route that permits it without negotiation |
| Conditions | Credit both Z-Anatomy and BodyParts3D (Database Center for Life Science). Anything we publish that is derived from the model must carry the same licence, so anyone could reuse our cleaned-up version |
| Anatomy source | BodyParts3D is built from real anatomical imaging data, not sculpted by eye |
| Format | Blender file. Z-Anatomy converted vessels to curves, which must be turned back into meshes; one release is incompatible with Blender 4.5 |
| Caveats | Less polished than commercial models, so more Blender surfacing work for a hero render. Some third-party Z-Anatomy derivatives mix in non-commercial components, so **check the licence of the heart mesh itself** in the Blender file. Coronary detail not yet confirmed |

**Choose this if** the real-time viewer matters, or the budget is zero. Expect the most
cleanup work.

### Route B — SciePro (medical specialist) · price on request

| | |
| --- | --- |
| Who | A medical 3D studio. Says the heart was built over 10 years by artists, anatomists, cardiologists and heart surgeons, with "rigorous medical review before release" |
| Detail | Valves, chordae tendineae, trabeculae, four-chamber cross-sections; over 800 textures, mostly 8K |
| Not confirmed | Coronary arteries, great vessels and pulmonary veins are not listed on the page. Ask |
| Licence | Custom. Not published. Web and real-time rights must be negotiated |
| Price | Not published. Book a demo or contact them |

**Choose this if** credibility in front of a cardiologist matters most and budget allows. Ask
for a quote that covers: website video and image-sequence use, coronary arteries included,
and (optionally) real-time web distribution.

### Route C — Marketplace model · around $0–300

From search results. **TurboSquid blocks automated page access, so these details could not
be verified directly.** Check each listing in a browser before buying.

| Listing | Search-reported details |
| --- | --- |
| [TurboSquid 573815 — "3d Model Human Heart"](https://www.turbosquid.com/3d-models/3d-model-human-heart/573815) | ~$299. Chambers, valves, outer veins. High-res preview PDF available |
| [TurboSquid 597798 — "Max Medically Circulatory"](https://www.turbosquid.com/3d-models/max-medically-circulatory/597798) | ~$299. Described by the seller as "medically and anatomically accurate"; chambers, valves, external vessels. A full circulatory system — only the heart is needed |
| [TurboSquid 800569 — "3d Human Heart"](https://www.turbosquid.com/3d-models/3d-human-heart/800569) | Free. Includes left and right coronary arteries and the great cardiac vein. No provenance |
| [TurboSquid 1760872 — "3D Human Heart Model"](https://www.turbosquid.com/3d-models/3d-human-heart-model-1760872) | Not verified |

Under the standard licence: video and image sequences are allowed, modification is allowed,
no attribution is required, but **no browser 3D viewer**.

**Choose this if** budget is modest and Output B is dropped in favour of hotspots on rendered
frames. The likeliest route.

### Excluded — and why

| Model | Why not |
| --- | --- |
| [Sketchfab — HannahNewey, University of Dundee](https://sketchfab.com/3d-models/cardiac-anatomy-external-view-of-human-heart-a3f0ea2030214a6bbaa97e7357eebd58) | Excellent: 3M triangles, accuracy confirmed by a Dundee anatomy lecturer. But **CC BY-NC-SA: non-commercial.** A private practice website is commercial use |
| [CGTrader — "Anatomical Human Heart, For Commercial Use"](https://www.cgtrader.com/3d-print-models/science/biology/anatomical-human-heart-for-commercial-use) | Despite the title, it prohibits editing without the artist's permission. Our pipeline decimates, rebakes and recolours |
| Meshy community models | "Free for commercial use", but no evidence of anatomical accuracy |
| AnatomyTOOL academic models (Dundee, Groningen, Leiden) | No per-model commercial licence stated; collection page is CC BY-NC-SA |

**But use the academic models as a reference.** The Dundee and Groningen coronary models are
university-made and anatomically verified. Open them next to whichever model is chosen during
the Blender cleanup and the doctor's review, to check vessel routing.

---

## Decision needed from HOWF, then the doctor

**HOWF decides the route** — it is a budget and architecture call:

1. Hotspots on rendered frames instead of a real-time viewer? (Recommended.)
2. Then: Route C (cheapest, likeliest), B (most credible), or A (free, permits real-time 3D,
   most work)?

**Then the doctor picks the model** within that route, from the listings' preview images,
against the checklist in `03-heart-asset.md`. Five minutes of his time.

## Sources

- [TurboSquid licence](https://blog.turbosquid.com/turbosquid-3d-model-license/)
- [CGTrader terms, Royalty Free License §21A](https://www.cgtrader.com/pages/terms-and-conditions#general-license)
- [Sketchfab licences](https://sketchfab.com/licenses)
- [Z-Anatomy — Models of human anatomy (GitHub)](https://github.com/Z-Anatomy/Models-of-human-anatomy) · [The blend (GitHub)](https://github.com/Z-Anatomy/The-blend)
- [SciePro — Heart](https://www.sciepro.com/heart)
- [Sketchfab — Cardiac anatomy, HannahNewey](https://sketchfab.com/3d-models/cardiac-anatomy-external-view-of-human-heart-a3f0ea2030214a6bbaa97e7357eebd58)
- [AnatomyTOOL — Heart collection](https://anatomytool.org/content/heart-collection-page)
- [CGTrader — Anatomical Human Heart](https://www.cgtrader.com/3d-print-models/science/biology/anatomical-human-heart-for-commercial-use)
