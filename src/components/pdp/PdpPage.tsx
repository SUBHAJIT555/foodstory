import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { PdpBadges } from "@/components/pdp/PdpBadges";
import { PdpDescription } from "@/components/pdp/PdpDescription";
import { PdpPrice } from "@/components/pdp/PdpPrice";
import { PdpReasons } from "@/components/pdp/PdpReasons";
import { PdpSections } from "@/components/pdp/PdpSections";
import { PdpTitle } from "@/components/pdp/PdpTitle";
import { ProductFaq } from "@/components/pdp/ProductFaq";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { PdpBuyBox } from "@/components/pdp/PdpBuyBox";
import { RecipeRail } from "@/components/pdp/RecipeRail";
import { galleryImages, type ProductPage } from "@/data/pdp";

type PdpPageProps = {
  product: ProductPage;
};

export function PdpPage({ product }: PdpPageProps) {
  const images = galleryImages(product.name, product.slug);

  return (
    <article className="max-md:pb-24">
      <div className="xl:mx-auto xl:max-w-7xl">
        <Breadcrumbs variant="pdp" crumbs={[{ label: "Shop", href: "/shop/" }, { label: "Product" }]} />
      </div>
      <div className="space-y-6 lg:flex lg:flex-row lg:justify-center lg:gap-x-6 lg:space-y-0 lg:px-2 xl:mx-auto xl:max-w-7xl">
        <ProductGallery name={product.name} images={images} vegetarian={product.vegetarian} />
        <div className="w-full space-y-6 px-4 lg:max-w-121.5 lg:px-0">
          <div aria-label="product-details">
            <PdpBadges badges={product.badges} />
            <PdpTitle name={product.name} speakText={product.description} product={product} />
            <PdpDescription text={product.description} />
            <PdpPrice price={product.price} compareAtPrice={product.compareAtPrice} />
          </div>
          {product.reasons?.length ? <PdpReasons reasons={product.reasons} /> : null}
          <PdpBuyBox product={product} units={product.units} />
          <div className="h-px w-full border-t border-black/15" />
          <PdpSections
            howToEnjoy={product.howToEnjoy}
            weLoveThisIn={product.weLoveThisIn}
            ingredients={product.ingredients}
            idealFor={product.idealFor}
            info={product.info}
          />
        </div>
      </div>
      {product.recipes?.length ? (
        <div className="mt-16">
          <RecipeRail recipes={product.recipes} />
        </div>
      ) : null}
      {product.faqs?.length ? (
        <div className="mt-16">
          <ProductFaq faqs={product.faqs} />
        </div>
      ) : null}
      <div className="mt-16">
        <SubscribeSection />
      </div>
    </article>
  );
}
