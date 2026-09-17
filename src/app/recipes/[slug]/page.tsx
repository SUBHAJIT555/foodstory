import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetail } from "@/components/recipes/RecipeDetail";
import { allRecipeSlugs, getRecipe } from "@/data/recipes";

type RecipeRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RecipeRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "Page not found | Foodstory" };
  return { title: recipe.pageTitle };
}

export default async function RecipePage({ params }: RecipeRouteProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();
  return <RecipeDetail recipe={recipe} />;
}
