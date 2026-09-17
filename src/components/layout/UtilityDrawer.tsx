"use client";

import { AnimatePresence, motion } from "motion/react";
import { durationUi, overlayPresence } from "@/lib/motion";

type UtilityDrawerProps = {
  open: boolean;
  title: string;
  emptyCopy?: string;
  onClose: () => void;
};

export function UtilityDrawer({ open, title, emptyCopy, onClose }: UtilityDrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30">
          <motion.button
            type="button"
            aria-label={`Close ${title}`}
            className="absolute inset-0 bg-black/30"
            {...overlayPresence}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${title}-title`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: durationUi, ease: "easeOut" }}
            className="absolute top-0 right-0 h-full w-[min(400px,100vw)] bg-white p-6 text-ink"
          >
            <div className="flex items-center justify-between">
              <h2 id={`${title}-title`} className="text-lg font-semibold">
                {title}
              </h2>
              <button type="button" className="text-sm" onClick={onClose}>
                Close
              </button>
            </div>
            {emptyCopy ? <p className="mt-6 text-sm text-muted">{emptyCopy}</p> : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
