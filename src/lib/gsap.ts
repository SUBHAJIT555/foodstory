import { gsap } from "gsap";

/**
 * ScrollTrigger is not registered. Phase 1–2 found no pinned or scrubbed
 * homepage/shell timelines on the live reference.
 */
export function registerGsap(): typeof gsap {
  return gsap;
}

export { gsap };
