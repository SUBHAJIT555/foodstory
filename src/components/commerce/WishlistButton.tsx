"use client";

import { IconHeart } from "@/components/icons";
import { catalogId, type CatalogInput } from "@/lib/commerce";
import { useCommerce } from "@/store/CommerceProvider";

type WishlistButtonProps = {
  product: CatalogInput;
  className?: string;
  iconClassName?: string;
};

export function WishlistButton({ product, className, iconClassName }: WishlistButtonProps) {
  const { ready, toggleShelf, isShelved } = useCommerce();
  const id = catalogId(product);
  const saved = ready && (isShelved(id) || isShelved(product.href));

  return (
    <button
      type="button"
      className={className}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from shelf` : `Add ${product.name} to shelf`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleShelf(product);
      }}
    >
      <IconHeart className={`${iconClassName ?? "h-5 w-5 stroke-fig"} ${saved ? "fill-fig" : "fill-none"}`} />
    </button>
  );
}
