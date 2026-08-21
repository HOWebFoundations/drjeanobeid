# 03 — The heart asset

## Decision

**One GLB source asset, two outputs.**

| Output | What | Who gets it |
| --- | --- | --- |
| **A** | Pre-rendered turntable video loop | Every device, including mobile |
| **B** | Interactive React Three Fiber viewer | Desktop pointer devices only, loaded after the page is interactive |

### Why not a real-time 3D hero by default

Two objections, both [Likely]:

1. **Performance.** A real-time 3D hero is the single largest threat to a site whose
   visitors mostly arrive on phones over uneven Lebanese mobile networks. A hero that stalls
   on a weak connection loses the patient to Vezeeta before the page paints.
2. **Anatomical accuracy.** An AI-generated mesh will contain errors a cardiologist spots in
   seconds — vessel topology, chamber proportions, coronary routing. Shipping one as the
   hero of his own site is a credibility failure in front of exactly the audience whose
   trust the site exists to earn.

Pre-rendering solves both: the anatomy is frozen at a frame we have reviewed, and the
delivery cost is a video file.

### Why not generate the rotation directly as AI video

[Likely] a generated 360° rotation drifts anatomically mid-turn and rarely loops cleanly.
Keep AI video as a fallback for a **short cinematic intro clip**, not for the hero loop.

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

## Production pipeline

Runs in parallel with Weeks 2–3 of the build. **Preflight cost before every generation job**
— and confirm the Higgsfield balance exists at all before planning around it (see Diligence).

### Step 1 — Reference stills

Generate anterior, posterior, left, and right views with the 4K image model. Neutral studio
light, plain background.

Include an **explicit anatomy checklist in the prompt**:

- Aortic arch with its three branches
- Pulmonary trunk bifurcation
- Superior and inferior vena cava
- Four pulmonary veins entering the left atrium
- LAD in the anterior interventricular groove
- RCA in the right AV groove
- Circumflex artery
- Apex pointing left-anterior-inferior
- Right ventricle wrapping anteriorly

Save the best anterior image as a **reference element** to hold consistency across the other
three views.

### Step 2 — Multi-image to 3D

Use the multi-image-to-3D route with **2–4 views**. [Certain, per the tool's own
documentation] this gives better geometric accuracy than single-image conversion. PBR
texturing on.

### Step 3 — Blender cleanup

- Decimate to ~150k triangles
- Fix normals
- Bake textures at 2K
- Export GLB
- Compress with `gltf-transform` — meshopt or Draco, KTX2 textures
- **Target: under 3 MB total**

### Step 4 — Doctor review gate

Present annotated turntable frames. He marks anatomical errors directly on the frames.

**Stop rule: if the mesh fails his review twice, stop iterating and switch to a licensed or
open anatomical model.** Two failed rounds means the generation approach is not converging,
and a third round is sunk cost against a fixed deadline.

Fallback sources ([Likely], check license terms either way):
- Z-Anatomy and the NIH 3D Print Exchange — usable heart models under attribution licenses
- TurboSquid or Sketchfab medical models — paid route

### Step 5 — Turntable render

Blender. 8–10 seconds, 30 fps, 1080² and 720². Encode to WebM and MP4, with a WebP poster.

Optionally a 90-frame WebP sprite sequence if we want scroll-scrubbing. Decide this only
after the performance budget is measured, not before.

### Step 6 — Integration

- Muted, looping, `playsinline` video
- **The poster is the LCP image** — this is what keeps the hero fast
- Reduced-motion users get the poster only, never the video
- Desktop pointer devices swap in the R3F viewer on idle, via dynamic import

---

## Acceptance criteria

- [ ] Doctor sign-off on anatomy
- [ ] Loop is seamless
- [ ] Poster under 100 KB
- [ ] 3D chunk absent from the initial bundle (verify in the bundle analyzer, not by eye)
- [ ] 60 fps on a mid-range laptop
- [ ] Hotspots keyboard-accessible
- [ ] Meaningful alt text
- [ ] Hero does not regress the LCP budget on throttled 4G
