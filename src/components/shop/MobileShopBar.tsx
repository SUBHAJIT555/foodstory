"use client";

import { IconChevron } from "@/components/icons";

type MobileShopBarProps = {
  sheet: "filters" | "sort" | null;
  onFilters: () => void;
  onSort: () => void;
};

export function MobileShopBar({ sheet, onFilters, onSort }: MobileShopBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-21 mb-0 w-full border-t border-black/10 bg-white lg:hidden">
      <div className="flex h-14 items-center justify-center border-b border-black/10 px-4">
        <button
          type="button"
          className="flex flex-1 cursor-pointer items-center justify-center gap-x-2"
          aria-expanded={sheet === "filters"}
          aria-controls="shop-filter-sheet"
          onClick={onFilters}
        >
          <FilterGlyph />
          Filters
        </button>
        <button
          type="button"
          className="flex flex-1 cursor-pointer items-center justify-center gap-x-2"
          aria-expanded={sheet === "sort"}
          aria-controls="shop-filter-sheet"
          onClick={onSort}
        >
          Sort
          <IconChevron />
        </button>
      </div>
    </div>
  );
}

function FilterGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className="mt-1 h-6 w-6 stroke-black stroke-2" fill="none" aria-hidden>
      <path d="M14.7 4.3h-4" strokeWidth="1.47" strokeLinecap="round" />
      <path d="M4 4.3H1.3" strokeWidth="1.47" strokeLinecap="round" />
      <circle cx="6.7" cy="4.3" r="2.3" strokeWidth="1.47" />
      <path d="M14.7 11.7H12" strokeWidth="1.47" strokeLinecap="round" />
      <path d="M5.3 11.7H1.3" strokeWidth="1.47" strokeLinecap="round" />
      <circle cx="8.7" cy="11.7" r="2.3" strokeWidth="1.47" />
      <path d="M14.7 19H9.3" strokeWidth="1.47" strokeLinecap="round" />
      <path d="M5.3 19H1.3" strokeWidth="1.47" strokeLinecap="round" />
      <circle cx="7.3" cy="19" r="2.3" strokeWidth="1.47" />
    </svg>
  );
}
