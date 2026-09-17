import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftListingLayout } from "@/components/gifting/GiftListingLayout";
import { getGiftListing } from "@/data/gifting";
import { parseFilters, parseSort, productsForListing } from "@/lib/shop";

type GiftListingPageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ filter?: string | string[]; sort?: string | string[] }>;
};

function listingPath(slug?: string[]) {
  return slug?.length ? `all-gifts/${slug.join("/")}` : "all-gifts";
}

export async function generateMetadata({ params }: GiftListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getGiftListing(listingPath(slug));
  return { title: listing ? `${listing.title} - Foodstory` : "Gifting - Foodstory" };
}

export default async function GiftListingPage({ params, searchParams }: GiftListingPageProps) {
  const { slug } = await params;
  const listing = getGiftListing(listingPath(slug));
  if (!listing) notFound();
  const query = await searchParams;
  const items = productsForListing(listing.path);
  return (
    <GiftListingLayout
      listing={listing}
      products={items}
      initialSelected={parseFilters(query.filter)}
      initialSort={parseSort(typeof query.sort === "string" ? query.sort : query.sort?.[0])}
    />
  );
}
