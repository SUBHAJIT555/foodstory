"use client";

import { useState } from "react";
import type { ShopFilterOption } from "@/data/shop";

type FilterGroupProps = {
  heading: string;
  options: ShopFilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
};

const previewCount = 5;

export function FilterGroup({ heading, options, selected, onToggle }: FilterGroupProps) {
  const selectedNeedsExpand = options.some(
    (option, index) => selected.includes(option.value) && index >= previewCount,
  );
  const [userExpanded, setUserExpanded] = useState<boolean | null>(null);
  const expanded = userExpanded ?? selectedNeedsExpand;
  const needsToggle = options.length > previewCount;
  const visible = !needsToggle || expanded ? options : options.slice(0, previewCount);

  return (
    <div id="filter_categories" className="mb-8">
      <h4 className="mb-3 text-lg leading-7 font-semibold text-ink">{heading}</h4>
      <ul className="space-y-2">
        {visible.map((option) => (
          <li key={option.value} title={option.value} className="flex items-start justify-start font-medium">
            <label className="flex cursor-pointer items-start gap-x-2 text-left text-base leading-6 font-medium select-none">
              <input
                type="checkbox"
                className="accent-fig mt-1 size-4 shrink-0 cursor-pointer rounded-sm border-2 border-ink"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                aria-label={option.label}
              />
              <p className="flex-1">{option.label}</p>
            </label>
          </li>
        ))}
        {needsToggle ? (
          <li className="w-max cursor-pointer">
            <button type="button" className="text-base font-normal text-fig underline" onClick={() => setUserExpanded((current) => !(current ?? selectedNeedsExpand))}>
              {expanded ? "− Less" : "+ More"}
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
