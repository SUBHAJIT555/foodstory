import { notFound } from "next/navigation";
import { ShopPage } from "@/components/shop/ShopPage";
import { getListing } from "@/data/shop";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ filter?: string | string[]; sort?: string | string[] }>;
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  const query = await searchParams;
  return <ShopPage listing={listing} filter={query.filter} sort={query.sort} />;
}
