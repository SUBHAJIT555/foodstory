import type { Metadata } from "next";
import { FaqPage } from "@/components/utility/FaqPage";
import { faqCategories } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Shopping FAQs | Foodstory – Your Questions Answered",
  description: "We answer the most common questions you may have here.",
};

export default function FaqsIndexRoute() {
  return <FaqPage category={faqCategories[0]} />;
}
