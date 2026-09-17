import type { Metadata } from "next";
import { StoriesDiscover } from "@/components/stories/StoriesDiscover";

export const metadata: Metadata = {
  title: "Stories - Discover All",
};

export default function StoriesDiscoverPage() {
  return <StoriesDiscover />;
}
