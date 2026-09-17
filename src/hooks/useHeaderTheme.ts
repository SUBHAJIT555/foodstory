"use client";

import { useEffect, useState } from "react";

export type HeaderTheme = "overlay" | "light";

const SENTINEL_ID = "header-overlay-sentinel";

export function headerOverlaySentinelId() {
  return SENTINEL_ID;
}

function readOverHero() {
  const sentinel = document.getElementById(SENTINEL_ID);
  if (!sentinel) return true;
  return sentinel.getBoundingClientRect().bottom > 0;
}

/**
 * Overlay only while the homepage hero sentinel is in view.
 * Other routes stay light. Theme is independent of scroll direction.
 */
export function useHeaderTheme(pathname: string): HeaderTheme {
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (!isHome) return;

    let io: IntersectionObserver | null = null;
    let frame = 0;

    const read = () => {
      setOverHero(readOverHero());
    };

    const sentinel = document.getElementById(SENTINEL_ID);
    if (sentinel) {
      io = new IntersectionObserver(read, { threshold: [0, 1] });
      io.observe(sentinel);
    }

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          read();
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const interval = window.setInterval(read, 150);
    return () => {
      io?.disconnect();
      window.clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  if (!isHome) return "light";
  return overHero ? "overlay" : "light";
}
