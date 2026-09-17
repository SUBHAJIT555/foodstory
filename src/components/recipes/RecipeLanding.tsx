import Link from "next/link";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { MediaCarousel } from "@/components/media/MediaCarousel";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { RecipeRailRow } from "@/components/recipes/RecipeRailRow";
import { WeeklyCooking } from "@/components/recipes/WeeklyCooking";
import { autumnRail, kitchenRail, seasonRail } from "@/data/recipes";

export function RecipeLanding() {
  return (
    <div className="relative bg-page">
      <EditorialBanner
        title="Stories to Cook"
        intro="A collection of our favourite kitchen-friendly recipes for you to try"
        bannerKey="recipes"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Recipes" },
        ]}
      />
      <section className="flex flex-col items-center bg-linear-to-b from-[#FBF3F2] to-[#FBF3F200] pt-14 md:px-16 md:pt-26">
        <h2 className="mb-4 text-center text-2xl font-bold text-[#38383A] max-md:px-[4.13rem] md:text-4xl">Fresh from the Foodstory Kitchen</h2>
        <MediaCarousel
          slidesPerView={1.2}
          spaceBetween={8}
          navigation
          breakpoints={{
            375: { slidesPerView: 1.2, spaceBetween: 8 },
            768: { slidesPerView: 2.2, spaceBetween: 8 },
            1024: { slidesPerView: 3, spaceBetween: 8 },
          }}
          className="w-full px-4 md:px-10"
          slideClassName="!h-auto"
        >
          {kitchenRail.map((recipe) => (
            <RecipeCard key={recipe.href} recipe={recipe} />
          ))}
        </MediaCarousel>
      </section>
      <div className="mt-16 space-y-16 pb-16">
        <WeeklyCooking />
        <RecipeRailRow title="A Season to Savour" recipes={seasonRail} />
        <RecipeRailRow title="Autumn Feasts" recipes={autumnRail} />
        <div className="text-center">
          <Link href="/recipes/list/" className="font-bold text-fig underline">
            Discover Recipes
          </Link>
        </div>
      </div>
      <SubscribeSection />
    </div>
  );
}
