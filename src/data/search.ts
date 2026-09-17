import { products, type Product } from "@/data/products";
import { recipeCards, type RecipeCardItem } from "@/data/recipes";
import { storyCards, type StoryCardItem } from "@/data/stories";

function haystack(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((product) =>
    haystack(product.name, product.slug, ...product.filters, ...product.listings).includes(q),
  );
}

export function searchStories(query: string): StoryCardItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return storyCards.filter((story) => haystack(story.title, story.excerpt, story.slug).includes(q));
}

export function searchRecipes(query: string): RecipeCardItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return recipeCards.filter((recipe) =>
    haystack(recipe.title, recipe.slug, recipe.cuisine, recipe.category).includes(q),
  );
}
