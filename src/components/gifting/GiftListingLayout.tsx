"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { CategoryHeader } from "@/components/shop/CategoryHeader";
import { CategoryRail } from "@/components/shop/CategoryRail";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { MobileShopBar } from "@/components/shop/MobileShopBar";
import { ShopProductSection } from "@/components/shop/ShopProductSection";
import { ShopSeo } from "@/components/shop/ShopSeo";
import { SortControl } from "@/components/shop/SortControl";
import {
  giftCategoryByValue,
  giftListingHref,
  giftRailChips,
  isGiftFamilyPath,
  type GiftListing,
} from "@/data/gifting";
import type { Product } from "@/data/products";
import type { SortValue } from "@/data/shop";
import { applyFilters, applySort } from "@/lib/shop";

type GiftListingLayoutProps = {
  listing: GiftListing;
  products: Product[];
  initialSelected?: string[];
  initialSort?: SortValue;
};

const parentLeaves = new Set(["all-gifts", "gift-by-occasion", "gifts-by-type", "gift-by-price"]);

export function GiftListingLayout({
  listing,
  products,
  initialSelected = [],
  initialSort = "relevance",
}: GiftListingLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(initialSelected);
  const [sort, setSort] = useState(initialSort);
  const [sheet, setSheet] = useState<"filters" | "sort" | null>(null);
  const closeSheet = useCallback(() => setSheet(null), []);
  const family = isGiftFamilyPath(listing.path);
  const leaf = listing.path.split("/").filter(Boolean).at(-1) ?? "";
  const routeSelected = parentLeaves.has(leaf) ? [] : [leaf];
  const displayedSelected = family ? selected : [...new Set([...routeSelected, ...selected])];
  const chips = giftRailChips(listing.path);
  const activeHref = listing.path === "all-gifts" ? undefined : giftListingHref(listing.path);

  const filtered = useMemo(
    () => applySort(family ? applyFilters(products, selected) : products, sort),
    [family, products, selected, sort],
  );

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  function writeParams(nextSelected: string[], nextSort: SortValue) {
    const params = new URLSearchParams();
    nextSelected.forEach((value) => params.append("filter", value));
    if (nextSort !== "relevance") params.set("sort", nextSort);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function onToggle(value: string) {
    const category = giftCategoryByValue(value);
    if (!family && category) {
      router.push(category.href);
      closeSheet();
      return;
    }
    const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
    setSelected(next);
    writeParams(next, sort);
  }

  function onSort(value: SortValue) {
    setSort(value);
    writeParams(selected, value);
  }

  return (
    <div className="bg-white pb-8">
      <Breadcrumbs crumbs={listing.crumbs} compact />
      <CategoryHeader title={listing.title} compact />
      <CategoryRail chips={chips} activeHref={activeHref} />
      <div className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8">
        <div className="relative flex items-start gap-8 lg:gap-10">
          <FilterSidebar
            heading={listing.filterHeading}
            options={listing.filters}
            groups={listing.filterGroups}
            selected={displayedSelected}
            onToggle={onToggle}
            width="shop-all"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <ShopProductSection
              title={listing.title}
              href={giftListingHref(listing.path)}
              products={filtered}
              variant="gift"
              ctaLabel="Gift Now"
              showExploreMore={false}
              action={<SortControl value={sort} onChange={onSort} />}
              priority
              allowEmpty
            />
          </div>
        </div>
      </div>
      {listing.seo ? <ShopSeo title={listing.seo.title} paragraphs={listing.seo.paragraphs} /> : null}
      <MobileShopBar
        sheet={sheet}
        onFilters={() => setSheet((current) => (current === "filters" ? null : "filters"))}
        onSort={() => setSheet((current) => (current === "sort" ? null : "sort"))}
      />
      <FilterDrawer
        open={sheet}
        heading={listing.filterHeading}
        options={listing.filters}
        groups={listing.filterGroups}
        selected={displayedSelected}
        sort={sort}
        onToggle={onToggle}
        onSort={onSort}
        onClose={closeSheet}
      />
    </div>
  );
}
