import type { Metadata } from "next";
import { RecipeLanding } from "@/components/recipes/RecipeLanding";

export const metadata: Metadata = {
  title: "Explore Gourmet Recipes by Foodstory",
};

export default function RecipesPage() {
  return <RecipeLanding />;
}
