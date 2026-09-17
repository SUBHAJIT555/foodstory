import type { Metadata } from "next";
import { SitemapPage } from "@/components/utility/SitemapPage";

export const metadata: Metadata = {
  title: "Sitemap - Foodstory",
};

export default function SitemapRoute() {
  return <SitemapPage />;
}
