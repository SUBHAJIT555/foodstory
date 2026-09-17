"use client";

import { useState } from "react";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { editGifts, editTabs } from "@/data/gifting";

export function GiftingEdit() {
  const [tab, setTab] = useState<(typeof editTabs)[number]["id"]>(editTabs[0].id);
  const items = editGifts[tab];

  return (
    <div className="w-full py-10 lg:py-12">
      <div className="mx-auto min-w-0 px-3 lg:max-w-7xl lg:px-2">
        <h2 className="font-serif mb-8 text-center text-2xl font-bold uppercase lg:text-[44px]">
          Say It With The Foodstory Gifting Edit
        </h2>
        <div role="tablist" aria-label="Gifting Edit" className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {editTabs.map((item) => {
            const selected = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${selected ? "bg-fig text-white" : "bg-transparent text-[#39393B] underline"}`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <MediaCarousel
          slidesPerView={1.2}
          spaceBetween={24}
          navigation
          breakpoints={{
            375: { slidesPerView: 1.2, spaceBetween: 24 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="lg:px-10"
          slideClassName="!h-auto"
        >
          {items.map((gift) => (
            <ProductCard
              key={gift.href}
              variant={gift.href.startsWith("/gifting/") ? "gift" : "plp"}
              ctaLabel={gift.href.startsWith("/gifting/") ? "Gift Now" : "Add to Cart"}
              product={{ name: gift.name, href: gift.href, price: gift.price, unit: gift.unit }}
            />
          ))}
        </MediaCarousel>
      </div>
    </div>
  );
}
