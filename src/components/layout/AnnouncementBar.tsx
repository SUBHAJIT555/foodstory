"use client";

import { useEffect, useState } from "react";
import { announcementMessages } from "@/data/navigation";
import { IconClose } from "@/components/icons";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

type AnnouncementBarProps = {
  onDismiss: () => void;
};

export function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcementMessages.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="relative flex h-7.5 w-full items-center justify-center bg-[#FFEFEF] py-[0.7rem] text-[16px] font-normal leading-6 text-ink">
      <p className="w-full text-center">{announcementMessages[index]}</p>
      <button
        type="button"
        className="absolute top-1 right-2 flex size-5 items-center justify-center text-ink"
        aria-label="Dismiss announcement"
        onClick={onDismiss}
      >
        <IconClose />
      </button>
    </div>
  );
}
