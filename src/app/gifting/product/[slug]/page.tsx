import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftPdpPage } from "@/components/gifting/GiftPdpPage";
import { allGiftSlugs, getGiftPage } from "@/data/gifting";

type GiftProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allGiftSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GiftProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getGiftPage(slug);
  if (!product) return { title: "Page not found | Foodstory" };
  return { title: product.name };
}

export default async function GiftProductPage({ params }: GiftProductPageProps) {
  const { slug } = await params;
  const product = getGiftPage(slug);
  if (!product) notFound();
  return <GiftPdpPage product={product} />;
}
