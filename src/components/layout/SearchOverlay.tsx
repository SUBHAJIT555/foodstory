"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { popularSearches, trendingSearchSlugs } from "@/data/navigation";
import { products } from "@/data/products";
import { durationUi } from "@/lib/motion";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
};

export function SearchOverlay({ open, onClose, onSearch }: SearchOverlayProps) {
  const trending = trendingSearchSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <div className="absolute top-full max-h-screen w-full max-w-full overflow-hidden transition-all">
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="search-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: durationUi, ease: "easeOut" }}
              className="h-full max-h-[70%] w-full overflow-y-auto bg-white text-left text-ink"
            >
              <div className="mx-auto px-3 pt-4 pb-8 lg:max-w-7xl lg:px-2">
                <p className="mb-3 text-sm font-semibold">Popular Searches</p>
                <ul className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        className="min-h-11 text-sm font-medium underline-offset-2 hover:underline"
                        onClick={() => onSearch(term)}
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm font-semibold">Trending Products</p>
                  <Link href="/shop/" className="text-sm font-semibold text-fig underline" onClick={onClose}>
                    Explore More
                  </Link>
                </div>
                <MediaCarousel
                  slidesPerView={1.4}
                  spaceBetween={16}
                  navigation={false}
                  breakpoints={{
                    375: { slidesPerView: 1.4, spaceBetween: 16 },
                    768: { slidesPerView: 2.2, spaceBetween: 16 },
                    1024: { slidesPerView: 3, spaceBetween: 16 },
                  }}
                  className="mt-4 pb-2"
                  slideClassName="!h-auto"
                >
                  {trending.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        name: product.name,
                        href: product.href,
                        price: product.price,
                        compareAtPrice: product.compareAtPrice,
                        unit: product.unit,
                        badges: product.badges,
                        image: product.image,
                      }}
                    />
                  ))}
                </MediaCarousel>
              </div>
            </motion.div>
            <motion.button
              key="search-backdrop"
              type="button"
              aria-label="Close search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: durationUi }}
              className="z-21 h-dvh w-full cursor-pointer bg-black/30 backdrop-blur-xs"
              onClick={onClose}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
