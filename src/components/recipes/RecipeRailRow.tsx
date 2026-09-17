import { MediaCarousel } from "@/components/media/MediaCarousel";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import type { RecipeCardItem } from "@/data/recipes";

type RecipeRailRowProps = {
  title: string;
  intro?: string;
  recipes: RecipeCardItem[];
  flush?: boolean;
};

export function RecipeRailRow({ title, intro, recipes, flush }: RecipeRailRowProps) {
  if (!recipes.length) return null;

  return (
    <section className={flush ? "flex w-full min-w-0 flex-col items-center md:px-16 xl:mx-auto xl:max-w-7xl" : "mx-auto flex w-full min-w-0 flex-col items-center md:px-16 xl:mx-auto xl:max-w-7xl"}>
      <h2 className="mb-2 px-3 text-center text-[1.625rem] font-bold lg:text-[2.1875rem]">{title}</h2>
      {intro ? <p className="mx-auto mb-6 px-3 text-center text-base font-medium lg:w-[40%]">{intro}</p> : <div className="mb-6" />}
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
          <RecipeCard key={recipe.href} recipe={recipe} />
        ))}
      </MediaCarousel>
    </section>
  );
}
