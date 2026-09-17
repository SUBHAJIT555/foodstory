import type { Metadata } from "next";
import { StoriesLanding } from "@/components/stories/StoriesLanding";

export const metadata: Metadata = {
  title: "Ingredients, Recipes & Inspiring Food Tales | Foodstory",
};

export default function StoriesPage() {
  return <StoriesLanding />;
}
