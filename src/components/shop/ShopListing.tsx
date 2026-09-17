"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CategoryHeader } from "@/components/shop/CategoryHeader";
import { CategoryRail } from "@/components/shop/CategoryRail";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { MobileShopBar } from "@/components/shop/MobileShopBar";
import { ShopAllSections } from "@/components/shop/ShopAllSections";
import { ShopProductSection } from "@/components/shop/ShopProductSection";
import { ShopSeo } from "@/components/shop/ShopSeo";
import type { Product } from "@/data/products";
import { listingHref, shopListings, type ShopListing as ShopListingData, type SortValue } from "@/data/shop";
import { applyFilters, applySort, listingKeyFromHref } from "@/lib/shop";

type ShopListingProps = {
  listing: ShopListingData;
  products: Product[];
  initialSelected?: string[];
  initialSort?: SortValue;
};

export function ShopListing({
  listing,
  products,
  initialSelected = [],
  initialSort = "relevance",
}: ShopListingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(initialSelected);
  const [sort, setSort] = useState(initialSort);
  const [sheet, setSheet] = useState<"filters" | "sort" | null>(null);
  const closeSheet = useCallback(() => setSheet(null), []);
  const shopAll = shopListings[0];
  const isShopAll = listing.path === "";
  const categoryRoot = listing.path.split("/")[0] ?? listing.path;

  const filtered = useMemo(() => applySort(applyFilters(products, selected), sort), [products, selected, sort]);

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
    if (!isShopAll && shopAll) {
      const chip = shopAll.chips.find((item) => listingKeyFromHref(item.href) === value);
      if (chip) {
        router.push(chip.href);
        closeSheet();
        return;
      }
    }
    const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
    setSelected(next);
    writeParams(next, sort);
  }

  function onSort(value: SortValue) {
    setSort(value);
    writeParams(selected, value);
  }

  const familyFilters = shopAll?.filters ?? listing.filters;
  const familySelected = isShopAll ? selected : categoryRoot ? [categoryRoot] : selected;
  const familyHref = listingHref(listing.path);

  return (
    <>
      <CategoryHeader title={listing.title} compact />
      <CategoryRail chips={shopAll?.chips ?? listing.chips} activeHref={isShopAll ? undefined : familyHref} />
      <div className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8">
        <div className="relative flex items-start gap-8 lg:gap-10">
          <FilterSidebar
            heading={shopAll?.filterHeading ?? listing.filterHeading}
            options={familyFilters}
            selected={familySelected}
            onToggle={onToggle}
            width="shop-all"
          />
          {isShopAll ? (
            <ShopAllSections chips={shopAll?.chips ?? []} products={filtered} selected={selected} />
          ) : (
            <div className="flex min-w-0 flex-1 flex-col">
              <ShopProductSection
                title={listing.title}
                href={familyHref}
                products={filtered}
                priority
                allowEmpty
              />
            </div>
          )}
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
        heading={shopAll?.filterHeading ?? listing.filterHeading}
        options={familyFilters}
        selected={familySelected}
        sort={sort}
        onToggle={onToggle}
        onSort={onSort}
        onClose={closeSheet}
      />
    </>
  );
}
