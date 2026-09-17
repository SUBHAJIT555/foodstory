import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PdpPage } from "@/components/pdp/PdpPage";
import { allProductSlugs, getProductPage } from "@/data/pdp";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) return { title: "Page not found | Foodstory" };

  return {
    title: `Buy ${product.name} Online | Foodstory`,
    description: product.description,
  };
}

export default async function ShopProductPage({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) notFound();
  return <PdpPage product={product} />;
}
