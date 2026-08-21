'use client';

import { useEffect, useState, type ComponentType } from 'react';

/**
 * Output B gate.
 *
 * Loads the interactive viewer ONLY when all of these hold:
 *   - a fine pointer (desktop, not touch)
 *   - the user has not asked for reduced motion
 *   - the browser is idle, so it never competes with the LCP
 *
 * The dynamic import is what keeps the 3D chunk out of the initial bundle —
 * an acceptance criterion, verified in the bundle analyser rather than by eye.
 */
export function HeartViewerLoader() {
  const [Viewer, setViewer] = useState<ComponentType | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const load = () => {
      import('./HeartViewer').then((m) => setViewer(() => m.HeartViewer));
    };

    // Idle if the browser supports it, a timeout otherwise. Either way the
    // import never competes with the LCP.
    const idle = typeof window.requestIdleCallback === 'function';
    const id = idle
      ? window.requestIdleCallback(load, { timeout: 3000 })
      : window.setTimeout(load, 2000);

    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  if (!Viewer) return null;
  return <Viewer />;
}
