"use client";

import { useEffect, useState } from "react";
import { searchPlaceholders } from "@/data/navigation";
import { IconSearch } from "@/components/icons";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

type SearchFieldProps = {
  id?: string;
  onOpen: () => void;
};

export function SearchField({ id, onOpen }: SearchFieldProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % searchPlaceholders.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="relative">
      <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-6 -translate-y-1/2 text-current" />
      <input
        id={id}
        type="search"
        readOnly
        value=""
        aria-label="Search"
        onFocus={onOpen}
        onClick={onOpen}
        className="search-input w-full rounded-[3.75rem] px-7.5 py-3 pl-10 outline-hidden backdrop-blur-xs placeholder:invisible placeholder:truncate placeholder:text-sm placeholder:font-semibold placeholder:opacity-70 max-[425px]:placeholder:text-xs"
      />
      <span className="search-placeholder pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 truncate text-sm font-semibold opacity-70 max-[425px]:text-xs">
        {searchPlaceholders[index]}
      </span>
    </div>
  );
}
