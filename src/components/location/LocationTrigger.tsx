"use client";

import { IconChevron, IconPin } from "@/components/icons";

type LocationTriggerProps = {
  onOpen: () => void;
};

export function LocationTrigger({ onOpen }: LocationTriggerProps) {
  return (
    <button
      type="button"
      className="location-trigger relative flex min-w-0 max-md:h-[37px] max-md:max-w-[120px] items-center justify-center rounded-[3.75rem] px-1 py-1 outline-hidden backdrop-blur-xs max-md:pl-2 md:h-[45px] md:px-3 md:py-2"
      onClick={onOpen}
    >
      <IconPin className="mr-1 shrink-0" />
      <span className="truncate whitespace-nowrap">Fetching Location</span>
      <IconChevron className="ml-1 shrink-0" />
    </button>
  );
}
