"use client";

import { Children, useId, type ReactNode } from "react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { CarouselNavigation } from "@/components/carousel/CarouselNavigation";
import "swiper/css";
import "swiper/css/pagination";

export type CarouselProps = {
  children: ReactNode;
  className?: string;
  slideClassName?: string;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  breakpoints?: SwiperOptions["breakpoints"];
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: number | false;
  loop?: boolean;
  grabCursor?: boolean;
  centeredSlides?: boolean;
  viewportClassName?: string;
  arrowClassName?: string;
};

export function Carousel({
  children,
  className = "",
  slideClassName,
  slidesPerView = "auto",
  spaceBetween = 32,
  breakpoints,
  navigation = true,
  pagination = false,
  autoplay = false,
  loop = false,
  grabCursor = true,
  centeredSlides = false,
  viewportClassName = "",
  arrowClassName = "top-1/2",
}: CarouselProps) {
  const uid = useId().replace(/:/g, "");
  const prevId = `carousel-prev-${uid}`;
  const nextId = `carousel-next-${uid}`;
  const slides = Children.toArray(children);

  return (
    <div className={`media-carousel relative min-w-0 ${className}`}>
      {navigation ? <CarouselNavigation prevId={prevId} nextId={nextId} className={arrowClassName} /> : null}
      <div className={`carousel-viewport min-w-0 overflow-x-clip ${viewportClassName}`}>
        <Swiper
          modules={[A11y, Navigation, Pagination, Autoplay]}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          breakpoints={breakpoints}
          loop={loop && slides.length > 2}
          centeredSlides={centeredSlides}
          grabCursor={grabCursor}
          watchOverflow
          navigation={navigation ? { prevEl: `#${prevId}`, nextEl: `#${nextId}` } : false}
          pagination={pagination ? { clickable: true } : false}
          autoplay={autoplay ? { delay: autoplay, disableOnInteraction: false } : false}
          className="min-w-0 overflow-hidden"
        >
          {slides.map((child, index) => (
            <SwiperSlide key={index} className={slideClassName ? `${slideClassName} min-w-0` : "min-w-0"}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
