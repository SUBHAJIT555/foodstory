import Image from "next/image";
import { IconNavigate } from "@/components/icons";
import { FramedMedia } from "@/components/home/FramedMedia";
import { WideContainer } from "@/components/layout/PageContainer";
import { homeStores } from "@/data/home";
import { mediaFor } from "@/data/media";

export function StoreDiscoverySection() {
  return (
    <WideContainer as="section" className="overflow-hidden bg-page py-6 md:py-10">
      <div className="absolute top-0 -z-1 w-full px-4 md:px-10">
        <Image src="/home/store-bg.svg" alt="" width={1440} height={360} className="w-full" sizes="100vw" />
      </div>
      <div className="flex flex-col items-center gap-y-8 md:gap-y-10">
        <div className="flex flex-col items-center gap-y-3 px-4 text-center">
          <h2 className="small-section-label text-black">Step Into Foodstory</h2>
          <p className="max-w-[317px] text-sm leading-snug text-black/60 md:max-w-[420px] md:text-base">
            Explore our city stores, each crafted for delicious finds and everyday indulgence.
          </p>
        </div>
        <div className="no-scrollbar w-full min-w-0 overflow-x-auto px-8 md:px-8">
          <div className="mx-auto flex w-fit gap-x-4 md:gap-x-7.5">
            {homeStores.map((store) => (
              <article
                key={store.name}
                className="flex w-[15.3125rem] shrink-0 flex-col overflow-hidden rounded-xl border border-[#F0F0F0] bg-white"
              >
                <div className="relative aspect-[245/83] w-full overflow-hidden md:aspect-[245/180]">
                  <FramedMedia alt={store.name} src={mediaFor(store.name)} sizes="245px" className="object-cover object-top" />
                </div>
                <div className="flex flex-1 flex-col items-center gap-y-2 px-4 py-5 text-center">
                  <h3 className="text-sm font-semibold text-black">{store.name}</h3>
                  <p className="text-xs leading-snug text-[#7E7E7E]">{store.address}</p>
                  <div className="mt-auto pt-3">
                    <a
                      href={store.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-fig/20"
                      aria-label={`Directions to ${store.name}`}
                    >
                      <IconNavigate className="text-fig" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </WideContainer>
  );
}
