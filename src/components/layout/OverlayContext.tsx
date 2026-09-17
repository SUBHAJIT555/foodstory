"use client";

import { createContext, useContext } from "react";
import type { OverlayName } from "@/types";

export const OverlayContext = createContext<(name: OverlayName) => void>(() => {});

export function useOverlay() {
  return useContext(OverlayContext);
}
