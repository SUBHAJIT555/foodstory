"use client";

import { useMemo, useState } from "react";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { filterRecipes, recipeCategories } from "@/data/recipes";

export function RecipeFilters() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const recipes = useMemo(() => filterRecipes(selected), [selected]);

  function toggle(value: string) {
    setSelected((current) => (current.includes(value) ? current.filter((id) => id !== value) : [...current, value]));
  }

  const visible = showMore ? recipeCategories : recipeCategories.slice(0, 5);

  return (
    <div className="mx-auto px-3 lg:max-w-7xl lg:px-2">
      <div className="mb-6 flex flex-wrap items-start justify-start gap-x-6 gap-y-3 font-medium">
        <p className="w-full text-base font-semibold">Filter By Category</p>
        {visible.map((category) => (
          <label key={category.id} className="flex cursor-pointer items-start gap-x-2 text-left text-base select-none" htmlFor={`filter_categories-${category.id}`}>
            <input
              id={`filter_categories-${category.id}`}
              className="accent-fig mt-1 h-4 w-4 cursor-pointer rounded-lg border-2 border-black"
              type="checkbox"
              value={category.value}
              name={category.label}
              aria-label={category.label}
              checked={selected.includes(category.id)}
              onChange={() => toggle(category.id)}
            />
            <p className="flex-1">{category.label}</p>
          </label>
        ))}
        <button type="button" className="text-base font-semibold text-fig" onClick={() => setShowMore((open) => !open)}>
          +&nbsp;&nbsp;&nbsp;&nbsp;More
        </button>
      </div>
      <p className="mb-6 text-base font-semibold">{recipes.length} Recipes Available</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} variant="listing" />
        ))}
      </div>
    </div>
  );
}
