import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronRight } from "@/components/icons";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/data/products";

type ShopProductSectionProps = {
  title: string;
  href: string;
  products: Product[];
  showExploreMore?: boolean;
  priority?: boolean;
  allowEmpty?: boolean;
  variant?: "shop-all" | "gift";
  ctaLabel?: string;
  action?: ReactNode;
};

export function ShopProductSection({
  title,
  href,
  products,
  showExploreMore = true,
  priority = false,
  allowEmpty = false,
  variant = "shop-all",
  ctaLabel,
  action,
}: ShopProductSectionProps) {
  if (products.length === 0 && !allowEmpty) return null;

  return (
    <section className="min-w-0">
      <div className="product-section-header mb-4 flex items-center justify-between md:mb-5">
        <h2 className="text-2xl leading-8 font-bold text-ink">{title}</h2>
        {action ??
          (showExploreMore ? (
            <Link
              href={href}
              className="hidden flex-row items-center text-lg leading-7 font-bold text-fig underline md:flex"
            >
              Explore More
              <IconChevronRight className="ml-0.5 h-5 w-5 fill-none stroke-fig stroke-[1.5]" />
            </Link>
          ) : null)}
      </div>
      {products.length === 0 ? (
        <p className="py-12 text-base font-medium text-[#39393B]">No Products Found!</p>
      ) : (
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              variant={variant}
              ctaLabel={ctaLabel}
              priority={priority && index < 3}
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
      )}
    </section>
  );
}
