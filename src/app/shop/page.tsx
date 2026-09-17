import { notFound } from "next/navigation";
import { ShopPage } from "@/components/shop/ShopPage";
import { getListing } from "@/data/shop";

type ShopIndexPageProps = {
  searchParams: Promise<{ filter?: string | string[]; sort?: string | string[] }>;
};

export default async function ShopIndexPage({ searchParams }: ShopIndexPageProps) {
  const listing = getListing("");
  if (!listing) notFound();
  const query = await searchParams;
  return <ShopPage listing={listing} filter={query.filter} sort={query.sort} />;
}
