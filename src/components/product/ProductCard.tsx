"use client";

import { useState } from "react";
import Link from "next/link";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { FramedMedia } from "@/components/home/FramedMedia";
import { ProductBadge, type ProductBadgeItem } from "@/components/product/ProductBadge";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductQuickAdd } from "@/components/product/ProductQuickAdd";
import { ProductUnit } from "@/components/product/ProductUnit";
import { mediaFor } from "@/data/media";
import type { ProductMedia } from "@/data/products";

export type ProductCardBadge = ProductBadgeItem;

export type ProductCardItem = {
  name: string;
  href: string;
  price: number | string;
  compareAtPrice?: number;
  unit?: string;
  units?: string[];
  badges?: Array<string | ProductBadgeItem>;
  available?: boolean;
  image?: string;
  media?: ProductMedia;
};

type ProductCardProps = {
  product: ProductCardItem;
  variant?: "rail" | "plp" | "gift" | "shop-all";
  ctaLabel?: string;
  priority?: boolean;
};

function normalizeBadges(badges: ProductCardItem["badges"]): ProductBadgeItem[] {
  return (badges ?? []).map((badge) =>
    typeof badge === "string"
      ? { label: badge, tone: badge === "Bestseller" ? "salmon" : "charcoal" }
      : { label: badge.label, tone: badge.tone ?? (badge.label === "Bestseller" ? "salmon" : "charcoal") },
  );
}

function numericPrice(price: number | string): number {
  if (typeof price === "number") return price;
  return Number(price.replace(/[^\d.]/g, "")) || 0;
}

export function ProductCard({ product, variant = "rail", ctaLabel, priority = false }: ProductCardProps) {
  const badges = normalizeBadges(product.badges);
  const unitChoices = product.units?.length ? product.units : product.unit ? [product.unit] : [];
  const [unit, setUnit] = useState(unitChoices[0] ?? "");
  const isShopAll = variant === "shop-all";
  const isGift = variant === "gift";
  const isListing = isShopAll || isGift;
  const isPlp = variant === "plp" || isListing;
  const priceValue = numericPrice(product.price);
  const displayPrice = typeof product.price === "string" && !product.compareAtPrice ? product.price : null;

  return (
    <div
      className={
        isListing
          ? "group col-span-1 row-span-1 flex w-full min-w-0 flex-col gap-2"
          : isPlp
            ? "group col-span-1 row-span-1 flex w-full max-w-76.5 flex-1 flex-col gap-6 md:gap-9"
            : "group block h-[369px] w-full max-lg:h-auto"
      }
    >
      <div className="space-y-2">
        <div className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-product-well ${isListing ? "p-3 md:p-4" : "p-0"}`}>
          <Link href={product.href} className="relative aspect-square w-full">
            <FramedMedia
              alt={product.name}
              src={product.image ?? mediaFor(product.href, product.name)}
              sizes={
                isListing
                  ? "(max-width: 768px) 40vw, 240px"
                  : isPlp
                    ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                    : "(max-width: 1024px) 240px, 292px"
              }
              className={`rounded-lg ${product.media?.objectFit === "cover" ? "object-cover" : "object-contain"}`}
              imageStyle={product.media?.scale ? { transform: `scale(${product.media.scale})` } : undefined}
              priority={priority}
            />
          </Link>
          {isPlp ? (
            <WishlistButton
              product={{ ...product, price: priceValue }}
              className="visible absolute top-2 right-2 z-10 aspect-square h-8 rounded-full bg-white/60 lg:invisible lg:h-10 lg:group-hover:visible"
              iconClassName="mx-auto h-4 w-5 stroke-fig lg:h-5.5"
            />
          ) : null}
          <ProductBadge badges={badges} compact={isListing} />
        </div>
        {isPlp ? (
          <div className={isListing ? "space-y-2" : "min-h-[4.6rem] space-y-2 md:h-14 lg:h-14"} aria-label="product-name">
            <h2 className="line-clamp-2 px-0 text-left text-sm font-semibold text-black md:text-lg">
              <Link href={product.href}>{product.name}</Link>
            </h2>
            <div className="flex w-full items-baseline justify-between gap-2 text-black">
              <div className={isListing ? "min-w-0 px-0 text-left" : "min-h-[40px] min-w-0 px-0 text-left md:min-h-0"}>
                {displayPrice ? (
                  <span className="text-sm font-bold md:text-lg">{displayPrice}</span>
                ) : (
                  <ProductPrice price={priceValue} compareAtPrice={product.compareAtPrice} />
                )}
              </div>
              {unit ? <ProductUnit units={unitChoices} value={unit} onChange={setUnit} compact={isListing} /> : null}
            </div>
          </div>
        ) : (
          <Link href={product.href} className="block space-y-2">
            <h2 className="line-clamp-2 px-0 text-left text-sm font-semibold text-black md:text-lg">{product.name}</h2>
            <p className="text-sm font-semibold md:text-base">
              {typeof product.price === "string" ? product.price : `₹${product.price}`}
            </p>
            {product.unit ? <p className="text-sm">{product.unit}</p> : null}
          </Link>
        )}
      </div>
      {isGift ? (
        <ProductQuickAdd
          product={{ ...product, price: priceValue }}
          variant={unit || undefined}
          disabled={product.available === false}
          label={ctaLabel ?? (isGift ? "Gift Now" : "Add to Cart")}
        />
      ) : null}
    </div>
  );
}
