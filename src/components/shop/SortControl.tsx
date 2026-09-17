"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevron } from "@/components/icons";
import { sortOptions, type SortValue } from "@/data/shop";

type SortControlProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

export function SortControl({ value, onChange }: SortControlProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={rootRef} className="relative max-lg:hidden">
      <button
        type="button"
        className="relative flex flex-row items-center font-semibold"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="shop-sort-menu"
        onClick={() => setOpen((current) => !current)}
      >
        Sort
        <IconChevron className="ml-1" />
      </button>
      {open ? (
        <div id="shop-sort-menu" className="absolute top-10 right-1 z-11 flex flex-col gap-y-5 rounded-lg border border-black/20 bg-white p-6">
          <div className="flex flex-col gap-y-2" role="listbox" aria-label="Sort">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={`text-left text-sm ${value === option.value ? "font-semibold text-fig" : "font-medium"}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
