import { IconNavigate } from "@/components/icons";
import { FramedMedia } from "@/components/home/FramedMedia";
import { homeStores } from "@/data/home";
import { mediaFor } from "@/data/media";

export function GiftingStores() {
  return (
    <div className="min-w-0 overflow-x-auto py-10 px-3 lg:mx-auto lg:max-w-7xl lg:py-25">
      <div className="flex w-max gap-x-4 lg:w-full lg:gap-x-7.5">
        {homeStores.map((store) => (
          <article key={store.name} className="flex w-[15.3125rem] shrink-0 flex-col overflow-hidden rounded-xl border border-[#F0F0F0] bg-white">
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
  );
}
