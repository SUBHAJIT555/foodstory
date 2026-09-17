"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CartLine } from "@/components/cart/CartLine";
import { formatPrice } from "@/data/products";
import { durationUi, overlayPresence } from "@/lib/motion";
import { useCommerce } from "@/store/CommerceProvider";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, subtotal, itemCount } = useCommerce();

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30">
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-gray-900/70"
            {...overlayPresence}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: durationUi, ease: "easeOut" }}
            className="absolute inset-y-0 right-0 flex h-dvh w-full flex-col bg-dew text-ink md:w-[90%] lg:w-1/2 xl:w-1/3"
          >
            <div aria-label="cart-header" className="flex items-center justify-between gap-3 bg-white px-2 py-3">
              <h3 id="cart-title" className="relative px-1 text-lg font-semibold md:text-2xl">
                Cart
              </h3>
              <button type="button" className="px-3" aria-label="Close cart" onClick={onClose}>
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-2 stroke-fig" fill="none" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div aria-label="cart-body" className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div aria-label="empty-cart" className="space-y-4 px-6 py-12 text-center">
                  <h2 className="px-3 text-2xl font-semibold">Your Cart is Empty</h2>
                  <p className="px-3 text-base">Or rather, for now it is. So let&apos;s fill it with joy-giving things, shall we?</p>
                  <Link href="/shop/" className="btn primary-btn mx-auto inline-flex" onClick={onClose}>
                    Shop Your Favourite Foods
                  </Link>
                </div>
              ) : (
                <div className="px-4">
                  {cart.map((item) => (
                    <CartLine key={item.key} item={item} onNavigate={onClose} />
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 ? (
              <div className="space-y-3 bg-white px-4 py-4">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Link href="/checkout/cart/" className="btn primary-btn w-full" onClick={onClose}>
                  Checkout
                </Link>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
