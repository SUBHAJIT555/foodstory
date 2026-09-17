"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigation } from "@/components/carousel/CarouselNavigation";
import { FramedMedia } from "@/components/home/FramedMedia";
import { mediaFor } from "@/data/media";
import type { ShopChip } from "@/data/shop";
import { listingKeyFromHref } from "@/lib/shop";
import "swiper/css";

type CategoryRailProps = {
  chips: ShopChip[];
  activeHref?: string;
};

function chipIsActive(chip: ShopChip, activeHref?: string) {
  if (!activeHref) return false;
  const chipKey = listingKeyFromHref(chip.href);
  const activeKey = listingKeyFromHref(activeHref);
  return activeKey === chipKey || activeKey.startsWith(`${chipKey}/`);
}

function railBreakpoints(count: number) {
  if (count <= 4) {
    return {
      390: { slidesPerView: Math.min(count, 3.35), spaceBetween: 0 },
      430: { slidesPerView: Math.min(count, 3.5), spaceBetween: 0 },
      768: { slidesPerView: count, spaceBetween: 0 },
      1024: { slidesPerView: count, spaceBetween: 0 },
    };
  }
  return {
    390: { slidesPerView: 3.35, spaceBetween: 0 },
    430: { slidesPerView: 3.5, spaceBetween: 0 },
    768: { slidesPerView: 6, spaceBetween: 0 },
    1024: { slidesPerView: 9, spaceBetween: 0 },
  };
}

export function CategoryRail({ chips, activeHref }: CategoryRailProps) {
  const uid = useId().replace(/:/g, "");
  const prevId = `shop-rail-prev-${uid}`;
  const nextId = `shop-rail-next-${uid}`;
  const [progress, setProgress] = useState(0.18);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const compact = chips.length <= 4;

  useEffect(() => {
    const index = chips.findIndex((chip) => chipIsActive(chip, activeHref));
    if (index >= 0) swiperRef.current?.slideTo(index, 0);
  }, [activeHref, chips]);

  if (chips.length === 0) return null;

  return (
    <div className="mx-auto mt-3 mb-8 w-full max-w-[760px] px-3 md:mt-4">
      <div className="relative mx-auto w-full lg:px-10">
        <CarouselNavigation prevId={prevId} nextId={nextId} className="top-6" hideWhenDisabled />
        <div className="carousel-viewport min-w-0 overflow-x-clip">
          <Swiper
            modules={[A11y, Navigation]}
            slidesPerView={compact ? Math.min(chips.length, 3.2) : 3.2}
            spaceBetween={0}
            grabCursor
            watchOverflow
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
            breakpoints={railBreakpoints(chips.length)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              const index = chips.findIndex((chip) => chipIsActive(chip, activeHref));
              if (index >= 0) swiper.slideTo(index, 0);
            }}
            onProgress={(swiper) => setProgress(0.18 + swiper.progress * 0.82)}
            className="min-w-0 overflow-hidden"
          >
            {chips.map((chip) => {
              const active = chipIsActive(chip, activeHref);
              return (
                <SwiperSlide key={chip.href} className="min-w-0">
                  <Link
                    href={chip.href}
                    className="mx-auto flex w-20 max-w-full flex-col items-center justify-start gap-y-1.5"
                    aria-current={active ? "page" : undefined}
                  >
                    <div
                      className={`relative size-12 overflow-hidden rounded-full bg-dew ${
                        active ? "border border-fig" : "hover:border hover:border-fig"
                      }`}
                    >
                      <FramedMedia
                        alt={chip.label}
                        src={mediaFor(chip.href, chip.label)}
                        sizes="96px"
                        className="rounded-full object-cover"
                        priority
                      />
                    </div>
                    <span
                      className={`w-full text-center text-xs leading-4 ${
                        active ? "font-semibold text-fig" : "font-medium text-ink"
                      }`}
                    >
                      {chip.label}
                    </span>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="mx-auto mt-5 h-0.5 w-16 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-fig" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </div>
  );
}
