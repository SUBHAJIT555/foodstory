import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ShopListing } from "@/components/shop/ShopListing";
import type { ShopListing as ShopListingData } from "@/data/shop";
import { parseFilters, parseSort, productsForListing } from "@/lib/shop";

type ShopPageProps = {
  listing: ShopListingData;
  filter?: string | string[];
  sort?: string | string[];
};

export function ShopPage({ listing, filter, sort }: ShopPageProps) {
  const items = productsForListing(listing.path);
  const initialSelected = parseFilters(filter);
  const initialSort = parseSort(typeof sort === "string" ? sort : sort?.[0]);

  return (
    <div className="bg-white pb-8">
      <Breadcrumbs crumbs={listing.crumbs} compact />
      <ShopListing
        listing={listing}
        products={items}
        initialSelected={initialSelected}
        initialSort={initialSort}
      />
    </div>
  );
}
