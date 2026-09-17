"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/data/products";
import type { CartItem } from "@/lib/commerce";
import { useCommerce } from "@/store/CommerceProvider";

type CartLineProps = {
  item: CartItem;
  onNavigate?: () => void;
};

export function CartLine({ item, onNavigate }: CartLineProps) {
  const { updateQuantity, removeItem } = useCommerce();

  return (
    <article className="flex gap-3 border-b border-black/10 py-4">
      <Link href={item.href} className="relative size-20 shrink-0 overflow-hidden rounded-md bg-product-well" onClick={onNavigate}>
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-contain" sizes="80px" />
        ) : null}
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={item.href} className="text-sm font-semibold" onClick={onNavigate}>
            {item.name}
          </Link>
          <button
            type="button"
            className="text-xs font-semibold text-fig"
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => removeItem(item.key)}
          >
            Remove
          </button>
        </div>
        {item.variant && item.variant !== "default" ? <p className="mt-1 text-xs text-muted">{item.variant}</p> : null}
        <p className="mt-1 text-sm font-bold">{formatPrice(item.unitPrice * item.quantity)}</p>
        <div className="mt-3 inline-flex items-center rounded-full border border-black/15">
          <button
            type="button"
            className="px-3 py-1 text-base"
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => updateQuantity(item.key, item.quantity - 1)}
          >
            −
          </button>
          <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            className="px-3 py-1 text-base"
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => updateQuantity(item.key, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
