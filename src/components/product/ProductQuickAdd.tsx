"use client";

import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import type { CatalogInput } from "@/lib/commerce";

type ProductQuickAddProps = {
  product: CatalogInput;
  variant?: string;
  disabled?: boolean;
  label?: string;
};

export function ProductQuickAdd({ product, variant, disabled = false, label = "Add to Cart" }: ProductQuickAddProps) {
  return (
    <div className="visible flex items-center justify-start gap-y-1 lg:invisible lg:group-hover:visible">
      <div className="relative w-full transition duration-200 ease-in-out">
        <AddToCartButton
          product={{ ...product, available: disabled ? false : product.available }}
          variant={variant}
          label={label}
        />
      </div>
    </div>
  );
}
