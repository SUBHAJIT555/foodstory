import type { Metadata } from "next";
import { AboutPage } from "@/components/editorial/AboutPage";

export const metadata: Metadata = {
  title: "About Foodstory",
};

export default function AboutUsPage() {
  return <AboutPage />;
}
