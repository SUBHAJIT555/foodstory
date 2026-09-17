import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqPage } from "@/components/utility/FaqPage";
import { allFaqSlugs, getFaqCategory } from "@/data/faqs";

type FaqRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allFaqSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FaqRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getFaqCategory(slug);
  if (!category) return { title: "FAQs | Foodstory" };
  return { title: `${category.title} | Foodstory – Your Questions Answered` };
}

export default async function FaqSlugRoute({ params }: FaqRouteProps) {
  const { slug } = await params;
  const category = getFaqCategory(slug);
  if (!category) notFound();
  return <FaqPage category={category} />;
}
