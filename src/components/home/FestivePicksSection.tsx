import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { homeGifts } from "@/data/home";
import { mediaFor } from "@/data/media";

export function FestivePicksSection() {
  return (
    <section className="mt-16 min-w-0 bg-page">
      <h2 className="section-title mb-6 lg:mb-8">Timeless Festive Picks</h2>
      <MediaCarousel
        slidesPerView={1}
        spaceBetween={0}
        navigation
        loop
        breakpoints={{
          686: { slidesPerView: 3 },
        }}
        viewportClassName="festive-carousel-track"
        slideClassName="!h-auto"
        arrowClassName="top-1/2"
      >
        {homeGifts.map((gift) => (
          <Link key={gift.href} href={gift.href} className="mx-auto block w-full max-w-71.5">
            <div className="py-10">
              <div className="relative mx-auto aspect-1525/2714 w-full max-w-61 overflow-hidden rounded-lg lg:aspect-157/279 lg:max-w-78.5">
                <FramedMedia
                  alt={gift.name}
                  src={mediaFor(gift.href, gift.name)}
                  sizes="(max-width: 768px) 70vw, 30vw"
                  tone="charcoal"
                  className="rounded-lg object-cover"
                />
                <h3 className="absolute inset-x-0 top-1/2 line-clamp-2 -translate-y-1/2 px-5 text-center text-sm font-semibold text-white lg:text-2xl">
                  {gift.name}
                </h3>
                <div className="absolute inset-x-0 bottom-6 flex justify-center px-5">
                  <span className="btn primary-btn min-h-12 px-4 py-3 text-sm font-bold text-white max-md:py-[0.54rem] hover:opacity-90">
                    Gift Now
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </MediaCarousel>
    </section>
  );
}
