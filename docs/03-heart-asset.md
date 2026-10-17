# 03 — The heart asset

## Decision

**One rotating video of the heart, on the home page, for every device.** [Decided 2026-10-17]

There is no interactive or spin-it-yourself 3D version. It was in the original plan as a
desktop extra; it has been dropped. That also removes the only licensing complication: every
model licence we checked allows rendered video (`12-heart-model-shortlist.md`).

### Why a video rather than live 3D

[Likely] live 3D is the single largest threat to a site whose visitors mostly arrive on
phones over uneven Lebanese mobile networks. A hero that stalls on a weak connection loses the
patient to Vezeeta before the page paints. A pre-rendered video costs a video file, and it
freezes the anatomy at frames the doctor has reviewed.

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

### Step 1 — Shortlist
Three or four candidates (see `12`); the doctor picks one. Any standard licence covers video.

### Step 2 — Purchase and Blender cleanup
- Decimate to ~150k triangles
- Fix normals
- Bake textures at 2K
- Set up the lighting and camera for the turntable

### Step 3 — Doctor confirmation
Annotated turntable frames of the cleaned model. This is now a **verification** step rather
than an iteration loop, and should pass first time given the model was chosen at Step 1.
If it does not, return to the shortlist rather than trying to fix anatomy in Blender.

### Step 4 — Turntable render
Blender. 8–10 seconds, 30 fps, 1080² and 720². Encode to WebM and MP4, with a WebP poster.

### Step 5 — Integration
- Muted, looping, `playsinline` video
- **The poster is the LCP image** — this is what keeps the hero fast
- Reduced-motion users get the poster only, never the video

### Step 6 — Derive the line mark
Extract a simplified single-colour line mark from the model for the favicon, OG image and
brand motif. This is what makes the asset pay back beyond the hero.

---

## Acceptance criteria

- [ ] Licence covers website video (standard on every marketplace checked); attribution
      recorded if required
- [ ] Doctor sign-off on anatomy
- [ ] Loop is seamless
- [ ] Poster under 100 KB
- [ ] Meaningful alt text, in all three locales
- [ ] Hero does not regress the LCP budget on throttled 4G
