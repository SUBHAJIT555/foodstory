import { BrandValuesSection } from "@/components/home/BrandValuesSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FestivePicksSection } from "@/components/home/FestivePicksSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductRail } from "@/components/home/ProductRail";
import { SeoCopySection } from "@/components/home/SeoCopySection";
import { ShoppingModesSection } from "@/components/home/ShoppingModesSection";
import { StoreDiscoverySection } from "@/components/home/StoreDiscoverySection";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { homeRails } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductRail rail={homeRails[0]} />
      <ProductRail rail={homeRails[1]} />
      <ProductRail rail={homeRails[2]} />
      <StoreDiscoverySection />
      <ShoppingModesSection />
      <BrandValuesSection />
      <ProductRail rail={homeRails[3]} />
      <FestivePicksSection />
      <SeoCopySection />
      <SubscribeSection />
    </>
  );
}
