"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pickupStores } from "@/data/location";
import { overlayPresence, panelPresence } from "@/lib/motion";

type LocationDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LocationDialog({ open, onClose }: LocationDialogProps) {
  const [tab, setTab] = useState<"delivery" | "pickup">("delivery");
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open) titleRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30">
          <motion.button
            type="button"
            aria-label="Close location"
            className="absolute inset-0 bg-black/40"
            {...overlayPresence}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-title"
            className="absolute top-1/2 right-6 w-[min(440px,calc(100vw-2rem))] -translate-y-1/2 bg-white p-6 text-ink max-md:right-1/2 max-md:translate-x-1/2"
            {...panelPresence}
          >
            <h2
              id="location-title"
              ref={titleRef}
              tabIndex={-1}
              className="text-lg font-semibold outline-hidden"
            >
              Choose Your Delivery Location
            </h2>
            <div className="mt-4 flex h-[42px] overflow-hidden rounded-[40px] border border-[#a5a4a7]">
              <button
                type="button"
                className={`flex-1 rounded-[40px] text-sm font-medium duration-300 ${
                  tab === "delivery" ? "bg-fig text-white" : "bg-white"
                }`}
                onClick={() => setTab("delivery")}
              >
                Home Delivery
              </button>
              <button
                type="button"
                className={`flex-1 rounded-[40px] text-sm font-medium duration-300 ${
                  tab === "pickup" ? "bg-fig text-white" : "bg-white"
                }`}
                onClick={() => setTab("pickup")}
              >
                Pickup
              </button>
            </div>

            {tab === "delivery" ? (
              <div className="mt-6">
                <p className="border border-[#f0f0f0] px-3 py-3 text-sm">Fetching Location</p>
                <p className="mt-3 text-sm text-[#c23a3a]">
                  We&apos;re not available in your area yet. Please try a different location or
                  consider pickup from store.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-6 h-12 w-full rounded-[1.8rem] bg-[#cccccd] text-sm font-semibold text-[#979699]"
                >
                  CONTINUE
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid gap-3">
                {pickupStores.map((store) => (
                  <li
                    key={store.name}
                    className="w-61.25 max-w-full rounded-xl border border-[#F0F0F0] p-3"
                  >
                    <p className="text-sm font-semibold">{store.name}</p>
                    <p className="mt-1 text-xs text-[#7E7E7E]">{store.address}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
