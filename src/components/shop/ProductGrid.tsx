"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { type Product } from "@/data/products";
import { pageSize } from "@/data/shop";

type ProductGridProps = {
  products: Product[];
  variant?: "plp" | "gift";
  ctaLabel?: string;
};

export function ProductGrid({ products, variant = "plp", ctaLabel }: ProductGridProps) {
  const [visible, setVisible] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible((current) => Math.min(products.length, current + pageSize));
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [products.length]);

  return (
    <>
      <div className="infinite-scroll-component mb-6 grid grid-cols-2 place-items-center gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8">
        {products.slice(0, visible).map((product, index) => (
          <ProductCard
            key={product.id}
            variant={variant}
            ctaLabel={ctaLabel}
            priority={index < 3}
            product={{
              name: product.name,
              href: product.href,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              unit: product.unit,
              units: product.units,
              badges: product.badges,
              available: product.available,
              image: product.image,
              media: product.media,
            }}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="h-4" />
    </>
  );
}
