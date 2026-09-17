import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryArticle } from "@/components/stories/StoryArticle";
import { allStoryParams, getStory } from "@/data/stories";

type StoryRouteProps = {
  params: Promise<{ type: string; slug: string }>;
};

export function generateStaticParams() {
  return allStoryParams();
}

export async function generateMetadata({ params }: StoryRouteProps): Promise<Metadata> {
  const { type, slug } = await params;
  const story = getStory(type, slug);
  if (!story) return { title: "Page not found | Foodstory" };
  return { title: story.pageTitle, description: story.deck };
}

export default async function StoryPage({ params }: StoryRouteProps) {
  const { type, slug } = await params;
  const story = getStory(type, slug);
  if (!story) notFound();
  return <StoryArticle story={story} />;
}
