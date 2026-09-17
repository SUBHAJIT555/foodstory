import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopPage } from "@/components/shop/ShopPage";
import { getListing } from "@/data/shop";

type ShopSlugPageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ filter?: string | string[]; sort?: string | string[] }>;
};

export async function generateMetadata({ params }: ShopSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug[0] === "product") return { title: "Page not found | Foodstory" };
  const listing = getListing(slug.join("/"));
  if (!listing) return { title: "Page not found | Foodstory" };
  return { title: listing.seo?.title ?? `${listing.title} | Foodstory` };
}

export default async function ShopSlugPage({ params, searchParams }: ShopSlugPageProps) {
  const { slug } = await params;
  if (slug[0] === "product") {
    notFound();
  }

  const listing = getListing(slug.join("/"));
  if (!listing) notFound();
  const query = await searchParams;
  return <ShopPage listing={listing} filter={query.filter} sort={query.sort} />;
}
