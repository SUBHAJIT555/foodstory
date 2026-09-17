"use client";

import Image from "next/image";
import Link from "next/link";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { homeHeroSlides } from "@/data/home";
import { headerOverlaySentinelId } from "@/hooks/useHeaderTheme";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import "swiper/css";

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="home-slider media-carousel relative -mt-[var(--header-sticky-mobile-current)] w-full min-w-0 overflow-x-clip lg:-mt-[var(--header-sticky-desktop-current)]"
      aria-roledescription="carousel"
    >
      <div
        id={headerOverlaySentinelId()}
        className="pointer-events-none absolute top-0 left-0 h-[90px] w-px"
        aria-hidden
      />
      <Swiper
        modules={[A11y, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        grabCursor
        autoplay={reducedMotion ? false : { delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {homeHeroSlides.map((slide, slideIndex) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.href} className="relative block aspect-square w-full overflow-hidden lg:aspect-[1440/727]">
              <Image
                src={slide.src}
                alt=""
                fill
                className="hidden object-cover lg:block"
                sizes="100vw"
                priority={slideIndex === 0}
              />
              <Image
                src={slide.mobileSrc ?? slide.src}
                alt=""
                fill
                className="object-cover lg:hidden"
                sizes="100vw"
                priority={slideIndex === 0}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
