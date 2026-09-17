import { FilterGroup } from "@/components/shop/FilterGroup";
import type { ShopFilterGroup, ShopFilterOption } from "@/data/shop";

type FilterSidebarProps = {
  heading: string;
  options: ShopFilterOption[];
  groups?: ShopFilterGroup[];
  selected: string[];
  onToggle: (value: string) => void;
  width?: "default" | "shop-all";
};

export function FilterSidebar({ heading, options, groups, selected, onToggle, width = "default" }: FilterSidebarProps) {
  const sections = groups?.length ? groups : options.length ? [{ heading, options }] : [];
  if (sections.length === 0) return null;

  return (
    <div
      className={`no-scrollbar sticky top-[var(--header-sticky-desktop-current)] h-screen shrink-0 overflow-y-scroll pb-40 max-lg:hidden ${width === "shop-all" ? "w-[220px]" : ""}`}
    >
      <div className="col-span-1 row-span-full max-lg:hidden">
        {sections.map((section) => (
          <FilterGroup key={section.heading} heading={section.heading} options={section.options} selected={selected} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}
