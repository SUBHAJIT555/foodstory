import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { IconHeart, IconShare } from "@/components/icons";
import { mediaFor } from "@/data/media";
import type { RecipeCardItem } from "@/data/recipes";

type RecipeCardProps = {
  recipe: RecipeCardItem;
  variant?: "rail" | "listing";
};

export function RecipeCard({ recipe, variant = "rail" }: RecipeCardProps) {
  const listing = variant === "listing";

  return (
    <div className="group col-span-1 row-span-1 mx-auto block w-full max-w-76.5 flex-1 space-y-2">
      <div className="aspect-102/173 h-full w-full max-w-76.5 cursor-pointer space-y-4 rounded-md bg-[#f6f6f6] p-4 max-sm:aspect-125/224 max-sm:max-w-45.5 max-sm:space-y-2 max-sm:p-2">
        <div className="relative aspect-83/94 w-full rounded-md sm:aspect-137/155">
          <FramedMedia alt={recipe.title} src={mediaFor(recipe.slug, recipe.title)} sizes="(max-width: 768px) 60vw, 33vw" className="rounded-md object-cover" />
          {recipe.cuisine || recipe.level ? (
            <ul className="absolute top-4 left-4 flex flex-col gap-2 rounded-sm">
              {recipe.cuisine ? (
                <li className="w-fit rounded-sm bg-[#38383A] px-2 py-1">
                  <p className="line-clamp-1 text-base text-white">{recipe.cuisine}</p>
                </li>
              ) : null}
              {recipe.level ? (
                <li className="w-fit rounded-sm bg-[#D48A7A] px-2 py-1">
                  <p className="line-clamp-1 text-base text-white">{recipe.level}</p>
                </li>
              ) : null}
            </ul>
          ) : null}
          <div className="absolute top-0 right-0 flex flex-col gap-3 p-2">
            <span className="rounded-full bg-white p-2">
              <IconHeart className="h-4 w-4 fill-none stroke-2 stroke-fig" />
            </span>
            <span className="rounded-full bg-white p-2">
              <IconShare className="h-4 w-4 stroke-2 stroke-fig" />
            </span>
          </div>
        </div>
        <div aria-label="info" className={listing ? "h-36 space-y-3 text-center max-sm:h-24" : "h-36 space-y-4 text-center"}>
          <h2 className="font-serif line-clamp-2 p-0 text-2xl font-semibold">{recipe.title}</h2>
          <div className="space-y-3">
            {listing ? null : <p className="line-clamp-1 px-3 text-base font-semibold sm:line-clamp-2 md:line-clamp-3">{recipe.byline}</p>}
            <p className="line-clamp-1 px-3 text-base font-semibold text-black/50 md:line-clamp-3">Cook Time: {recipe.cookTime}</p>
          </div>
        </div>
        <Link href={recipe.href} className="btn primary-btn py-[0.9rem] group-hover:visible lg:invisible">
          <span className="flex items-center justify-center gap-2">Read Recipe</span>
        </Link>
      </div>
    </div>
  );
}
