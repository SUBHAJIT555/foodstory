import Link from "next/link";
import { FramedMedia } from "@/components/home/FramedMedia";
import { giftTypes } from "@/data/gifting";
import { mediaFor } from "@/data/media";

export function GiftTypeGrid() {
  return (
    <div className="py-10">
      <div className="carousel mx-auto px-3 lg:max-w-7xl lg:px-2">
        <div className="space-y-4 text-center">
          <div className="limit-items grid w-full grid-cols-3 place-content-stretch place-items-stretch gap-4 lg:grid-cols-6 lg:gap-6">
            {giftTypes.map((item) => (
              <div key={item.href} className="w-full lg:px-[18px]">
                <Link href={item.href} className="flex w-full flex-col items-center justify-center gap-y-3">
                  <div className="relative mx-auto aspect-square w-full max-w-25 overflow-hidden rounded-md sm:max-w-58 md:max-w-62 lg:max-w-69.5">
                    <FramedMedia alt={item.label} src={mediaFor(item.href, item.label)} sizes="(max-width: 768px) 45vw, 30vw" className="rounded-full object-cover" />
                  </div>
                  <h3 className="mx-auto line-clamp-2 max-w-50 px-3 py-0 text-center text-[0.9rem] font-bold text-black lg:text-lg">{item.label}</h3>
                </Link>
              </div>
            ))}
          </div>
          <Link href="/gifting/all-gifts/" className="inline-block font-bold text-fig underline">
            Discover All
          </Link>
        </div>
      </div>
    </div>
  );
}
