import type { Metadata } from "next";
import { StoreLocatorPage } from "@/components/utility/StoreLocatorPage";

export const metadata: Metadata = {
  title: "Find a Foodstory Store Near You",
};

export default function StoreLocatorRoute() {
  return <StoreLocatorPage />;
}
