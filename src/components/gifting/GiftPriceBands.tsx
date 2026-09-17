import Image from "next/image";
import Link from "next/link";
import { giftPrices } from "@/data/gifting";

export function GiftPriceBands() {
  return (
    <div className="block bg-[#F8F7F7] px-4 py-10 lg:py-18">
      <div className="flex w-full flex-col gap-y-7 lg:mx-auto lg:max-w-7xl lg:items-center lg:justify-between">
        <div className="flex flex-col items-center justify-center text-center">
          <Image src="/gifting/sparkle.svg" alt="" width={24} height={24} className="my-2 size-4 md:my-3 md:size-6" />
          <h2 className="font-serif text-2xl font-bold uppercase lg:text-[40px] lg:leading-[130%]">
            Thoughtful gifts
            <br />
            for everyone
          </h2>
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-x-4 max-lg:gap-4 lg:flex lg:justify-start lg:gap-x-10">
          {giftPrices.map((band) => (
            <div key={band.href} className="relative size-[10rem] overflow-hidden rounded-full lg:h-[14rem] lg:w-[14rem]">
              <Image src="/gifting/price-ribbon.svg" alt="" fill className="object-contain" sizes="14rem" />
              <div className="absolute inset-0 top-6 z-10 flex items-center justify-center p-2 md:top-12">
                <Link href={band.href} className="flex max-w-[80%] flex-col items-center justify-center gap-1 text-center leading-none text-fig">
                  {band.lines.map((line) =>
                    line.startsWith("₹") || line === "Onwards" ? (
                      <strong key={line} className="text-base leading-none lg:text-3xl">
                        {line}
                      </strong>
                    ) : (
                      <span key={line} className="text-[0.7rem] leading-none font-semibold uppercase md:text-xs lg:text-lg">
                        {line}
                      </span>
                    ),
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
