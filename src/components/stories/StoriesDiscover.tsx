import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { editorialBanners } from "@/data/media";
import { WeeklyCooking } from "@/components/recipes/WeeklyCooking";
import { StoryCard } from "@/components/stories/StoryCard";
import { storiesIn } from "@/data/stories";

export function StoriesDiscover() {
  const featured = storiesIn("featured").find((story) => story.slug.includes("tea")) ?? storiesIn("featured")[1] ?? storiesIn("featured")[0];
  const table = storiesIn("table");

  return (
    <div className="bg-page">
      <div className="mx-auto px-3 pt-6 lg:max-w-7xl lg:px-2">
        <nav className="px-3 py-4" aria-label="breadcrumbs">
          <ol className="flex gap-3">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <span className="block h-1 w-1 rounded-full bg-black" />
              <Link href="/stories/" className="hover:underline">
                Stories
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <span className="block h-1 w-1 rounded-full bg-black" />
              <span>Discover All</span>
            </li>
          </ol>
        </nav>
        <header className="space-y-2 py-8 text-center">
          <h1 className="font-serif text-[2.5rem] font-semibold xl:text-6xl">The Art of Entertaining</h1>
          <p className="mx-auto w-[70%] text-base">Discover stories that turn every occasion into a memorable celebration</p>
        </header>
        <div className="relative mb-8 h-48 overflow-hidden rounded-md md:h-72">
          <FramedMedia alt="Banner" src={editorialBanners.stories.src} sizes="100vw" className="object-cover" priority />
        </div>
        {featured ? (
          <section className="space-y-4 pb-12">
            <h2 className="text-center text-2xl font-semibold">Featured Article</h2>
            <div className="mx-auto max-w-3xl space-y-3 text-center">
              <p className="text-sm font-bold">{featured.byline}</p>
              <p className="text-base font-semibold text-black/50">{featured.readTime}</p>
              <h3 className="font-serif text-2xl font-bold">{featured.title}</h3>
              {featured.excerpt ? <p className="text-base">{featured.excerpt}</p> : null}
              <Link href={featured.href} className="inline-block text-lg font-bold text-fig underline">
                Continue Reading
              </Link>
            </div>
          </section>
        ) : null}
        <section className="space-y-2 pb-16">
          <h2 className="px-3 text-center text-[1.625rem] font-bold lg:text-[2.1875rem]">Table Tales</h2>
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
        <WeeklyCooking />
      </div>
      <SubscribeSection />
    </div>
  );
}
