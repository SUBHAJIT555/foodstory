import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { PageContainer } from "@/components/layout/PageContainer";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { homeCategories } from "@/data/home";
import { mediaFor } from "@/data/media";

export function CategorySection() {
  return (
    <PageContainer as="section" className="mt-20 min-w-0 bg-page">
      <div className="space-y-4 text-center">
        <MediaCarousel
          slidesPerView={3}
          spaceBetween={16}
          navigation
          breakpoints={{
            375: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }}
          slideClassName="!h-auto"
        >
          {homeCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex w-full flex-col items-center justify-center gap-y-3"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[100px] overflow-hidden rounded-md sm:max-w-[232px] md:max-w-[248px] lg:max-w-[155px]">
                <FramedMedia
                  alt={category.label}
                  src={mediaFor(category.href, category.label)}
                  sizes="(max-width: 768px) 45vw, 30vw"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="mx-auto line-clamp-2 min-h-14 max-w-50 px-3 py-0 text-center text-[0.9rem] leading-7 font-bold text-black lg:text-lg">
                {category.label}
              </h3>
            </Link>
          ))}
        </MediaCarousel>
        <Link href="/shop/" className="btn link-btn rounded-none p-0 font-semibold text-fig max-lg:hidden">
          Discover All
        </Link>
      </div>
    </PageContainer>
  );
}
