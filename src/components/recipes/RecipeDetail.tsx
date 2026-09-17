import { ComeWriteYours } from "@/components/editorial/ComeWriteYours";
import { FramedMedia } from "@/components/home/FramedMedia";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { mediaFor } from "@/data/media";
import { RecipeIngredients } from "@/components/recipes/RecipeIngredients";
import { RecipeShare } from "@/components/recipes/RecipeShare";
import type { Recipe } from "@/data/recipes";

type RecipeDetailProps = {
  recipe: Recipe;
};

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <article className="relative scroll-smooth">
      <div className="relative h-[36rem] w-full md:h-[48.125rem]">
        <FramedMedia alt={recipe.title} src={mediaFor(recipe.slug, recipe.title)} sizes="100vw" tone="charcoal" className="object-cover" priority />
      </div>
      <div className="mx-auto px-0 lg:max-w-7xl lg:px-2">
        <header className="w-full space-y-6 pt-10 pb-6 text-center max-md:px-8 md:pt-20 md:pb-0">
          <h1 className="font-serif mb-3 px-3 text-4xl font-semibold text-[#38383A] md:text-6xl">{recipe.title}</h1>
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="space-y-1">
              <div className="flex w-full items-center justify-center text-sm font-semibold text-black md:text-lg">
                Cooking Time: {recipe.cookTime}
                {recipe.difficulty ? `  | Difficulty: ${recipe.difficulty}` : null}
              </div>
              <div className="flex w-full items-center justify-center text-sm font-semibold text-black capitalize md:text-lg">
                {[recipe.cuisine, recipe.category === "american" ? "Dessert" : recipe.category?.replace("-", " "), recipe.byline].filter(Boolean).join(" | ")}
              </div>
            </div>
            <RecipeShare />
          </div>
        </header>
        {recipe.instructions?.length || recipe.ingredients?.length ? (
          <div className="mb-10 flex scroll-mt-1 flex-col-reverse items-center justify-center md:scroll-mt-64 md:flex-row md:items-start md:px-24">
            <div className="p-8 md:basis-3/5">
              <h2 className="text-2xl font-semibold text-[#38383A]">Recipe Instructions</h2>
              <div className="recipe px-8 pt-6 text-ellipsis">
                {recipe.instructions?.map((group) => (
                  <section key={group.heading} className="mb-6">
                    <p>
                      <strong>{group.heading}</strong>
                    </p>
                    <ol className="mt-2 list-decimal space-y-2 pl-5">
                      {group.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
            <div className="px-8 md:basis-2/5">
              {recipe.ingredients ? <RecipeIngredients serves={recipe.serves} groups={recipe.ingredients} shopEnabled={recipe.shopEnabled} /> : null}
            </div>
          </div>
        ) : null}
      </div>
      <ComeWriteYours />
      <SubscribeSection />
    </article>
  );
}
