import { ShopProductSection } from "@/components/shop/ShopProductSection";
import type { Product } from "@/data/products";
import type { ShopChip } from "@/data/shop";
import { listingKeyFromHref, productsForCategory, shopAllPreviewCount } from "@/lib/shop";

type ShopAllSectionsProps = {
  chips: ShopChip[];
  products: Product[];
  selected: string[];
};

export function ShopAllSections({ chips, products, selected }: ShopAllSectionsProps) {
  const visibleChips = selected.length
    ? chips.filter((chip) => selected.includes(listingKeyFromHref(chip.href)))
    : chips;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-14 md:gap-16">
      {visibleChips.map((chip, sectionIndex) => (
        <ShopProductSection
          key={chip.href}
          title={chip.label}
          href={chip.href}
          products={productsForCategory(products, chip.href).slice(0, shopAllPreviewCount)}
          priority={sectionIndex === 0}
        />
      ))}
    </div>
  );
}
