"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconChevron } from "@/components/icons";

type ProductUnitProps = {
  units: string[];
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
};

export function ProductUnit({ units, value, onChange, compact = false }: ProductUnitProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!value) return null;

  return (
    <div ref={rootRef} className={compact ? "relative shrink-0" : "relative px-3"}>
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        className="flex items-center gap-2 text-sm text-black"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <IconChevron className="h-3 w-3 stroke-2 stroke-black" />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute right-0 z-12 mt-1 min-w-full rounded-lg border border-black/20 bg-white p-2"
        >
          {units.map((unit) => (
            <li key={unit}>
              <button
                type="button"
                role="option"
                aria-selected={unit === value}
                className={`w-full text-left text-sm ${unit === value ? "font-semibold text-fig" : ""}`}
                onClick={() => {
                  onChange(unit);
                  setOpen(false);
                }}
              >
                {unit}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
