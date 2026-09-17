import Link from "next/link";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { landingGifts } from "@/data/gifting";

export function GiftStoryRail() {
  return (
    <div className="w-full bg-dew py-6 lg:py-18">
      <div className="mx-auto min-w-0 px-3 lg:max-w-7xl lg:px-2">
        <div className="mb-6 flex flex-col items-center justify-between gap-3 lg:flex-row">
          <h2 className="px-3 text-center text-[1.5rem] font-bold uppercase lg:pl-0 lg:text-left lg:text-4xl">Gift a Little Story to Savour</h2>
          <Link href="/category/gifts-that-speak-your-story/" className="font-bold text-fig underline">
            Explore More
          </Link>
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
          {landingGifts.map((gift) => (
            <ProductCard key={gift.href} variant="gift" product={{ name: gift.name, href: gift.href, price: gift.price, unit: gift.unit }} />
          ))}
        </MediaCarousel>
      </div>
    </div>
  );
}
