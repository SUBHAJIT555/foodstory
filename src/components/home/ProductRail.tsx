import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { PageContainer } from "@/components/layout/PageContainer";
import type { HomeRail } from "@/data/home";

type ProductRailProps = {
  rail: HomeRail;
};

export function ProductRail({ rail }: ProductRailProps) {
  return (
    <section className={rail.title === "Bestsellers" ? "mt-16 bg-page lg:pb-60" : "mt-16 bg-page"}>
      <PageContainer className="carousel space-y-6 text-center max-lg:!px-0">
        <h2 className="section-title">{rail.title}</h2>
        <div className="min-w-0">
          <MediaCarousel
            slidesPerView={1.35}
            spaceBetween={16}
            navigation
            breakpoints={{
              375: { slidesPerView: 1.35, spaceBetween: 16 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 32 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            slideClassName="!h-auto"
            arrowClassName="top-[8.25rem]"
          >
            {rail.products.map((product) => (
              <ProductCard key={product.href} product={product} />
            ))}
          </MediaCarousel>
          <div className="mt-6">
            <Link href={rail.exploreHref} className="font-bold text-fig underline">
              Explore More
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
