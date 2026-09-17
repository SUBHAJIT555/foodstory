"use client";

import { useRef, useState } from "react";
import { FramedMedia } from "@/components/home/FramedMedia";
import { IconChevron } from "@/components/icons";
import { ShareButton } from "@/components/pdp/ShareButton";
import type { GalleryImage } from "@/data/pdp";

type ProductGalleryProps = {
  name: string;
  images: GalleryImage[];
  vegetarian?: boolean;
};

function VegMark() {
  return (
    <div className="absolute top-4 left-6 z-2 flex items-center justify-start gap-x-2 md:gap-x-4 lg:left-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2 stroke-transparent" fill="none" viewBox="0 0 32 32" aria-label="Vegetarian">
        <rect x="0.5" y="0.5" width="31" height="31" stroke="#12B52C" />
        <circle cx="16" cy="16" r="9.41176" fill="#12B52C" />
      </svg>
    </div>
  );
}

export function ProductGallery({ name, images, vegetarian = true }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const current = images[index] ?? images[0];
  if (!current) {
    return (
      <div className="block space-y-4 max-lg:px-0 lg:sticky lg:top-[var(--header-sticky-desktop-current)] lg:col-span-2 lg:h-full lg:w-full lg:flex-initial lg:self-start">
        <div className="relative aspect-107/70 w-full bg-[#F9F8F7] lg:aspect-4675/3087 lg:max-w-187 lg:rounded-md" />
      </div>
    );
  }

  function select(next: number) {
    const bounded = (next + images.length) % images.length;
    setIndex(bounded);
    const node = scroller.current?.children[bounded] as HTMLElement | undefined;
    node?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function onScroll() {
    const rail = scroller.current;
    if (!rail) return;
    const child = rail.children[0] as HTMLElement | undefined;
    const width = child?.offsetWidth ?? rail.clientWidth;
    setIndex(Math.round(rail.scrollLeft / width));
  }

  return (
    <div className="block space-y-4 max-lg:px-0 lg:sticky lg:top-[var(--header-sticky-desktop-current)] lg:col-span-2 lg:h-full lg:w-full lg:flex-initial lg:self-start">
      <div className="relative aspect-107/70 w-full lg:aspect-4675/3087 lg:max-w-187 lg:rounded-md">
        {vegetarian ? <VegMark /> : null}
        <ShareButton />
        <div className="absolute inset-0 max-lg:hidden">
          <FramedMedia alt={current.alt} src={current.src} sizes="50vw" tone={current.tone} className="cursor-pointer object-contain lg:rounded-md" priority />
        </div>
        <div className="mobile-product-slider w-full lg:hidden">
          <div
            ref={scroller}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, imageIndex) => (
              <div key={image.alt} className="relative aspect-26/17 w-full shrink-0 snap-start select-none px-6">
                <FramedMedia
                  alt={image.alt}
                  src={image.src}
                  sizes="90vw"
                  tone={image.tone}
                  className="overflow-hidden object-contain"
                  priority={imageIndex === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {images.length > 1 ? (
        <div className="relative hidden lg:block lg:max-w-187">
          <div className="flex gap-3 overflow-hidden">
            {images.slice(Math.floor(index / 2) * 2, Math.floor(index / 2) * 2 + 2).map((image) => {
              const imageIndex = images.indexOf(image);
              return (
                <button
                  key={image.alt}
                  type="button"
                  onClick={() => select(imageIndex)}
                  className="relative aspect-113/73 w-1/2 shrink-0 overflow-hidden rounded-md"
                  aria-label={`Show ${image.alt}`}
                  aria-current={imageIndex === index ? true : undefined}
                >
                  <FramedMedia alt="" src={image.src} sizes="25vw" tone={image.tone} className="object-contain" />
                </button>
              );
            })}
          </div>
          {images.length > 2 ? (
            <>
              <button
                type="button"
                className="absolute top-1/2 left-0 z-2 -translate-y-1/2 rounded-full bg-white p-2"
                aria-label="Previous image"
                onClick={() => select(index - 1)}
              >
                <IconChevron className="h-4 w-4 rotate-90 stroke-2 stroke-fig" />
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-0 z-2 -translate-y-1/2 rounded-full bg-white p-2"
                aria-label="Next image"
                onClick={() => select(index + 1)}
              >
                <IconChevron className="h-4 w-4 -rotate-90 stroke-2 stroke-fig" />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
      <p className="sr-only">{name}</p>
    </div>
  );
}
