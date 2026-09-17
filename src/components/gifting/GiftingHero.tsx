"use client";

import Image from "next/image";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { giftingHeroMedia } from "@/data/media";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import "swiper/css";

export function GiftingHero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="home-slider media-carousel relative min-w-0 overflow-x-clip" aria-roledescription="carousel">
      <Swiper
        modules={[A11y, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        grabCursor
        autoplay={reducedMotion ? false : { delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {giftingHeroMedia.map((slide, slideIndex) => (
          <SwiperSlide key={slide.id}>
            <div className="relative aspect-square w-full overflow-hidden lg:aspect-[1440/727]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="hidden rounded-none object-cover lg:block lg:rounded-t-2xl"
                sizes="100vw"
                priority={slideIndex === 0}
              />
              <Image
                src={slide.mobileSrc ?? slide.src}
                alt={slide.alt}
                fill
                className="rounded-none object-cover lg:hidden"
                sizes="100vw"
                priority={slideIndex === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
