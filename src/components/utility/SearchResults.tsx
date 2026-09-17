"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { MobileShopBar } from "@/components/shop/MobileShopBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SortControl } from "@/components/shop/SortControl";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { shopListings, type SortValue } from "@/data/shop";
import { applyFilters, applySort, parseFilters, parseSort } from "@/lib/shop";
import { searchProducts, searchRecipes, searchStories } from "@/data/search";

export function SearchResults() {
  const router = useRouter();
  const params = useSearchParams();
  const query = (params.get("query") ?? "").trim();
  const selected = parseFilters(params.getAll("filter"));
  const sort = parseSort(params.get("sort") ?? undefined);
  const [sheet, setSheet] = useState<"filters" | "sort" | null>(null);
  const listing = shopListings[0];
  const matched = useMemo(() => searchProducts(query), [query]);
  const products = useMemo(() => applySort(applyFilters(matched, selected), sort), [matched, selected, sort]);
  const stories = useMemo(() => searchStories(query), [query]);
  const recipes = useMemo(() => searchRecipes(query), [query]);

  function writeParams(nextSelected: string[], nextSort: SortValue) {
    const next = new URLSearchParams();
    if (query) next.set("query", query);
    nextSelected.forEach((value) => next.append("filter", value));
    if (nextSort !== "relevance") next.set("sort", nextSort);
    const qs = next.toString();
    router.replace(qs ? `/search-results/?${qs}` : "/search-results/", { scroll: false });
  }

  return (
    <div className="mx-auto max-w-7xl px-3 pb-20 lg:px-2">
      <div className="relative grid grid-cols-2 gap-1 pt-6 lg:grid-cols-4">
        <FilterSidebar
          heading={listing.filterHeading}
          options={listing.filters}
          selected={selected}
          onToggle={(value) => {
            const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
            writeParams(next, sort);
          }}
        />
        <div className="col-span-2 md:col-span-3">
          <div className="relative flex justify-center pb-2 lg:justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-lg font-semibold lg:text-2xl">
                {query ? `Showing Results for “${query}”` : "Showing Results"}
              </h1>
              <p className="text-lg font-semibold max-lg:text-center">
                {products.length === 1 ? "1 Product Available" : `${products.length} Products Available`}
              </p>
            </div>
            <SortControl value={sort} onChange={(value) => writeParams(selected, value)} />
          </div>
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <p className="py-8 text-center text-base">That&apos;s all we have for now!</p>
          )}
        </div>
      </div>
      <MobileShopBar
        sheet={sheet}
        onFilters={() => setSheet((current) => (current === "filters" ? null : "filters"))}
        onSort={() => setSheet((current) => (current === "sort" ? null : "sort"))}
      />
      <FilterDrawer
        open={sheet}
        heading={listing.filterHeading}
        options={listing.filters}
        selected={selected}
        sort={sort}
        onToggle={(value) => {
          const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
          writeParams(next, sort);
        }}
        onSort={(value) => writeParams(selected, value)}
        onClose={() => setSheet(null)}
      />
      {stories.length ? (
        <section className="mt-12">
          <h2 className="mb-6 text-center text-xl font-bold">{stories.length} Stories Available</h2>
          <ul className="mx-auto max-w-3xl space-y-4">
            {stories.map((story) => (
              <li key={story.href}>
                <Link href={story.href} className="block text-center">
                  <p className="font-semibold">{story.title}</p>
                  <span className="text-sm font-bold underline">Read Article</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {recipes.length ? (
        <section className="mt-12">
          <h2 className="mb-6 text-center text-xl font-bold">{recipes.length} Recipes Available</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} variant="listing" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
