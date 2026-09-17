"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { PdpUnit } from "@/components/pdp/PdpUnit";
import type { CatalogInput } from "@/lib/commerce";

type PdpBuyBoxProps = {
  product: CatalogInput;
  units?: string[];
  label?: string;
};

export function PdpBuyBox({ product, units, label = "Add to Cart" }: PdpBuyBoxProps) {
  const choices = units?.length ? units : product.unit ? [product.unit] : [];
  const [unit, setUnit] = useState(choices[0] ?? "");

  return (
    <div className="space-y-4">
      {unit ? <PdpUnit units={choices} value={unit} onChange={setUnit} /> : null}
      <div className="max-md:-ml-4">
        <div className="flex h-max gap-3 max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:z-20 max-md:mb-0 max-md:w-full max-md:items-end max-md:justify-center max-md:bg-white max-md:px-3 max-md:py-4 max-md:pb-[max(1rem,env(safe-area-inset-bottom))]">
          <AddToCartButton
            product={product}
            variant={unit || undefined}
            label={label}
            className="btn primary-btn w-full bg-fig py-[0.9rem] disabled:opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
