"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconChevron } from "@/components/icons";

type PdpUnitProps = {
  units: string[];
  value: string;
  onChange: (value: string) => void;
};

export function PdpUnit({ units, value, onChange }: PdpUnitProps) {
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

  if (units.length <= 1) {
    return (
      <p className="px-0 text-base text-black/60">
        <span id="weight">{value}</span>
      </p>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        className="flex items-center gap-2 text-sm text-black/60"
        onClick={() => setOpen((current) => !current)}
      >
        <span id="weight">{value}</span>
        <IconChevron className="h-3 w-3 stroke-2 stroke-black/60" />
      </button>
      {open ? (
        <ul id={listId} role="listbox" className="absolute left-0 z-12 mt-1 min-w-full rounded-lg border border-black/20 bg-white p-2">
          {units.map((unit) => (
            <li key={unit}>
              <button
                type="button"
                role="option"
                aria-selected={unit === value}
                className={`w-full text-left text-sm ${unit === value ? "font-semibold text-fig" : "text-black/60"}`}
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
