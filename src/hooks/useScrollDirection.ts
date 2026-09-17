"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

type UseScrollDirectionOptions = {
  /** Ignore movements smaller than this (px). */
  delta?: number;
};

/**
 * Scroll-direction state for the header nav row.
 * Does not report scrollY. Scroll events are rAF-throttled; a slow
 * interval fallback covers environments that swallow scroll events.
 */
export function useScrollDirection({ delta = 8 }: UseScrollDirectionOptions = {}) {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const [scrolledExpanded, setScrolledExpanded] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let absorb = 0;

    function apply() {
      ticking = false;
      const y = Math.max(0, window.scrollY);

      if (y <= 8) {
        lastY = y;
        absorb = 0;
        setDirection("up");
        setScrolledExpanded(true);
        return;
      }

      const diff = y - lastY;
      if (Math.abs(diff) < delta) return;
      lastY = y;

      if (absorb > 0 && diff < 0) {
        absorb += diff;
        if (absorb > 0) return;
      } else if (absorb < 0 && diff > 0) {
        absorb += diff;
        if (absorb < 0) return;
      }

      if (diff > 0) {
        setDirection("down");
        setScrolledExpanded(false);
        absorb = 48;
      } else {
        setDirection("up");
        setScrolledExpanded(true);
        absorb = -48;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    const interval = window.setInterval(apply, 120);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(interval);
    };
  }, [delta]);

  return { direction, scrolledExpanded };
}
