import type { Metadata } from "next";
import { KitchenStudioPage } from "@/components/utility/KitchenStudioPage";

export const metadata: Metadata = {
  title: "Kitchen Studio by Foodstory",
  description: "Bring your food stories to life.",
};

export default function KitchenStudioRoute() {
  return <KitchenStudioPage />;
}
