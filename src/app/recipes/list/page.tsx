import type { Metadata } from "next";
import Link from "next/link";
import { RecipeFilters } from "@/components/recipes/RecipeFilters";

export const metadata: Metadata = {
  title: "Explore Gourmet Recipes by Foodstory",
};

export default function RecipesListPage() {
  return (
    <div className="bg-page pb-16">
      <nav className="mx-auto px-3 py-4 lg:max-w-7xl lg:px-2" aria-label="breadcrumbs">
        <ol className="flex gap-3">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <span className="block h-1 w-1 rounded-full bg-black" />
            <Link href="/recipes/" className="hover:underline">
              Recipes
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <span className="block h-1 w-1 rounded-full bg-black" />
            <span>List</span>
          </li>
        </ol>
      </nav>
      <RecipeFilters />
    </div>
  );
}
