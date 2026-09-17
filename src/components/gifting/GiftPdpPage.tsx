import Link from "next/link";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { GiftingEdit } from "@/components/gifting/GiftingEdit";
import { GiftFavourite } from "@/components/gifting/GiftFavourite";
import { GiftMessage } from "@/components/gifting/GiftMessage";
import { GiftingWay } from "@/components/gifting/GiftingWay";
import { PdpDescription } from "@/components/pdp/PdpDescription";
import { PdpPrice } from "@/components/pdp/PdpPrice";
import { PdpTitle } from "@/components/pdp/PdpTitle";
import { ProductFaq } from "@/components/pdp/ProductFaq";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { PdpBuyBox } from "@/components/pdp/PdpBuyBox";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import type { GiftPage } from "@/data/gifting";
import { giftPdpFaqs, giftReassurance } from "@/data/gifting";
import { galleryImages } from "@/data/pdp";

type GiftPdpPageProps = {
  product: GiftPage;
};

export function GiftPdpPage({ product }: GiftPdpPageProps) {
  const images = galleryImages(product.name, product.slug);

  return (
    <article className="max-md:pb-24">
      <div className="xl:mx-auto xl:max-w-7xl">
        <Breadcrumbs variant="pdp" crumbs={[{ label: "Gifting", href: "/gifting/" }, { label: "Product" }]} />
      </div>
      <div className="space-y-6 lg:flex lg:flex-row lg:justify-center lg:gap-x-6 lg:space-y-0 lg:px-2 xl:mx-auto xl:max-w-7xl">
        <ProductGallery name={product.name} images={images} vegetarian={product.vegetarian} />
        <div className="w-full space-y-6 px-4 lg:max-w-121.5 lg:px-0">
          <div aria-label="product-details">
            <PdpTitle name={product.name} speakText={product.description} product={product} />
            <PdpDescription text={product.description} />
            {product.includes.length ? (
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">Includes:</p>
                <ul className="list-disc space-y-1 pl-5 text-base font-medium">
                  {product.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <PdpPrice price={product.price} />
          </div>
          {product.favourite ? <GiftFavourite text={product.favourite} /> : null}
          <GiftMessage />
          <PdpBuyBox product={product} label="Gift Now" />
          <div className="rounded-xl border border-[#39393B]/15 bg-white p-4">
            {giftReassurance.map((line) => (
              <p key={line} className="text-sm font-medium text-[#39393B]">
                {line}
              </p>
            ))}
          </div>
          <div className="rounded-lg bg-[#A13940]/15 p-4">
            <p className="text-xs font-semibold tracking-wide uppercase">Guarantee safe &amp; secure checkout</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href="tel:+919004171401" className="text-xs font-semibold underline">
              Speak With Our Gifting Concierge
            </a>
            <Link href="https://wa.me/9004171401" className="text-xs font-semibold underline">
              Chat With Our Gifting Concierge
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <GiftingEdit />
      </div>
      <GiftingWay />
      <div className="bg-[#F9F8F7] px-6 py-12 md:px-24">
        <ProductFaq faqs={giftPdpFaqs} heading="FREQUENTLY ASKED QUESTIONS" className="mx-auto max-w-7xl px-0" />
      </div>
      <SubscribeSection />
    </article>
  );
}
