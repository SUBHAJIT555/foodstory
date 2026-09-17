"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FilterGroup } from "@/components/shop/FilterGroup";
import { sortOptions, type ShopFilterGroup, type ShopFilterOption, type SortValue } from "@/data/shop";
import { durationUi } from "@/lib/motion";

type FilterDrawerProps = {
  open: "filters" | "sort" | null;
  heading: string;
  options: ShopFilterOption[];
  groups?: ShopFilterGroup[];
  selected: string[];
  sort: SortValue;
  onToggle: (value: string) => void;
  onSort: (value: SortValue) => void;
  onClose: () => void;
};

const sheetPresence = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: durationUi, ease: "easeOut" as const },
};

export function FilterDrawer({
  open,
  heading,
  options,
  groups,
  selected,
  sort,
  onToggle,
  onSort,
  onClose,
}: FilterDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>("button, input");
    first?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            className="fixed inset-0 z-20 bg-black/20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durationUi, ease: "easeOut" }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            id="shop-filter-sheet"
            aria-label={open === "filters" ? "Filters" : "Sort"}
            className="fixed inset-x-0 bottom-14 z-21 max-h-[50%] overflow-y-auto rounded-t-md bg-white p-4 lg:hidden"
            ref={panelRef}
            {...sheetPresence}
          >
            {open === "filters" ? (
              (groups?.length ? groups : [{ heading, options }]).map((section) => (
                <FilterGroup key={section.heading} heading={section.heading} options={section.options} selected={selected} onToggle={onToggle} />
              ))
            ) : (
              <ul className="flex flex-col gap-y-2">
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className={`w-full text-left text-base ${sort === option.value ? "font-semibold text-fig" : ""}`}
                      onClick={() => {
                        onSort(option.value);
                        onClose();
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
