/**
 * Central motion language. Every animation on the site pulls its easing,
 * timing and stagger from here so the site moves as one system.
 *
 *  - GSAP: scroll scenes, pinned sections, diagram timelines (see lib/gsap.ts)
 *  - Motion: React presence + UI state (menu, route content)
 *  - CSS: hovers, underlines, decorative loops
 */
export const ease = {
  /** Default for reveals — fast start, long soft landing */
  out: "expo.out",
  /** For elements that travel and settle */
  inOut: "power3.inOut",
  /** CSS / Motion equivalent of expo.out */
  outBezier: [0.22, 1, 0.36, 1] as const,
} as const;

export const duration = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
  intro: 1.3,
} as const;

export const stagger = {
  lines: 0.09,
  words: 0.04,
  items: 0.06,
} as const;

/** Distance (in %) masked lines travel during a reveal */
export const revealOffset = 110;

export const INTRO_EVENT = "kp:intro-done";
export const INTRO_KEY = "kp-intro-seen";
