"use client";

import { useEffect, useRef } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { homeBrandTitles } from "@/data/home";
import { brandVideos } from "@/data/media";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

function BrandVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const play = () => {
      void el.play().catch(() => undefined);
    };

    play();
    el.addEventListener("canplay", play);
    el.addEventListener("loadeddata", play);
    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("loadeddata", play);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={src}
    />
  );
}

export function BrandValuesSection() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <PageContainer as="section" className="min-w-0 bg-page py-10">
      <MediaCarousel
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        pagination
        loop
        autoplay={reducedMotion ? false : 4000}
        grabCursor
        className="brand-titles-carousel mb-6"
        slideClassName="!h-auto"
      >
        {homeBrandTitles.map((title) => (
          <h2
            key={title}
            className="editorial-title"
          >
            {title}
          </h2>
        ))}
      </MediaCarousel>
      <div className="relative h-[396px] w-full overflow-hidden bg-page md:hidden">
        <BrandVideo
          src={brandVideos.mobile}
          className="absolute inset-0 h-full w-full bg-page object-cover"
        />
      </div>
      <div className="relative h-[496px] w-full overflow-hidden bg-page max-md:hidden">
        <BrandVideo
          src={brandVideos.desktop}
          className="absolute inset-0 h-full w-full bg-page object-cover"
        />
      </div>
    </PageContainer>
  );
}
