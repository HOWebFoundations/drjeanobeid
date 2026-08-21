'use client';

/**
 * Output B — the interactive heart.
 *
 * NOT YET IMPLEMENTED, deliberately. React Three Fiber and drei are not
 * installed, because there is no GLB to render: the model is sourced and
 * licensed in Week 1 (docs/03-heart-asset.md), and installing a 3D stack
 * before we have geometry is weight with nothing behind it.
 *
 * What goes here when the asset lands:
 *   - <Canvas> with the compressed GLB (meshopt/Draco, KTX2, under 3 MB)
 *   - drag-to-rotate, damped
 *   - 4–6 hotspots linking into the condition pages:
 *       coronaries    → /conditions/coronary-artery-disease
 *       aorta         → /conditions/hypertension
 *       left ventricle→ /conditions/heart-failure
 *       valves        → /conditions/valve-disease
 *       atria         → /conditions/atrial-fibrillation
 *
 * The hotspots are the whole justification for this component. Without them it
 * is decoration and should be cut. They must be keyboard-accessible: real
 * <button> elements in an overlay, not raycast-only targets, so the anatomical
 * navigation works without a mouse.
 */
export function HeartViewer() {
  return null;
}
