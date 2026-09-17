"use client";

import { useState } from "react";
import { useCommerce } from "@/store/CommerceProvider";
import type { CatalogInput } from "@/lib/commerce";

type AddToCartButtonProps = {
  product: CatalogInput;
  variant?: string;
  quantity?: number;
  label?: string;
  className?: string;
};

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  label = "Add to Cart",
  className = "btn primary-btn min-h-12 w-full text-sm font-bold text-white hover:opacity-90 disabled:opacity-70 max-md:py-[0.54rem]",
}: AddToCartButtonProps) {
  const { addItem } = useCommerce();
  const [added, setAdded] = useState(false);
  const soldOut = product.available === false;

  function onAdd() {
    if (soldOut) return;
    addItem(product, quantity, variant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  const actionLabel = soldOut
    ? `${product.name} is sold out`
    : added
      ? `Added ${product.name} to cart`
      : `Add ${product.name} to cart`;

  return (
    <button
      type="button"
      title={soldOut ? "Sold Out" : label}
      aria-label={actionLabel}
      disabled={soldOut}
      className={className}
      onClick={onAdd}
    >
      {soldOut ? "Sold Out" : added ? "Added" : label}
    </button>
  );
}
