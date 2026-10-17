# 03 — The heart asset

## Decision

**One GLB source asset, two outputs.**

| Output | What | Who gets it |
| --- | --- | --- |
| **A** | Pre-rendered turntable video loop | Every device, including mobile |
| **B** | Interactive React Three Fiber viewer | Desktop pointer devices only, loaded after the page is interactive |

### Why not a real-time 3D hero by default

[Likely] a real-time 3D hero is the single largest threat to a site whose visitors mostly
arrive on phones over uneven Lebanese mobile networks. A hero that stalls on a weak
connection loses the patient to Vezeeta before the page paints. Pre-rendering turns the
delivery cost into a video file and freezes the anatomy at a frame we have reviewed.

### ⚠️ Licence constraint on Output B — decision pending

Research in `12-heart-model-shortlist.md` found that **TurboSquid, CGTrader and Sketchfab
Store licences all forbid sending the model file to the browser**, which is what a real-time
viewer does. They allow rendered video and images, so Output A is unaffected.

So Output B as specified is only possible with an openly licensed model (Z-Anatomy, CC BY-SA)
or a specially negotiated licence (e.g. SciePro).

**Recommended alternative:** keep the hotspots, the thing that justifies Output B, as real
buttons over the rendered poster frame, with an optional drag-to-rotate built from a 90-frame
image sequence. Every licence allows it, it works on phones as well as desktop, and it costs
a few KB instead of a 3D library. Full comparison in `12`.

**HOWF to decide** before the model is bought, since the decision determines which models are
eligible.

### What justifies the interactive version at all

The **hotspots**. Four to six, each linking into a condition page:

| Hotspot | Links to |
| --- | --- |
| Coronaries | Coronary artery disease |
| Aorta | Hypertension |
| Left ventricle | Heart failure |
| Valves | Valve disease |
| Atria | Arrhythmia and atrial fibrillation |

Without the hotspots the 3D viewer is decoration and should be cut. With them it is
navigation — an anatomically-indexed entry point into the SEO content.

---

## Sourcing: licensed model, not AI generation

[Decided] the Higgsfield credits are gone, so the AI-generation route is off the table.

**This is a net improvement, not a setback.** The entire two-failed-reviews stop rule
existed because AI-generated meshes reliably contain anatomical errors — wrong vessel
topology, distorted chamber proportions, coronaries routed through the wrong grooves — the
kind of thing a cardiologist spots in seconds on his own website. Buying a professionally
made anatomical model removes that failure mode completely. We skip generation and go
straight to cleanup and integration.

### Where to source

| Source | Licence | Note |
| --- | --- | --- |
| **TurboSquid / Sketchfab / CGTrader medical models** | Paid, royalty-free | **Recommended.** Typically modest cost. Cleanest commercial licence, best geometry. |
| Z-Anatomy | Open, attribution (check current terms) | Free and genuinely accurate, but [Likely] share-alike — verify whether that encumbers derivative renders on a commercial site. |
| NIH 3D Print Exchange | Mostly public domain, varies per model | Free. Many models are print-oriented, so topology may need more cleanup. |
| BodyParts3D / Anatomography | Attribution, share-alike | Same share-alike caution as Z-Anatomy. |

**Recommendation: buy a royalty-free medical-grade model.** The cost is trivial against the
project, the licence is unambiguous for commercial use, and it sidesteps the share-alike
question entirely. Verify before purchase that the licence permits commercial web
distribution and that the model is anatomically accurate rather than stylised — a lot of
marketplace "hearts" are decorative valentine geometry with a medical thumbnail.

### Review the shortlist *before* buying

Send Dr. Obeid three or four candidate models as the marketplace's own preview turntables
and ask him to pick. This is cheap, takes him five minutes, catches accuracy problems before
any money or Blender time is spent, and makes him a participant in the signature asset
rather than a reviewer of a fait accompli.

His checklist — the things a cardiologist will look at first:

- Aortic arch with its three branches
- Pulmonary trunk bifurcation
- Superior and inferior vena cava
- Four pulmonary veins entering the left atrium
- LAD in the anterior interventricular groove
- RCA in the right AV groove
- Circumflex artery
- Apex pointing left-anterior-inferior
- Right ventricle wrapping anteriorly

---

## Production pipeline

Runs in parallel with the design and copy weeks.

### Step 1 — Shortlist and licence check
Three or four candidates, licence terms verified for commercial web use, doctor picks one.

### Step 2 — Purchase and Blender cleanup
- Decimate to ~150k triangles
- Fix normals
- Bake textures at 2K
- Export GLB
- Compress with `gltf-transform` — meshopt or Draco, KTX2 textures
- **Target: under 3 MB total**

### Step 3 — Doctor confirmation
Annotated turntable frames of the cleaned model. This is now a **verification** step rather
than an iteration loop, and should pass first time given the model was chosen at Step 1.
If it does not, return to the shortlist rather than trying to fix anatomy in Blender.

### Step 4 — Turntable render
Blender. 8–10 seconds, 30 fps, 1080² and 720². Encode to WebM and MP4, with a WebP poster.

Optionally a 90-frame WebP sprite sequence for scroll-scrubbing — decide only after the
performance budget is measured, not before.

### Step 5 — Integration
- Muted, looping, `playsinline` video
- **The poster is the LCP image** — this is what keeps the hero fast
- Reduced-motion users get the poster only, never the video
- Desktop pointer devices swap in the R3F viewer on idle, via dynamic import

### Step 6 — Derive the line mark
Extract a simplified single-colour line mark from the model for the favicon, OG image and
brand motif. This is what makes the asset pay back beyond the hero.

---

## Acceptance criteria

- [ ] Licence verified **for the specific output**: rendered video and frames are allowed by
      most licences; a browser-delivered 3D model is not (see `12-heart-model-shortlist.md`).
      Attribution recorded if required
- [ ] Doctor sign-off on anatomy
- [ ] Loop is seamless
- [ ] Poster under 100 KB
- [ ] 3D chunk absent from the initial bundle (verify in the bundle analyser, not by eye)
- [ ] 60 fps on a mid-range laptop
- [ ] Hotspots keyboard-accessible
- [ ] Meaningful alt text, in all three locales
- [ ] Hero does not regress the LCP budget on throttled 4G
