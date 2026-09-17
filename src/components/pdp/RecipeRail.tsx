import { MediaCarousel } from "@/components/media/MediaCarousel";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import type { PdpRecipe } from "@/data/pdp";

type RecipeRailProps = {
  recipes: PdpRecipe[];
};

export function RecipeRail({ recipes }: RecipeRailProps) {
  if (!recipes.length) return null;

  return (
    <section className="mx-auto flex w-full min-w-0 flex-col items-center md:px-16 xl:max-w-7xl">
      <h2 className="mb-6 px-2 text-center text-[1.625rem] font-bold md:mb-10 md:text-3xl">Great Stories Deserve Great Recipes</h2>
      <MediaCarousel
        slidesPerView={1.2}
        spaceBetween={8}
        navigation
        breakpoints={{
          375: { slidesPerView: 1.2, spaceBetween: 8 },
          768: { slidesPerView: 2.2, spaceBetween: 8 },
          1024: { slidesPerView: 3, spaceBetween: 8 },
        }}
        className="w-full min-w-0 px-4 md:px-10"
        slideClassName="!h-auto"
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.href}
            recipe={{
              slug: recipe.href,
              title: recipe.title,
              href: recipe.href,
              cookTime: recipe.cookTime,
              cuisine: recipe.cuisine,
              level: recipe.level,
              byline: recipe.byline,
            }}
          />
        ))}
      </MediaCarousel>
    </section>
  );
}
