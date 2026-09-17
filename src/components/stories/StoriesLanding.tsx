import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { RecipeRailRow } from "@/components/recipes/RecipeRailRow";
import { WeeklyCooking } from "@/components/recipes/WeeklyCooking";
import { StoryCard } from "@/components/stories/StoryCard";
import { kitchenRail } from "@/data/recipes";
import { storiesIn } from "@/data/stories";

export function StoriesLanding() {
  const featured = storiesIn("featured")[0];
  const shelves = storiesIn("shelves");
  const table = storiesIn("table");
  const people = storiesIn("people");

  return (
    <div className="relative bg-page">
      <EditorialBanner
        title="Come, Gather Stories With Us"
        bannerKey="stories"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Stories" },
        ]}
        titleClassName="font-serif mb-2 px-4 text-[30px] leading-[30px] font-medium md:text-[64px] xl:text-6xl"
      />
      <div className="mx-auto space-y-16 px-3 py-12 lg:w-11/12">
        {featured ? <StoryCard story={featured} variant="feature" /> : null}
        <section className="space-y-8">
          <div className="relative overflow-hidden rounded-md bg-[#38383A] px-4 py-12 text-white">
            <div className="space-y-2">
              <h2 className="font-serif px-3 text-center text-5xl font-semibold lg:text-6xl">Stories On Our Shelves</h2>
              <p className="mx-auto px-3 text-center text-base font-medium lg:w-2/4">Deep dive into the fascinating tales of some of our favourite ingredients!</p>
            </div>
            <MediaCarousel
              slidesPerView={1.2}
              spaceBetween={16}
              navigation
              breakpoints={{
                375: { slidesPerView: 1.2, spaceBetween: 16 },
                768: { slidesPerView: 2.2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
              }}
              className="mt-8 px-2 lg:px-10"
              slideClassName="!h-auto"
            >
              {shelves.map((story) => (
                <StoryCard key={story.href} story={story} variant="overlay" />
              ))}
            </MediaCarousel>
          </div>
        </section>
        <WeeklyCooking />
        <section className="space-y-2">
          <h2 className="px-3 text-center text-[1.625rem] font-bold max-lg:px-8 lg:text-[2.1875rem]">Table Tales</h2>
          <p className="mx-auto px-3 text-center text-base font-medium lg:w-[40%]">Essential tips and inspiration to bring your table alive</p>
          <MediaCarousel
            slidesPerView={1.2}
            spaceBetween={24}
            navigation
            breakpoints={{
              375: { slidesPerView: 1.2, spaceBetween: 24 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pt-6 lg:px-10"
            slideClassName="!h-auto"
          >
            {table.map((story) => (
              <StoryCard key={story.href} story={story} />
            ))}
          </MediaCarousel>
        </section>
        <RecipeRailRow title="Recipes Handpicked For You" recipes={kitchenRail} />
        <section className="space-y-2">
          <h2 className="px-3 text-center text-[1.625rem] font-bold lg:text-[2.1875rem]">Stories Of People</h2>
          <MediaCarousel
            slidesPerView={1}
            spaceBetween={24}
            navigation
            breakpoints={{
              375: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 1.2, spaceBetween: 24 },
              1024: { slidesPerView: 1.4, spaceBetween: 24 },
            }}
            className="pt-6 lg:px-10"
            slideClassName="!h-auto"
          >
            {people.map((story) => (
              <StoryCard key={story.href} story={story} variant="feature" />
            ))}
          </MediaCarousel>
        </section>
        <div className="text-center">
          <Link href="/stories/discover-all/" className="text-lg font-bold text-fig underline">
            Discover All
          </Link>
        </div>
      </div>
      <SubscribeSection />
    </div>
  );
}
