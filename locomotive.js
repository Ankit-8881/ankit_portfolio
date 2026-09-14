// Locomotive Scroll v5 adds smooth inertial scrolling while preserving the
// browser's native scrollbar. This file is separate so the integration is easy
// to remove or tune without touching the rest of the site.
const reduceScrollMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceScrollMotion && typeof LocomotiveScroll !== "undefined") {
  window.portfolioScroll = new LocomotiveScroll({
    lenisOptions: {
      // Lower values feel more direct; 0.08 is intentionally subtle.
      lerp: 0.08,
      smoothWheel: true,
    },
  });
}
