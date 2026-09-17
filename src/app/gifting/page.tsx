import type { Metadata } from "next";
import { GiftPriceBands } from "@/components/gifting/GiftPriceBands";
import { GiftStoryRail } from "@/components/gifting/GiftStoryRail";
import { GiftTypeGrid } from "@/components/gifting/GiftTypeGrid";
import { GiftingEdit } from "@/components/gifting/GiftingEdit";
import { GiftingHero } from "@/components/gifting/GiftingHero";
import { GiftingStores } from "@/components/gifting/GiftingStores";
import { GiftingTicker } from "@/components/gifting/GiftingTicker";
import { OccasionChips } from "@/components/gifting/OccasionChips";
import { PersonalizeSection } from "@/components/gifting/PersonalizeSection";
import { SeasonStory } from "@/components/gifting/SeasonStory";
import { VelvetRibbon } from "@/components/gifting/VelvetRibbon";
import { ProductFaq } from "@/components/pdp/ProductFaq";
import { landingFaqs } from "@/data/gifting";

export const metadata: Metadata = {
  title: "Buy Gourmet Gift Hampers Online | Foodstory",
};

export default function GiftingPage() {
  return (
    <div className="relative bg-page">
      <OccasionChips />
      <GiftingHero />
      <GiftingTicker />
      <GiftTypeGrid />
      <GiftStoryRail />
      <GiftPriceBands />
      <PersonalizeSection />
      <VelvetRibbon />
      <GiftingEdit />
      <SeasonStory />
      <GiftingStores />
      <div className="bg-[#F9F8F7] px-6 py-12 md:px-24">
        <ProductFaq faqs={landingFaqs} heading="FREQUENTLY ASKED QUESTIONS" className="mx-auto max-w-7xl px-0" />
      </div>
    </div>
  );
}
