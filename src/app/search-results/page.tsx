import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/utility/SearchResults";

export const metadata: Metadata = {
  title: "Search Results - Foodstory",
};

export default function SearchResultsRoute() {
  return (
    <Suspense fallback={<p className="px-3 py-16 text-center">Showing Results</p>}>
      <SearchResults />
    </Suspense>
  );
}
