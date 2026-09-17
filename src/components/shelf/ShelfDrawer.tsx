"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { formatPrice } from "@/data/products";
import { durationUi, overlayPresence } from "@/lib/motion";
import { useCommerce } from "@/store/CommerceProvider";

type ShelfDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function ShelfDrawer({ open, onClose }: ShelfDrawerProps) {
  const { shelf, removeFromShelf } = useCommerce();

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30">
          <motion.button
            type="button"
            aria-label="Close shelf"
            className="absolute inset-0 bg-gray-900/70"
            {...overlayPresence}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="shelf-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: durationUi, ease: "easeOut" }}
            className="absolute inset-y-0 right-0 flex h-dvh w-full flex-col bg-dew text-ink md:w-[90%] lg:w-1/2 xl:w-1/3"
          >
            <div className="flex items-center justify-between gap-3 bg-white px-2 py-3">
              <h3 id="shelf-title" className="px-1 text-lg font-semibold md:text-2xl">
                My Shelf
              </h3>
              <button type="button" className="px-3" aria-label="Close shelf" onClick={onClose}>
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-2 stroke-fig" fill="none" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {shelf.length === 0 ? (
                <div className="space-y-4 px-6 py-12 text-center">
                  <h2 className="px-3 text-2xl font-semibold">Your Shelf is Empty</h2>
                  <p className="px-3 text-base">Save the foods you want to come back to.</p>
                  <Link href="/shop/" className="btn primary-btn mx-auto inline-flex" onClick={onClose}>
                    Shop Your Favourite Foods
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3 px-4 py-4">
                  {shelf.map((item) => (
                    <li key={item.productId} className="flex gap-3 rounded-lg bg-white p-3">
                      <Link href={item.href} className="relative size-20 shrink-0 overflow-hidden rounded-md bg-product-well" onClick={onClose}>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-contain" sizes="80px" />
                        ) : null}
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link href={item.href} className="text-sm font-semibold" onClick={onClose}>
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm font-bold">{formatPrice(item.price)}</p>
                        {item.unit ? <p className="text-xs text-muted">{item.unit}</p> : null}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <AddToCartButton
                            product={item}
                            variant={item.unit}
                            className="btn primary-btn min-h-10 px-4 text-xs font-bold"
                          />
                          <button
                            type="button"
                            className="text-xs font-semibold text-fig"
                            aria-label={`Remove ${item.name} from shelf`}
                            onClick={() => removeFromShelf(item.productId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
